import { firestore } from "../../components/firebase";

export const ADD_POINT = "ADD_POINT";
export const SAVED = "SAVED";
export const FETCH_RESULTS = "FETCH_RESULTS";

export const addPoint = (value, id, cellId, index, compIndex, state) => {
  return (dispatch) => {
    const updatedState = [...state];
    const competitor = [...state[index].unPublishedResult];

    const c = competitor.map((item) => {
      if (item.id === id) {
        const a = {
          ...item,
          [cellId]: +value,
        };
        const b = {
          ...a,
          total: reCalculateTotal(a, updatedState[index].pointsToMultiply),
        };

        return b;
      }
      return item;
    });

    updatedState[index].unPublishedResult = c;
    firestore
      .collection("competitions")
      .doc(compIndex)
      .update({
        classes: updatedState,
      })
      .then(() => {
        dispatch({ type: ADD_POINT, updatedState: updatedState });
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
