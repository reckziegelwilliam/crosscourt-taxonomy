// Import the mock PrismaClient
import prismaMock from '../__mocks__/prisma';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));

test('should fetch users', async () => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  expect(users).toEqual([{
    id: 'test-id',
    email: 'test@example.com',
    name: 'Test User',
    emailVerified: null,
    image: null,
    stripeCustomerId: null,
    stripeSubscriptionId: null,
    stripePriceId: null,
    stripeCurrentPeriodEnd: null
  }]);
});

afterAll(async () => {
  // await prismaMock.$disconnect();
});
