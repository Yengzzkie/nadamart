import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navigation from "@/app/components/Navigation";
import SearchBar from "@/app/components/SearchBar";
import Footer from "./components/Footer";
import { Provider } from "./components/SessionProvider";
import { Suspense } from "react";
import Loader from "./components/ui/Loader";

export const metadata = {
  title: "NadaMart",
  description: "nothing for sale, everything for free",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`lg:px-40`}>
        <Provider>
          <Navigation />
          <SearchBar />
          <Suspense fallback={<Loader />}>{children}</Suspense>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
