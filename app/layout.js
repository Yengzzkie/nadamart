import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navigation from "@/app/components/Navigation";
import SearchBar from "@/app/components/SearchBar";

export const metadata = {
  title: "NadaMart",
  description: "nothing for sale, everything for free",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={`lg:px-40`}>
        <Navigation />
        <SearchBar />
        {children}
      </body>
    </html>
  );
}
