import { ProductProps } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import { Button } from "./button";
import { useCartContext } from "@/context/cart-context";

const Product: React.FC<ProductProps> = ({ product, index, showVendor }) => {
  const { increaseCartQuantity } = useCartContext();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.15 }}
      >
        {showVendor && (
          <h3 className="text-center font-bold text-lg mb-4">
            {product.vendor}
          </h3>
        )}
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 h-40 lg:h-60">
          <img
            alt={product.title}
            src={product.image}
            className="h-full w-full object-contain object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <div>
            <h3 className="md:text-sm text-gray-700 h-20">
              <a href={product.link} target="_blanck">
                <span aria-hidden="true" className="absolute z-10 inset-0" />
                {product.title}
              </a>
            </h3>
          </div>
          <div className="flex justify-between flex-row z-20">
            <Button
              onClick={() => increaseCartQuantity(product)}
              className="rounded-full px-3 bg-indigo-600 hover:bg-indigo-500"
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
            <p className="text-lg md:text-md my-auto font-semibold text-end text-gray-900">
              ${product.price}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Product;
