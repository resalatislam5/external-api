import { createStore, persist } from "easy-peasy";
import playListModel from "./model/playListModel";
import favoritePlayListModel from "./model/favoritePlayListModel";
import recentPlayListModel from "./model/recentPlayListModel";
import currentVideoInfoModel from "./model/currentVideoInfo";

const store = createStore(
  persist(
    {
      youtubePlayLists: playListModel,
      favoriteLists: favoritePlayListModel,
      recentPlayLists: recentPlayListModel,
      currentVideoInfo: currentVideoInfoModel,
    },
    {
      storage: "localStorage",
    },
    {
      devTools: import.meta.env.NODE_ENV !== "production", // Enable only in development
    }
  )
);

export default store;
