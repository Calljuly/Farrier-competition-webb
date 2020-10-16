import React, { useReducer, useState } from "react";
import TextInput from "../TextInput";
import { compClasses, shoes } from "../../dummyData";
import AddClass from "../addClass";
import { Button } from "@material-ui/core";
const textInputs = [
  {
    id: 0,
    label: "Name",
    value: "name",
  },
  {
    id: 1,
    label: "Price",
    value: "price",
  },
  {
    id: 2,
    label: "Referee",
    value: "referee",
  },
  {
    id: 3,
    label: "Country",
    value: "country",
  },
  {
    id: 4,
    label: "Max entries",
    value: "maxEntries",
  },
];
const initialState = {
  name: "",
  price: "",
  referee: "",
  country: "",
  maxEntries: "",
  classes: [],
};

function reducer(state, action) {
  console.log(state);
  console.log(action);

  switch (action.type) {
    case "name":
      return { ...state, [action.type]: action.value };
    case "price":
      return { ...state, [action.type]: action.value };
    case "referee":
      return { ...state, [action.type]: action.value };
    case "country":
      return { ...state, [action.type]: action.value };
    case "maxEntries":
      return { ...state, [action.type]: action.value };
    case "classes":
      return {
        ...state,
        [action.type]: action.value,
      };
    default:
      return;
  }
}
const AddCompetition = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [classesObject, setClasses] = useState({
    pointsToMultiply: [],
    shoeToForge: "",
    shoeToHorse: "",
    time: "",
    type: "",
    orging: "",
    measurements: "",
    "nailplacement/ fit": "",
    "flat / finish": "",
    "total Points": "",
    "shoe fit": "",
    "trimming/balance": "",
    shoe: "",
    "nailing and finish": "",
    "total points": "",
  });
  const handleClasses = (key, value, index) => {
    setClasses((prev) => {
      const a = {
        ...prev,
        [key.toLowerCase()]: value,
      };
      return a;
    });
  };

  const addNewClassHandler = () => {
    const newClassesArray = [...classesObject];
    newClassesArray.push({
      pointsToMultiply: [],
      shoeToForge: "",
      shoeToHorse: "",
      time: "",
      type: "",
    });
    setClasses(newClassesArray);
  };
  return (
    <div>
      <h3>Competition</h3>
      {textInputs.map((item, index) => (
        <TextInput
          required
          key={item.id}
          label={item.label}
          placeholder={item.label}
          onChange={(event) =>
            dispatch({ type: item.value, value: event.target.value })
          }
        />
      ))}

      <AddClass
        disabled={classesObject.type === "forging"}
        shoes={shoes}
        compClasses={compClasses}
        handleClasses={handleClasses}
        label=" New Class"
      />

      <Button onClick={addNewClassHandler}>Add new class</Button>
    </div>
  );
};

export default AddCompetition;
