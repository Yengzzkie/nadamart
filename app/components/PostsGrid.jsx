"use client";

import PostCard from "./PostCard";
import axios from "axios";
import { useEffect, useState } from "react";
import CardLoader from "./ui/CardLoader";

const PostsGrid = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchPosts() {
    setIsLoading(true);

    try {
      const response = await axios.get("/api/posts");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="my-10 lg:px-0 px-1 w-full">
      <h1 className="text-xl lg:text-4xl font-bold my-3 mx-1 lg:mx-0">
        Fresh Finds
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 lg:gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <CardLoader />
              </div>
            ))
          : items
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((item) => (
                <div key={item.id}>
                  <PostCard data={item} />
                </div>
              ))}
      </div>
    </div>
  );
};

export default PostsGrid;
