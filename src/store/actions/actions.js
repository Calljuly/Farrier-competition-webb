export const ADD = "ADD";
export const SUB = "SUB";

export const actionAddShoe = (data) => {
  return {
    type: ADD,
    data: data,
  };
};
export const actionSub = (data) => {
  return {
    type: SUB,
    data: data,
  };
};
