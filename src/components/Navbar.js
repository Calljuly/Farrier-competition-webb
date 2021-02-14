import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { NavLink, useHistory } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import CustomDrawer from "./CustomDrawer";
import { Colors } from "../colors";
import ForgingScoreLoggo from "../assets/Images/ForgingScores-Logo-White.jpg";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const linksAdmin = [
  {
    id: 0,
    label: "HOME",
    path: "/",
    exact: true,
  },
  {
    id: 1,
    label: "PROFILE",
    path: "/myProfile",
    exact: false,
  },
  {
    id: 2,
    label: "COMPETITIONS",
    path: "/competitions",
    exact: false,
  },
  {
    id: 3,
    label: "ADMIN",
    path: "/admin",
    exact: false,
  },
  {
    id: 4,
    label: "CONTACT",
    path: "/contact",
    exact: false,
  },
];
const linksUnAuth = [
  {
    id: 0,
    label: "HOME",
    path: "/",
    exact: true,
  },
  {
    id: 2,
    label: "COMPETITIONS",
    path: "/competitions",
    exact: false,
  },
  {
    id: 4,
    label: "CONTACT",
    path: "/contact",
    exact: false,
  },
];
const linksAuth = [
  {
    id: 0,
    label: "HOME",
    path: "/",
    exact: true,
  },
  {
    id: 6,
    label: "ABOUT",
    path: "/about",
    exact: true,
  },
  {
    id: 1,
    label: "PROFILE",
    path: "/myProfile",
    exact: false,
  },
  {
    id: 5,
    label: "EDIT PROFILE",
    path: "/myProfile/editProfile",
    exact: false,
  },
  {
    id: 2,
    label: "COMPETITIONS",
    path: "/competitions",
    exact: false,
  },
  {
    id: 4,
    label: "CONTACT",
    path: "/contact",
    exact: false,
  },
];

const useStyle = makeStyles({
  avatar: {
    width: 100,
    height: 100,
  },
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#101820FF",
    flexDirection: "row",
    ["@media (max-width:1300px)"]: {
      justifyContent: "flex-start",
    },
  },
  logo: {
    width: "15%",
    alignSelf: "center",
    margin: 10,
  },
  welcomeContainer: {
    display: "flex",
    flexDirection: "row",
    background: "white",
    flex: 0.9,
    margin: 10,
    padding: 20,
    "&>h1": {
      marginLeft: 20,
    },
  },
  link: {
    width: 170,
    height: 40,
    margin: 20,
    textDecoration: "none",
    color: Colors.orange,
    fontSize: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,

    "&:hover": {
      color: "#101820FF",
      backgroundColor: "#F2AA4CFF",
      borderRadius: 5,
    },
  },
  activeLink: {
    margin: 20,
    padding: 10,
    textDecoration: "none",
    color: "#101820FF",
    backgroundColor: "#F2AA4CFF",
    fontSize: 20,
    borderRadius: 5,
    "&:hover": {
      color: "white",
    },
  },

  contentContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    ["@media (max-width:1300px)"]: {
      display: "none",
    },
  },
  menuIcon: {
    fontSize: 40,
    color: Colors.orange,
  },
  menuIconContainer: {
    display: "none",
    ["@media (max-width:1300px)"]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 20,
    },
  },
});

const Navbar = () => {
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer = () => {
    setDrawerState((prev) => !prev);
  };
  const classes = useStyle();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const admin = useSelector((state) => state.auth.admin);
  const signInState = useSelector((state) => state.auth.signInState);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.container}>
      <CustomDrawer
        toggleDrawer={toggleDrawer}
        drawerState={drawerState}
        navLinks={user.admin ? linksAdmin : isAuth ? linksAuth : linksUnAuth}
        auth={admin}
      />
      <div className={classes.menuIconContainer}>
        <MenuIcon onClick={toggleDrawer} className={classes.menuIcon} />
      </div>
      <div className={classes.contentContainer}>
        <NavLink
          className={classes.link}
          activeClassName={classes.activeLink}
          to="/competitions"
        >
          <p>COMPETITIONS</p>
        </NavLink>
        <NavLink
          className={classes.link}
          activeClassName={classes.activeLink}
          to="/ABOUT"
        >
          <p>ABOUT</p>
        </NavLink>
        <NavLink excat to="/" style={{ width: "20%", margin: 20 }}>
          <img src={ForgingScoreLoggo} alt="Loggo" style={{ width: "100%" }} />
        </NavLink>
        <NavLink
          className={classes.link}
          activeClassName={classes.activeLink}
          to="/contact"
        >
          <p>CONTACT</p>
        </NavLink>
        {isAuth ? (
          <>
            <NavLink
              className={classes.link}
              activeClassName={classes.activeLink}
              to="/myProfile"
            >
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                style={{ color: "inherit", backgroundColor: "inherit" }}
                onMouseOver={handleClick}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 16,
                  }}
                >
                  <p>PROFILE </p>
                  <AccountCircleOutlinedIcon style={{ marginLeft: 10 }} />
                </div>
              </Button>
            </NavLink>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{ marginTop: 50, width: 230 }}
            >
              <MenuItem style={{ width: 190 }}>
                <NavLink
                  exact
                  to="/myProfile"
                  onClick={handleClose}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  My Profile
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink
                  to="/myProfile/editProfile"
                  onClick={handleClose}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Edit Profile
                </NavLink>
              </MenuItem>
              {admin && (
                <MenuItem>
                  <NavLink
                    to="/admin"
                    onClick={handleClose}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Admin
                  </NavLink>
                </MenuItem>
              )}
              <MenuItem>
                <NavLink
                  to="/"
                  onClick={() => dispatch(actions.logOut())}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Logout
                </NavLink>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <NavLink
            onClick={() => dispatch(actions.changeSignInState(!signInState))}
            className={classes.link}
            to="/"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>SIGN IN </p>
              <AccountCircleOutlinedIcon style={{ marginLeft: 10 }} />
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
