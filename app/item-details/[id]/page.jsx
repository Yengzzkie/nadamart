"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Carousel from "@/app/components/Carousel";
import DOMPurify from "dompurify";
import StaggeredDropDown from "@/app/components/StaggeredDropDown";
import GoogleMap from "@/app/components/GoogleMap";
import SkeletonLoader from "@/app/components/ui/SkeletonLoader";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const sanitizedContent = DOMPurify.sanitize(itemData?.content);

  async function fetchPostDetails() {
    try {
      const response = await axios(`/api/posts/post?postId=${id}`);
      setItemData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  }

  useEffect(() => {
    if (id) fetchPostDetails();
  }, [id]);

  if (!itemData) return <div className="p-4"><SkeletonLoader /></div>;

  return (
    <div className="min-h-screen flex flex-col p-4 lg:px-40 pt-10">
      
      <StaggeredDropDown />
      <h1 className="text-2xl lg:text-4xl font-bold mb-4">{itemData.title}</h1>
      <p className="text-gray-600 mb-4 italic">
        Posted by:{" "}
        <span className="font-bold">{itemData.author?.name}</span>
      </p>

      <Carousel itemData={itemData.image} />

      <div className="flex flex-col gap-[32px] row-start-2 pt-8">
        <div className="flex flex-col gap-3">
          <h4 className="text-xl font-semibold">Description</h4>
          <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </div>
      </div>

      <GoogleMap location={itemData.location} />
    </div>
  );
}
