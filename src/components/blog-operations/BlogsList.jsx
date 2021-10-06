import { Box, Link, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../api";
import Loading from "../material-components/Loading";
import Search from "../material-components/Search";
import ItemList from "../item-list/ItemList";
import Image from "../material-components/ImageContainer";
import posterImage from "../../assets/blog-default-image.jpg";
import { AlertMessage } from "../material-components/Alerts";
import { useAuth0 } from "@auth0/auth0-react";

import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.down("sm")]: {
    posterContainer: {
      display: "none",
    },
  },
}));

function BlogsList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [defaultBlogs, setDefaultBlogs] = useState([]);
  const { loginWithPopup, isAuthenticated } = useAuth0();
  const classes = useStyles();

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

      await api.getAllBlogs().then((res) => {
        setBlogs(res.data);
        setDefaultBlogs(res.data);
      });

      setLoading(false);
    };

    try {
      getData();
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }, []);

  return (
    <Box
      component="section"
      display="flex"
      flexDirection="column"
      position="relative"
    >
      <Search input={searchInput} onChange={updateInput} />
      <Box
        height="300px"
        className={classes.posterContainer}
        position="relative"
      >
        {!isAuthenticated && (
          <AlertMessage type="info" classes="login-alert">
            <strong>
              You need to <Link onClick={loginWithPopup}>login</Link> to create,
              update or delete blogs!
            </strong>
          </AlertMessage>
        )}
        <Image url={posterImage} alt="Blogs" className="poster-image" />
      </Box>
      {loading ? (
        <Box mt={5}>
          <Loading />
        </Box>
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
