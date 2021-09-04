import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { array, func, string } from "prop-types";
import React, { useState } from "react";
import { selectStyle } from './styles/styles';

const CustomSelect = ({ classTypes, label, handler, disabled, id }) => {
  const [value, setValue] = useState("");
  const classes = selectStyle();

  const handleChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
    handler(id, event.target);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={classes.select}
      >
        {classTypes.map((item) => {
          return (
            <MenuItem key={item.type} value={item.type}>
              {item.type}
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
  key: string,
};
export default CustomSelect;
