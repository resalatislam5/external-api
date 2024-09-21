import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRecent from "../../hooks/useRecent";
import usePlayList from "../../hooks/usePlayList";
import YouTube from "react-youtube";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";

function PlayListVideo() {
  // TODO: Fully responsive
  // TODO: Colse button sfunctionality
  // TODO: title and description show and image and channel name
  // TODO: add Comment functionality
  // TODO: theame change color problem
  // TODO: implement shear button
  // TODO: progress save
  // TODO: show
  const [hwSize, setHwSize] = useState({ height: null, width: null });
  const [playlist, setPlaylist] = useState();
  const [show, setShow] = useState(true);
  const [currentVideoNumber, setCurrentVideoNumber] = useState("");
  const [videoId, setVideoId] = useState("");
  const { id } = useParams();
  const { actions: recentAction } = useRecent();
  const { actions } = usePlayList();

  useEffect(() => {
    recentAction.addRecentList(id);
    setPlaylist(actions.search(id));
  }, [id]);
  console.log("playlist", playlist);

  useLayoutEffect(() => {
    console.log("useLayoutEffect");

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
  console.log("height", hwSize.height, hwSize.width > 900);
  return (
    <Grid2 justifyContent={"center"} container spacing={2}>
      <Grid2 size={{ sx: 12, md: 8 }}>
        <YouTube
          videoId={videoId} // defaults -> ''
          // id={string} // defaults -> ''
          // className={string} // defaults -> ''
          // iframeClassName={string} // defaults -> ''
          // style={{ border: "1px solid red" }} // defaults -> {}
          opts={{
            width: hwSize.width > 900 ? hwSize.width / 1.7 : hwSize.width / 1.1,
            height:
              hwSize.width > 900 ? hwSize.height / 1.6 : hwSize.width / 1.1,
          }} // defaults -> {}
          // onReady={func} // defaults -> noop
          // onPlay={func} // defaults -> noop
          // onPause={func} // defaults -> noop
          // onEnd={func} // defaults -> noop
          // onError={func} // defaults -> noop
          // onStateChange={func} // defaults -> noop
          // onPlaybackRateChange={func} // defaults -> noop
          // onPlaybackQualityChange={func} // defaults -> noop
        />
      </Grid2>
      <Grid2 size={{ sx: 12, md: 4 }}>
        {show ? (
          <>
            <Box
              bgcolor={"#c2c2c2"}
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
                  color: "black",
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
              bgcolor={"#dedede"}
            >
              {playlist.items?.map((e, i) => (
                <Stack
                  direction={"row"}
                  alignItems={{ xs: "center", md: "flex-start" }}
                  onClick={() => {
                    setCurrentVideoNumber(i + 1),
                      setVideoId(e.snippet?.resourceId?.videoId);
                  }}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#c2c2c2" },
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
