/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../env/server.mjs";
import { prisma } from "./db";
import { LOGIN_URL, spotifyApi } from "./lib/spotify.js";
import { json } from "stream/consumers";
import { Session } from "next-auth/core/types.js";

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      accessToken: string;
      refreshToken: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface JWT {
    access_token: string;
    expires_at: number
    refresh_token: string;
    error?: "RefreshAccessTokenError"
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      const accessTokenRefresh = await refreshAccessToken(session)
      if(accessTokenRefresh){
        session.user.accessToken = accessTokenRefresh?.access_token ? accessTokenRefresh?.access_token : session.user.accessToken
      }
      session.user.id = user.id;
      return session;
    },
    jwt({token, account}) {
      if (account) {
        token.accessToken = refreshAccessToken
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     **/
  ],
  secret: process.env.JWT_SECRET,
};

async function refreshAccessToken(newSession: Session) : Promise<{ access_token: string | null; refresh_token: string | null | undefined; } | undefined> {
  try {
    const userAccount = await prisma.account.findFirst({
      where: { userId: newSession.user.id },
    });


    if (userAccount?.expires_at) {
      if ((Date.now()/1000) < userAccount?.expires_at) {
        console.log(`Token not refreshed for user ${userAccount.id}`)
        console.log(`Token expires at ${userAccount.expires_at}`)
        return {
          access_token: userAccount.access_token,
          refresh_token: userAccount.refresh_token,
        };
      }
    }

    const refresh_token = userAccount?.refresh_token;
    if (refresh_token){
      spotifyApi.setRefreshToken(refresh_token)
    }
    const access_response = await spotifyApi.refreshAccessToken()

    if (!(access_response.statusCode == 200)) {
      console.error("Error refreshing auth token")
    }


    await prisma.account.update({
      where: { id: userAccount?.id },
      data: {
        refresh_token: access_response.body.refresh_token ?? refresh_token,
        access_token: access_response.body.access_token,
        expires_at: Math.floor(new Date().getTime() / 1000) + 3600
      },
    });
    
    if(userAccount?.id && userAccount?.expires_at){
      console.log(`Token refreshed for user ${userAccount.id}`)
      console.log(`Token expires at ${userAccount.expires_at}`)
    }
  
    const response: { access_token: string | null; refresh_token: string | null| undefined; } ={
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      access_token: access_response.body.access_token ?? refresh_token,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      refresh_token: access_response.body.refresh_token ? access_response.body.refresh_token : refresh_token
    }

    return new Promise((resolve) => {
      resolve(response)
    })
  } catch (error) {
    console.log(error);
  }
  return new Promise((resolve) => {
    resolve(undefined)
  })
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
