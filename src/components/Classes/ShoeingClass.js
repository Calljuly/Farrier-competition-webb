import React from "react";
import TextInput from "../TextInput";
import SubHeader from "../UI/SubHeader";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Devider from "../UI/Devider";

const ShoingClass = ({ handleClasses, points, pointsHandler, feet }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TextInput
        required
        id="className"
        label="ClassName"
        placeholder="ClassName"
        onChange={(event) => handleClasses("className", event.target)}
      />
      <TextInput
        required
        id="shoeOne"
        label="Shoe One"
        placeholder="Shoe One"
        onChange={(event) => handleClasses("shoeOne", event.target)}
      />
      <TextInput
        required
        id="shoeTwo"
        label="Shoe Two"
        placeholder="Shoe Two"
        onChange={(event) => handleClasses("shoeTwo", event.target)}
      />
      <TextInput
        required
        id="time"
        label="Time"
        placeholder="time"
        onChange={(event) => handleClasses("time", event.target)}
      />
      <TextInput
        required
        id="referee"
        label="Judge"
        placeholder="Referee"
        onChange={(event) => handleClasses("referee", event.target)}
      />
      <Devider margin={20} />
      <FormControl component="fieldset">
        <SubHeader>Pick feet</SubHeader>
        <RadioGroup
          row
          name="feet"
          value={feet}
          onChange={(event) => handleClasses("feet", event.target)}
        >
          <FormControlLabel
            value="side"
            control={<Radio />}
            label="Left/Right side"
          />
          <FormControlLabel
            value="diagonal"
            control={<Radio />}
            label="Diagonal"
          />
          <FormControlLabel
            value="back"
            control={<Radio />}
            label="Back feet"
          />
          <FormControlLabel
            value="front"
            control={<Radio />}
            label="Front feet"
          />
        </RadioGroup>
      </FormControl>
      <SubHeader>Add points for first shoe</SubHeader>
      <p>If not filled out values will get default values (2.5)</p>
      {points.map((item, index) => {
        return (
          <TextInput
            key={index}
            label={item}
            placeholder={item}
            onChange={(event) => pointsHandler(index, event.target)}
          />
        );
      })}
      <SubHeader>Add sponsor</SubHeader>
      <TextInput
        id="sponsor"
        label="Sponsor"
        placeholder="Sponsor"
        onChange={(event) => handleClasses("sponsors", event.target)}
      />
      <TextInput
        id="sponsorLoggo"
        type="file"
        label="Sponsor Loggo"
        placeholder="Sponsor Loggo"
        onChange={(event) => handleClasses("sponsorLoggo", event)}
      />
    </div>
  );
};

export default ShoingClass;
