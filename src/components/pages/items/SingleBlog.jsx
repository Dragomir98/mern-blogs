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
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";
import apis from "../../../api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "../../UI/ImageContainer";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ActionButton from "../../UI/ActionButton";
import ReadlistToggler from "../../readlist/ReadlistToggler";
import { readlistItems } from "../../../store/readlist-slice";
import { convertFromJSONToHTML } from "../../editor/BlogEditor";

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    maxWidth: "250px",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  [theme.breakpoints.up("sm")]: {
    cardImage: {
      maxHeight: "150px",
    },
  },
}));

export default function SingleBlog(props) {
  const { _id, createdAt, title, image, description } = props.data;
  const { isAuthenticated } = useAuth0();
  const history = useHistory();
  const readlist = useSelector(readlistItems);
  const [readState, setReadState] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const existingIndex = readlist.findIndex((item) => item.id === _id);
    const existingItem = readlist[existingIndex];
    if (existingItem) {
      setReadState(true);
      return;
    }
    setReadState(false);
  }, [readlist, readState]);

  const handleDeleteBlog = (id) => {
    apis.deleteBlogById(id);
    history.replace("/");
  };

  return (
    <Grid item xs={12} sm={6} lg={4} key={_id}>
      <Card>
        <CardActionArea>
          <Box p={1}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <span>Posted on {createdAt.substr(0, 10)}</span>
              {isAuthenticated && (
                <ReadlistToggler data={props.data} readState={readState} />
              )}
            </Box>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.cardTitle}
            >
              {title}
            </Typography>
          </Box>

          <Image url={image} alt={title} className={classes.cardImage} />

          <Box
            dangerouslySetInnerHTML={convertFromJSONToHTML(description)}
            px={3}
            className="description-part"
          ></Box>

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
              <Box display="flex" alignItems="center">
                <ActionButton tooltip="Edit Blog" action="edit">
                  <Link to={`/blogs/update/${_id}`}>
                    <EditIcon />
                  </Link>
                </ActionButton>

                <ActionButton
                  tooltip="Delete Blog"
                  action="delete"
                  clickHandler={() => handleDeleteBlog(_id)}
                >
                  <DeleteIcon />
                </ActionButton>
              </Box>
            )}
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
