"use client"
import Image from "next/image";
import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col lg:px-40">
      <Navigation />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <SearchBar />
      </main>

      <footer className="absolute bottom-0 left-1/2 translate-x-[-50%] flex flex-wrap items-center justify-center font-light text-nowrap text-sm p-4 lg:p-8">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 font-display"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          NadaMart {new Date().getFullYear()} - All Rights Reserved
        </a>
      </footer>
    </div>
  );
}
