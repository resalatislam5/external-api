import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";

function useRecent() {
  const [store, setStore] = useState({});
  const recentStore = useStoreState((state) => state.recentPlayLists);
  const actions = useStoreActions((actions) => actions.recentPlayLists);

  useEffect(() => {
    const data = actions.data();
    setStore({ ...recentStore, data, error: "" });
    setStore({ ...recentStore, data, error: "" });
  }, [recentStore.items]);

  return {
    recentStore,
    actions,
    store,
  };
}

export default useRecent;
