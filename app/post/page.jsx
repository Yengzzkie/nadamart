"use client";
import { useRef, useState } from "react";
import { useFileUploadStore } from "@/stores/store";
import { redirect, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
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

const page = () => {
  const { imgFiles } = useFileUploadStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
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
        console.log(`${baseUrl}/${userId}/${fileName}`)
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
    }
  };

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit} className="mb-4 py-4">
        <label htmlFor="title" className="text-xl text-[var(--color-base-content)] mx-1">Post title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your title here..."
          className="w-full px-4 py-2 border-[1px] text-zinc-600 border-zinc-300 bg-transparent mt-2"
          required
        />

        <div className="my-8 text-zinc-600 w-full">
          <label htmlFor="title" className="text-xl text-[var(--color-base-content)] m-2">Description</label>
          <QuillEditor
            name="title"
            value={content}
            onChange={setContent}
            toolbar={toolbar}
            placeholder="Type your description here..."
          />
        </div>

        <label htmlFor="title" className="text-xl text-[var(--color-base-content)] m-2">Images</label>
        <ImageUploader ref={uploaderRef} />

        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--primary-dark)] text-[var(--color-primary-content)] rounded-sm"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default page;