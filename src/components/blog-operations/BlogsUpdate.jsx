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
} from "@material-ui/core";
import imageUpload from "../../api/imageUpload";
import { ErrorAlert, SuccessAlert } from "../material-components/Alerts";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";
import Loading from "../material-components/Loading";

function BlogsUpdate() {
  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
  );
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("URL");
  const [formMessage, setFormMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

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
      setImage(blogToUpdate.data.image);
      setDescription(blogToUpdate.data.description);
      setLoading(false);
    })();
  }, [id, getAccessTokenSilently]);

  //handle image upload variant
  const BlogImage = () => {
    if (buttonText === "FILE") {
      setButtonText("URL");
      setImageFormat(fileFormat);
    } else if (buttonText === "URL") {
      setButtonText("FILE");
      setImageFormat(urlFormat);
    }
  };

  const urlFormat = (
    <TextField
      variant="outlined"
      type="url"
      id="image"
      value={image}
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
      if (titleIsValid && descriptionIsValid && imageIsValid) {
        setLoading(true);

        const updatedBlog = {
          title,
          image,
          description,
        };

        await api.updateBlogById(id, updatedBlog).then(() => {
          setFormMessage(SuccessAlert("Blog successfully updated!"));
          setLoading(false);
          setTimeout(() => {
            history.replace(`/blogs/${id}`);
          }, 3000);
        });
      }
    } catch (err) {
      setFormMessage(ErrorAlert(`Error during form submisson: ${err}`));
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
            {title.trim().length !== 0 &&
              !titleIsValid &&
              ErrorAlert("Title must be atleast 5 characters long!")}
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
            {description.trim().length !== 0 &&
              !descriptionIsValid &&
              ErrorAlert("Description must be atleast 15 characters long!")}
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
