import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { NavLink, useHistory } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import CustomDrawer from "./CustomDrawer";
import { Colors } from "../colors";
import P from "./UI/Paragraph";

const linksAdmin = [
  {
    id: 0,
    label: "Home",
    path: "/",
    exact: true,
  },
  {
    id: 1,
    label: "Profile",
    path: "/myProfile",
    exact: false,
  },
  {
    id: 2,
    label: "Competitions",
    path: "/competitions",
    exact: false,
  },
  {
    id: 3,
    label: "Admin",
    path: "/admin",
    exact: false,
  },
  {
    id: 4,
    label: "Contact",
    path: "/contact",
    exact: false,
  },
];
const linksUnAuth = [
  {
    id: 0,
    label: "Home",
    path: "/",
    exact: true,
  },
  {
    id: 2,
    label: "Competitions",
    path: "/competitions",
    exact: false,
  },
  {
    id: 4,
    label: "Contact",
    path: "/contact",
    exact: false,
  },
];
const linksAuth = [
  {
    id: 0,
    label: "Home",
    path: "/",
    exact: true,
  },
  {
    id: 1,
    label: "Profile",
    path: "/myProfile",
    exact: false,
  },
  {
    id: 2,
    label: "Competitions",
    path: "/competitions",
    exact: false,
  },
  {
    id: 4,
    label: "Contact",
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
    backgroundColor: "#101820FF",
    display: "flex",
    flexDirection: "row",
    margin: 0,
    borderRadius: "0px 0px 10px 10px",
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
    height: 60,
    margin: 20,
    textDecoration: "none",
    color: Colors.orange,
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      color: "#101820FF",
      backgroundColor: "#F2AA4CFF",
      borderRadius: 10,
    },
  },
  activeLink: {
    margin: 20,
    textDecoration: "none",
    color: "#101820FF",
    backgroundColor: "#F2AA4CFF",
    fontSize: 30,
    borderRadius: 10,
    "&:hover": {
      color: "white",
    },
  },

  contentContainer: {
    height: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    ["@media (max-width:1253px)"]: {
      display: "none",
    },
  },
  menuIcon: {
    fontSize: 80,
    color: Colors.orange,
  },
  menuIconContainer: {
    display: "none",
    ["@media (max-width:1253px)"]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 20,
    },
  },
});

const Navbar = () => {
  const [drawerState, setDrawerState] = useState(false);
  const history = useHistory();
  const toggleDrawer = () => {
    setDrawerState((prev) => !prev);
  };

  const classes = useStyle();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <div className={classes.container}>
      <CustomDrawer
        toggleDrawer={toggleDrawer}
        drawerState={drawerState}
        navLinks={user.admin ? linksAdmin : isAuth ? linksAuth : linksUnAuth}
        auth={user.admin}
        logout={() => dispatch(actions.logOut())}
      />
      <div className={classes.menuIconContainer}>
        <MenuIcon onClick={toggleDrawer} className={classes.menuIcon} />
      </div>
      <div className={classes.contentContainer}>
        {user.admin
          ? linksAdmin.map((item) => (
              <NavLink
                key={item.id}
                className={classes.link}
                activeClassName={classes.activeLink}
                to={item.path}
                exact={item.exact}
              >
                <p>{item.label}</p>
              </NavLink>
            ))
          : isAuth
          ? linksAuth.map((item) => (
              <NavLink
                key={item.id}
                className={classes.link}
                activeClassName={classes.activeLink}
                to={item.path}
                exact={item.exact}
              >
                <p>{item.label}</p>
              </NavLink>
            ))
          : linksUnAuth.map((item) => (
              <NavLink
                key={item.id}
                className={classes.link}
                activeClassName={classes.activeLink}
                to={item.path}
                exact={item.exact}
              >
                <p>{item.label}</p>
              </NavLink>
            ))}
        <NavLink
          onClick={
            isAuth
              ? () => dispatch(actions.logOut())
              : () => history.push("/signIn")
          }
          className={classes.link}
          to={isAuth ? "/" : "/signIn"}
        >
          {isAuth ? "Sign out" : "Sign in"}
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
