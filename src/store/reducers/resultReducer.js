import { ADD_POINT, SAVED, FETCH_RESULTS } from "../actions/resultAction";
import { firestore } from "../../components/firebase";

const initialState = {
  result: [],
  saved: false,
};

const ResultReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_POINT:
      const updatedState = [...state.result];
      const competitor = [
        ...state.result[0].classes[actions.index].unPublishedResult,
      ];

      const c = competitor.map((item) => {
        if (item.id === actions.id) {
          const a = {
            ...item,
            [actions.cellId]: +actions.data,
          };
          const b = {
            ...a,
            total: reCalculateTotal(a),
          };

          return b;
        }
        return item;
      });

      updatedState[0].classes[actions.index].unPublishedResult = c;
      firestore.collection("competitions").doc("gjhAkbUpupIBrgysmoAG").update({
        updatedState,
      });
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
