"use client";
import { useRef, useState } from "react";
import { useFileUploadStore } from "@/stores/store";
import { redirect, useParams } from "next/navigation";
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

const Page = () => {
  const { userId } = useParams();
  const { imgFiles } = useFileUploadStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
    }
  };

  return (
    <div className="p-2">
      <ImageUploader ref={uploaderRef} />

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your title here..."
          className="w-full px-4 py-2 border-[1px] text-zinc-600 bg-transparent rounded-lg mt-4"
          required
        />

        <div className="mt-4 text-zinc-600 w-full">
          <QuillEditor
            value={content}
            onChange={setContent}
            toolbar={toolbar}
            placeholder="Type your description here..."
          />
        </div>

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

export default Page;
