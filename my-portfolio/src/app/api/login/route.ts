import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. zod로 입력 검증하기
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: '형식이 올바르지 않습니다.', error: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // 2. DB 조회하기
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: '로그인 실패' }, { status: 400 });
    }

    // 3.JWT 발급
    const token = jwt.sign({ useId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return NextResponse.json({ token, name: user.name });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: '서버 에러 발생' }, { status: 500 });
  }
}
