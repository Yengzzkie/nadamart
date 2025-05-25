"use client";
import { useRef, useState } from "react";
import { useFileUploadStore } from "@/stores/store";
import { redirect, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import ImageUploader from "@/app/components/ImageUploader";
import QuillEditor from "@/app/components/QuillEditor";

const toolbar = [
  [{ size: ["small", false, "large", "huge"] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  ["link"],
  [{ list: "bullet" }],
];

const Page = () => {
  const { userId } = useParams();
  const { imgFiles } = useFileUploadStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const uploaderRef = useRef(null);
  const session = useSession();

  if (session.status === "unauthenticated") {
    redirect("/login")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const baseUrl = "https://crtvgenbjflrgxtjpdwz.supabase.co/storage/v1/object/public/images";
      const fullUrls = imgFiles.map((file) => {
        const fileName = typeof file === "string" ? file : file.name;
        return `${baseUrl}/${userId}/${fileName}`;
      });

      const formData = {
        authorId: userId,
        title,
        content,
        location: { city: "Oshawa", country: "Canada" },
        image: fullUrls,
      };

      await axios.post("/api/posts", formData);
      await uploaderRef.current?.onUpload();

    } catch (error) {
      console.error("Error uploading post:", error);
    } finally {
      setTitle("");
      setContent("");
      setIsSuccess(true);
      setTimeout(() => {
        redirect("/")
      }, 2000)
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-start gap-6 p-8 h-[75vh]">
        <CheckBadgeIcon className="text-green-500 w-12 h-12" />
        <p className="text-[var(--color-base-content)]">Ad posted successfully!</p>
      </div>
    )
  }

  return (
    <div className="lg:p-8 p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-2xl font-semibold text-zinc-600">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your title here..."
            className="w-full px-4 py-2 border-[1px] border-zinc-300 text-zinc-600 bg-transparent"
            required
          />
        </div>

        <div className="flex flex-col gap-2 my-6">
          <label htmlFor="title" className="text-zinc-600 text-2xl font-semibold">Description</label>
          <QuillEditor
            value={content}
            onChange={setContent}
            toolbar={toolbar}
            placeholder="Type your description here..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-2xl font-semibold text-zinc-600">Images</label>
          <ImageUploader ref={uploaderRef} />
        </div>

        <button
          type="submit"
          className="mt-3 ml-auto block px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-content)] text-[var(--color-primary-content)] hover:text-white rounded-sm w-full cursor-pointer"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default Page;
