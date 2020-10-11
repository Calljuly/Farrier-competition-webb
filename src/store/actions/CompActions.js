export const ADD = "ADD";
export const SUB = "SUB";
export const FETCH_COMPETITIONS = "FETCH_COMPETITIONS";
export const UPDATE_RESULTS = "UPDATE_RESULTS";

export const enterCompetition = (data, index, id) => {
  return {
    type: ADD,
    data: data,
    index: index,
    id: id,
  };
};
export const actionSub = (data) => {
  return {
    type: SUB,
    data: data,
  };
};

export const fetchCompetitions = (data) => {
  return {
    type: FETCH_COMPETITIONS,
    data: data,
  };
};
