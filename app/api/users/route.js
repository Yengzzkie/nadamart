import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const response = await prisma.user.findMany();

    console.log(response);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name, email, password, location, avatar } = await request.json();

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        location,
        avatar,
      },
    });

    console.log("User created:", name);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
