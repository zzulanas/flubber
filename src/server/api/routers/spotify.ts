/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import {
  getUserInfo,
  getUsersPlaylists,
  getUserTopArtists,
  getUserTopSongs,
  playSong,
} from "../../lib/spotify";
import { z } from "zod";

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
  getUserInfo: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    const res = await getUserInfo(user?.id);
    return res.body;
  }),
  getUserTopSongs: protectedProcedure
    .input(
      z.object({
        time_range: z.string(),
        limit: z.number(),
        offset: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
      const res = await getUserTopSongs(user?.id, input);
      return res.body;
    }),
  getUserTopArtists: protectedProcedure
    .input(
      z.object({
        time_range: z.string(),
        limit: z.number(),
        offset: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
      const res = await getUserTopArtists(user?.id, input);
      return res.body;
    }),
  // playSong a protectedProcedure that takes in a song id and plays it on the user's spotify account
  playSong: protectedProcedure
    .input(
      z.object({
        uri: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
      const res: boolean = await playSong(user?.id, input);
      return res;
    }),
});

export type SpotifyRouter = typeof spotifyRouter;
