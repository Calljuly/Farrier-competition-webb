import {
  ADD_POINT,
  SAVED,
  FETCH_RESULTS,
  CHANGE_FILTER,
} from "../actions/resultAction";

const initialState = {
  result: [],
  saved: false,
  sort: ''
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
    case CHANGE_FILTER:
      return {
        ...state,
        sort: actions.value,
      };
    default:
      return state;
  }
};

export default ResultReducer;
