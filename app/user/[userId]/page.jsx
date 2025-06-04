"use client";

import ListingCard from "@/app/components/ListingCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/app/components/ui/Loader";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import axios from "axios";
import BackButton from "@/app/components/ui/BackButton";

export default function ProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  async function fetchUserData() {
    try {
      const response = await axios.get(`/api/users/user?userId=${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (!user) {
    return (
      <Loader />
    );
  }

  return (
    <div className="pt-4">
      <BackButton />
      <div className="flex flex-col lg:flex-row gap-4">
        {/* USER AVATAR */}
        <div className="lg:sticky top-40 w-full lg:w-3xl lg:max-w-3xl max-h-fit mx-auto p-6 bg-white shadow-md lg:rounded-lg">
          <div className="flex items-center space-x-6">
            <img
              src={user.avatar}
              alt="User Avatar"
              width={96}
              height={96}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <Rating
                name="half-rating-read"
                defaultValue={3.5}
                precision={0.5}
                readOnly
              />
              <p className="text-sm text-gray-500">
                Member since{" "}
                {new Date(user?.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              {user.verified && (
                <p className="text-green-600 text-sm font-medium">Verified</p>
              )}
            </div>
          </div>
          <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-semibold mb-2">Listings</h2>
            <p className="text-sm text-gray-700">
              {user.posts.length} active listing
              {user.posts.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        {/* LISTING CARDS */}
        <div>
          {user?.posts?.map((post) => (
            <Link
              href={`/item-details/${post.id}`}
              key={post.id}
              className="block"
            >
              <ListingCard postData={post} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
