"use client";

import { ProductsProps } from "@/lib/interfaces";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { motion } from "framer-motion";
import Product from "./product";

const ProductsList: React.FC<ProductsProps> = ({ productsByShop }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-lg md:max-w-2xl px-4 py-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        {productsByShop.map(
          (shop, index) =>
            shop.products.length > 0 && (
              <section key={index} className="py-6">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  {shop.vendor}
                </h2>

                <Carousel>
                  <CarouselContent>
                    {shop.products.map((product, index) => (
                      <CarouselItem
                        key={index}
                        className="group relative p-5 md:basis-1/2 lg:basis-1/3 xl:basis-1/5"
                      >
                        <Product product={product} index={index} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex" />
                  <CarouselNext className="hidden md:flex" />
                </Carousel>
              </section>
            )
        )}
      </div>
    </div>
  );
};

export default ProductsList;
