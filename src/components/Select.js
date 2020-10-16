import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { string, func, array, boolean } from "prop-types";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const CustomSelect = ({ classTypes, label, handler, index, disabled }) => {
  const [age, setAge] = useState("");
  const classes = useStyles();

  const handleChange = (event) => {
    event.preventDefault();
    setAge(event.target.value);
    handler(label.toLowerCase(), event.target.value, index);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select value={age} onChange={handleChange} disabled={disabled}>
        {classTypes.map((item) => {
          return (
            <MenuItem key={item.title} value={item.title}>
              {item.title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
CustomSelect.propTypes = {
  classTypes: array,
  label: string,
  handler: func,
  disabled: boolean,
};
export default CustomSelect;
