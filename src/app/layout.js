import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { CartProvider } from "./context/cartContext";
import SettingsButton from "./components/SettingsButton";
import { MenuProvider } from "./context/menuContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ohio State Pizzas",
  description: "Client Portal",
  icons: {
    icon: "/icons/title_logo.png", // ← no relative paths
    shortcut: "/icons/title_logo.png",
    apple: "/icons/title_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icons/title_logo.png" type="image/png" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MenuProvider>
          <CartProvider>
            
            {children}
          </CartProvider>
        </MenuProvider>
      </body>
    </html>
  );
}
