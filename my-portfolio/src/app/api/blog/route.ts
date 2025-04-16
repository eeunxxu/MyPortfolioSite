import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createAt: 'desc' },
    include: {
      user: { select: { name: true } },
      _count: { select: { comments: true, likes: true } },
    },
  });

  return NextResponse.json({ posts });
}
