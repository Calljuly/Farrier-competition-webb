import React from "react";
import { Button } from "@material-ui/core";
import { customButtonStyle } from './styles/styles';

const CustomButton = ({ title, onClick, disabled }) => {
  const classes = customButtonStyle();
  return (
    <Button disabled={disabled} className={classes.button} onClick={onClick}>
      {title}
    </Button>
  );
};

export default CustomButton;
