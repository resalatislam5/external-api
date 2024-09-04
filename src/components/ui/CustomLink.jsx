import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

// This Link uses all pagination
function CustomLink(props) {
  return (
    <Link underline="none" component={RouterLink} {...props}>
      {props.children}
    </Link>
  );
}

export default CustomLink;
