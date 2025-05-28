"use client";
import Rating from '@mui/material/Rating';
import Link from 'next/link';

export default function UserAvatarCard({ userData }) {

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <div className="flex items-center space-x-6">
        <Link href={`/user/${userData?.id}`}>
          <img
            src={userData?.avatar}
            alt="User Avatar"
            width={96}
            height={96}
            className="rounded-full"
          />
        </Link>
        <div>
          <Link href={`/user/${userData?.id}`}>
            <h1 className="text-2xl font-bold">{userData?.name}</h1>
          </Link>
          <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
          <p className="text-sm text-gray-500">Member since {new Date(userData?.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
          {
            <p className="text-green-600 text-sm font-medium">Verified</p>
          }
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">Listings</h2>
        <p className="text-sm text-gray-700">
          {userData?._count?.posts} active listing{userData?._count?.posts > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
