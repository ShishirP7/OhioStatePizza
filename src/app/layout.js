import { Barlow, Chewy, Roboto } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { CartProvider } from "./context/cartContext";
import SettingsButton from "./components/SettingsButton";
import { MenuProvider } from "./context/menuContext";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const chewy = Chewy({
  variable: "--font-chewy",
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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${chewy.variable} ${roboto.variable}`}
    >
      <Head>
        <link rel="icon" href="/icons/title_logo.png" type="image/png" />
      </Head>
      <body className="font-body antialiased">
        <MenuProvider>
          <CartProvider>{children}</CartProvider>
        </MenuProvider>
      </body>
    </html>
  );
}