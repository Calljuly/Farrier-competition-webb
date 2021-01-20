export const CHANGE_FILTER = "CHANGE_FILTER";

export const changeFilter = (value) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_FILTER,
      value: value,
    });
  };
};
