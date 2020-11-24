import { firestore } from "../../components/firebase";

export const ADD_POINT = "ADD_POINT";
export const SAVED = "SAVED";
export const FETCH_RESULTS = "FETCH_RESULTS";

export const addPoint = (value, id, cellId, index, compIndex, state) => {
  return (dispatch) => {
    const updatedState = [...state];
    const competitor = [...state[compIndex].classes[index].unPublishedResult];

    const c = competitor.map((item) => {
      if (item.id === id) {
        const a = {
          ...item,
          [cellId]: +value,
        };
        const b = {
          ...a,
          total: reCalculateTotal(a),
        };

        return b;
      }
      return item;
    });

    updatedState[compIndex].classes[index].unPublishedResult = c;
    firestore
      .collection("competitions")
      .doc("gjhAkbUpupIBrgysmoAG")
      .update({
        classes: updatedState[0].classes,
      })
      .then(() => {
        dispatch({ type: ADD_POINT, updatedState: updatedState });
      })
      .catch((err) => {
        console.log(err);
      });
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

const reCalculateTotal = (updatedState) => {
  const first = +updatedState.one * 2.5;
  const second = +updatedState.two * 2.5;
  const third = +updatedState.three * 2.5;
  const fourth = +updatedState.four * 2.5;

  return first + second + third + fourth;
};
