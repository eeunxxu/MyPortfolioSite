import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Kangkes0808!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'kes2450@gmail.com' },
    update: {},
    create: {
      email: 'kes2450@gmail.com',
      name: '은수',
      password: hashedPassword,
    },
  });
  console.log('관리자 계정 생성 완료:', admin);
}

main()
  .catch((e) => {
    console.error('오류 발생:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
