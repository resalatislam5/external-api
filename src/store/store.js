import { createStore, persist } from "easy-peasy";
import playListModel from "./model/playListModel";

const store = createStore(
  persist({
    youtubePlayLists: playListModel,
  })
);

export default store;
