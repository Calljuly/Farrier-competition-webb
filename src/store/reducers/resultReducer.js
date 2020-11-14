import { ADD_POINT, SAVED, FETCH_RESULTS } from "../actions/resultAction";
//import { result } from "../../dummyData";

const initialState = {
  result: [],
  saved: false
};

const ResultReducer = (state = initialState, actions) => {
  const updatedState = [...state.result];

  switch (actions.type) {
    case ADD_POINT:
      const toUpdateTo = {
        ...updatedState[actions.id],
        [actions.cellId]: +actions.data,
      };
      const lastUpdatedState = {
        ...toUpdateTo,
        total: reCalculateTotal(toUpdateTo),
      };
      updatedState[actions.id] = lastUpdatedState;
      return {
        ...state,
        result: updatedState,
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
        saved: false,
      };
    default:
      return state;
  }
};

const reCalculateTotal = (updatedState) => {
  const first = +updatedState.one * 2.5;
  const second = +updatedState.two * 2.5;
  const third = +updatedState.three * 2.5;
  const fourth = +updatedState.four * 2.5;

  return first + second + third + fourth;
};
export default ResultReducer;
