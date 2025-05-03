// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "NadaMart",
  description: "nothing for sale, everything for free",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>
        {children}
      </body>
    </html>
  );
}
