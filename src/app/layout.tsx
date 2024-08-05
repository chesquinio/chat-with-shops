import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { AI } from "./actions";
import { CartProvider } from "@/context/cart-context";
import CartPanel from "@/components/ui/cart-panel";

//👇 Configure our font object
const openSans = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Comparador de Productos",
  description:
    "Compara los precios de miles de productos disponibles en los supermercados de la localidad de Rafaela, Santa Fe, Argentina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AI>
      <CartProvider>
        <html lang="en">
          <body className={openSans.className}>
            {children}
            <CartPanel />
          </body>
        </html>
      </CartProvider>
    </AI>
  );
}
