"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getTimeAgo } from "@/app/utils/getTimeAgo";
import { Typography } from "@mui/material";
import axios from "axios";
import CallIcon from "@mui/icons-material/Call";
import Carousel from "@/app/components/Carousel";
import StaggeredDropDown from "@/app/components/StaggeredDropDown";
import GoogleMap from "@/app/components/GoogleMap";
import SkeletonLoader from "@/app/components/ui/SkeletonLoader";
import Tag from "@/app/components/ui/Tag";
import UserAvatarCard from "@/app/components/UserAvatarCard";
import EditPostForm from "@/app/components/EditPostForm";

const conditionMap = {
  NEW: "New",
  USED_LIKE_NEW: "Used - Like New",
  USED_VERY_GOOD: "Used - Very Good",
  USED_GOOD: "Used - Good",
  USED_ACCEPTABLE: "Used - Acceptable",
  FOR_PARTS: "For Parts",
  FOR_REPAIR: "For Repair",
  FOR_SCRAP: "For Scrap",
  FOR_RECYCLE: "For Recycle",
};

export default function ItemDetailsPage() {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const session = useSession();
  const isAuthor = session?.data?.user?.id && itemData?.author?.id === session?.data?.user?.id;

  const itemCondition = conditionMap[itemData?.condition] || "Unknown";

  useEffect(() => {
    async function fetchPostDetails() {
      try {
        const response = await axios(`/api/posts/post?postId=${id}`);
        setItemData(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    }

    if (id) fetchPostDetails();
  }, [id]);

  if (isEditMode) {
    return (
      <div className="min-h-screen flex flex-col p-6 lg:px-40">
        <StaggeredDropDown setIsEditMode={setIsEditMode} />
        <EditPostForm
          postData={itemData}
          setIsEditMode={setIsEditMode}
          isEditMode={isEditMode}
        />
      </div>
    );
  }

  if (!itemData) {
    return (
      <div className="p-4">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 lg:px-40">
      {isAuthor && (<StaggeredDropDown setIsEditMode={setIsEditMode} />)}
      <Carousel itemData={itemData.image} />

      {/* Title */}
      <h1 className="text-2xl lg:text-4xl font-bold mb-2 mt-8">
        {itemData.title}
      </h1>

      {/* Posted Info */}
      <p className="text-gray-600 mb-2 italic">
        Posted by <span className="font-bold">{itemData.author?.name}</span>{" "}
        {getTimeAgo(itemData.createdAt)} ago
      </p>

      <hr className="my-6" />

      {/* Description */}
      <div className="flex flex-col gap-8 pt-2">
        <div className="flex flex-col gap-3">
          <h4 className="text-xl font-semibold">Description</h4>
          <div className="text-gray-600 whitespace-pre-wrap">
            {itemData?.content}
          </div>
          {itemData?.tags?.length > 0 && (
            <div className="flex items-start mt-4 gap-1">
              <Typography sx={{ color: "text.secondary", fontSize: "14px" }}>
                Tags:
              </Typography>
              <Tag data={itemData.tags} />
            </div>
          )}
        </div>
      </div>

      <hr className="my-6" />

      {/* Condition */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xl font-semibold">Condition</h4>
        <p className="text-gray-600">{itemCondition}</p>
      </div>

      <hr className="my-6" />

      {/* Contact */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xl font-semibold">Contact</h4>
        <a
          href={`tel:${itemData.contact_number}`}
          className="hover:bg-[var(--color-primary-content)] hover:text-white rounded text-[var(--color-primary-content)] bg-[var(--color-primary)] text-center w-full md:w-fit py-2 px-8 transition"
        >
          <CallIcon /> Call
        </a>
      </div>

      <hr className="my-6" />

      {/* Map */}
      <GoogleMap location={itemData.location} />

      <hr className="my-6" />

      {/* Author avatar card */}
      <div>
        <h4 className="text-xl font-semibold mb-2">Listed by:</h4>
        <UserAvatarCard userData={itemData?.author} />
      </div>
    </div>
  );
}
