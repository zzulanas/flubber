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

// Get User Info
export const getUserInfo = async (id) => {
  const account = await getUserAccountFromId(id);
  spotifyApi.setAccessToken(account.access_token);
  const data = spotifyApi.getUser(account.providerAccountId);
  return data;
};

// Get User top songs
export const getUserTopSongs = async (id, options) => {
  const account = await getUserAccountFromId(id);
  spotifyApi.setAccessToken(account.access_token);
  const data = spotifyApi.getMyTopTracks(options);
  return data;
};

// Get User Top Albums
export const getUserTopArtists = async (id, options) => {
  const account = await getUserAccountFromId(id);
  spotifyApi.setAccessToken(account.access_token);
  const data = spotifyApi.getMyTopArtists(options);
  return data;
};

// Add item to playback queue then skip to next song to play it
export const playSong = async (id, options) => {
  const account = await getUserAccountFromId(id);
  spotifyApi.setAccessToken(account.access_token);
  const addItemData = await fetch(
    `https://api.spotify.com/v1/me/player/queue?uri=${options.uri}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${account.access_token}`,
      },
    }
  );

  const skipData = await fetch("https://api.spotify.com/v1/me/player/next", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${account.access_token}`,
    },
  });

  if (skipData.status === 204 && addItemData.status === 204) {
    return true;
  }
  return false;
};
