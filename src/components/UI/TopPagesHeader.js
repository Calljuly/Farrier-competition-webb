import React from "react";
import PageHeader from "./PageHeader";
import Devider from "./Devider";
import { topPagesHeaderStyle } from './styles/styles';

const TopPagesHeader = (props) => {
  const classes = topPagesHeaderStyle();
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
