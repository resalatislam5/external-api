import { action, persist, thunk } from "easy-peasy";

const recentPlayListModel = persist({
  items: [],
  isLoading: false,
  success: "",
  setLoading: action((state, payload) => {
    state.isLoading = payload;
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
  addRecentList: action((state, payload) => {
    if (state.items[0] === payload) {
      return;
    }
    if (state.items.find((e) => e === payload)) {
      state.items = state.items.filter((e) => e !== payload);
    }
    state.items.unshift(payload);
    state.items = state.items.slice(0, 4);
  }),
  removeRecentList: action((state, payload) => {
    state.items = state.items.filter((e) => e !== payload);
  }),
});

export default recentPlayListModel;
