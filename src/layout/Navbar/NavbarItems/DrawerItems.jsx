import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  drawerIcon: {
    justifyContent: "center",
  },
}));

const DrawerItems = (props) => {
  const classes = useStyles();

  return (
    <div style={{ width: 250 }} onClick={props.openDrawer}>
      <ListItem button>
        <Link className="drawer-link" to="/blogs">
          <ListItemIcon className={classes.drawerIcon}>
            <HomeIcon color="primary" fontSize="large" />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="h6" align="center">
              Home
            </Typography>
          </ListItemText>
        </Link>
      </ListItem>
      {props.isAuthenticated && (
        <>
          <ListItem button>
            <Link className="drawer-link" to="/blog/add">
              <ListItemIcon className={classes.drawerIcon}>
                <AddCircleIcon color="primary" fontSize="large" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6" align="center">
                  New Blog
                </Typography>
              </ListItemText>
            </Link>
          </ListItem>
          <ListItem button>
            <Link className="drawer-link" to="/account">
              <ListItemIcon className={classes.drawerIcon}>
                <AccountBoxIcon color="primary" fontSize="large" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6" align="center">
                  Account
                </Typography>
              </ListItemText>
            </Link>
          </ListItem>
        </>
      )}
    </div>
  );
};

export default DrawerItems;
