import React, { useState } from "react";
import TextInput from "../TextInput";
import CustomSelect from "../Select";
import { string, func, shape, array, boolean } from "prop-types";
import { compClasses, shoes } from "../../dummyData";

import CustomButton from "../CustomButton";
import { Grid } from "@material-ui/core";
import P from "../UI/Paragraph";
const AddClass = ({ label, addNewClassHandler, closeModal }) => {
  const [numberOne, setNumberOne] = useState(1);
  const [numberTwo, setNumberTwo] = useState(1);
  const [numberThree, setNumberThree] = useState(1);
  const [numberFour, setNumberFour] = useState(1);
  const [classesObject, setClasses] = useState({
    className: "",
    pointsToMultiply: [],
    shoeToForge: "",
    shoeToHorse: "",
    time: "",
    type: "",
    result: [],
    unPublishedResult: [],
    sponsors: "",
  });
  const index = classesObject.type === "forging" ? 1 : 0;
  const points = compClasses[index].headerTitles.filter((item) => {
    if (item !== "Competitor" && item !== "Total Points") {
      return item;
    }
  });

  const handleClasses = (key, value) => {
    setClasses((prev) => {
      const newValue = {
        ...prev,
        [key]: value,
      };
      return newValue;
    });
  };

  const pointsHandler = (key, event) => {
    event.preventDefault();
    switch (key) {
      case 0:
        setNumberOne(event.target.value);
        break;
      case 1:
        setNumberTwo(event.target.value);
        break;
      case 2:
        setNumberThree(event.target.value);
        break;
      case 3:
        setNumberFour(event.target.value);
        break;
      default:
        return;
    }
  };

  const submitNewClass = () => {
    const newClass = {
      ...classesObject,
      pointsToMultiply: [numberOne, numberTwo, numberThree, numberFour],
    };
    addNewClassHandler(newClass);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <h3>What shall I do ? </h3>
          <P>
            Here you specify the information you want for the class you want to
            add to your competition. <br />
            You shall fill in the form and press "Create class" to add the new
            class to the competition. If you want to add more classes just keep
            on adding new classes until you're done. <br />
            <br />
            Dont forget to check your data you're adding so it's what you wish
            for before creating the class
            <br />
            If you want to change something afterwards dont worry, you can
            navigate to edit your competitions
          </P>
        </Grid>
        <Grid item md={8} xs={12}>
          <h3>{label}</h3>
          <TextInput
            required
            id="className"
            label="ClassName"
            placeholder="ClassName"
            onChange={(event) => handleClasses("className", event.target.value)}
          />
          <CustomSelect
            handler={handleClasses}
            label="Type"
            id={"type"}
            classTypes={compClasses}
          />
          <CustomSelect
            handler={handleClasses}
            label="Shoe to Forge"
            id="shoeToForge"
            classTypes={shoes}
          />
          <CustomSelect
            handler={handleClasses}
            label="Shoe to Horse"
            id="shoeToHorse"
            classTypes={shoes}
            disabled={classesObject.type === "forging"}
          />
          <TextInput
            required
            id="time"
            label="Time"
            placeholder="time"
            onChange={(event) => handleClasses("time", event.target.value)}
          />
          <h3>Add points</h3>
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
            onChange={(event) => handleClasses("sponsor", event.target.value)}
          />
          <div style={{ display: "flex" }}>
            <CustomButton
              onClick={() => submitNewClass()}
              title="Create class"
            />
            <CustomButton onClick={closeModal} title="Cancel" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
AddClass.propTypes = {
  label: string,
  handleClasses: func,
  closeModal: func,
};
export default AddClass;
