import { IS_AUTH, IS_LOADING, ERROR, NEW_USER_DATA } from "../actions/auth";

const initialState = {
  isAuth: false,
  isLoading: true,
  error: false,
  user: {},
  userImage: "",
  admin: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTH:
      return {
        ...state,
        isAuth: action.auth,
        isLoading: action.isLoadning,
        user: action.user,
        userImage: action.userImage,
        admin: action.admin,
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
    case NEW_USER_DATA:
      return {
        ...state,
        user: action.user,
        userImage: action.user.img,
      };
    default:
      return state;
  }
};
