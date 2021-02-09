import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { Colors } from "../colors";
const useStyle = makeStyles({
  button: {
    backgroundColor: Colors.black,
    color: Colors.orange,
    width: 200,
    padding: 10,
    margin: "10px 0px 10px 10px",
    ["@media (max-width:956px)"]: {
      width: "97%",
      alignSelf: "center",
      margin: "10px 0px 10px 0px",
    },
  },
});
const CustomButton = ({ title, onClick, disabled }) => {
  const classes = useStyle();
  return (
    <Button disabled={disabled} className={classes.button} onClick={onClick}>
      {title}
    </Button>
  );
};

export default CustomButton;
