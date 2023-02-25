// Song component to be displayed on site
import React from "react";
import { type FC } from "react";

import Image from "next/image";
import Link from "next/link";

interface ArtistProps {
  artistData: SpotifyApi.ArtistObjectFull;
}

const Artist: FC<ArtistProps> = (props: ArtistProps) => {
  console.log(props.artistData);
  return (
    <div>
      {props.artistData && (
        <div className="p-5">
          <div className="container card card-side bg-base-100 shadow-xl">
            <figure>
              {props?.artistData.images[0] && (
                <Image
                  src={props?.artistData.images[0]?.url}
                  width={100}
                  height={100}
                  alt="Artist picture"
                />
              )}
            </figure>

            <div className="container flex bg-accent">
              <div className="card-title">
                <h1 className="text-black">{props.artistData.name}</h1>
              </div>
              <div className="card-actions justify-end">
                <Link href={props.artistData.uri}>
                  <button className="btn-primary btn">Play Song</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artist;
