import React, { useReducer, useState } from "react";
import TextInput from "../TextInput";
import { compClasses, shoes } from "../../dummyData";
import AddClass from "./addClass";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/competitionAction";
import CustomButton from "../CustomButton";
import CreateCompetitionModal from "../CreateCompetitionModal";
import { useSelector } from "react-redux";
const textInputs = [
  {
    id: 0,
    label: "Name",
    value: "name",
    type: "text",
  },
  {
    id: 1,
    label: "Price",
    value: "price",
    type: "number",
  },
  {
    id: 2,
    label: "Referee",
    value: "referee",
    type: "text",
  },
  {
    id: 3,
    label: "Country",
    value: "country",
    type: "text",
  },
  {
    id: 4,
    label: "Max entries",
    value: "maxEntries",
    type: "number",
  },
];
const initialState = {
  name: "",
  price: "",
  referee: "",
  country: "",
  maxEntries: "",
  classes: [],
  admins: [],
};

const reducer = (state, action) => {
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
        [action.type]: [...action.value],
      };
    default:
      return;
  }
};
const AddCompetition = () => {
  const user = useSelector((state) => state.auth.user);

  const [state, dispatchReducer] = useReducer(reducer, initialState);
  const [modalOpen, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const array = [...state.classes];
  const addNewClassHandler = (newClass) => {
    array.push(newClass);
    dispatchReducer({
      type: "classes",
      value: array,
    });
    setOpenModal(false);
  };
  const createCompetition = () => {
    dispatch(actions.createCompetition(state, user.name));
  };
  return (
    <div>
      <CreateCompetitionModal
        isOpen={modalOpen}
        handleClose={() => setOpenModal(false)}
      >
        <AddClass
          shoes={shoes}
          compClasses={compClasses}
          label="New Class"
          addNewClassHandler={addNewClassHandler}
          closeModal={() => setOpenModal(false)}
        />
      </CreateCompetitionModal>

      <h3>Competition</h3>
      {textInputs.map((item) => (
        <TextInput
          required
          key={item.id}
          label={item.label}
          type={item.type}
          placeholder={item.label}
          onChange={(event) =>
            dispatchReducer({ type: item.value, value: event.target.value })
          }
        />
      ))}
      {state.classes.length}
      <div>
        <CustomButton onClick={() => setOpenModal(true)} title="Add class" />

        <CustomButton onClick={createCompetition} title="Create Competition" />
      </div>
    </div>
  );
};

export default AddCompetition;
