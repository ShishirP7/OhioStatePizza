import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { CartProvider } from "./context/cartContext";
import SettingsButton from "./components/SettingsButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ohio State Pizzas Admin",
  description: "Admin portal",
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
        <CartProvider>
          <div className="fixed top-4 right-4 z-50">
            <SettingsButton />
          </div>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
