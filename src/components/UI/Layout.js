import React from "react";
import Footer from "./footer";
import Navbar from "./Navbar";
import { layoutStyle } from './styles/styles';

const Layout = ({ children, logOut, signInState, setSignInState }) => {
  const classes = layoutStyle();
  return (
    <>
      <Navbar logOut={logOut} signInState={signInState} setSignInState={setSignInState} />
      <div className={classes.contentContainer}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
