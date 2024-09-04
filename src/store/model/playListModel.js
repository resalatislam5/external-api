import { action, persist, thunk } from "easy-peasy";
import { getPlayListItems } from "../../api/youtubeApi";

const playListModel = persist({
  data: {},
  isLoading: false,
  error: "",

  addPlayList: action((state, payload) => {
    state.data[payload.id] = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  setLoading: action((state, payload) => {
    state.error = payload;
  }),

  savePlayList: thunk(
    async ({ addPlayList, setError, setLoading }, playlistId, { getState }) => {
      if (getState().data[playlistId]) {
        return;
      }
      try {
        setLoading(true);
        const data = await getPlayListItems(playlistId);
        addPlayList(data);
      } catch (e) {
        setError(e.response?.data?.error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  ),
});

export default playListModel;
