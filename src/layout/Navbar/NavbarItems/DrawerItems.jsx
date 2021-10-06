import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { makeStyles } from "@mui/styles";
import DrawerLink from "./DrawerLink";

const useStyles = makeStyles(() => ({
  drawerIcon: {
    justifyContent: "center",
  },
}));

const DrawerItems = (props) => {
  const classes = useStyles();

  return (
    <div style={{ width: 250 }} onClick={props.openDrawer}>
      <DrawerLink title="Home" link="/blogs" classes={classes.drawerIcon}>
        <HomeIcon color="primary" fontSize="large" />
      </DrawerLink>
      {props.isAuthenticated && (
        <>
          <DrawerLink
            title="New Blog"
            link="/blog/add"
            classes={classes.drawerIcon}
          >
            <AddCircleIcon color="primary" fontSize="large" />
          </DrawerLink>
          <DrawerLink
            title="Account"
            link="/account"
            classes={classes.drawerIcon}
          >
            <AccountBoxIcon color="primary" fontSize="large" />
          </DrawerLink>
        </>
      )}
    </div>
  );
};

export default DrawerItems;
