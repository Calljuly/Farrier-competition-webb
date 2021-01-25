import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  container: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    ["@media (max-width:956px)"]: {
      flexDirection: "column",
    },
  },
});
const ButtonContainer = ({ children }) => {
  const classes = useStyle();
  return <div className={classes.container}>{children}</div>;
};

export default ButtonContainer;
