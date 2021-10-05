import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";

const DrawerLink = (props) => {
  return (
    <ListItem>
      <NavLink
        className="drawer-link"
        activeClassName="drawer-link-active"
        to={`${props.link}`}
        exact={true}
      >
        <ListItemIcon className={props.classes}>{props.children}</ListItemIcon>
        <ListItemText>
          <Typography variant="h6" align="center">
            {props.title}
          </Typography>
        </ListItemText>
      </NavLink>
    </ListItem>
  );
};

export default DrawerLink;
