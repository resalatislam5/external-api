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
    console.log("Items---->1", items);
    items = items.reduce((acc, item) => {
      console.log("Items---->2", item);
      acc[item.id] = item;
      return acc;
    }, {});
    setLoading(false);
    console.log("Items---->3", items);
    return items;
  }),
  addRecentList: action((state, payload) => {
    if (state.items.find((e) => e === payload)) {
      return;
    }
    state.items = [...state.items, payload];
    state.items.slice(0, 3);
    state.success = "Successfully Added";
  }),
});

export default recentPlayListModel;
