export interface Product {
  id: string;
  title: string;
  price: string;
  vendor: string;
  image: string;
  link: string;
}

export interface ProductProps {
  product: Product;
  index: number;
  showVendor?: boolean;
}

export interface ProductsProps {
  productsByShop: {
    vendor: string;
    products: Product[];
  }[];
}

export interface BetterProductProps {
  object: {
    conclusion: string;
    shops: {
      product: Product;
    }[];
  };
}
