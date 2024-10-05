import { action, persist } from "easy-peasy";

const currentVideoInfoModel = persist({
  items: {},
  setItem: action((state, payload) => {
    // if (state.items[payload.id]) {
    //   state.items[payload.id] = payload;
    // }
    state.items = { ...state.items, [payload.id]: payload };
  }),
});

export default currentVideoInfoModel;
