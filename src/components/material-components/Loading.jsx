import { Box, CircularProgress } from "@material-ui/core";

const Loading = () => {
  return (
    <Box
      m="auto"
      display="flex"
      justifyContent="center"
      height="100%"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
