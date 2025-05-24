"use client";
import PostsGrid from "@/app/components/PostsGrid";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <PostsGrid />
      </main>
    </div>
  );
}
