import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors } from "../../colors";

const useStyle = makeStyles({
  p: {
    fontSize: "20px",
    color: Colors.black,
    fontFamily: "Kohinoor Telugu",
    margin: 5,
    ["@media (max-width:956px)"]: {
      fontSize: 15,
    },
  },
  orange: {
    fontSize: "20px",
    color: Colors.orange,
    ["@media (max-width:956px)"]: {
      fontSize: 15,
    },
  },
});
const P = ({ children, orange }) => {
  const classes = useStyle();
  return <p className={orange ? classes.orange : classes.p}>{children}</p>;
};

export default P;
