import { Paper } from "@material-ui/core";
import React from "react";
import { isLoadingStyle } from './styles/styles';

const IsLoading = () => {
  const classes = isLoadingStyle();
  const { innerHeight: height } = window;

  return (
    <div
      style={{
        width: "100%",
        height: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper className={classes.container}>
        <h3 style={{ margin: 10 }}>Page is Is Loading..</h3>
        <div id="loading" />
        <p className={classes.paragraph}>Please wait..</p>
      </Paper>
    </div>
  );
};

export default IsLoading;
