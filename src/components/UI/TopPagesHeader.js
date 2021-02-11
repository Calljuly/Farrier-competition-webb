import React from "react";
import PageHeader from "./PageHeader";
import Devider from "./Devider";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  headerContainer: {
    display: "flex",
    alignItems: "center",
    ["@media (max-width:1000px)"]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
});

const TopPagesHeader = (props) => {
  const classes = useStyle();
  return (
    <>
      <div className={classes.headerContainer}>
        <PageHeader>{props.title}</PageHeader>
        {props.children}
      </div>
      <div className="divOrange" />
      <div className="divBlack" />
      <Devider margin={30} />
    </>
  );
};

export default TopPagesHeader;
