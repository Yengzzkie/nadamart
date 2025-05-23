import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export async function GET(_request) {
  try {
    const response = await prisma.post.findMany({
      include: { author: true }
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { authorId, title, content, location, image } = await request.json();

    const newPost = await prisma.post.create({
      data: { authorId, title, content, location, image },
    });

    console.log(newPost);

    return NextResponse.json(
      {
        message: "Post created successfully",
        post: newPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error({ error });
    return NextResponse.json(
      { message: "Failed to create post", error: error.message },
      { status: 500 }
    );
  }
}
