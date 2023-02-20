/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import Sidebar from "./components/sidebar";
import { useContext, useState } from "react";
import { useTheme } from "./components/theme";
import { theme_transition } from "../styles/global-vars";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const {data: spotify} = api.spotify.getPlaylists.useQuery()
  const playlists: SpotifyApi.PlaylistObjectSimplified[] | undefined = spotify?.body.items;
  const {themeType, setCurrentTheme} = useTheme(); 
  const playlistElements = playlists?.map((item: SpotifyApi.PlaylistObjectSimplified) => {
    return (
      <li key={item.id} className="text-white">{item.name}</li>
    )
  })
  return (
    <>
      <Head>
        <title>flubber</title>
        <meta name="description" content="flub ur music" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={theme_transition} data-theme={themeType}>


        <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={themeType == "forest" ? () => setCurrentTheme?.("aqua") : () => setCurrentTheme?.("forest")}
      >
        TEST
      </button>
    
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
        
      
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
