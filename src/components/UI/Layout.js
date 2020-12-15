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
      <div
        style={{
          width: "80%",
          margin: "auto",
          backgroundColor: "#FFFFFF",
          padding: "30px 0px 30px 0px",
        }}
      >
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
