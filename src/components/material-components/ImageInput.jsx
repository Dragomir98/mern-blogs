import { TextField } from "@mui/material";
import { useState } from "react";
import imageUpload from "../../api/imageUpload";

const ImageInput = (defaultImage = "") => {
  const [image, setImage] = useState(defaultImage);
  const [buttonText, setButtonText] = useState("URL");

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
    <TextField
      variant="outlined"
      type="file"
      id="image"
      name="image"
      accept="image/*"
      onChange={(e) => imageUpload(e.target.files[0], setImage)}
    />
  );

  const toggleImageVariantHandler = () => {
    if (buttonText === "FILE") {
      setButtonText("URL");
      setImageFormat(fileFormat);
    } else if (buttonText === "URL") {
      setButtonText("FILE");
      setImageFormat(urlFormat);
    }
  };

  const changeImageHandler = (resetedImage) => {
    setImage(resetedImage);
  };

  const [imageFormat, setImageFormat] = useState(fileFormat);

  return {
    image,
    imageFormat,
    buttonText,
    toggleImage: toggleImageVariantHandler,
    changeImage: changeImageHandler,
  };
};

export default ImageInput;
