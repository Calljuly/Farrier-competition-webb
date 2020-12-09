import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyle = makeStyles({
  container: {
    width: "90%",
    height: "90%",
    backgroundColor: "#101820FF",
    color: "#F2AA4CFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    transition: "opacity 1s",
    borderRadius: 10,
    textDecoration: "none",
    padding: 20,
    margin: 10,
    "&:hover": {
      opacity: "0.6",
    },
    "&> h1": {
      margin: 20,
      fontSize: 40,
    },
    "&> p": {
      fontSize: "20px",
    },
  },
});
const HomeButton = ({ Icon, title, description, path }) => {
  const classes = useStyle();

  return (
    <Link to={path} className={classes.container}>
      <div className={classes.container}>
        <Icon fontSize="large" />
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default HomeButton;
