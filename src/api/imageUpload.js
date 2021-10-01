import axios from "axios";

const imageUpload = (files, setFiles) => {
  const formData = new FormData();
  formData.append("file", files);
  formData.append("upload_preset", "bloglisting");
  formData.append("cloud_name", "dwtp80t7g");

  axios
    .post("https://api.cloudinary.com/v1_1/dwtp80t7g/image/upload", formData)
    .then((res) => res)
    .then((data) => {
      if (data.data.secure_url !== "") {
        setFiles(data.data.url);
      }
    });
};

export default imageUpload;
