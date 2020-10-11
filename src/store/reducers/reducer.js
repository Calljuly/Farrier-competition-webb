import { ADD, SUB } from "../actions/actions";
import { shoes } from "../../dummyData";

const initialState = {
  shoes: shoes,
};

const Handler = (state = initialState, actions) => {
  const updatedState = [...state.shoes];

  switch (actions.type) {
    case ADD:
      updatedState.push(actions.data);
      return {
        ...state,
        shoes: updatedState,
      };
    case SUB:
      console.log(actions.data.title);
      const newState = updatedState.filter((item) => {
        return item.title !== actions.data;
      });
      console.log(newState);
      return {
        ...state,
        shoes: newState,
      };
    default:
      return state;
  }
};
export default Handler;
