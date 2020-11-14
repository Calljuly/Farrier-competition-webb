import React from "react";
import Navbar from "../Navbar";
import cover from "../../assets/Images/newpic.jpg";

const Layout = ({ children, logOut }) => {
  return (
    <div style={{ height: "100vh", width: "200vh", margin: "0px" }}>
      <div
        style={{
          width: "100%",
          height: 200,
          objectFit: "cover",
          overflow: "hidden",
        }}
      >
        <img src={cover} style={{ width: "100%" }} />
      </div>
      <Navbar logOut={logOut} />
      {children}
    </div>
  );
};

export default Layout;
