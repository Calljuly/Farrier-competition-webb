import { firestore } from "../../components/firebase";

export const ADD_POINT = "ADD_POINT";
export const SAVED = "SAVED";
export const FETCH_RESULTS = "FETCH_RESULTS";

export const addPoint = (value, id, cellId, compIndex, state, type, heat) => {
  return (dispatch) => {
    const competitor = state.unPublishedResult;

    const c = competitor.map((item, index) => {
      if (item.heat === heat) {
        const aa = item.starts.map((comp) => {
          let a;
          if (comp.id === id) {
            if (type === "shoeOne") {
              a = {
                ...comp.shoeOne,
                [cellId]: +value,
              };
              const b = {
                ...a,
                total: reCalculateTotal(a, state.pointsToMultiply),
              };
              console.log(b);

              comp.shoeOne = b;
            } else if (type === "shoeTwo") {
              a = {
                ...comp.shoeTwo,
                [cellId]: +value,
              };
              const b = {
                ...a,
                total: reCalculateTotal(a, state.pointsToMultiply),
              };
              comp.shoeTwo = b;
            }
          }
          return comp;
        });
        console.log(aa);

        return { starts: aa };
      } else {
        return item;
      }
    });

    console.log(c);

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

const reCalculateTotal = (updatedState, points) => {
  const first = +updatedState.one * points[0];
  const second = +updatedState.two * points[1];
  const third = +updatedState.three * points[2];
  const fourth = +updatedState.four * points[3];

  return first + second + third + fourth;
};
