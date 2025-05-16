import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const response = await prisma.post.findMany();

        console.log(response);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
        
    }
}