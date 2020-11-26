import React from "react";
import Navbar from "../Navbar";
import cover from "../../assets/Images/newpic.jpg";
import Footer from "../footer";
const Layout = ({ children, logOut }) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: 200,
          objectFit: "cover",
          overflow: "hidden",
        }}
      >
        <img src={cover} style={{ width: "100%" }} alt="Header" />
      </div>
      <Navbar logOut={logOut} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
