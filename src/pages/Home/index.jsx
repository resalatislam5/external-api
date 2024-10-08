import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import Modal from "../../components/Modal";
import { useEffect, useState } from "react";
import useChangeInputData from "../../hooks/useChangeInputData";
import { useStoreActions, useStoreState } from "easy-peasy";
import PlayListItems from "./PlayListItems";
import toast from "react-hot-toast";
import useFavorite from "../../hooks/useFavorite";
import usePlayList from "../../hooks/usePlayList";
import useRecent from "../../hooks/useRecent";

// TODO: DELETE icon change
function Home() {
  // Modal useState
  const [open, setOpen] = useState(false);
  //

  // const [recentState, setRecentState] = useState({});
  // Handel  Change
  const {
    handleChange,
    state: { url },
  } = useChangeInputData({ State: "" });
  // useFavorite hooks
  const {
    actions: favoriteActions,
    favoriteStore,
    store: favoriteState,
  } = useFavorite();
  // useRecent hooks
  const { store: recentStore } = useRecent();
  // easy peasy store
  const { store, actions: playListActon } = usePlayList();

  // const recentStore = useStoreState((state) => state.recentPlayLists);
  // const recentActions = useStoreActions((action) => action.recentPlayLists);

  // Model open function
  const handleClickOpen = () => {
    setOpen(true);
  };
  // model close function
  const handleClose = () => {
    setOpen(false);
  };
  // Handel fetch playList data
  const handleSubmit = async () => {
    // verify url or playlistId
    if (url.match("https")) {
      const newUrl = url.split("list=")[1];
      playListActon.savePlayList(newUrl);
    } else {
      playListActon.savePlayList(url);
    }
  };

  // useEffect(() => {
  //   const data = recentActions.data();
  //   setRecentState({ ...recentStore, data, error: "" });
  //   setRecentState({ ...recentStore, data, error: "" });
  // }, [recentStore.items]);

  useEffect(() => {
    if (store.success) {
      toast.success(store.success);
      playListActon.setSuccess("");
    }
    if (store.error) {
      toast.error(store.error);
      playListActon.setError("");
    }
    if (favoriteStore.success) {
      toast.success(favoriteStore.success);
      favoriteActions.setSuccess("");
    }
    // if (favoriteStore.error) {
    //   toast.error(favoriteStore.error);
    //   playListActon.setError("");
    // }
  }, [store.success, store.error, favoriteStore.success]);
  if (
    Object.keys(favoriteState).length === 0 &&
    Object.keys(recentStore).length === 0
  ) {
    return;
  }
  return (
    <div>
      <Modal
        title={"Past any playlist URL or playlist ID:"}
        open={open}
        handleClose={handleClose}
        css={{ width: "500px" }}
        handleSubmit={handleSubmit}
        okButton={"Add Playlist"}
      >
        <Box sx={{ margin: " 20px 0" }}>
          <OutlinedInput
            name="url"
            onChange={(e) => handleChange(e)}
            fullWidth={true}
          />
        </Box>
      </Modal>
      {/* Add to PlayList */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Save Your Playlist:</Typography>
        <Button variant="outlined" size="large" onClick={handleClickOpen}>
          ADD NEW
        </Button>
      </Box>
      {/* PlayList Items */}
      <Box>
        {/* Your PlayList */}
        <PlayListItems
          path={"/playlists"}
          store={store}
          title={"Your Playlist Items"}
          addPlayList={favoriteActions.addFavorite}
          removeFavorite={favoriteActions.removeFavorite}
          deletePlayList={playListActon.deletePlayList}
        />
        <PlayListItems
          path={"/favourite-playlists"}
          store={favoriteState}
          title={"Your Favourite Playlist Items"}
          favorite={true}
          removeFavorite={favoriteActions.removeFavorite}
        />
        <PlayListItems
          store={recentStore}
          title={"Your Recent Items"}
          seeAll={true}
          recent={true}
        />
      </Box>
    </div>
  );
}

export default Home;
