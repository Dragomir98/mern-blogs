import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BLOG_API}`,
});

export const insertBlog = (payload) => api.post("/", payload);
export const getAllBlogs = () => api.get("/");
export const updateBlogById = (id, payload) => api.put(`/${id}`, payload);
export const deleteBlogById = (id) => api.delete(`/${id}`);
export const getBlogById = (id) => api.get(`/${id}`);

const apis = {
  insertBlog,
  getAllBlogs,
  updateBlogById,
  deleteBlogById,
  getBlogById,
};

export default apis;
