import { ADD_POINT, SAVED, FETCH_RESULTS } from "../actions/resultAction";
import { firestore } from "../../components/firebase";

const initialState = {
  result: [],
  saved: false,
};

const ResultReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_POINT:
      return {
        ...state,
        result: actions.updatedState,
      };
    case SAVED:
      return {
        ...state,
        saved: true,
      };
    case FETCH_RESULTS:
      return {
        ...state,
        result: actions.data,
      };
    default:
      return state;
  }
};

export default ResultReducer;
