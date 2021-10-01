import { Box, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import api from "../../api";
import Loading from "../material-components/Loading";
import Search from "../material-components/Search";
import ItemList from "../item-list/ItemList";
import Image from "../material-components/ImageContainer";
import posterImage from "../../assets/blog-default-image.jpg";
import { NotLoggedInAlert } from "../material-components/Alerts";
import { useAuth0 } from "@auth0/auth0-react";

function BlogsList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [defaultBlogs, setDefaultBlogs] = useState([]);
  const { isAuthenticated } = useAuth0();

  const updateInput = async (input) => {
    const filtered = await defaultBlogs.filter((blog) => {
      return blog.title.toLowerCase().includes(input.toLowerCase());
    });
    setSearchInput(input);
    setBlogs(filtered);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        await api.getAllBlogs().then((res) => {
          setBlogs(res.data);
          setDefaultBlogs(res.data);
        });
      } catch (err) {
        console.log(`Error: ${err}`);
      }
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <Box component="section" my={5} display="flex" flexDirection="column">
      <Search input={searchInput} onChange={updateInput} />
      <Box
        mb={4}
        height="300px"
        className="poster-container"
        position="relative"
      >
        {!isAuthenticated && (
          <NotLoggedInAlert
            classes="login-alert"
            message="You need to login to create, update or delete blogs."
          />
        )}
        <Image url={posterImage} alt="Blogs" className="poster-image" />
      </Box>
      {loading ? (
        <Loading />
      ) : blogs.length > 0 ? (
        <ItemList list={blogs} />
      ) : (
        <Typography variant="h5" color="secondary" align="center">
          No blogs to display
        </Typography>
      )}
    </Box>
  );
}

export default BlogsList;
