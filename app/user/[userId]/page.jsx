"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Simulate fetching user data (replace with real API call)
const fetchUserData = async (userId) => {
  await new Promise((res) => setTimeout(res, 500)); // simulate delay

  return {
    id: userId,
    avatar: "https://i.pravatar.cc/150?img=12",
    fullName: "John Doe",
    city: "Toronto",
    province: "ON",
    joinDate: "January 2023",
    listingsCount: 5,
    verified: true,
  };
};

export default function ProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchUserData(userId).then(setUser);
    }
  }, [userId]);

  if (!user) {
    return <div className="p-6 text-center text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <div className="flex items-center space-x-6">
        <img
          src={user.avatar}
          alt="User Avatar"
          width={96}
          height={96}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.fullName}</h1>
          <p className="text-sm text-gray-600">
            {user.city}, {user.province}
          </p>
          <p className="text-sm text-gray-500">Member since {user.joinDate}</p>
          {user.verified && (
            <p className="text-green-600 text-sm font-medium">Verified</p>
          )}
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">Listings</h2>
        <p className="text-sm text-gray-700">
          {user.listingsCount} active listing{user.listingsCount !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
