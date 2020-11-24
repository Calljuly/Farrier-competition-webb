import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors } from "../../colors";

const useStyle = makeStyles({
  p: {
    fontSize: "20px",
    color: Colors.black,
  },
});
const P = ({ children }) => {
  const classes = useStyle();
  return <p className={classes.p}>{children}</p>;
};

export default P;
