"use client";

import ListingCard from "@/app/components/ListingCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/app/components/ui/Loader";
import Link from "next/link";
import axios from "axios";
import BackButton from "@/app/components/ui/BackButton";
import UserAvatarCard from "@/app/components/UserAvatarCard";

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
        <div className="lg:sticky top-40 w-full lg:w-3xl lg:max-w-3xl max-h-fit mx-auto bg-white shadow-md lg:rounded-lg">
          <UserAvatarCard userData={user} />
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
