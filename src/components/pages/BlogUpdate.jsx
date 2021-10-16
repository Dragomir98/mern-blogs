import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import api from "../../api";
import { Box, Button, TextField, FormGroup, FormControl } from "@mui/material";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../UI/Alerts";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import ImageInput from "../UI/ImageInput";
import BlogEditor from "../editor/BlogEditor";
import Loading from "../UI/Loading";
import BlogForm from "../UI/BlogForm";

function UpdateBlog() {
  const defaultImage = `${import.meta.env.VITE_DEFAULT_BLOG_IMAGE}`;
  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [formMessage, setFormMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const descriptionHandler = (providedDescription) => {
    setDescription(providedDescription);
  };

  const { image, imageFormat, buttonText, toggleImage, changeImage } =
    ImageInput(defaultImage);

  //handle input validity
  const titleIsValid = title.trim().length > 5;
  const imageIsValid = image.trim().length > 0;

  useEffect(() => {
    document.title = `${import.meta.env.VITE_PROJECT_TITLE} | Update ${id}`;

    (async function () {
      setIsLoading(true);
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

      const contentState = convertFromRaw(blogToUpdate.data.description);
      const editorState = EditorState.createWithContent(contentState);
      setDescription(editorState);

      setIsLoading(false);
    })();
  }, [id, getAccessTokenSilently]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      if (titleIsValid && imageIsValid) {
        const updatedBlog = {
          title,
          image,
          description: convertToRaw(description.getCurrentContent()),
        };

        await api.updateBlogById(id, updatedBlog).then(() => {
          setFormMessage(<SuccessAlert message="Blog successfully updated!" />);
          setTimeout(() => {
            history.replace(`/blogs/${id}`);
          }, 3000);
        });
      }
    } catch (err) {
      setFormMessage(<ErrorAlert message="Error during form submisson!" />);
    }
    setIsLoading(false);
  };

  const formFocusHandler = () => {
    setIsEntering(true);
  };

  return (
    <BlogForm
      submitHandler={handleSubmit}
      focusHandler={formFocusHandler}
      loadingState={isLoading}
    >
      {formMessage}
      <Box component={FormGroup}>
        <FormControl>
          <TextField
            label="title"
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
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
  );
}

export default withAuthenticationRequired(UpdateBlog, {
  onRedirecting: () => <Loading />,
});
