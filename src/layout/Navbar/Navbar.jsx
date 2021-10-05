import { Link, NavLink } from "react-router-dom";
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import DrawerItems from "./NavbarItems/DrawerItems";
import LoggedOutMenu from "./NavbarItems/LoggedOutMenu";
import LoggedInMenu from "./NavbarItems/LoggedInMenu";

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
  const { loginWithPopup, logout, user, isAuthenticated } = useAuth0();
  const { mobileView } = state;

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //DrawerItems events
  const openDrawerHandler = () => {
    setOpen(false);
  };

  const loggedInMenu = (
    <LoggedInMenu
      user={user}
      isAuthenticated={isAuthenticated}
      anchorEl={anchorEl}
      avatarClick={handleClick}
      onClose={handleClose}
      onLogout={logout}
    />
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
        <DrawerItems
          openDrawer={openDrawerHandler}
          isAuthenticated={isAuthenticated}
        />
        <Divider />
      </Drawer>
      <Box ml="auto">
        {isAuthenticated ? (
          loggedInMenu
        ) : (
          <LoggedOutMenu onLogin={loginWithPopup} />
        )}
      </Box>
    </Box>
  );

  const desktopNav = () => (
    <Box component={Toolbar} display="flex" alignItems="center">
      <Typography variant="h5">
        <NavLink activeClassName="nav-link-active" exact={true} to="/blogs">
          Home
        </NavLink>
      </Typography>
      {isAuthenticated && (
        <Typography variant="h5" className={classes.addLink}>
          <NavLink activeClassName="nav-link-active" to="/blog/add">
            New Blog
          </NavLink>
        </Typography>
      )}
      <Box ml="auto">
        {isAuthenticated ? (
          loggedInMenu
        ) : (
          <LoggedOutMenu onLogin={loginWithPopup} />
        )}
      </Box>
    </Box>
  );

  return (
    <AppBar position="static">{mobileView ? mobileNav() : desktopNav()}</AppBar>
  );
}
