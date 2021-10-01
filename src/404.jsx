import { Box } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function PageNotFound() {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/blogs");
    }, 5000);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      className="not-found"
      height="100%"
    >
      <img
        src="https://res.cloudinary.com/dwtp80t7g/image/upload/v1629836383/samples/not-found-removebg-preview_kjw2pb.png"
        alt="Page not found"
      />
    </Box>
  );
}
