import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { getUsersPlaylists } from "../../../lib/spotify";
import { getSession } from "next-auth/react";


// const spotifyRouter = createTRPCRouter({
//     getPlaylists: protectedProcedure.query(({ ctx }) => {
//       const {
//         token: {accessToken}
//       } = getSession({ctx})
//       return getUsersPlaylists(session)
//     })
// })