import "./globals.css";
import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";

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
