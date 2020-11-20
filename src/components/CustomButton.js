import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { Colors } from "../colors";
const useStyle = makeStyles({
  button: {
    backgroundColor: Colors.black,
    color: Colors.orange,
    width: "20%",
    padding: 10,
    margin: "20px",
  },
});
const CustomButton = ({ title, onClick }) => {
  const classes = useStyle();
  return (
    <Button className={classes.button} onClick={onClick}>
      {title}
    </Button>
  );
};

export default CustomButton;
