import {
  FETCH_COMPETITIONS,
  ADD_COMPETITOR,
  CREATE_COMPETITON,
  DELETE_COMPETITION,
  COMPETITION_LOADING,
  ADD_POINT,
} from "../actions/competitionAction";

const initialState = {
  competitions: [],
  isLoading: false,
  result: [],
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
    case ADD_POINT:
      updatedState.map((item) => {
        if (item.competition.id === actions.id) {
          item.divisions.map((i) => {
            if (Object.keys(i)[0] === actions.updatedState.divisions) {
              Object.values(i).map((u) => {
                u.map((y) => {
                  if (y.className === actions.updatedState.className) {
                    y = actions.updatedState;
                  }
                });
              });
            }
          });
        }
      });
      
      return {
        ...state,
        competitions: updatedState,
      };
    default:
      return state;
  }
};
export default CompReducer;
