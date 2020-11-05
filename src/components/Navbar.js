import React from "react";
import { Avatar } from "@material-ui/core";
import { users } from "../dummyData";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";

const useStyle = makeStyles({
  avatar: {
    width: 100,
    height: 100,
  },
  container: {
    width: "100%",
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "row",
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
    textDecoration: "none",
    color: "white",
    fontSize: 30,
    margin: 10,
    "&:hover": {
      color: "blue",
    },
  },
  contentContainer: {
    height: "100%",
    flex: 1,
  },
});
const Navbar = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);
  return (
    <div className={classes.container}>
      <img
        className={classes.logo}
        alt="Loggo"
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSdNDXa5K731C5bU_b83eUK3YaI2NmVd-ZcwnZMGJyHFUfgWPjwPdnaGwX3ECyKWwrKvfXLPWlW_YiOXzz663Wq6e-dIK9ThiFocBhQ&usqp=CAU&ec=45704948"
        }
      />
      <div className={classes.contentContainer}>
        <Link className={classes.link} to="/">
          Home
        </Link>
        <Link className={classes.link} to="/myProfile">
          Profile
        </Link>
        <Link className={classes.link} to="/competitions">
          Competitions
        </Link>
        {auth && (
          <Link className={classes.link} to="/admin">
            Admin
          </Link>
        )}
        <Link className={classes.link} to="/contact">
          Contact
        </Link>
        <Link
          onClick={() => dispatch(actions.logOut())}
          className={classes.link}
          to="/"
        >
          Logout
        </Link>
        <div className={classes.welcomeContainer}>
          <Avatar className={classes.avatar} src={users[0].img} />
          <h1>Welcome {users[0].name}</h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
