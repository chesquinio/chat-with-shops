"use client";

import { BetterProductProps } from "@/lib/interfaces";
import Product from "./product";

const BetterProduct: React.FC<BetterProductProps> = ({ object }) => {
  return (
    <main>
      <div className="flex justify-center items-center bg-gray-100 px-10 py-4 rounded-lg mt-10 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Resumen:</h2>
          <p className="text-gray-800">{object.conclusion}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 min-[1500px]:grid-cols-4 gap-5">
        {object.shops.map((shop, index) => (
          <div key={index} className="group relative p-5">
            <Product product={shop.product} index={index} showVendor={true} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default BetterProduct;
