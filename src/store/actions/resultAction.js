export const ADD_POINT = "ADD_POINT";
export const SAVED = "SAVED";

export const addPoint = (value, id, cellId) => {
  return {
    type: ADD_POINT,
    data: value,
    id: id,
    cellId: cellId,
  };
};

export const savePoints = () => {
  return {
    type: SAVED,
  };
};
