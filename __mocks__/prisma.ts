import { PrismaClient } from '@prisma/client';

// Create a mock PrismaClient instance
const prismaMock = {
  user: {
    findMany: jest.fn().mockResolvedValue([{
      id: 'test-id',
      email: 'test@example.com',
      name: 'Test User',
      emailVerified: null,
      image: null,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      stripePriceId: null,
      stripeCurrentPeriodEnd: null
    }]),
    // Mock other methods if needed
  },
  // Mock other models if needed
} as unknown as PrismaClient;

export default prismaMock;
