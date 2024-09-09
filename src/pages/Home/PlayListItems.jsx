import { Box, Skeleton, Typography } from "@mui/material";
import YoutubeCard from "../../components/ui/YoutubeCard";
import CustomLink from "../../components/ui/CustomLink";

function PlayListItems({
  store,
  title,
  seeAll,
  path,
  addPlayList,
  recent,
  favorite,
  deletePlayList,
  removeFavorite,
}) {
  return (
    <Box marginY={"60px"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h6" marginBottom={{ xs: "30px" }}>
          {title}
        </Typography>
        {!seeAll && (
          <CustomLink variant="h6" to={path}>
            See All
          </CustomLink>
        )}
      </Box>
      {store.isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: { xs: "center", sm: "left" },
          }}
        >
          {[9, ...Array(Object.values(store.data)?.slice(0, 3)?.length)].map(
            (e, i) => (
              <Box key={i} sx={{ pt: 0.5 }}>
                <Skeleton width="300px" height="200px" />
                <Skeleton width="300px" height="20px" />
                <Skeleton width="300px" height="20px" />
                <Skeleton width="300px" height="20px" />
                <Skeleton width="300px" height="20px" />
                <Skeleton width="300px" height="20px" />
              </Box>
            )
          )}
        </Box>
      ) : (
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
            Object.values(store.data)
              ?.slice(0, 4)
              .map((e) => (
                <YoutubeCard
                  recent={recent}
                  to={e.id}
                  key={e.id}
                  img={e.thumbnails?.medium?.url}
                  title={e.title}
                  channelTitle={e.channelTitle}
                  addPlayList={addPlayList}
                  favorite={favorite}
                  deletePlayList={deletePlayList}
                  isFavorite={e.isFavorite}
                  removeFavorite={removeFavorite}
                />
              ))
          ) : (
            <Typography>No Video Found</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default PlayListItems;
