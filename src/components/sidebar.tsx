// Sidebar component for main page
import type { FC } from "react";
import { theme_transition } from "../styles/global-vars";
import { api } from "../utils/api";
import Avatar from "./avatar";

const Sidebar: FC = () => {
  const { data: spotify } = api.spotify.getPlaylists.useQuery();
  const playlists: SpotifyApi.PlaylistObjectSimplified[] | undefined =
    spotify?.body.items;
  const playlistElements = playlists?.map(
    (item: SpotifyApi.PlaylistObjectSimplified) => {
      return (
        <li className="text-2xl text-white" key={item.id}>
          <a href={item.external_urls.spotify}>{item.name}</a>
        </li>
      );
    }
  );

  return (
    <div className={`drawer-side ${theme_transition}`}>
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu w-80 bg-base-100 p-4 text-base-content">
        <li>
          <Avatar />
        </li>
        <div className="divider"></div>
        {playlistElements}
      </ul>
    </div>
  );
};

export default Sidebar;
