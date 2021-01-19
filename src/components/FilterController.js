import React from "react";
import { makeStyles } from "@material-ui/styles";
import P from "./UI/Paragraph";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Colors } from "../colors";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions/resultAction";
import Select from "./Select";

const useStyle = makeStyles({
  container: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    overflow: "hidden",
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

const FilterController = ({}) => {
  const classes = useStyle();
  const filter = useSelector((state) => state.result.sortName);
  const dispatch = useDispatch();
  console.log(filter);
  return (
    <div className={classes.container}>
      <P>Pick filter</P>
      <div>
        <FormControlLabel
          control={
            <Switch
              classes={{
                track: classes.switch_track,
                switchBase: classes.switch_base,
                colorPrimary: classes.switch_primary,
              }}
              checked={filter}
              onChange={(event) =>
                dispatch(actions.changeFilter(event.target.checked))
              }
              name="sortName"
            />
          }
          label="Sort by name"
        />
      </div>
    </div>
  );
};

export default FilterController;
