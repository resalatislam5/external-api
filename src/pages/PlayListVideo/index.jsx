import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useRecent from "../../hooks/useRecent";

function PlayListVideo() {
  const { id } = useParams();
  const { actions: recentAction } = useRecent();

  useEffect(() => {
    recentAction.addRecentList(id);
  }, [id]);
  return <div>Play</div>;
}

export default PlayListVideo;
