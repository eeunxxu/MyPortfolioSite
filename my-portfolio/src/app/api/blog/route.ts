import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client/extension';

const prisma = PrismaClient();

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { name: true } },
      _count: { select: { comments: true, likes: true } },
    },
  });

  return NextResponse.json({ posts });
}
