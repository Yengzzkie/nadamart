import { NextResponse } from 'next/server';
import prisma from '@/db/prismaClient';

// route for creating and/or retrieiving a conversation between two users
export async function POST(request) {
  const { participantIds } = await request.json(); // Array of 2 user IDs
  const [userA, userB] = participantIds;

  // Sort to ensure consistent order
  const sortedIds = [...participantIds].sort();

  // Check if conversation already exists
  const existing = await prisma.conversation.findFirst({
    where: {
      participants: {
        every: {
          userId: { in: sortedIds },
        },
      },
    },
    include: {
      participants: { include: { user: true } },
    },
  });

  if (existing) {
    return NextResponse.json(existing);
  }

  // Create new conversation
  const conversation = await prisma.conversation.create({
    data: {
      participants: {
        create: sortedIds.map((id) => ({ userId: id })),
      },
    },
    include: {
      participants: { include: { user: true } },
    },
  });

  return NextResponse.json(conversation);
}
