import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createAt: 'desc' },
      include: {
        user: { select: { name: true } },
        _count: { select: { comments: true, likes: true } },
      },
    });

    return NextResponse.json({ success: true, response: { posts } });
  } catch (err) {
    console.error('서버 에러 발생:', err);
    return NextResponse.json(
      {
        success: false,
        error: { message: '서버에러 발생', code: 500 },
      },
      { status: 500 }
    );
  }
}
