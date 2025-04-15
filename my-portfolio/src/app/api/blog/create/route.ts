import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const authUser = verifyToken(req);
  if (!authUser) {
    return NextResponse.json(
      { message: '인증되지 않은 사용자입니다.' },
      { status: 401 }
    );
  }
  const { title, content } = await req.json();

  if (!title || !content) {
    return NextResponse.json(
      { message: '제목과 내용을 모두 입력하세요.' },
      { status: 400 }
    );
  }

  const post = await prisma.blogPost.create({
    data: {
      title,
      content,
      userId: authUser.userId,
    },
  });

  return NextResponse.json({ message: '글 작성 완료:', post });
}
