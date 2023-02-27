import { type NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";
import Artist from "../components/artist";
import Song from "../components/song";
import { api } from "../utils/api";

enum TimeRange {
  long_term = "long_term",
  medium_term = "medium_term",
  short_term = "short_term",
}

enum TimeRangeDisplay {
  long_term = "All Time",
  medium_term = "Last 6 Months",
  short_term = "Last 4 Weeks",
}

const TimeRangeDisplayMap = {
  [TimeRange.long_term]: TimeRangeDisplay.long_term,
  [TimeRange.medium_term]: TimeRangeDisplay.medium_term,
  [TimeRange.short_term]: TimeRangeDisplay.short_term,
};

const Profile: NextPage = () => {
  const [userTimeRangeSongs, setUserTimeRangeSongs] = useState(
    TimeRange.long_term
  );
  const [userTimeRangeArtists, setUserTimeRangeArtists] = useState(
    TimeRange.long_term
  );
  const { data: userData } = api.spotifyRouter.getUserInfo.useQuery();
  const { data: userTopSongDataLongTerm } =
    api.spotifyRouter.getUserTopSongs.useQuery({
      time_range: TimeRange.long_term,
      limit: 5,
      offset: 0,
    });
  const { data: userTopSongDataMediumTerm } =
    api.spotifyRouter.getUserTopSongs.useQuery({
      time_range: TimeRange.medium_term,
      limit: 5,
      offset: 0,
    });
  const { data: userTopSongDataShortTerm } =
    api.spotifyRouter.getUserTopSongs.useQuery({
      time_range: TimeRange.short_term,
      limit: 5,
      offset: 0,
    });

  const { data: userTopArtistDataLongTerm } =
    api.spotifyRouter.getUserTopArtists.useQuery({
      time_range: TimeRange.long_term,
      limit: 5,
      offset: 0,
    });
  const { data: userTopArtistDataMediumTerm } =
    api.spotifyRouter.getUserTopArtists.useQuery({
      time_range: TimeRange.medium_term,
      limit: 5,
      offset: 0,
    });
  const { data: userTopArtistDataShortTerm } =
    api.spotifyRouter.getUserTopArtists.useQuery({
      time_range: TimeRange.short_term,
      limit: 5,
      offset: 0,
    });

  const userTopArtistsRangeMap = {
    [TimeRange.long_term]: userTopArtistDataLongTerm,
    [TimeRange.medium_term]: userTopArtistDataMediumTerm,
    [TimeRange.short_term]: userTopArtistDataShortTerm,
  };

  const userTopSongsRangeMap = {
    [TimeRange.long_term]: userTopSongDataLongTerm,
    [TimeRange.medium_term]: userTopSongDataMediumTerm,
    [TimeRange.short_term]: userTopSongDataShortTerm,
  };

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
        <div className="p-5">
          <h1 className="content-center pb-4 text-4xl font-bold text-white">
            howdy {userData?.display_name} 👋
          </h1>
          <h2 className="content-center text-2xl text-white">
            Spotify Followers {userData?.followers?.total}
          </h2>
          <h2 className="content-center text-2xl text-white">
            hope you have a great day!
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 p-10">
        {/* TODO: Make component for dropdown */}
        {userTopSongsRangeMap[userTimeRangeSongs] && (
          <div>
            <h1 className="text-bold text-4xl text-white">
              Top Songs from
              <div className="dropdown">
                <a
                  tabIndex={0}
                  className="m-1 pl-1 text-accent hover:cursor-pointer hover:text-amber-600"
                >
                  {TimeRangeDisplayMap[userTimeRangeSongs]}
                </a>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
                >
                  {Object.values(TimeRange).map((timeRange) => {
                    return (
                      <li
                        key={timeRange}
                        onClick={() => {
                          setUserTimeRangeSongs(timeRange);
                        }}
                        className="text-accent hover:text-amber-600"
                      >
                        <a>{TimeRangeDisplayMap[timeRange]}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </h1>
            {userTopSongsRangeMap[userTimeRangeSongs]?.items.map((song) => {
              return <Song key={song.id} songData={song} />;
            })}
          </div>
        )}
        {userTopArtistsRangeMap[userTimeRangeArtists] && (
          <div>
            <h1 className="text-bold text-4xl text-white">
              Top Artists from{" "}
              <div className="dropdown">
                <a
                  tabIndex={0}
                  className="m-1 pl-1 text-accent hover:cursor-pointer hover:text-amber-600"
                >
                  {TimeRangeDisplayMap[userTimeRangeArtists]}
                </a>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
                >
                  {Object.values(TimeRange).map((timeRange) => {
                    return (
                      <li
                        key={timeRange}
                        onClick={() => {
                          setUserTimeRangeArtists(timeRange);
                        }}
                        className="text-accent hover:text-amber-600"
                      >
                        <a>{TimeRangeDisplayMap[timeRange]}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </h1>
            {userTopArtistsRangeMap[userTimeRangeArtists]?.items.map(
              (artist) => {
                return <Artist key={artist.id} artistData={artist} />;
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
