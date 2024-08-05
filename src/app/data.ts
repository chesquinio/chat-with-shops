"use server";

import axios from "axios";
import * as cheerio from "cheerio";
import https from "https";
import { randomUUID } from "crypto";
import { Product } from "@/lib/interfaces";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain; charset=UTF-8");

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

interface Shop {
  vendor: string;
  url: string;
  getProducts: (params: {
    filterQuery?: string;
    url?: string;
    vendor?: string;
    queryData?: any;
  }) => Promise<Product[]>;
}

const shops: Shop[] = [
  {
    vendor: "Libertad",
    url: "https://www.hiperlibertad.com.ar/",
    getProducts: async ({ url, queryData, vendor }) => {
      const data = JSON.parse(queryData[0].data);

      const productDetails = data.productSearch.products;
      const limitedProductDetails = productDetails.slice(0, 12);

      const products = limitedProductDetails.map((product: any) => {
        const title = product.productName;
        const price = product.priceRange.sellingPrice.lowPrice;
        const image = product.items[0].images[0]?.imageUrl;
        const path = product.linkText;
        const link = `${url}${path}/p`;

        return {
          id: randomUUID(),
          title: title.toUpperCase(),
          price: price.toString(),
          vendor,
          image,
          link,
        };
      });

      return products;
    },
  },
  {
    vendor: "Pingüino",
    url: "https://www.pinguino.com.ar/web/productos.r?b=1&txt=",
    getProducts: async ({ filterQuery, url, vendor }) => {
      const completeUrl = `${url}${filterQuery}`;

      const { data } = await axiosInstance.get(completeUrl);
      const $ = cheerio.load(data);

      const content = $(".item-prod").slice(0, 12);

      const products = content
        .map((i, product) => {
          const price = $(product)
            .find(".precio span:nth-of-type(2)")
            .text()
            .trim()
            .replace(/\s+/g, "")
            .replace("$", "")
            .split(".")[0];
          const title = $(product)
            .find(".desProducto span")
            .text()
            .trim()
            .toUpperCase();
          const image = $(product).find(".imgProd img").attr("data-src");
          const link = "https://www.pinguino.com.ar/web/index.r";

          return {
            id: randomUUID(),
            title,
            price,
            vendor,
            image,
            link,
          };
        })
        .get();

      return products;
    },
  },
  {
    vendor: "La Anónima",
    url: "https://supermercado.laanonimaonline.com/buscar?pag=1&clave=",
    getProducts: async ({ filterQuery, url, vendor }) => {
      const completeUrl = `${url}${filterQuery}`;

      const response = await fetch(completeUrl, {
        headers: myHeaders,
      })
        .then(function (response) {
          return response.arrayBuffer();
        })
        .then(function (buffer) {
          const decoder = new TextDecoder("iso-8859-1");
          const text = decoder.decode(buffer);
          return text;
        });

      const $ = cheerio.load(response);

      const content = $("div.caja1.producto div.producto.item").slice(0, 12);

      const products = content
        .map((i, product) => {
          const price = $(product)
            .find("div.precio-promo div.precio.semibold.aux1")
            .text()
            .trim()
            .replace(/\s+/g, "")
            .replace("$", "")
            .replace(".", "")
            .replace(",", ".")
            .split(".")[0];
          const title = $(product)
            .find(".titulo02 a")
            .text()
            .trim()
            .toUpperCase();
          const image = $(product).find("img.imagenIz").attr("data-src");
          const path = $(product).find("div.clearfix a").attr("href");
          const link = `https://supermercado.laanonimaonline.com/${path}`;

          if (price === "0" || parseInt(price) < 1000) {
            return;
          }

          return {
            id: randomUUID(),
            title,
            price,
            vendor,
            image,
            link,
          };
        })
        .get();

      return products;
    },
  },
  {
    vendor: "Flaming",
    url: "https://flaming.ar/",
    getProducts: async ({ filterQuery, url, vendor }) => {
      const completeUrl = `${url}?s=${filterQuery}&post_type=product&type_aws=true`;

      const response = await fetch(completeUrl, {
        headers: myHeaders,
      })
        .then(function (response) {
          return response.arrayBuffer();
        })
        .then(function (buffer) {
          const decoder = new TextDecoder();
          const text = decoder.decode(buffer);
          return text;
        });

      const $ = cheerio.load(response);

      const products = $(".ast-grid-common-col")
        .slice(0, 12)
        .map((i, element) => {
          const title = $(element)
            .find(".woocommerce-loop-product__title")
            .text()
            .trim()
            .toUpperCase();
          const existingPrice =
            $(element).find("ins span.amount").length > 0
              ? $(element).find("ins span.amount")
              : $(element).find("span.amount");
          const price = existingPrice
            .text()
            .trim()
            .replace(/\s+/g, "")
            .replace("$", "")
            .replace(".", "")
            .replace(",", ".");
          const image = $(element)
            .find(".astra-shop-thumbnail-wrap a img")
            .attr("src");
          const link = $(element)
            .find(".astra-shop-thumbnail-wrap a")
            .attr("href");

          return { id: randomUUID(), title, price, vendor, image, link };
        })
        .get();
      return products;
    },
  },
];

interface GetAllProductsParams {
  query: string;
  specific_shop?: string;
}

export async function getAllProducts({
  query,
  specific_shop,
}: GetAllProductsParams) {
  const promises = shops.map(async (shop) => {
    const { vendor, url, getProducts } = shop;

    if (specific_shop !== undefined) {
      if (specific_shop === vendor) {
        if (vendor !== "Libertad") {
          const filterQuery = query.replace(" ", "+");

          const products = await getProducts({ filterQuery, url, vendor });

          return { vendor, products };
        } else {
          const filterQuery = query.replace(" ", "%20");

          const res = await fetch(
            `${url}${filterQuery}?_q=${filterQuery}&map=ft&__pickRuntime=appsEtag%2Cblocks%2CblocksTree%2Ccomponents%2CcontentMap%2Cextensions%2Cmessages%2Cpage%2Cpages%2Cquery%2CqueryData%2Croute%2CruntimeMeta%2Csettings&__device=tablet`,
            {
              headers: myHeaders,
            }
          )
            .then(function (response) {
              return response.arrayBuffer();
            })
            .then(function (buffer) {
              const decoder = new TextDecoder();
              const text = decoder.decode(buffer);
              return text;
            });

          const { queryData } = JSON.parse(res);
          const products = await getProducts({ url, queryData, vendor });

          return { vendor, products };
        }
      } else {
        return { vendor, products: [] };
      }
    } else {
      if (vendor !== "Libertad") {
        const filterQuery = query.replace(" ", "+");

        const products = await getProducts({ filterQuery, url, vendor });

        return { vendor, products };
      } else {
        const filterQuery = query.replace(" ", "%20");

        const res = await fetch(
          `${url}${filterQuery}?_q=${filterQuery}&map=ft&__pickRuntime=appsEtag%2Cblocks%2CblocksTree%2Ccomponents%2CcontentMap%2Cextensions%2Cmessages%2Cpage%2Cpages%2Cquery%2CqueryData%2Croute%2CruntimeMeta%2Csettings&__device=tablet`,
          {
            headers: myHeaders,
          }
        )
          .then(function (response) {
            return response.arrayBuffer();
          })
          .then(function (buffer) {
            const decoder = new TextDecoder();
            const text = decoder.decode(buffer);
            return text;
          });

        const { queryData } = JSON.parse(res);

        const products = await getProducts({ url, queryData, vendor });

        return { vendor, products };
      }
    }
  });

  const results = await Promise.all(promises);

  return results;
}
