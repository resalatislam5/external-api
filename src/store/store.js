import { createStore, persist } from "easy-peasy";
import playListModel from "./model/playListModel";
import favoritePlayListModel from "./model/favoritePlayListModel";

const store = createStore(
  persist(
    {
      youtubePlayLists: playListModel,
      favoriteLists: favoritePlayListModel,
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
