import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// 글 상세 조회
export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();
  const postId = Number(id);

  try {
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
        {
          success: false,
          error: { message: '게시글을 찾을 수 없습니다.' },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch (err) {
    console.error('글 조회 에러:', err);
    return NextResponse.json(
      { success: false, error: { message: '글 조회 중 서버 오류가 발생' } },
      { status: 500 }
    );
  }
}

// 글 수정
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    const postId = Number(id);
    const authUser = await verifyToken(req);
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: { message: '인증되지 않은 사용자입니다.' } },
        { status: 401 }
      );
    }

    const { title, content } = await req.json();

    // 유효성 검사
    if (!title || !content) {
      return NextResponse.json(
        {
          success: false,
          error: { message: '제목과 내용을 모두 입력하세요.' },
        },
        { status: 400 }
      );
    }

    //   내글인지 확인
    const existingPost = await prisma.blogPost.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return NextResponse.json(
        {
          success: false,
          error: { message: '존재하지 않는 게시글입니다.' },
        },
        { status: 404 }
      );
    }

    if (existingPost.userId !== authUser.userId) {
      return NextResponse.json(
        {
          success: false,
          error: { message: '작성자만 수정할 수 있습니다.' },
        },
        { status: 403 }
      );
    }

    //   수정하기
    const updatedPost = await prisma.blogPost.update({
      where: { id: postId },
      data: { title, content },
    });

    return NextResponse.json({
      success: true,
      response: {
        message: '게시글이 성공적으로 수정되었습니다.',
        post: updatedPost,
      },
    });
  } catch (err) {
    console.error('게시글 수정 오류:', err);
    return NextResponse.json(
      { success: false, error: { message: '게시글 수정 중 서버 오류 발생' } },
      { status: 500 }
    );
  }
}

// 글 삭제
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    const postId = Number(id);
    const authUser = await verifyToken(req);
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: { message: '인증되지 않은 사용자입니다.' } },
        { status: 401 }
      );
    }

    // 게시글 존재 확인
    const existingPost = await prisma.blogPost.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: { message: '존재하지 않는 게시글입니다.' } },
        { status: 404 }
      );
    }

    // 본인 글인지 확인
    if (existingPost.userId !== authUser.userId) {
      return NextResponse.json(
        { success: false, error: { message: '작성자만 삭제할 수 있습니다.' } },
        { status: 403 }
      );
    }

    // 삭제하기
    await prisma.blogPost.delete({
      where: { id: postId },
    });

    return NextResponse.json({
      success: true,
      response: {
        message: '게시글이 성공적으로 삭제되었습니다.',
      },
    });
  } catch (err) {
    console.error('게시글 삭제 중 오류:', err);
    return NextResponse.json(
      { success: false, error: { message: '서버 오류가 발생했습니다.' } },
      { status: 500 }
    );
  }
}
