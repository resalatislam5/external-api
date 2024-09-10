import { Box, Typography } from "@mui/material";
import useFavorite from "../../hooks/useFavorite";
import YoutubeCard from "../../components/ui/YoutubeCard";
import toast from "react-hot-toast";
import { useEffect } from "react";

function AllFavorite() {
  const { action, store } = useFavorite();

  useEffect(() => {
    if (store.success) {
      toast.success(store.success);
      action.setSuccess("");
    }
  }, [store.success]);

  if (Object.keys(store).length === 0) {
    return;
  }

  console.log("store", store);
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
              isFavorite={e.isFavorite}
              favorite={true}
              removeFavorite={action.removeFavorite}
            />
          ))
        ) : (
          <Typography>No Video Found</Typography>
        )}
      </Box>
    </Box>
  );
}

export default AllFavorite;
