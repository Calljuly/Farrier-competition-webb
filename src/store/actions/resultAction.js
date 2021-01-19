import { firestore } from "../../components/firebase";

export const ADD_POINT = "ADD_POINT";
export const SAVED = "SAVED";
export const FETCH_RESULTS = "FETCH_RESULTS";
export const CHANGE_FILTER = "CHANGE_FILTER";

export const changeFilter = (value) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_FILTER,
      value: value,
    });
  };
};
