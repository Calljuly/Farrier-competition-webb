import React from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Colors } from "../colors";

const Input = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: Colors.orange,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: Colors.orange,
      },
    },
  },
})(TextField);

const TextInput = (props) => {
  return <Input {...props} />;
};

export default TextInput;
