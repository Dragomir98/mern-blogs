import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth0 } from "@auth0/auth0-react";
import api from "../../api";
import Loading from "../material-components/Loading";
import Image from "../material-components/ImageContainer";
import { useSelector } from "react-redux";
import ActionButton from "../material-components/ActionButton";
import ReadlistToggler from "../readlist/ReadlistToggler";

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.down("sm")]: {
    blogImage: {
      maxHeight: "150px",
    },
  },
}));

export default function BlogDetails() {
  const { id } = useParams();
  const [currentBlog, setCurrentBlog] = useState("");
  const history = useHistory();
  const { isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState(false);
  const readlist = useSelector((state) => state.readlist.items);
  const [readState, setReadState] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    (async function () {
      setLoading(true);
      const blog = await api.getBlogById(id);
      setCurrentBlog(blog.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const existingIndex = readlist.findIndex((item) => item.id === id);
    const existingItem = readlist[existingIndex];
    if (existingItem) {
      setReadState(true);
    } else {
      setReadState(false);
    }
  }, [readlist]);

  const handleDeleteBlog = (id) => {
    api.deleteBlogById(id);
    history.replace("/blogs");
  };

  return (
    <Box component="section">
      <Box component={Container} height="inherit" maxWidth="lg">
        {loading ? (
          <Loading />
        ) : (
          <Box component={Card} mb={2}>
            <Image
              url={currentBlog.image}
              alt={currentBlog.title}
              height="500px"
              className={classes.blogImage}
            />
            <Box px={2}>
              <Box py={2} display="flex" flexDirection="column">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body1">
                    Submitted on {currentBlog.createdAt}
                  </Typography>
                  {isAuthenticated && (
                    <ReadlistToggler data={currentBlog} readState={readState} />
                  )}
                </Box>
                <Typography variant="h4">{currentBlog.title}</Typography>
              </Box>
              <Divider />
              <Box
                component={Typography}
                variant="body1"
                className="description full"
                py={2}
              >
                {currentBlog.description}
              </Box>
              <Divider />
              <Box
                component={CardActions}
                display="flex"
                align-items="center"
                justifyContent="space-between"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => window.history.go(-1)}
                >
                  Back
                </Button>
                {isAuthenticated && (
                  <Box
                    display="flex"
                    alignItems="center"
                    className="detail-page-actions"
                  >
                    <ActionButton tooltip="Edit Blog" action="edit">
                      <Link to={`/blogs/update/${id}`}>
                        <EditIcon />
                      </Link>
                    </ActionButton>

                    <ActionButton
                      tooltip="Delete Blog"
                      action="delete"
                      clickHandler={() => handleDeleteBlog(id)}
                    >
                      <DeleteIcon />
                    </ActionButton>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
