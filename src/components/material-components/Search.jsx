import { Box, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import apis from "../../api";

export default function Search({ input: keyword, onChange: setKeyword }) {
  const [blogs, setBlogs] = useState();

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
    <Box width="100%" display="flex" justifyContent="center" pb={4}>
      <Box
        component="form"
        width="100%"
        maxWidth="400px"
        minWidth="200px"
        px={2}
      >
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
    </Box>
  );
}
