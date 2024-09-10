import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";

function useFavorite() {
  const [store, setStore] = useState({});
  const favoriteStore = useStoreState((state) => state.favoriteLists);
  const action = useStoreActions((action) => action.favoriteLists);

  useEffect(() => {
    const data = action.data();
    setStore({ ...favoriteStore, data, error: "" });
    setStore({ ...favoriteStore, data, error: "" });
  }, [favoriteStore.items]);

  return {
    favoriteStore,
    action,
    store,
  };
}

export default useFavorite;
