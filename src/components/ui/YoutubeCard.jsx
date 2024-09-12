import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CustomLink from "./CustomLink";
import {
  DeleteForever,
  Favorite,
  FavoriteBorder,
  PlayCircleOutline,
} from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import Modal from "../Modal";

// this card is use only Home page
const YoutubeCard = ({
  img,
  title,
  channelTitle,
  to,
  addPlayList,
  deletePlayList,
  recent,
  favorite,
  removeFavorite,
  isFavorite,
}) => {
  // Modal useState
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  // Handel fetch playList data
  const handleSubmit = async () => {
    deletePlayList(to);
    // verify url or playlistId
  };
  return (
    <>
      <Modal
        title={"Delete Your PlayList:"}
        open={open}
        handleClose={handleClose}
        css={{ width: "500px" }}
        handleSubmit={handleSubmit}
        okButton={"Delete"}
      >
        <Typography variant="body1">Name: {title}</Typography>
      </Modal>
      <Card sx={{ maxWidth: 345, position: "relative", boxShadow: "inherit" }}>
        {!recent && (
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: "1",
              color: "white",
              display: "flex",
              gap: "10px",
            }}
          >
            {isFavorite ? (
              <Favorite
                sx={{ cursor: "pointer", color: "red" }}
                onClick={() => removeFavorite(to)}
              />
            ) : (
              <FavoriteBorder
                sx={{ cursor: "pointer" }}
                onClick={() => addPlayList(to)}
              />
            )}
            {!favorite && (
              <DeleteForever
                sx={{ cursor: "pointer", color: "red" }}
                onClick={() => setOpen(true)}
              />
            )}
          </Box>
        )}
        <CustomLink to={`/playlist/${to}`} sx={{ zIndex: "0.5" }}>
          <CardActionArea>
            <Box position={"relative"}>
              <CardMedia component="img" image={img} alt={title} />
              <PlayCircleOutline
                sx={{
                  fontSize: "50px",
                  color: "white",
                  position: "absolute",
                  left: "40%",
                  top: "40%",
                }}
              />
            </Box>
            <CardContent>
              <Typography
                gutterBottom
                sx={{
                  color: "inherit",
                }}
                variant="h5"
                component="div"
              >
                {channelTitle.length > 23
                  ? `${channelTitle.slice(0, 23)}...`
                  : channelTitle}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {title.length > 90 ? `${title.slice(0, 90)}...` : title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </CustomLink>
      </Card>
    </>
  );
};

export default YoutubeCard;
