import React, { useState } from "react";
import TextInput from "../TextInput";
import CustomSelect from "../Select";
import { string, func, shape, number, array, boolean } from "prop-types";
import CustomButton from "../CustomButton";

const AddClass = ({ label, compClasses, shoes, addNewClassHandler }) => {
  const [numberOne, setNumberOne] = useState(1);
  const [numberTwo, setNumberTwo] = useState(1);
  const [numberThree, setNumberThree] = useState(1);
  const [numberFour, setNumberFour] = useState(1);
  const [classesObject, setClasses] = useState({
    pointsToMultiply: [],
    shoeToForge: "",
    shoeToHorse: "",
    time: "",
    type: "",
    result: [],
    unPublishedResults:[]
  });
  const index = classesObject.type === "forging" ? 1 : 0;
  const points = compClasses[index].headerTitles.filter((item) => {
    if (item !== "Competitor" && item !== "Total Points") {
      return item;
    }
  });

  const handleClasses = (key, value, index) => {
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
    console.log(newClass)
    addNewClassHandler(newClass);
  };

  return (
    <div>
      <h3>{label}</h3>
      <CustomSelect
        handler={handleClasses}
        label="type"
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
      <CustomButton onClick={() => submitNewClass()} title="Add new class" />
    </div>
  );
};
AddClass.propTypes = {
  label: string,
  handleClasses: func,
  compClasses: shape({
    type: string,
    value: string,
    headerTitles: array,
    description: string,
  }),
  shoes: shape({
    title: string,
    price: number,
    description: string,
    img: string,
  }),
  disabled: boolean,
};
export default AddClass;
