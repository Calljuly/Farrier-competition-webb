import { firestore } from "../../components/firebase";

export const ADD_COMPETITOR = "ADD_COMPETITOR";
export const SUB = "SUB";
export const FETCH_COMPETITIONS = "FETCH_COMPETITIONS";
export const UPDATE_RESULTS = "UPDATE_RESULTS";
export const CREATE_COMPETITON = "CREATE_COMPETITION";

export const enterCompetition = (data, index, id, state) => {
  const updatedState = [...state];
  return (dispatch) => {
    if (
      updatedState[index].entries.find((user) => user === data) ||
      updatedState[index].currentEntries === updatedState[index].maxEntries
    )
      return;

    updatedState[index].currentEntries += 1;
    updatedState[index].maxEntries -= 1;
    updatedState[index].entries.push(data);
    updatedState[index].result.push({
      id: updatedState[index].currentEntries,
      competitor: data,
      total: "",
    });
    updatedState[index].classes.map((item) => {
      return item.result.push({
        id: updatedState[index].currentEntries,
        competitor: data,
        one: "",
        two: "",
        three: "",
        four: "",
        total: "",
      });
    });

    firestore
      .collection("competitions")
      .doc(id)
      .update({
        currentEntries: updatedState[index].currentEntries,
        maxEntries: updatedState[index].maxEntries,
        entries: updatedState[index].entries,
        result: updatedState[index].result,
        classes: updatedState[index].classes,
      })
      .then(() => {
        dispatch({
          type: ADD_COMPETITOR,
          data: updatedState,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createCompetition = (data) => {
  return (dispatch) => {
    firestore
      .collection("competitions")
      .add({
        classes: data.classes,
        currentEntries: 0,
        result: [],
        unPublishedResult: [],
        entries: [],
        country: data.country,
        maxEntries: data.maxEntries,
        name: data.name,
        price: data.price,
        referee: data.referee,
      })
      .then(() => {
        dispatch({
          type: CREATE_COMPETITON,
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
