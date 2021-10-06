import { Avatar, Box, Button, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Link, NavLink } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const useStyles = makeStyles(() => ({
  iconButton: {
    cursor: "pointer",
  },
  homeLink: {
    marginRight: "5px",
    position: "relative",
  },
  readlistLink: {
    marginRight: "10px",
    padding: "5px !important",
  },
}));

const LoggedInMenu = (props) => {
  const classes = useStyles();

  return (
    props.isAuthenticated && (
      <Box display="flex" alignItems="center">
        <Tooltip title="Reading list">
          <NavLink
            activeClassName="nav-link-active"
            to="/blogs/read-later"
            className={classes.readlistLink}
          >
            <MenuBookIcon fontSize="large" />
          </NavLink>
        </Tooltip>

        <Avatar
          src={props.user.picture}
          alt={props.user.name}
          onClick={props.avatarClick}
          className={classes.iconButton}
        />
        <Box
          component={Menu}
          id="select-menu"
          anchorEl={props.anchorEl}
          keepMounted
          open={Boolean(props.anchorEl)}
          onClose={props.onClose}
          className="user-select-menu"
        >
          <MenuItem>
            <Typography className={classes.homeLink} variant="h5">
              <Link to="/account">Account</Link>
            </Typography>
          </MenuItem>
          <MenuItem>
            <Button
              variant="contained"
              color="secondary"
              onClick={props.onLogout}
            >
              Logout
            </Button>
          </MenuItem>
        </Box>
      </Box>
    )
  );
};

export default LoggedInMenu;
