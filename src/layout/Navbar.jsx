import { Link } from "react-router-dom";
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Box,
  Menu,
  Tooltip,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ListItem,
  Drawer,
  Divider,
  Button,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import { useEffect } from "react";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useAuth0 } from "@auth0/auth0-react";
import MenuBookIcon from "@material-ui/icons/MenuBook";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  iconButton: {
    cursor: "pointer",
  },
  drawerIcon: {
    justifyContent: "center",
  },
  addLink: {
    marginLeft: "5px",
  },
  homeLink: {
    marginRight: "5px",
    position: "relative",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [state, setState] = useState({
    mobileView: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mobileView } = state;

  const { loginWithPopup, logout, user, isAuthenticated } = useAuth0();

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
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
      {isAuthenticated && (
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

  const loggedInMenu = () =>
    isAuthenticated && (
      <Box display="flex" alignItems="center">
        <Tooltip title="Reading list">
          <Link to="/blogs/read-later" className={classes.homeLink}>
            <MenuBookIcon fontSize="large" />
          </Link>
        </Tooltip>

        <Avatar
          src={user.picture}
          alt={user.name}
          onClick={handleClick}
          className={classes.iconButton}
        />
        <Box
          component={Menu}
          id="select-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          className="user-select-menu"
        >
          <MenuItem>
            <Typography className={classes.homeLink} variant="h5">
              <Link to="/account">Account</Link>
            </Typography>
          </MenuItem>
          <MenuItem>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </MenuItem>
        </Box>
      </Box>
    );

  const loggedOutMenu = () => (
    <Button variant="contained" color="secondary" onClick={loginWithPopup}>
      Login
    </Button>
  );

  useEffect(() => {
    const handleResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    handleResponsiveness();
    window.addEventListener("resize", () => handleResponsiveness());

    return () => {
      window.removeEventListener("resize", () => handleResponsiveness());
    };
  }, []);

  const mobileNav = () => (
    <Box component={Toolbar}>
      <IconButton
        edge="start"
        className={classes.iconButton}
        color="inherit"
        aria-label="menu"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
        {getList()}
        <Divider />
      </Drawer>
      <Box ml="auto">{isAuthenticated ? loggedInMenu() : loggedOutMenu()}</Box>
    </Box>
  );

  const desktopNav = () => (
    <Box component={Toolbar} display="flex" alignItems="center">
      <Typography variant="h5">
        <Link to="/blogs">Home</Link>
      </Typography>
      {isAuthenticated && (
        <Typography variant="h5" className={classes.addLink}>
          <Link to="/blog/add">New Blog</Link>
        </Typography>
      )}
      <Box ml="auto">{isAuthenticated ? loggedInMenu() : loggedOutMenu()}</Box>
    </Box>
  );

  return (
    <AppBar position="static">{mobileView ? mobileNav() : desktopNav()}</AppBar>
  );
}
