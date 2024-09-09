import { action, persist, thunk } from "easy-peasy";

const favoritePlayListModel = persist({
  items: [],
  isLoading: false,
  success: "",
  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  setSuccess: action((state, payload) => {
    state.success = payload;
  }),
  data: thunk(({ setLoading }, payload, { getState, getStoreState }) => {
    setLoading(true);
    let items = getState().items.map(
      (e) => getStoreState()?.youtubePlayLists?.data[e]
    );
    items = items.filter((e) => Boolean(e));
    items = items.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
    setLoading(false);
    return items;
  }),
  addFavoriteList: action((state, payload) => {
    state.items = [...state.items, payload];
    state.success = "Successfully Added";
  }),
  removeFavoriteList: action((state, payload) => {
    state.items = state.items.filter((e) => e !== payload);
    state.success = "Remove Successfully";
  }),
  addFavorite: thunk(
    ({ addFavoriteList }, payload, { getState, getStoreState }) => {
      if (getState().items.find((e) => e === payload)) {
        return;
      }
      addFavoriteList(payload);
      getStoreState().youtubePlayLists.data[payload].isFavorite = true;
    }
  ),
  removeFavorite: thunk(
    ({ removeFavoriteList }, payload, { getState, getStoreState }) => {
      if (!getState().items.find((e) => e === payload)) {
        return;
      }
      removeFavoriteList(payload);
      getStoreState().youtubePlayLists.data[payload].isFavorite = false;
    }
  ),
});

export default favoritePlayListModel;
