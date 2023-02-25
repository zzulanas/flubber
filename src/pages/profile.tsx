import { type NextPage } from "next";
import Image from "next/image";
import React from "react";
import Artist from "../components/artist";
import Song from "../components/song";
import { api } from "../utils/api";

const Profile: NextPage = () => {
  const { data: userData } = api.spotifyRouter.getUserInfo.useQuery();
  const { data: userTopSongData } = api.spotifyRouter.getUserTopSongs.useQuery({
    time_range: "medium_term",
    limit: 5,
    offset: 0,
  });
  // TODO: add this functionality
  const { data: userTopArtistData } =
    api.spotifyRouter.getUserTopArtists.useQuery({
      time_range: "medium_term",
      limit: 5,
      offset: 0,
    });
  return (
    <div className="container overflow-auto">
      <div className="container flex items-center p-10">
        {userData?.images && (
          <Image
            src={userData?.images[0]?.url as string}
            alt="User profile image"
            height={200}
            width={200}
            className="rounded-full"
          ></Image>
        )}

        <h1 className="content-center p-10 text-4xl font-bold text-white">
          {userData?.display_name}
        </h1>
      </div>

      <div className="grid grid-cols-2 p-10">
        {userTopSongData && (
          <div>
            <h1 className="text-bold text-4xl text-white">Top Songs</h1>
            {userTopSongData.items.map((song) => {
              return <Song key={song.id} songData={song} />;
            })}
          </div>
        )}
        {userTopArtistData && (
          <div>
            <h1 className="text-bold text-4xl text-white">Top Artists</h1>
            {userTopArtistData.items.map((artist) => {
              return <Artist key={artist.id} artistData={artist} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
