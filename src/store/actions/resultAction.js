import Competitions from "../../Pages/Competitions";

export const ADD_POINT = "ADD_POINT";
export const SAVED = "SAVED";
export const FETCH_RESULTS = "FETCH_RESULTS";

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
export const fetchAdminComps = (competitions) => {
  return {
    type: FETCH_RESULTS,
    data: competitions,
  };
};
