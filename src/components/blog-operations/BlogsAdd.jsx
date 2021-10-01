import { withAuthenticationRequired } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import api from "../../api";
import imageUpload from "../../api/imageUpload";
import { ErrorAlert, SuccessAlert } from "../material-components/Alerts";
import Loading from "../material-components/Loading";

function BlogsAdd() {
  const defaultImage =
    "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(defaultImage);
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("URL");
  const [formMessage, setFormMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const BlogImage = () => {
    if (buttonText === "FILE") {
      setButtonText("URL");
      setImageFormat(fileFormat);
    } else {
      setButtonText("FILE");
      setImageFormat(urlFormat);
    }
  };

  const urlFormat = (
    <TextField
      label="Enter image url"
      variant="outlined"
      type="url"
      id="image"
      onChange={(e) => setImage(e.target.value)}
    />
  );
  const fileFormat = (
    <>
      <TextField
        variant="outlined"
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={(e) => imageUpload(e.target.files[0], setImage)}
      />
    </>
  );

  const [imageFormat, setImageFormat] = useState(fileFormat);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (title && description) {
        setLoading(true);

        if (!image || image === "") setImage(defaultImage);

        const newBlog = {
          title,
          image,
          description,
        };

        await api.insertBlog(newBlog).then(() => {
          setFormMessage(SuccessAlert("Blog successfully added!"));
          setLoading(false);

          setTitle("");
          setImage(defaultImage);
          setDescription("");
        });
      } else setFormMessage(ErrorAlert("Empty input fields"));
    } catch (err) {
      setFormMessage(ErrorAlert(`Error during form submisson: ${err}`));
    }
  };

  return (
    <Container maxWidth="sm" className="custom-form-container">
      <Box component={Typography} variant="h5" align="center" p={2}>
        New blog
      </Box>

      <Box component="form" onSubmit={handleSubmit} width="100%">
        {formMessage}
        <Box component={FormGroup} my={2}>
          <FormControl>
            <TextField
              label="titie"
              variant="outlined"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box component={FormGroup} my={2}>
          <FormControl>
            <TextField
              label="description"
              variant="outlined"
              type="text"
              multiline={true}
              minRows={3}
              maxRows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box component={FormGroup} my={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="primary"
              id="image-type"
              onClick={BlogImage}
            >
              {buttonText}
            </Button>
            <FormControl id="image-container" className="image-link">
              {imageFormat}
            </FormControl>
          </Box>
        </Box>

        <Box
          my={2}
          display="flex"
          justifyContent="center"
          className="custom-form-actions"
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => window.history.go(-1)}
          >
            Back
          </Button>

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
      {loading && <Loading />}
    </Container>
  );
}

export default withAuthenticationRequired(BlogsAdd, {
  onRedirecting: () => <Loading />,
});
