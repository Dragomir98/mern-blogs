import axios from "axios";

const imageUpload = (files, setFiles) => {
  const formData = new FormData();
  formData.append("file", files);
  formData.append(
    "upload_preset",
    `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`
  );
  formData.append(
    "cloud_name",
    `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`
  );

  axios
    .post(`${import.meta.env.VITE_CLOUDINARY_URL}`, formData)
    .then((res) => res)
    .then((data) => {
      if (data.data.secure_url !== "") {
        setFiles(data.data.url);
      }
    });
};

export default imageUpload;
