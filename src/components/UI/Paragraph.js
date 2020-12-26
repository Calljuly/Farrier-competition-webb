import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors } from "../../colors";

const useStyle = makeStyles({
  p: {
    fontSize: "20px",
    color: Colors.black,
    fontFamily: "Constantia",

  },
  orange: {
    fontSize: "20px",
    color: Colors.orange,
  },
});
const P = ({ children, orange }) => {
  const classes = useStyle();
  return <p className={orange ? classes.orange : classes.p}>{children}</p>;
};

export default P;
