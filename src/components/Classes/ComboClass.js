import React from "react";
import { compClasses, shoes } from "../../dummyData";
import CustomSelect from "../Select";
import TextInput from "../TextInput";
import SubHeader from '../UI/SubHeader'
const ForgingClass = ({ handleClasses, points, pointsHandler }) => {
  return (
    <div>
      <TextInput
        required
        id="className"
        label="ClassName"
        placeholder="ClassName"
        onChange={(event) => handleClasses("className", event.target.value)}
      />

      <CustomSelect
        handler={handleClasses}
        label="Shoe Foot"
        id="shoeOne"
        classTypes={shoes}
      />
      <CustomSelect
        handler={handleClasses}
        label="Shoe Forge"
        id="shoeTwo"
        classTypes={shoes}
      />
      <TextInput
        required
        id="time"
        label="Time"
        placeholder="time"
        onChange={(event) => handleClasses("time", event.target.value)}
      />
      <SubHeader>Add points</SubHeader>
      {points.map((item, index) => {
        return (
          <TextInput
            required
            key={index}
            label={item}
            placeholder={item}
            onChange={(event) => pointsHandler(index, event)}
          />
        );
      })}
      <h3>Add sponsor</h3>
      <TextInput
        required
        id="sponsor"
        label="Sponsor"
        placeholder="Sponsor"
        onChange={(event) => handleClasses("sponsors", event.target.value)}
      />
    </div>
  );
};

export default ForgingClass;