// Song component to be displayed on site
import React from "react";
import { type FC } from "react";

import Image from "next/image";
import { api } from "../utils/api";

interface SongProps {
  songData: SpotifyApi.TrackObjectFull;
}

const Song: FC<SongProps> = (props: SongProps) => {
  const playSong = api.spotifyRouter.playSong.useMutation();

  const handlePlaySong = (): void => {
    const uri = props.songData.uri;
    playSong.mutate({ uri });
  };
  return (
    <div>
      {props.songData && (
        <div className="p-5">
          <div className="container card card-side bg-accent shadow-xl">
            <figure>
              {props?.songData.album.images[0] && (
                <Image
                  src={props?.songData.album.images[0]?.url}
                  width={100}
                  height={100}
                  alt="Album cover"
                />
              )}
            </figure>

            <div className="container flex">
              <div className="card-title p-5">
                <span className="font-bold text-black">
                  {props.songData.name} -{" "}
                  <span className="font-normal">
                    {props?.songData.artists[0]?.name}
                  </span>
                </span>
              </div>
              <div className="card-actions justify-end self-center">
                <button className="btn-primary btn" onClick={handlePlaySong}>
                  Play Song
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Song;
