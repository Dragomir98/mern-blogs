import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import apis from "../../api";
import { toggleSearch } from "../../store/ui-slice";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.up("sm")]: {
    searchBox: {
      flexDirection: "row",
    },
  },
  [theme.breakpoints.down("sm")]: {
    searchBox: {
      flexDirection: "column",
    },
    toggleButton: {
      marginBottom: "15px !important",
    },
  },
}));

export default function Search({ input: keyword, onChange: setKeyword }) {
  const [blogs, setBlogs] = useState();
  const isSearchVisible = useSelector((state) => state.ui.showSearch);
  const dispatch = useDispatch();
  const classes = useStyles();

  const toggleSearchHandler = () => {
    dispatch(toggleSearch());
  };

  useEffect(() => {
    (async function () {
      try {
        const allBlogs = await apis.getAllBlogs();
        setBlogs(allBlogs.data);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    })();
  }, []);

  return (
    <Box width="100%" display="flex" justifyContent="center" py={1}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent={`${isSearchVisible ? "space-between" : "center"} `}
        px={4}
        maxWidth="380px"
        width="100%"
        className={classes.searchBox}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={toggleSearchHandler}
          className={`${isSearchVisible && classes.toggleButton}`}
        >
          {isSearchVisible ? <SearchOffIcon /> : <SearchIcon />}
        </Button>
        {isSearchVisible && (
          <Box component="form" width="100%" maxWidth="300px" minWidth="200px">
            <TextField
              label="Search for a blog"
              variant="outlined"
              color="secondary"
              type="text"
              key="random1"
              value={keyword}
              placeholder="Search for a blog"
              onChange={(e) => setKeyword(e.target.value)}
              className="search-input"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
