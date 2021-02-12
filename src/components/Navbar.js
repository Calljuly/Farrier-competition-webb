import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { NavLink, useHistory } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import CustomDrawer from "./CustomDrawer";
import { Colors } from "../colors";
import ForgingScoreLoggo from "../assets/Images/ForgingScores-Logo-White.jpg";

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
    ["@media (max-width:1253px)"]: {
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
    width: 160,
    height: 40,
    margin: 20,
    textDecoration: "none",
    color: Colors.orange,
    fontSize: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      color: "#101820FF",
      backgroundColor: "#F2AA4CFF",
      borderRadius: 5,
    },
  },
  activeLink: {
    margin: 20,
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
    width: "80%",
    alignItems: "center",
    ["@media (max-width:1253px)"]: {
      display: "none",
    },
  },
  menuIcon: {
    fontSize: 40,
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
  const admin = useSelector((state) => state.auth.admin);

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
        <img
          src={ForgingScoreLoggo}
          alt="Loggo"
          style={{ width: "20%", margin: 20 }}
        />
        {admin
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
          {isAuth ? "SIGN OUT" : "SIGN IN"}
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
