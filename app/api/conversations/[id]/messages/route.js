import { NextResponse } from 'next/server';
import prisma from '@/db/prismaClient';

// route to get messages for a specific conversation
export async function GET(_, { params }) {
  const { id } = params;

  const messages = await prisma.message.findMany({
    where: { conversationId: id },
    include: { sender: true },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json(messages);
}
