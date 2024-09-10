import { useStoreActions, useStoreState } from "easy-peasy";

function usePlayList() {
  const store = useStoreState((state) => state.youtubePlayLists);
  const actions = useStoreActions((action) => action.youtubePlayLists);
  return {
    store,
    actions,
  };
}

export default usePlayList;
