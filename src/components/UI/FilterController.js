import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/filterAction";
import { filterControllerStyle } from './styles/styles';
import P from "./Paragraph";

const FilterController = () => {
  const classes = filterControllerStyle();
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
