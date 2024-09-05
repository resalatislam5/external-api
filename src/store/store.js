import { createStore, persist } from "easy-peasy";
import playListModel from "./model/playListModel";

const store = createStore(
  persist({
    youtubePlayLists: playListModel,
  }),
  {
    devTools: import.meta.env.NODE_ENV !== "production", // Enable Redux DevTools
  }
);

export default store;
