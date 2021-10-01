import { CardMedia } from "@material-ui/core";

const Image = (props) => {
  return (
    <CardMedia component="img" image={props.url} alt={props.alt} {...props} />
  );
};

export default Image;
