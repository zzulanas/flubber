/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { getUsersPlaylists } from "../../lib/spotify";

export const spotifyRouter = createTRPCRouter({
  getPlaylists: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    const res = await getUsersPlaylists(user?.id);
    return res;
  }),
});
