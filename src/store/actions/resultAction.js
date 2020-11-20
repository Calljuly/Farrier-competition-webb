export const ADD_POINT = "ADD_POINT";
export const SAVED = "SAVED";
export const FETCH_RESULTS = "FETCH_RESULTS";

export const addPoint = (value, id, cellId, index) => {
  return {
    type: ADD_POINT,
    data: value,
    id: id,
    cellId: cellId,
    index: index,
  };
};

export const savePoints = () => {
  return {
    type: SAVED,
  };
};
export const fetchAdminComps = (competitions) => {
  const adminCompetitions = competitions.filter((item) => {
    if (item.admins.includes("Julia Call")) {
      return item;
    }
  });
  return {
    type: FETCH_RESULTS,
    data: adminCompetitions,
  };
};
