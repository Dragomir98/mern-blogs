import { Box, Container, Grid } from "@material-ui/core";
import SingleBlog from "./SingleBlog";

const ItemList = ({ list }) => {
  return (
    <Box component={Container} maxWidth="md">
      <Box component={Grid} container spacing={3} justifyContent="center">
        {list.map((item, index) => (
          <SingleBlog data={item} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default ItemList;
