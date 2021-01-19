import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { string, func, array } from "prop-types";
import { Colors } from "../colors";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  "&.makeStyles-formControl-42": {
    margin: 0,
  },
  select: {
    "&:before": {
      margin: 0,
      borderBottom: `1px solid ${Colors.black}`,
    },
    "&:after": {
      borderBottom: `1px solid ${Colors.orange}`,
    },
    "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
      borderBottom: `1px solid ${Colors.orange}`,
    },
  },
}));

const CustomSelect = ({ classTypes, label, handler, disabled, id }) => {
  const [value, setValue] = useState("");
  const classes = useStyles();

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
