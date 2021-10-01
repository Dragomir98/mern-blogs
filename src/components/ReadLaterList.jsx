import {
  Box,
  Typography,
  Container,
  Card,
  Divider,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import ReadLaterContext from "../contexts/readlist-context";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import Loading from "./material-components/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import api from "../api/index";
import Image from "./material-components/ImageContainer";
import { memo } from "react";
import { makeStyles } from "@material-ui/styles";

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
  [theme.breakpoints.down("xs")]: {
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
  const readContext = useContext(ReadLaterContext);
  const { updateReadStatus } = readContext;
  const [readList, setReadList] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = styles();

  const removeFromList = (id, payload, readState) => {
    updateReadStatus(id, payload, readState);
  };

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const res = await api.getAllBlogs();
        const filteredData = res.data.filter(
          (item) => item.toReadLater === true
        );
        setReadList(filteredData);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <Box
      component={Container}
      my={3}
      maxWidth="lg"
      alignItems="center"
      flexDirection="column"
      className={classes.itemContainer}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        margin="auto 0"
        width="100%"
      >
        {readList.length === 0 ? (
          <Typography variant="h6" align="center">
            You haven't added items to the reading list yet.
          </Typography>
        ) : (
          readList.map((item) => (
            <Box
              component={Card}
              key={item._id}
              width="100%"
              display="flex"
              flexDirection="row"
              my={2}
              className={classes.readItem}
            >
              <Image
                url={item.image}
                alt={item.title}
                className={`card-image readlist-image ${classes.readItemImage}`}
              />
              <Box flexGrow={1} p={2} display="flex" flexDirection="column">
                <Typography variant="h6">{item.title}</Typography>
                <Divider />

                <Box
                  component={Typography}
                  variant="body1"
                  className="description readlist-details"
                  pb={2}
                >
                  {item.description}
                </Box>

                <Box
                  className="readlist-actions"
                  mt="auto"
                  display="flex"
                  justifyContent="flex-end"
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    className="btn-spacing-right"
                    component={Link}
                    to={`/blogs/${item._id}`}
                  >
                    Read
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      removeFromList(item._id, item, item.toReadLater)
                    }
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}

export default withAuthenticationRequired(memo(ReadLater), {
  onRedirecting: () => <Loading />,
});
