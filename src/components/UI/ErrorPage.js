import React from "react";
import PageHeader from "./PageHeader";
import P from "./Paragraph";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
const ErrorPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PageHeader>Error 404</PageHeader>
      <ErrorOutlineIcon fontSize="large" />
      <P>This path can not be reached.</P>
      <P>It might not exist or you are not authenticated to reach it</P>
    </div>
  );
};

export default ErrorPage;
