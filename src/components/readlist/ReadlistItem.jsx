import { Button, Card, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Image from "../UI/ImageContainer";
import { convertFromJSONToHTML } from "../editor/BlogEditor";

const ReadlistItem = ({ item, classes }) => {
  return (
    <Box
      component={Card}
      key={item.id}
      width="100%"
      display="flex"
      flexDirection="row"
      my={2}
      className={classes.readItem}
      key={item.id}
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
          className="description-part"
          pb={2}
        >
          <div
            dangerouslySetInnerHTML={convertFromJSONToHTML(item.description)}
          ></div>
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
            to={`/blogs/${item.id}`}
          >
            Read
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => removeItemFromList(item.id)}
          >
            <DeleteIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReadlistItem;
