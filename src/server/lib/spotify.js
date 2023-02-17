import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import SpotifyWebApi from 'spotify-web-api-node';
import { prisma } from '../db';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id || "NONE"}:ß${client_secret || "NONE"}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';

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
}

const queryParamString = new URLSearchParams(params);

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Get User Access Token from DB
const getUserAccountFromId = async (id) => {
      const res = await prisma.account.findFirst({
        where: {
          userId: id
        },
      }
    )
    console.log("RES". res)
    return res
  };


// Get User Playlists 
export const getUsersPlaylists = async (id) => {
  const account = await getUserAccountFromId(id);
  spotifyApi.setAccessToken(account.access_token)
  const data = spotifyApi.getUserPlaylists()
  return data;
};

