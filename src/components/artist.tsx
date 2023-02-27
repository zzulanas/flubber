// Song component to be displayed on site
import React from "react";
import { type FC } from "react";

import Image from "next/image";
import { api } from "../utils/api";

interface ArtistProps {
  artistData: SpotifyApi.ArtistObjectFull;
}

const Artist: FC<ArtistProps> = (props: ArtistProps) => {
  const artistId = props.artistData.id;

  const playArtistTopSong = api.spotifyRouter.playArtistTopSong.useMutation();
  const handlePlaySong = (): void => {
    playArtistTopSong.mutate({ id: artistId, country: "US" });
  };

  return (
    <div>
      {props.artistData && (
        <div className="p-5">
          <div className="container card card-side bg-accent shadow-xl">
            <figure>
              {/* TODO: Fix Artist and Song component image rendering */}
              {props?.artistData.images[0] && (
                <Image
                  src={props?.artistData.images[0]?.url}
                  width={100}
                  height={100}
                  alt="Artist picture"
                />
              )}
            </figure>

            <div className="container flex">
              <div className="card-title p-5">
                <h1 className="text-black">{props.artistData.name}</h1>
              </div>
              <div className="card-actions justify-end self-center">
                <button className="btn-primary btn" onClick={handlePlaySong}>
                  Play Artist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artist;
