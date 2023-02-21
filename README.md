# flubber 🧽

listen to Spotify with your friends! 🕺💃

track your listening stats 🎧

tell your friends their music taste sucks 😈

view prod site: https://flubber-three.vercel.app/

## Get Started

- Create a `.env` file with credentials for Spotify (look at `.env.example`)
- Generate a Prisma Schema and hook up to your preferred DB
- `npm run dev` should start your dev server on `localhost:3000`
- `npx prisma studio` should give you a view of your DB through Prisma
- Login with your Spotify account and have fun!

## Vercel Preview

In order to preview the website on Vercel, merge your changes into the `preview` branch and access the page at

## Linting/Formatting

This project uses Husky to run pre-commit linting and formatting for every commit. check out `.husky/pre-commit/.sh` to see what's run before every commit.

## Contributing

In order to contribute:

1. Create an issue with the appropriate tag
   1. (feature) for new features
   2. (bug) to fix a bug
2. Create a branch relate to issue (can be auto created in issue creator on bottom right)
3. Code up your feature
4. Push up your branch and make a PR
5. wait for our lord and savior's approval/merge (pls request from @zzulanas)

## Learn More

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
