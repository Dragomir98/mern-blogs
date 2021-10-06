import {
  Box,
  Typography,
  Container,
  Card,
  Divider,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Loading from "./material-components/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Image from "./material-components/ImageContainer";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  fetchAsyncBlogs,
  removeFromList,
  updateAsyncBlog,
} from "../store/readlist-slice";

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
  [theme.breakpoints.down('sm')]: {
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
  const dispatch = useDispatch();
  const readItems = useSelector((state) => state.readlist.items);
  // const readItems = useSelector((state) => state.readlist.items).reduce(
  //   (arr, item) => {
  //     if (item.toReadLater === true) {
  //       arr.push(item);
  //     }
  //     return arr;
  //   },
  //   []
  // );

  // const updateReadState = (id, updatedData) => {
  //   dispatch(updateAsyncBlog(id, updatedData));
  //   console.log(id);
  //   console.log(updatedData);
  // };

  const removeItemFromList = (id) => {
    dispatch(removeFromList(id));
  };

  // useEffect(() => {
  //   dispatch(fetchAsyncBlogs());
  // }, [dispatch]);

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
        {readItems.length === 0 ? (
          <Typography variant="h6" align="center">
            You haven't added items to the reading list yet.
          </Typography>
        ) : (
          readItems.map((item) => (
            <Box
              component={Card}
              key={item.id}
              width="100%"
              display="flex"
              flexDirection="row"
              my={2}
              className={classes.readItem}
              key={item._id}
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
                    onClick={() => removeItemFromList(item.id)}
                    // onClick={() =>
                    //   updateReadState(item._id, {
                    //     ...item,
                    //     toReadLater: false,
                    //   })
                    // }
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

export default withAuthenticationRequired(ReadLater, {
  onRedirecting: () => <Loading />,
});
