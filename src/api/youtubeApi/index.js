import axios from "axios";

// Google Api key
const key = import.meta.env.VITE_GOOGLE_API_KEY;
console.log("key", key);

// YouTube will give 50 items per request. But I need all the items in one request. so I create a recursive function

const getPlayListItem = async (
  playlistId = "",
  nextPageToken = "",
  result = []
) => {
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=${nextPageToken}&playlistId=${playlistId}&key=${key}`;

  const { data } = await axios.get(url);
  result = [...result, ...data.items];
  if (data.nextPageToken) {
    return getPlayListItem(playlistId, data.nextPageToken, result);
  }
  return result;
};

// This function will return  playList Data
export const getPlayListItems = async (playlistId) => {
  const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${key}`;
  const { data } = await axios.get(url);
  const playlists = await getPlayListItem(playlistId);
  const {
    id,
    snippet: { title, channelTitle, thumbnails },
  } = data.items[0];

  return {
    id,
    items: playlists,
    title,
    channelTitle,
    thumbnails,
  };
};
