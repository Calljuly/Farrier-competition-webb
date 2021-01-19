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
    padding: "30px 0px 30px 0px",
    ["@media (max-width: 1000px)"]: {
      width: "100%",
      padding: 0,
    },
  },
});

const Layout = ({ children, logOut }) => {
  const classes = useStyle();
  return (
    <>
      <Navbar logOut={logOut} />
      <div className={classes.contentContainer}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
