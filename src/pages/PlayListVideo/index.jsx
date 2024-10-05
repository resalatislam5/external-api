import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRecent from "../../hooks/useRecent";
import usePlayList from "../../hooks/usePlayList";
import YouTube from "react-youtube";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import { useStoreActions, useStoreState } from "easy-peasy";

function PlayListVideo() {
  // TODO: Fully responsive
  // TODO: add Comment functionality
  // TODO: theame change color problem
  // TODO: implement shear button
  // TODO: After reloading, the back theme remove, it needs to fixed
  // TODO: ADD next Video Button
  const [hwSize, setHwSize] = useState({ height: null, width: null });
  const [playlist, setPlaylist] = useState();
  const [show, setShow] = useState(true);
  const [currentVideoNumber, setCurrentVideoNumber] = useState(1);
  const [videoDetails, setVideoDetails] = useState({
    id: "",
    videoId: "",
    title: "",
    description: "",
    currentTime: 0,
  });
  const [seeMore, setSeeMore] = useState(false);
  const { id } = useParams();
  const { actions: recentAction } = useRecent();
  const { actions } = usePlayList();

  // current video action from easy-peasy
  const currentVideoAction = useStoreActions(
    (actions) => actions.currentVideoInfo
  );
  // current video state from easy-peasy
  const currentVideoState = useStoreState(
    (state) => state.currentVideoInfo.items
  );

  useEffect(() => {
    recentAction.addRecentList(id);
    setPlaylist(actions.search(id));
  }, [id]);

  // set current video
  const handleCurrentVideo = ({ videoId, title, description }) => {
    currentVideoAction.setItem({
      id,
      videoId,
      title,
      description,
    });
  };
  useEffect(() => {
    setVideoDetails({ ...currentVideoState[id] });
  }, [currentVideoState, id]);

  console.log("playlist", playlist);
  console.log("currentVideoState", videoDetails.videoId);

  useLayoutEffect(() => {
    const handleResize = () => {
      console.log("useLayoutEffect inner");
      const height = window.innerHeight;
      const width = window.innerWidth > 1536 ? 1536 : window.innerWidth;
      setHwSize((prev) => ({
        ...prev,
        height,
        width,
      }));
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (!playlist) {
    return;
  }
  if (!currentVideoState[id]) {
    handleCurrentVideo({
      id,
      videoId: playlist?.items[0]?.snippet?.resourceId?.videoId,
      title: playlist?.items[0]?.snippet?.title,
      description: playlist?.items[0]?.snippet?.description,
      currentTime: videoDetails.currentTime,
    });
  }
  console.log("height", hwSize.height, hwSize.width > 900);
  return (
    <Grid2 justifyContent={"center"} container spacing={2}>
      <Grid2 size={{ sx: 12, md: 8 }}>
        <YouTube
          videoId={videoDetails.videoId} // defaults -> ''
          // id={string} // defaults -> ''
          // className={string} // defaults -> ''
          // iframeClassName={string} // defaults -> ''
          // style={{ border: "1px solid red" }} // defaults -> {}
          opts={{
            width: hwSize.width > 900 ? hwSize.width / 1.7 : hwSize.width / 1.1,
            height:
              hwSize.width > 900 ? hwSize.height / 1.6 : hwSize.width / 1.1,
            playerVars: {
              autoplay: 1,
              controls: 1,
            },
          }} // defaults -> {}
          onReady={(e) => e.target.seekTo(videoDetails?.currentTime, true)} // defaults -> noop
          // onPlay={(func) =>
          //   console.log("onplay", func.target.playVideo(442.7716349275208))
          // } // defaults -> noop
          // onPause={func} // defaults -> noop
          // onEnd={func} // defaults -> noop
          // onError={func} // defaults -> noop
          onStateChange={(func) => {
            currentVideoAction.setItem({
              ...currentVideoState[id],
              currentTime: func.target.getCurrentTime(),
            });
          }} // defaults -> noop
          // onPlaybackRateChange={func} // defaults -> noop
          // onPlaybackQualityChange={func} // defaults -> noop
        />
        <Typography
          mt={5}
          component="h1"
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          {videoDetails.title}
        </Typography>
        <Typography
          mt={1}
          mb={3}
          component="p"
          variant="body1"
          sx={{
            xs: { fontSize: "24px" },
            sm: { fontSize: "14px" },
          }}
        >
          {seeMore ? (
            <>
              {videoDetails?.description}
              <Button onClick={() => setSeeMore(false)}>...less</Button>
            </>
          ) : (
            <>
              {videoDetails?.description?.slice(0, 100)}
              <Button onClick={() => setSeeMore(true)}>...more</Button>
            </>
          )}
        </Typography>
      </Grid2>
      <Grid2 size={{ sx: 12, md: 4 }}>
        {show ? (
          <>
            <Box
              bgcolor="secondary.main"
              paddingX={2}
              paddingY={3}
              borderRadius={"20px 20px 0px 0px"}
              position={"relative"}
            >
              <Typography variant="h6">
                {playlist.title > 50
                  ? `${playlist.title?.slice(0, 40)}...`
                  : playlist.title}
              </Typography>
              <Typography variant="body1">
                {playlist.channelTitle} - {currentVideoNumber} /{" "}
                {playlist.items?.length}
              </Typography>
              <Button
                onClick={() => setShow(false)}
                sx={{
                  position: "absolute",
                  right: "-5px",
                  top: "-5px",
                  fontSize: "25px",
                  color: "inherit",
                }}
              >
                X
              </Button>
            </Box>
            <Stack
              spacing={1}
              height={hwSize.height / 1.9}
              sx={{
                overflowY: "scroll",
                paddingTop: "20px",
                borderRadius: "0 0 10px 10px",
              }}
              bgcolor="secondary.light"
            >
              {playlist.items?.map((e, i) => (
                <Stack
                  direction={"row"}
                  alignItems={{ xs: "center", md: "flex-start" }}
                  onLoad={() => {
                    if (
                      e.snippet?.resourceId?.videoId === videoDetails.videoId
                    ) {
                      setCurrentVideoNumber(i + 1);
                    }
                  }}
                  onClick={() => {
                    setCurrentVideoNumber(i + 1),
                      handleCurrentVideo({
                        videoId: e.snippet?.resourceId?.videoId,
                        title: e.snippet?.title,
                        description: e.snippet?.description,
                      });
                  }}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "secondary.main" },
                    backgroundColor:
                      e.snippet?.resourceId?.videoId === videoDetails.videoId &&
                      "secondary.main",
                  }}
                  container
                  key={e.id}
                  spacing={3}
                  padding={1}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    size={4}
                  >
                    <Typography>{i + 1}</Typography>
                    <img
                      style={{
                        width: `${e.snippet?.thumbnails?.default?.width}px`,
                        height: `${e.snippet?.thumbnails?.default?.height}px`,
                        borderRadius: "7px",
                      }}
                      src={e.snippet?.thumbnails?.default?.url}
                      alt=""
                    />
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      {e.snippet?.title?.length > 50
                        ? `${e.snippet?.title?.slice(0, 50)}...`
                        : e.snippet?.title}
                    </Typography>
                    <Typography variant="body2">
                      {e.snippet?.channelTitle}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </>
        ) : (
          <Box
            display={"flex"}
            sx={{ transitionDelay: "5ms" }}
            justifyContent={"end"}
          >
            <MenuOutlined
              onClick={() => setShow(true)}
              sx={{ right: "0", cursor: "pointer" }}
            />
          </Box>
        )}
      </Grid2>
    </Grid2>
  );
}

export default PlayListVideo;
