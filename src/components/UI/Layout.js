import React from "react";
import Navbar from "../Navbar";
const Layout = ({ children, logOut }) => {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar logOut={logOut} />
      {children}
    </div>
  );
};

export default Layout;
