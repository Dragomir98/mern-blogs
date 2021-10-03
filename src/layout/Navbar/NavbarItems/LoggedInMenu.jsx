import {
  Avatar,
  Box,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuBookIcon from "@material-ui/icons/MenuBook";

const useStyles = makeStyles(() => ({
  iconButton: {
    cursor: "pointer",
  },
  homeLink: {
    marginRight: "5px",
    position: "relative",
  },
}));

const LoggedInMenu = (props) => {
  const classes = useStyles();

  return (
    props.isAuthenticated && (
      <Box display="flex" alignItems="center">
        <Tooltip title="Reading list">
          <Link to="/blogs/read-later" className={classes.homeLink}>
            <MenuBookIcon fontSize="large" />
          </Link>
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
