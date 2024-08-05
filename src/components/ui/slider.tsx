"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./button";
import { ProductsProps } from "@/lib/interfaces";

const Slider: React.FC<ProductsProps> = ({ productsByShop }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? productsByShop.length - 1 : prevIndex - 1
    );
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === productsByShop.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full md:w-[39.5rem] overflow-hidden border rounded-lg mb-10">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {productsByShop.map((shop, index) => (
            <div key={index} className="shrink-0 w-full">
              <h2 className="text-center font-semibold border-b py-4 text-gray-800 text-2xl mb-4">
                {shop.vendor}
              </h2>
              {shop.products.length > 0 ? (
                <Carousel className="w-full">
                  <CarouselContent>
                    {shop.products.map((product, idx) => (
                      <CarouselItem key={idx}>
                        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="object-contain w-full h-full"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-800/70 to-transparent p-4 text-white">
                            <h3 className="text-lg md:text-xl font-medium">
                              {product.title}
                            </h3>
                            <span className="font-bold md:text-lg">
                              ${product.price}
                            </span>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:block p-1.5 absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-lg bg-white/50 text-black hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none" />
                  <CarouselNext className="hidden sm:block p-1.5 absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-lg bg-white/50 text-black hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none" />
                </Carousel>
              ) : (
                <h2 className="text-center text-gray-700 text-lg">
                  No se han encontrado productos relacionados
                </h2>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-3 flex justify-between w-full px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className="bg-background/50 hover:pr-3 transition-all hover:bg-background/75 rounded-full"
        >
          <ChevronLeftIcon className="w-6 h-6" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="bg-background/50 hover:pl-3 transition-all hover:bg-background/75 rounded-full"
        >
          <ChevronRightIcon className="w-6 h-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  );
};

export default Slider;
