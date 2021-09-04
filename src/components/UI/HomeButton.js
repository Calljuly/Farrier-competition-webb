import React from "react";
import { Link } from "react-router-dom";
import { homeButtonStyle } from './styles/styles';

const HomeButton = ({ Icon, title, path }) => {
  const classes = homeButtonStyle();

  return (
    <Link to={path} className={classes.container}>
      <div className={classes.container}>
        <Icon fontSize="large" />
        <h1>{title}</h1>
      </div>
    </Link>
  );
};

export default HomeButton;
