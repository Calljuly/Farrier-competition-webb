import { IS_AUTH, IS_LOADING, ERROR } from "../actions/auth";

const initialState = {
  isAuth: false,
  isLoading: false,
  error: false,
  user: {},
};

export const authReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case IS_AUTH:
      return {
        ...state,
        isAuth: action.auth,
        isLoading: action.isLoadning,
        user: action.user,
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
