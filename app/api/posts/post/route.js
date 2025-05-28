import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

  try {
    const response = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          include: {
            _count: {
              select: { posts: true }, // include the user's number of posts
            },
          },
        },
      },
    });

    if (!response) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

try {
  const response = await prisma.post.delete({
    where: { id: postId },
  });

  if (!response) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(response, { status: 200 });
} catch (error) {
  console.error("Error deleting post:", error);
  return NextResponse.json(
    { error: "Failed to delete post" },
    { status: 500 }
  );
}
}
