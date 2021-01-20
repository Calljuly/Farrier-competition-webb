import React from "react";
import { makeStyles } from "@material-ui/styles";
import P from "./UI/Paragraph";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Colors } from "../colors";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions/filterAction";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const useStyle = makeStyles({
  container: {
    width: "100%",
    objectFit: "cover",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #DCDCDC",
    margin: "auto",
    padding: 20,
    ["@media (max-width: 1000px)"]: {
      height: "auto",
    },
  },
  contentContainer: {
    width: "80%",
    margin: "auto",
    backgroundColor: "#FFFFFF",
    padding: "30px 0px 30px 0px",
    ["@media (max-width: 1000px)"]: {
      width: "100%",
      padding: 0,
    },
  },

  switch_track: {
    backgroundColor: Colors.black,
    color: Colors.black,
  },
  switch_base: {
    color: Colors.black,
    "&.Mui-disabled": {
      color: "#e886a9",
    },
    "&.Mui-checked": {
      color: Colors.orange,
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: Colors.black,
    },
  },
  switch_primary: {
    "&.Mui-checked": {
      color: "#4CAF50",
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: Colors.orange,
    },
  },
});

const FilterController = () => {
  const classes = useStyle();
  const filter = useSelector((state) => state.filter.sort);

  const dispatch = useDispatch();

  return (
    <div className={classes.container}>
      <P>Pick filter</P>
      <div>
        <FormControl component="fieldset" style={{ marginTop: 20 }}>
          <FormLabel component="legend">
            Pick a filter to sort the competitions
          </FormLabel>
          <FormGroup style={{ display: "flex", flexDirection: "row" }}>
            <RadioGroup
              row
              aria-label="gender"
              name="feet"
              value={filter}
              onChange={(event) =>
                dispatch(actions.changeFilter(event.target.value))
              }
            >
              <FormControlLabel
                value="sortName"
                control={<Radio />}
                label="Sort by Name"
              />
              <FormControlLabel
                value="sortDate"
                control={<Radio />}
                label="Sort by date"
              />
            </RadioGroup>
          </FormGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default FilterController;
