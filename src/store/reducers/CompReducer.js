import { SUB } from "../actions/actions";
import { FETCH_COMPETITIONS, ADD_COMPETITOR } from "../actions/CompActions";
import { firestore } from "../../components/firebase";

const initialState = {
  competitions: [],
};

const CompReducer = (state = initialState, actions) => {
  const updatedState = [...state.competitions];
  switch (actions.type) {
    case ADD_COMPETITOR:
      return {
        ...state,
        competitions: actions.data,
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
    case FETCH_COMPETITIONS:
      return {
        competitions: actions.data,
      };
    default:
      return state;
  }
};
export default CompReducer;
