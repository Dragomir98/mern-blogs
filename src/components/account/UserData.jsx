import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import makeStyles from "@mui/styles/makeStyles";

const styles = makeStyles((theme) => ({
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  dataHeading: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  data: {
    padding: theme.spacing(3),
    boxSizing: "border-box",
  },
  [theme.breakpoints.down("md")]: {
    userLayout: {
      flexDirection: "column",
    },
    intro: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: theme.spacing(3),
    },
    img: {
      width: "200px",
    },
    metaData: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  },
}));

export default function UserData() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, logout } =
    useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const classes = styles();

  useEffect(() => {
    document.title = `${import.meta.env.VITE_PROJECT_TITLE} | Account`;
  }, []);

  if (isLoading) {
    return (
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      flexDirection="column"
      height="100%"
      className={`user-profile ${classes.flexCenter}`}
      py={2}
    >
      <Box
        component={Container}
        display="flex"
        alignItems="center"
        justifyContent="center"
        maxWidth="lg"
      >
        {isAuthenticated ? (
          <Box
            component={Card}
            display="flex"
            alignItems="center"
            height="100%"
            width="100%"
            className={classes.userLayout}
          >
            <Box
              className={`profile-intro ${classes.intro} ${classes.flexColumn}`}
              height="100%"
              justifyContent="center"
              px={2}
            >
              <img
                src={user.picture}
                alt={user.name}
                className={`user-image ${classes.img}`}
              />
              <h2>{user.nickname}</h2>
            </Box>
            <Box
              className={`profile-data ${classes.data} ${classes.flexColumn}`}
              flexGrow={1}
              height="100%"
              width="100%"
              boxSizing="border-box"
            >
              <Typography variant="h6" className={classes.dataHeading}>
                Email: {user.email}
              </Typography>
              <Divider />
              <Typography
                variant="h6"
                className={`verification ${classes.dataHeading} ${
                  user.email_verified ? "verified" : "not-verified"
                }`}
              >
                Status:{" "}
                {user.email_verified ? (
                  <>
                    verified <CheckCircleIcon />
                  </>
                ) : (
                  <>
                    not verified <CancelIcon />
                  </>
                )}
              </Typography>
              <Divider />
              <Box
                className={`${classes.flexCenter} ${classes.metaData}`}
                height="100%"
              >
                {userMetadata ? (
                  <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
                ) : (
                  "No user metadata defined"
                )}
              </Box>
              <Box mt={{ xs: 1, md: 0 }} textAlign="right">
                <Button variant="contained" color="secondary" onClick={logout}>
                  Logout
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Typography variant="h4" align="center" color="secondary">
              You need to be logged in to view this panel
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
