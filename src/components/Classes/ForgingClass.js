import React from "react";
import TextInput from "../TextInput";
import SubHeader from "../UI/SubHeader";

const ForgingClass = ({ handleClasses, points, pointsHandler }) => {
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
        id="shoeOneImg"
        type="file"
        onChange={(event) => handleClasses("shoeOneImg", event)}
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
        id="shoeTwoImg"
        type="file"
        onChange={(event) => handleClasses("shoeTwoImg", event)}
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
      <SubHeader>Add points for first shoe</SubHeader>
      {points.map((item, index) => {
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
        onChange={(event) => handleClasses("sponsorLoggo", event)}
      />
    </div>
  );
};

export default ForgingClass;
