import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

// 글 상세 조회
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const postId = Number(params.id);

  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
    include: {
      user: { select: { name: true } },
      comments: true,
      likes: true,
    },
  });

  if (!post) {
    return NextResponse.json(
      { message: '게시글을 찾을 수 없습니다.' },
      { status: 404 }
    );
  }

  return NextResponse.json({ post });
}

// 글 수정
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = verifyToken(req);
  if (!authUser) {
    return NextResponse.json(
      { message: '인증되지 않은 사용자입니다.' },
      { status: 401 }
    );
  }

  const postId = Number(params.id);
  const { title, content } = await req.json();

  // 유효성 검사
  if (!title || !content) {
    return NextResponse.json(
      { message: '제목과 내용을 모두 입력하세요.' },
      { status: 400 }
    );
  }

  //   내글인지 확인
  const existingPost = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!existingPost) {
    return NextResponse.json(
      { message: '존재하지 않는 게시글입니다.' },
      { status: 404 }
    );
  }

  if (existingPost.userId !== authUser.userId) {
    return NextResponse.json(
      { message: '작성자만 수정할 수 있습니다.' },
      { status: 403 }
    );
  }

  //   수정하기
  const updatedPost = await prisma.blogPost.update({
    where: { id: postId },
    data: { title, content },
  });

  return NextResponse.json({
    message: '게시글이 성공적으로 수정되었습니다.',
    post: updatedPost,
  });
}
