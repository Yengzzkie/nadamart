import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navigation from "@/app/components/Navigation";
import SearchBar from "@/app/components/SearchBar";
import { Provider } from "./components/SessionProvider";
import { auth } from "./auth";

export const metadata = {
  title: "NadaMart",
  description: "nothing for sale, everything for free",
};

export default async function RootLayout({ children }) {
  let session = null;

  try {
    session = await auth();
  } catch (error) {
    console.error("Error during auth:", error);
    // Optional: fallback or continue without session
  }

  return (
    <html lang="en">
      <body className="lg:px-40">
        <Provider session={session}>
          <Navigation session={session} />
          {session && <SearchBar />}
          {children}
        </Provider>
      </body>
    </html>
  );
}