import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  getArtistsTopTracks,
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
  playArtistTopSong: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        country: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
      const res = await getArtistsTopTracks(user?.id, input);
      playSong(user?.id, { uri: res.body.tracks[0]?.uri });
    }),
});

export type SpotifyRouter = typeof spotifyRouter;
