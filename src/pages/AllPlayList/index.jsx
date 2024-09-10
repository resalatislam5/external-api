import YoutubeCard from "../../components/ui/YoutubeCard";
import { Box, Typography } from "@mui/material";
import usePlayList from "../../hooks/usePlayList";
import useFavorite from "../../hooks/useFavorite";
import { useEffect } from "react";
import toast from "react-hot-toast";

function AllPlayList() {
  const { store, actions } = usePlayList();
  const { actions: favoriteActions, favoriteStore } = useFavorite();

  useEffect(() => {
    if (store.success) {
      toast.success(store.success);
      actions.setSuccess("");
    }
    if (store.error) {
      toast.error(store.error);
      actions.setError("");
    }
    if (favoriteStore.success) {
      toast.success(favoriteStore.success);
      favoriteActions.setSuccess("");
    }
  }, [store.success, store.error, favoriteStore.success]);
  return (
    <Box marginY={"60px"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "left" },
        }}
      >
        {Object.values(store.data).length !== 0 ? (
          Object.values(store.data).map((e) => (
            <YoutubeCard
              to={e.id}
              key={e.id}
              img={e.thumbnails?.medium?.url}
              title={e.title}
              channelTitle={e.channelTitle}
              addPlayList={favoriteActions.addFavorite}
              deletePlayList={actions.deletePlayList}
              isFavorite={e.isFavorite}
              removeFavorite={favoriteActions.removeFavorite}
            />
          ))
        ) : (
          <Typography>No Video Found</Typography>
        )}
      </Box>
    </Box>
  );
}

export default AllPlayList;
