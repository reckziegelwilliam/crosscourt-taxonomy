import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create a verified user
  const user = await prisma.user.create({
    data: {
      email: 'crosscourt@pilight.io',
      name: 'Liam Reckziegel',
      emailVerified: new Date(),
      // Additional fields can be added here
    },
  });

  // Create an account linked to the user (if applicable)
  await prisma.account.create({
    data: {
      userId: user.id,
      type: 'email',
      provider: 'email',
      providerAccountId: 'crosscourt@pilight.io',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create a verification token for the user
  await prisma.verificationToken.create({
    data: {
      identifier: 'crosscourt@pilight.io',
      token: bcrypt.hashSync('random-verification-token', 10), // use a hash for the token
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // expires in 24 hours
    },
  });

  console.log('Seeding finished.');
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


// This line may not be necessary if using pure ES modules
export {};
