import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";

export default function Layout(props) {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
}
