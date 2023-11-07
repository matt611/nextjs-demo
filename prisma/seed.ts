import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) return 'FAILED TO SEED DB: No admin password';

  const adminPassword = await hash(password, 10);

  const admin: User = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      password: adminPassword,
      role: 'admin',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });