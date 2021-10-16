import { Box, Container, Grid } from "@mui/material";
import SingleBlog from "../pages/items/SingleBlog";

const ItemList = ({ list }) => {
  return (
    <Box component={Container} maxWidth="md" pb={2}>
      <Box component={Grid} container spacing={3} justifyContent="center">
        {list.map((item, index) => (
          <SingleBlog data={item} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default ItemList;
