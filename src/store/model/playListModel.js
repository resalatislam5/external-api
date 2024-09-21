import { action, persist, thunk } from "easy-peasy";
import { getPlayListItems } from "../../api/youtubeApi";

const playListModel = persist({
  data: {},
  isLoading: false,
  error: "",
  success: "",
  addPlayList: action((state, payload) => {
    state.data[payload.id] = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  setSuccess: action((state, payload) => {
    state.success = payload;
  }),
  setPlayList: action((state, payload) => {
    delete state.data[payload];
  }),
  deletePlayList: thunk(
    ({ setPlayList, setSuccess }, payload, { getStoreActions }) => {
      setSuccess("");
      getStoreActions().favoriteLists.removeFavoriteList(payload);
      getStoreActions().recentPlayLists.removeRecentList(payload);
      setPlayList(payload);
      setSuccess("Remove playlist Successfully");
    }
  ),
  savePlayList: thunk(
    async (
      { addPlayList, setError, setLoading, setSuccess },
      playlistId,
      { getState }
    ) => {
      setError("");
      setSuccess("");
      if (getState().data[playlistId]) {
        setError("Your Playlist Already Exist");
        return;
      }
      try {
        setLoading(true);
        const data = await getPlayListItems(playlistId);
        addPlayList(data);
        setSuccess("Playlist Added Successfully");
      } catch (e) {
        setError(e.response?.data?.error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  ),
  search: thunk(({ savePlayList }, payload, { getState }) => {
    let playlist = getState()?.data[payload];
    if (!playlist) {
      savePlayList(payload);
      playlist = getState()?.data[payload];
    }
    return playlist;
  }),
});

export default playListModel;
