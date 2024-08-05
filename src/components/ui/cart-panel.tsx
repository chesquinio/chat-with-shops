"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { useCartContext } from "@/context/cart-context";

export default function CartPanel() {
  const {
    isOpen,
    closeCart,
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreseCartQuantity,
    cartQuantity,
  } = useCartContext();

  function totalPrice() {
    let total = 0;
    for (const item of cartItems) {
      total += parseInt(item.product.price) * item.quantity;
    }
    return total;
  }

  return (
    <Dialog open={isOpen} onClose={closeCart} className="relative z-30">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Simulación del Carrito
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => closeCart()}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XIcon className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cartItems.map((item) => (
                          <li key={item.product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={item.product.title}
                                src={item.product.image}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a
                                      target="_blanck"
                                      href={item.product.link}
                                    >
                                      {item.product.title}
                                    </a>
                                  </h3>
                                  <p className="ml-4">${item.product.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.product.vendor}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex flex-row gap-2">
                                  <button
                                    onClick={() =>
                                      decreseCartQuantity(item.product.id)
                                    }
                                    disabled={item.quantity < 2}
                                    className="flex items-center"
                                  >
                                    <MinusIcon
                                      className={`h-3 w-3 ${
                                        item.quantity < 2
                                          ? "text-transparent"
                                          : ""
                                      }`}
                                    />
                                  </button>
                                  <p className="text-gray-500 w-4 text-center">
                                    {item.quantity}
                                  </p>
                                  <button
                                    onClick={() =>
                                      increaseCartQuantity(item.product)
                                    }
                                    className="flex items-center"
                                  >
                                    <PlusIcon className="h-3 w-3" />
                                  </button>
                                </div>
                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeFromCart(item.product.id)
                                    }
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  {cartQuantity > 0 ? (
                    <>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>${totalPrice()}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Cálculo estimativo del total de los productos.
                      </p>
                    </>
                  ) : (
                    <div>
                      <span className="font-medium">No hay productos</span>
                    </div>
                  )}
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      <button
                        type="button"
                        onClick={() => closeCart()}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continuar comparando
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
