import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

console.log('PRISMA SEED');
async function main() {
  console.log('Running main');
  const password = process.env.ADMIN_PASSWORD;

  if (!password) return 'FAILED TO SEED DB: No admin password';

  const adminPassword = await hash(password, 10);
  console.log('INSERT AN ADMIN');
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
  console.log('DONE');
  console.log({ admin });
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