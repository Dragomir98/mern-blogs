import { Box } from "@material-ui/core";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout(props) {
  return (
    <Box
      component="section"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Navbar />

      {props.children}

      <Footer />
    </Box>
  );
}
