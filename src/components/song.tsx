// Song component to be displayed on site
import React from "react";
import { type FC } from "react";

import Image from "next/image";
import Link from "next/link";
import ReactAudioPlayer from "react-audio-player";

interface SongProps {
  songData: SpotifyApi.TrackObjectFull;
}

const Song: FC<SongProps> = (props: SongProps) => {
  return (
    <div>
      {props.songData && (
        <div className="p-5">
          {props.songData?.preview_url && (
            <ReactAudioPlayer src={props.songData?.preview_url} />
          )}

          <div className="container card card-side bg-base-100 shadow-xl">
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

            <div className="container flex bg-accent">
              <Link href={props.songData.uri} className="card-title">
                <h1 className="">{props.songData.name}</h1>
              </Link>
              <div className="card-actions justify-end">
                <button className="btn-primary btn">Watch</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Song;
