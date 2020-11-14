import React from "react";
import { makeStyles } from "@material-ui/styles";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";

const links = [
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
    color: "#F2AA4CFF",
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
  },
});
const Navbar = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);
  return (
    <div className={classes.container}>
      <div className={classes.contentContainer}>
        {links.map((item) => (
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
        {auth && (
          <NavLink
            className={classes.link}
            to="/admin"
            activeClassName={classes.activeLink}
          >
            Admin
          </NavLink>
        )}
        <NavLink
          onClick={() => dispatch(actions.logOut())}
          className={classes.link}
          to="/"
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
