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

export default function RootLayout({ children }) {
  // const session = await auth();
  // console.log(session);

  const session = {
    user: {
      name: "Manuel",
      email: "gatchalian.manuel@ymail.com",
      id: "61a5baf6-7376-4f78-a155-646a456a83e3",
    },
    expires: "2025-06-22T23:24:01.104Z",
  };

  return (
    <html lang="en">
      <body className={`lg:px-40`}>
        <Provider>
          <Navigation session={session} />
          {session && <SearchBar />}
          {children}
        </Provider>
      </body>
    </html>
  );
}
