/* eslint-disable camelcase */
import SpotifyWebApi from "spotify-web-api-node";
import { prisma } from "../db";

export const scopes = [
  "user-read-email",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-modify-playback-state",
  "streaming",
  "playlist-read-private",
  "user-follow-modify",
  "playlist-read-collaborative",
  "user-follow-read",
  "user-read-currently-playing",
  "user-read-playback-position",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-top-read",
  "user-read-recently-played",
  "user-library-read",
].join(",");

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`;

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Get User Access Token from DB
const getUserAccountFromId = async (id) => {
  const res = await prisma.account.findFirst({
    where: {
      userId: id,
    },
  });
  return res;
};

// Get User Playlists
export const getUsersPlaylists = async (id) => {
  const account = await getUserAccountFromId(id);
  spotifyApi.setAccessToken(account.access_token);
  const data = spotifyApi.getUserPlaylists();
  return data;
};
