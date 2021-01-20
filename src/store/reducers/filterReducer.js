import {
  CHANGE_FILTER,
} from "../actions/filterAction";

const initialState = {
  sort: ''
};

const FilterReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case CHANGE_FILTER:
      return {
        ...state,
        sort: actions.value,
      };
    default:
      return state;
  }
};

export default FilterReducer;
