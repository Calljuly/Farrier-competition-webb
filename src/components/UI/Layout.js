import React from "react";
import Navbar from "../Navbar";
import Footer from "../footer";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  layout: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    overflow: "hidden",
    ["@media (max-width: 1000px)"]: {
      height: "auto",
    },
  },
  contentContainer: {
    width: "80%",
    margin: "auto",
    backgroundColor: "#FFFFFF",
    padding: "0px 0px 30px 0px",
    boxShadow: `3px 3px 3px #b0b3b8`,
    ["@media (max-width: 1000px)"]: {
      width: "100%",
    },
  },
});

const Layout = ({ children, logOut }) => {
  const classes = useStyle();
  return (
    <>
      <Navbar logOut={logOut} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
