# CrossCourt Tournament Management

A robust and open-source platform for managing tournaments, leveraging the latest in Next.js, server components, and modern web technologies.

> **Note**
> This application is currently in development. Stay updated on our progress via Twitter [@crosscourt_app](https://x.com/Crosscourt24551).
> Check out the roadmap below for upcoming features.

## About this Project

CrossCourt Tournament Management aims to provide a comprehensive solution for organizing and managing tournaments, including features like team management, match scheduling, bracket generation, and detailed statistics.

**This is not just a template.**

While the project is tailored for tournament management, the structure and components can serve as a reference for similar applications.

## Performance Notice

> **Note**
> This application utilizes the latest versions of Next.js 13 and React 18, which are still evolving. Some performance issues may arise during testing.
> **Expect possible performance variations when using the application**.
> If you encounter any issues, feel free to report them [@crosscourt_app](https://x.com/Crosscourt24551).

## Features

- New Next.js `/app` directory
- Dynamic Routing, Layouts, Nested Layouts, and Layout Groups
- Data Fetching, Caching, and Mutation handling
- Loading UI for improved user experience
- Custom Route Handlers
- Comprehensive Metadata Management
- Server and Client Components
- API Routes and Middleware integration
- User Authentication using **NextAuth.js**
- Database interactions using **Prisma**
- Hosted Database on **PlanetScale**
- UI Components with **Radix UI**
- Documentation and Blog powered by **MDX** and **Contentlayer**
- Subscription management using **Stripe**
- Styling with **Tailwind CSS**
- Data Validation using **Zod**
- Written in **TypeScript**

## Roadmap

- [x] ~Basic tournament creation and management~
- [x] ~User registration and authentication~
- [x] ~Team management functionalities~
- [x] ~Match scheduling automation~
- [x] ~Bracket generation and management~
- [x] ~Statistics tracking and reporting~
- [x] ~Responsive design for various devices~
- [ ] Integration with external calendar APIs for scheduling
- [ ] Advanced notification systems

## Known Issues

Current limitations and ongoing fixes:

1. ~OAuth issues with third-party providers (use email login)~
2. ~[Prisma: File not found errors in serverless environments](https://github.com/prisma/prisma/issues/16117)~
3. ~[Next.js 13: Client navigation not updating `<head>` tags correctly](https://github.com/vercel/next.js/issues/42414)~
4. [Challenges with catch-all routes and image handling](https://github.com/vercel/next.js/issues/48162)

## Why Not tRPC or Turborepo?

We focus on leveraging Next.js to its full potential. Future iterations might explore additional tools based on feedback and evolving needs.

Suggestions are welcome—please create an issue if you have ideas!

## Running Locally

To set up and run the application locally:

1. Install dependencies using pnpm:

   ```sh
   pnpm install
   ```

2. Copy `.env.example` to `.env.local` and configure the environment variables:

   ```sh
   cp .env.example .env.local
   ```

3. Start the development server:

   ```sh
   pnpm dev
   ```

4. Seed the database with initial data:

   ```sh
   pnpm seed
   ```

## License

Licensed under the [MIT license](https://github.com/your-repo/crosscourt-taxonomy/blob/main/LICENSE.md).