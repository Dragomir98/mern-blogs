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
import { Prompt } from "react-router";
import api from "../../api";
import { ErrorAlert, SuccessAlert } from "../material-components/Alerts";
import ImageInput from "../material-components/ImageInput";
import Loading from "../material-components/Loading";

function BlogsAdd() {
  const defaultImage = `${import.meta.env.VITE_DEFAULT_BLOG_IMAGE}`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  //use custom image input component here
  const { image, imageFormat, buttonText, toggleImage, changeImage } =
    ImageInput(defaultImage);

  //handle input validity
  const titleIsValid = title.trim().length > 5;
  const descriptionIsValid = description.trim().length > 15;
  const imageIsValid = image.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (titleIsValid && descriptionIsValid && imageIsValid) {
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
          changeImage(defaultImage);
          setDescription("");
        });
      }
    } catch (err) {
      setFormMessage(ErrorAlert("Error during form submisson!"));
    }
  };

  const formFocusHandler = () => {
    setIsEntering(true);
  };

  return (
    <>
      <Prompt
        when={isEntering}
        message={() =>
          "If you leave this page, your data wil be lost. Are you sure you want to proceed?"
        }
      />
      <Container maxWidth="sm" className="custom-form-container">
        <Box component={Typography} variant="h5" align="center" p={2}>
          New blog
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          onFocus={formFocusHandler}
          width="100%"
        >
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
    </>
  );
}

export default withAuthenticationRequired(BlogsAdd, {
  onRedirecting: () => <Loading />,
});
