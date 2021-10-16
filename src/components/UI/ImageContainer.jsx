import { CardMedia } from "@mui/material";

const Image = (props) => {
  return (
    <CardMedia component="img" image={props.url} alt={props.alt} {...props} />
  );
};

export default Image;
