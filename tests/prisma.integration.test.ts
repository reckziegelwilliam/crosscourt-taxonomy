import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'mysql://root:root@127.0.0.1:3309/crosscourt_db_test',
    },
  },
});

beforeAll(async () => {
  // Ensure database is in a known state
  await prisma.user.create({
    data: {
      id: 'test-id',
      email: 'test@example.com',
      name: 'Test User',
    },
  });
});

test('should fetch users from test database', async () => {
  const users = await prisma.user.findMany();
  expect(users).toEqual([
    expect.objectContaining({
      id: 'test-id',
      email: 'test@example.com',
      name: 'Test User',
      emailVerified: null,
      image: null,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      stripePriceId: null,
      stripeCurrentPeriodEnd: null
    })
  ]);
});

afterAll(async () => {
  // Clean up the database
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});
