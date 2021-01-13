import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Colors } from "../colors";
import P from "./UI/Paragraph";

const useStyle = makeStyles({
  container: {
   
    boxShadow: " 0px 2px 20px rgba(0, 0, 0, 0.07)",
    borderRadius: 10,
    border: ` 1px solid ${Colors.orange}`,
    backgroundColor: Colors.black,
    color: Colors.orange,
    width: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
  },
});

const IsLoading = () => {
  const classes = useStyle();
  return (
    <Paper className={classes.container}>
      <h3>Page is Is Loading..</h3>
      <div id="loading"></div>
      <P>Please wait..</P>
    </Paper>
  );
};

export default IsLoading;
