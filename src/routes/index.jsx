import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Discord from "../pages/Discord";
import Twiter from "../pages/Twitter";
import Facebook from "../pages/Facebook";
import Youtube from "../pages/Youtube";

const router = createBrowserRouter([
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
]);

export default router;
