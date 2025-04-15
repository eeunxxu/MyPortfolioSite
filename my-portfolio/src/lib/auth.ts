import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function verifyToken(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };
    return decoded;
  } catch (err) {
    console.error('비정상적 접근. 토큰 없음:', err);
    return null;
  }
}
