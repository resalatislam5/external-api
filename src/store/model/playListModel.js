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
    state.success(payload);
  }),
  savePlayList: thunk(
    async (
      { addPlayList, setError, setLoading, setSuccess },
      playlistId,
      { getState }
    ) => {
      if (getState().data[playlistId]) {
        setError("Your Playlist Already Exist");
        return;
      }
      try {
        setError("");
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
});

export default playListModel;
