// app/layout.js or app/layout.tsx
import { Barlow, Leckerli_One, Roboto } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/cartContext";
import { MenuProvider } from "./context/menuContext";

// Font Configurations
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const leckerli = Leckerli_One({
  variable: "--font-leckerli",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// ✅ Define metadata at the top of the layout file
export const metadata = {
  title: "Ohio State Pizzas",
  icons: {
    icon: "/icons/title_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${leckerli.variable} ${roboto.variable}`}
    >
      <body className="font-body antialiased">
        <MenuProvider>
          <CartProvider>{children}</CartProvider>
        </MenuProvider>
      </body>
    </html>
  );
}
