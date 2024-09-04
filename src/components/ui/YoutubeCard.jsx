import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CustomLink from "./CustomLink";
import { PlayCircleOutline } from "@mui/icons-material";

// this card is use only Home page
const YoutubeCard = ({ img, title, channelTitle, to }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" image={img} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {channelTitle.length > 23
              ? `${channelTitle.slice(0, 23)}...`
              : channelTitle}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <CustomLink
          to={to}
          sx={{
            display: "flex",
            justifyContent: "Center",
            alignItems: "Center",
            gap: "8px",
            padding: "10px",
            background: "#1976D2",
            width: "100%",
            borderRadius: "8px",
            color: "white",
          }}
          variant="h6"
          color="primary"
        >
          <PlayCircleOutline /> Open
        </CustomLink>
      </CardActions>
    </Card>
  );
};

export default YoutubeCard;
