import { firestore } from "../../components/firebase";

export const ADD_POINT = "ADD_POINT";
export const SAVED = "SAVED";
export const FETCH_RESULTS = "FETCH_RESULTS";

export const addPoint = (value, id, cellId, compIndex, state, type) => {
  return (dispatch) => {
    const competitor = state.unPublishedResult;

    const c = competitor.map((item) => {
      let a;
      if (item.id === id) {

        if (type === "shoeOne") {
          a = {
            ...item.shoeOne,
            [cellId]: +value,
          };
          const b = {
            ...a,
            total: reCalculateTotal(a, state.pointsToMultiply),
          };
          item.shoeOne = b;
        } else if (type === "shoeTwo") {
          a = {
            ...item.shoeTwo,
            [cellId]: +value,
          };
          const b = {
            ...a,
            total: reCalculateTotal(a, state.pointsToMultiply),
          };
          item.shoeTwo = b;
        }
        
        return item;
      }
      return item;
    });
    state.unPublishedResult = c;
    firestore
      .collection("competitions")
      .doc(compIndex)
      .collection("classes")
      .doc(state.className)
      .update({
        unPublishedResult: state.unPublishedResult,
      })
      .then(() => {
        dispatch({ type: ADD_POINT, updatedState: state });
      })
      .catch((err) => {
        console.log(err);
      });
    /*
    fetch(
      `https://us-central1-farrier-project.cloudfunctions.net/app/competitions/${compIndex}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ classes: updatedState }),
      }
    ).then(() => {});*/
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

const reCalculateTotal = (updatedState, points) => {
  const first = +updatedState.one * points[0];
  const second = +updatedState.two * points[1];
  const third = +updatedState.three * points[2];
  const fourth = +updatedState.four * points[3];

  return first + second + third + fourth;
};
