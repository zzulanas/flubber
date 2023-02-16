/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { getUsersPlaylists } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import { prisma } from "@prisma/client";


export const spotifyRouter = createTRPCRouter({
    getPlaylists: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
      const res = await getUsersPlaylists(user?.id)
      return res;
    })
})
