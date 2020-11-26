import {
  FETCH_COMPETITIONS,
  ADD_COMPETITOR,
  CREATE_COMPETITON,
  DELETE_COMPETITION,
  COMPETITION_LOADING,
} from "../actions/competitionAction";

const initialState = {
  competitions: [],
  isLoading: true,
};

const CompReducer = (state = initialState, actions) => {
  const updatedState = [...state.competitions];
  switch (actions.type) {
    case ADD_COMPETITOR:
      return {
        ...state,
        competitions: actions.data,
      };

    case FETCH_COMPETITIONS:
      return {
        competitions: actions.data,
      };
    case CREATE_COMPETITON:
      updatedState.push({
        classes: actions.data.classes,
        currentEntries: 0,
        result: [],
        entries: [],
        maxEntries: actions.data.maxEntries,
        name: actions.data.name,
        price: actions.data.price,
        referee: actions.data.referee,
      });
      return {
        ...state,
        competitions: updatedState,
      };
    case DELETE_COMPETITION:
      const a = updatedState.filter((item) => {
        if (item.id !== actions.competition) {
          return item;
        }
      });
      return {
        ...state,
        competitions: a,
      };
    case COMPETITION_LOADING:
      return {
        ...state,
        isLoading: actions.loading,
      };
    default:
      return state;
  }
};
export default CompReducer;
