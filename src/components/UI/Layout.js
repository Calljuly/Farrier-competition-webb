import React from "react";
import Navbar from "../Navbar";
import Footer from "../footer";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  contentContainer: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 20,
  },
});

const Layout = ({ children, logOut, signInState, setSignInState }) => {
  const classes = useStyle();
  return (
    <>
      <Navbar logOut={logOut} signInState={signInState} setSignInState={setSignInState} />
      <div className={classes.contentContainer}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
