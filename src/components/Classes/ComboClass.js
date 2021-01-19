import React from "react";
import { shoes } from "../../dummyData";
import CustomSelect from "../Select";
import TextInput from "../TextInput";
import SubHeader from "../UI/SubHeader";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Devider from "../UI/Devider";

const ComboClass = ({ handleClasses, points, pointsHandler, feet }) => {
  const pointsForge = points[0].headerTitles.filter((item) => {
    if (item !== "Competitor" && item !== "Total Points") {
      return item;
    }
  });
  const pointsShoeing = points[1].headerTitles.filter((item) => {
    if (item !== "Competitor" && item !== "Total Points") {
      return item;
    }
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <CustomSelect
        handler={handleClasses}
        label="Shoe to foot"
        id="shoeToHorse"
        classTypes={shoes}
      />
      <CustomSelect
        handler={handleClasses}
        label="Shoe to forge"
        id="shoeToForge"
        classTypes={shoes}
      />
      <TextInput
        required
        id="shoeTwoImg"
        type="file"
        onChange={(event) => handleClasses("shoeTwoImg", event.target)}
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
        label="Referee"
        placeholder="Referee"
        onChange={(event) => handleClasses("referee", event.target)}
      />
      <Devider margin={20} />
      <FormControl component="fieldset">
        <SubHeader>Pick foot</SubHeader>
        <RadioGroup
          row
          aria-label="gender"
          name="feet"
          value={feet}
          onChange={(event) => handleClasses("feet", event.target)}
        >
          <FormControlLabel
            value="rightFront"
            control={<Radio />}
            label="Right side front"
          />
          <FormControlLabel
            value="leftFront"
            control={<Radio />}
            label="Left side front"
          />
          <FormControlLabel
            value="rightBack"
            control={<Radio />}
            label="Right side back"
          />
          <FormControlLabel
            value="leftBack"
            control={<Radio />}
            label="Left side back"
          />
        </RadioGroup>
      </FormControl>

      <SubHeader>Add points for Shoeing</SubHeader>
      {pointsShoeing.map((item, index) => {
        return (
          <TextInput
            required
            key={index}
            label={item}
            placeholder={item}
            onChange={(event) => pointsHandler(index, event.target)}
          />
        );
      })}
      <SubHeader>Add points for Forgeing</SubHeader>
      {pointsForge.map((item, index) => {
        return (
          <TextInput
            required
            key={index}
            label={item}
            placeholder={item}
            onChange={(event) => pointsHandler(index, event.target)}
          />
        );
      })}
      <SubHeader>Add sponsor</SubHeader>
      <TextInput
        required
        id="sponsor"
        label="Sponsor"
        placeholder="Sponsor"
        onChange={(event) => handleClasses("sponsors", event.target)}
      />
      <TextInput
        required
        id="sponsorLoggo"
        type="file"
        label="Sponsor Loggo"
        placeholder="Sponsor Loggo"
        onChange={(event) => handleClasses("sponsorLoggo", event.target)}
      />
    </div>
  );
};

export default ComboClass;
