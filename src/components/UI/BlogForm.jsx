import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Loading from "./Loading";

const BlogForm = ({
  loadingState,
  title,
  submitHandler,
  focusHandler,
  children,
}) => {
  return (
    <Container maxWidth="sm" className="custom-form-container">
      <Box component={Typography} variant="h5" align="center" p={2}>
        {title}
      </Box>

      <Box
        component="form"
        onSubmit={submitHandler}
        onFocus={focusHandler}
        width="100%"
      >
        {children}
      </Box>
      {loadingState && <Loading />}
    </Container>
  );
};

export default BlogForm;
