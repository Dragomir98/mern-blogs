import { withAuthenticationRequired } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import api from "../../api";
import { useState } from "react";
import { Prompt } from "react-router";
import { ErrorAlert, SuccessAlert } from "../UI/Alerts";
import { EditorState, convertToRaw } from "draft-js";
import ImageInput from "../UI/ImageInput";
import BlogEditor from "../editor/BlogEditor";
import Loading from "../UI/Loading";
import BlogForm from "../UI/BlogForm";

function NewBlog() {
  const defaultImage = `${import.meta.env.VITE_DEFAULT_BLOG_IMAGE}`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [formMessage, setFormMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const descriptionHandler = (providedDescription) => {
    setDescription(providedDescription);
  };

  //use custom image input component here
  const { image, imageFormat, buttonText, toggleImage, changeImage } =
    ImageInput(defaultImage);

  //handle input validity
  const titleIsValid = title.trim().length > 5;
  const imageIsValid = image.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      if (titleIsValid && imageIsValid) {
        if (!image || image === "") setImage(defaultImage);

        const newBlog = {
          title,
          image,
          description: convertToRaw(description.getCurrentContent()),
        };

        await api.insertBlog(newBlog).then(() => {
          setFormMessage(<SuccessAlert message="Blog successfully added!" />);

          setTitle("");
          changeImage(defaultImage);
          setDescription(EditorState.createEmpty());
        });
      }
    } catch (err) {
      setFormMessage(<ErrorAlert message="Error during form submisson!" />);
    }
    setLoading(false);
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
      <BlogForm
        submitHandler={handleSubmit}
        focusHandler={formFocusHandler}
        loadingState={isLoading}
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
            {title.trim().length !== 0 && !titleIsValid && (
              <ErrorAlert message="Title must be atleast 5 characters long!" />
            )}
          </FormControl>
        </Box>

        <BlogEditor
          description={description}
          descriptionHandler={descriptionHandler}
        />

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
            disabled={!titleIsValid || !imageIsValid}
          >
            Submit
          </Button>
        </Box>
      </BlogForm>
    </>
  );
}

export default withAuthenticationRequired(NewBlog, {
  onRedirecting: () => <Loading />,
});
