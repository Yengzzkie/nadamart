"use client";
import PostsGrid from "@/app/components/PostsGrid";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <PostsGrid />
      </main>

      <Footer />
    </div>
  );
}
