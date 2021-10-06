import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import api from "../../api";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  FormGroup,
  FormControl,
} from "@mui/material";
import { ErrorAlert, SuccessAlert } from "../material-components/Alerts";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";
import Loading from "../material-components/Loading";
import ImageInput from "../material-components/ImageInput";

function BlogsUpdate() {
  const defaultImage = `${import.meta.env.VITE_DEFAULT_BLOG_IMAGE}`;
  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const { image, imageFormat, buttonText, toggleImage, changeImage } =
    ImageInput(defaultImage);

  //handle input validity
  const titleIsValid = title.trim().length > 5;
  const descriptionIsValid = description.trim().length > 15;
  const imageIsValid = image.trim().length > 0;

  useEffect(() => {
    (async function () {
      setLoading(true);
      const token = await getAccessTokenSilently();
      const headers = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const blogToUpdate = await axios.get(
        `${import.meta.env.VITE_BLOG_API}/${id}`,
        headers
      );
      setTitle(blogToUpdate.data.title);
      changeImage(blogToUpdate.data.image);
      setDescription(blogToUpdate.data.description);
      setLoading(false);
    })();
  }, [id, getAccessTokenSilently]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (titleIsValid && descriptionIsValid && imageIsValid) {
        setLoading(true);

        const updatedBlog = {
          title,
          image,
          description,
        };

        await api.updateBlogById(id, updatedBlog).then(() => {
          setFormMessage(<SuccessAlert message="Blog successfully updated!" />);
          setLoading(false);
          setTimeout(() => {
            history.replace(`/blogs/${id}`);
          }, 3000);
        });
      }
    } catch (err) {
      setFormMessage(<ErrorAlert message="Error during form submisson!" />);
    }
  };

  return (
    <Container maxWidth="sm" className="custom-form-container">
      <Box component={Typography} variant="h5" align="center" p={2}>
        Update blog
      </Box>
      <Box component="form" onSubmit={handleSubmit} width="100%">
        {formMessage}
        <Box component={FormGroup}>
          <FormControl>
            <TextField
              label="titie"
              variant="outlined"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {title.trim().length !== 0 && !titleIsValid && (
              <ErrorAlert message="Title must be atleast 5 characters long!" />
            )}
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
            {description.trim().length !== 0 && !descriptionIsValid && (
              <ErrorAlert message="Description must be atleast 15 characters long!" />
            )}
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
              onClick={toggleImage}
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

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!titleIsValid || !descriptionIsValid || !imageIsValid}
          >
            Submit
          </Button>
        </Box>
      </Box>
      {loading && <Loading />}
    </Container>
  );
}

export default withAuthenticationRequired(BlogsUpdate, {
  onRedirecting: () => <Loading />,
});
