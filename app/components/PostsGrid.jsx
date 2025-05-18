import items from "@/items.json";
import PostCard from "./PostCard";
import Link from "next/link";

const PostsGrid = () => {
  return (
    <div className="my-10 px-0 w-full">
      <h1 className="text-xl lg:text-4xl font-bold m-3 lg:m-0">
        Fresh Finds
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 lg:gap-4">
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
