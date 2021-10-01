import React, { useContext, useState } from "react";
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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useAuth0 } from "@auth0/auth0-react";
import api from "../../api";
import Loading from "../material-components/Loading";
import ReadListContext from "../../contexts/readlist-context";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Image from "../material-components/ImageContainer";

export default function BlogDetails() {
  const { id } = useParams();
  const readContext = useContext(ReadListContext);
  const [currentBlog, setCurrentBlog] = useState("");
  const history = useHistory();
  const { isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState(false);

  const toggleItemInReadList = () => {
    readContext.updateReadStatus(
      currentBlog._id,
      currentBlog,
      currentBlog.toReadLater
    );
  };

  useEffect(() => {
    (async function () {
      setLoading(true);
      const blog = await api.getBlogById(id);
      setCurrentBlog(blog.data);
      setLoading(false);
    })();
  }, [id]);

  const handleDeleteBlog = (id) => {
    api.deleteBlogById(id);
    history.push("/blogs");
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
            />
            <Box px={2}>
              <Box py={2} display="flex" flexDirection="column">
                <Typography variant="body1">
                  Submitted on {currentBlog.createdAt}
                </Typography>
                {isAuthenticated && (
                  <Box>
                    <Button onClick={() => toggleItemInReadList()}>
                      {currentBlog.readStatus ? (
                        <BookmarkIcon color="secondary" />
                      ) : (
                        <BookmarkBorderIcon color="secondary" />
                      )}
                    </Button>
                  </Box>
                )}
                <Typography variant="h4">{currentBlog.title}</Typography>
              </Box>
              <Divider />
              <Box
                component={Typography}
                variant="h4"
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
                  <Box>
                    <Button
                      color="secondary"
                      component={Link}
                      to={`/blogs/update/${id}`}
                    >
                      <EditIcon fontSize="large" />
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => handleDeleteBlog(id)}
                    >
                      <DeleteIcon fontSize="large" />
                    </Button>
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
