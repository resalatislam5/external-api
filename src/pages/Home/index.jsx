import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import Modal from "../../components/Modal";
import { useState } from "react";
import useChangeInputData from "../../hooks/useChangeInputData";
import { useStoreActions, useStoreState } from "easy-peasy";
import PlayListItems from "./PlayListItems";

function Home() {
  // Modal useState
  const [open, setOpen] = useState(false);
  // Handel  Change
  const {
    handleChange,
    state: { url },
  } = useChangeInputData({ State: "" });
  // easy peasy store
  const store = useStoreState((state) => state.youtubePlayLists);
  const playListActon = useStoreActions((action) => action.youtubePlayLists);
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
  console.log("I am handel chnage", store, url, Object.values(store.data));
  return (
    <div>
      <Modal
        title={"Past any playlist URL or playlist ID:"}
        open={open}
        handleClose={handleClose}
        css={{ width: "500px" }}
        handleSubmit={handleSubmit}
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
        />
        <PlayListItems
          path={"/favourite-playlists"}
          store={store}
          title={"Your Favourite Playlist Items"}
        />
        <PlayListItems
          store={store}
          title={"Your Recent Items"}
          seeAll={true}
        />
      </Box>
    </div>
  );
}

export default Home;
