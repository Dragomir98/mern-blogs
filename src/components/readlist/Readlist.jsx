import { Box, Typography, Container } from "@mui/material";
import Loading from "../UI/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { readlistItems } from "../../store/readlist-slice";
import ReadlistItem from "./ReadlistItem";
import { useEffect } from "react";

const styles = makeStyles((theme) => ({
  [theme.breakpoints.up("xs")]: {
    itemContainer: {
      display: "flex",
    },
    readItem: {
      display: "flex",
      flexDirection: "row",
    },
    readItemImage: {
      maxWidth: "40%",
    },
  },
  [theme.breakpoints.down("sm")]: {
    itemContainer: {
      display: "block",
    },
    readItem: {
      display: "flex",
      flexDirection: "column",
      overflow: "visible",
    },
    readItemImage: {
      maxWidth: "100%",
    },
  },
}));

function ReadLater() {
  const classes = styles();
  const readItems = useSelector(readlistItems);

  useEffect(() => {
    document.title = "Readlist";
  }, []);

  return (
    <Box
      component={Container}
      my={3}
      maxWidth="lg"
      alignItems="center"
      flexDirection="column"
      className={classes.itemContainer}
      height={`${readItems.length === 0 ? "100%" : "auto"}`}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        margin="auto 0"
        width="100%"
        height={`${readItems.length === 0 ? "100%" : "auto"}`}
      >
        {readItems.length === 0 ? (
          <Typography variant="h6" align="center">
            You haven't added items to the reading list yet.
          </Typography>
        ) : (
          readItems.map((item) => (
            <ReadlistItem item={item} classes={classes} key={item.id} />
          ))
        )}
      </Box>
    </Box>
  );
}

export default withAuthenticationRequired(ReadLater, {
  onRedirecting: () => <Loading />,
});
