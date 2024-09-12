import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Discord from "../pages/Discord";
import Twiter from "../pages/Twitter";
import Facebook from "../pages/Facebook";
import Youtube from "../pages/Youtube";
import MainLayout from "../layout/MainLayout";
import AllPlayList from "../pages/AllPlayList";
import AllFavorite from "../pages/AllFavoriteList";
import PlayListVideo from "../pages/PlayListVideo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/discord",
        element: <Discord />,
      },
      {
        path: "/twitter",
        element: <Twiter />,
      },
      {
        path: "/facebook",
        element: <Facebook />,
      },
      {
        path: "/youtube",
        element: <Youtube />,
      },
      {
        path: "/playlists",
        element: <AllPlayList />,
      },
      {
        path: "/favourite-playlists",
        element: <AllFavorite />,
      },
      {
        path: "/playlist/:id",
        element: <PlayListVideo />,
      },
    ],
  },
]);

export default router;
