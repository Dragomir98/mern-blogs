import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  CardActions,
  Tooltip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import apis from "../../api";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "../material-components/ImageContainer";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { addToList, removeFromList } from "../../store/readlist-slice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function SingleBlog(props) {
  const { _id, createdAt, title, image, description, toReadLater } = props.data;
  const { isAuthenticated } = useAuth0();
  const history = useHistory();
  const dispatch = useDispatch();
  const readlist = useSelector((state) => state.readlist.items);
  const [readState, setReadState] = useState(false);

  useEffect(() => {
    const existingIndex = readlist.findIndex((item) => item.id === _id);
    const existingItem = readlist[existingIndex];
    if (existingItem) {
      setReadState(true);
    } else {
      setReadState(false);
    }
  }, [readlist, readState]);

  const addToReadlistHandler = () => {
    dispatch(
      addToList({
        id: _id,
        title,
        image,
        description,
      })
    );
  };

  const removeFromReadlistHandler = () => {
    dispatch(removeFromList(_id));
  };

  const handleDeleteBlog = (id) => {
    apis.deleteBlogById(id);
    history.replace("/");
  };

  return (
    <Grid item xs={12} sm={6} md={4} key={_id}>
      <Card>
        <CardActionArea>
          <Box p={1}>
            <span>Posted on {createdAt}</span>

            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>

            {isAuthenticated && (
              <Box>
                {readState ? (
                  <Button onClick={() => removeFromReadlistHandler()}>
                    <BookmarkIcon color="secondary" />
                  </Button>
                ) : (
                  <Button onClick={() => addToReadlistHandler()}>
                    <BookmarkBorderIcon color="secondary" />
                  </Button>
                )}
              </Box>
            )}
          </Box>

          <Image url={image} alt={title} className="card-image" />

          <CardContent>
            <Typography component="p" className="description part">
              {description}
            </Typography>
          </CardContent>

          <Box component={CardActions} justifyContent="space-between">
            <Tooltip title="Read blog">
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to={`/blogs/${_id}`}
              >
                Read
              </Button>
            </Tooltip>

            {isAuthenticated && (
              <Box>
                <Tooltip title="Edit blog">
                  <Button
                    color="secondary"
                    component={Link}
                    to={`/blogs/update/${_id}`}
                  >
                    <EditIcon />
                  </Button>
                </Tooltip>

                <Tooltip title="Delete blog">
                  <Button color="primary" onClick={() => handleDeleteBlog(_id)}>
                    <DeleteIcon />
                  </Button>
                </Tooltip>
              </Box>
            )}
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
