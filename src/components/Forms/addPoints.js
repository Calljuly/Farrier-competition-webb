import React, { useState } from "react";
import TextInput from "../TextInput";
import { compClasses, shoes } from "../../dummyData";
import AddClass from "../addClass";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

const AddPoints = ({ confirmPoints, disabled }) => {
  const [numberOne, setNumberOne] = useState(1);
  const [numberTwo, setNumberTwo] = useState(1);
  const [numberThree, setNumberThree] = useState(1);
  const [numberFour, setNumberFour] = useState(1);

  const pointsHandler = (key, event) => {
    event.preventDefault();
    console.log(event.target.value);
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
  return (
    <div>
      <h3>Add points</h3>
      {disabled
        ? compClasses[0].headerTitles.map((item, index) => {
            return (
              <TextInput
                required
                key={index}
                label={item}
                placeholder={item}
                onChange={(event) => pointsHandler(index, event)}
              />
            );
          })
        : compClasses[1].headerTitles.map((item, index) => {
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

      <Button
        onClick={() =>
          confirmPoints({
            numberOne: numberOne,
            numberTwo: numberTwo,
            numberThree: numberThree,
            numberFour: numberFour,
          })
        }
      >
        Confirm your points
      </Button>
    </div>
  );
};

export default AddPoints;
