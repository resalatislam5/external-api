import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import Modal from "../../components/Modal";
import { useState } from "react";
import useChangeInputData from "../../hooks/useChangeInputData";
import { useStoreActions, useStoreState } from "easy-peasy";
import YoutubeCard from "../../components/ui/YoutubeCard";

function Home() {
  // Modal useState
  const [open, setOpen] = useState(false);
  // Handel  Change
  const { handleChange, state: urlState } = useChangeInputData({ State: "" });
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
    playListActon.savePlayList(urlState.url);
  };
  console.log("I am handel chnage", store, urlState, Object.values(store.data));
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
      <Box marginY={"60px"}>
        {/* Your PlayList */}
        <Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            {Object.values(store.data).map((e) => (
              <YoutubeCard
                to={e.id}
                key={e.id}
                img={e.thumbnails?.medium?.url}
                title={e.title}
                channelTitle={e.channelTitle}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
