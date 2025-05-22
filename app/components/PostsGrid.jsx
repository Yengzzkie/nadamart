"use client";

import items from "@/items.json";
import PostCard from "./PostCard";
import axios from "axios";
import { useEffect, useState } from "react";

const PostsGrid = () => {
  const [items, setItems] = useState([]);

  async function fetchPosts() {
    try {
      const response = await axios.get("/api/posts");
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-4">
        {items.map((item) => (
          <div key={item.id}>
            <PostCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;
