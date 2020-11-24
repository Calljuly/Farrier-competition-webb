import { firestore } from "../../components/firebase";

export const ADD_COMPETITOR = "ADD_COMPETITOR";
export const FETCH_COMPETITIONS = "FETCH_COMPETITIONS";
export const UPDATE_RESULTS = "UPDATE_RESULTS";
export const CREATE_COMPETITON = "CREATE_COMPETITION";
export const DELETE_COMPETITION = "DELETE_COMPETITION";

export const enterCompetition = (competitor, index, id, state) => {
  const updatedState = [...state];
  return (dispatch) => {
    if (
      updatedState[index].entries.find((user) => user === competitor) ||
      updatedState[index].currentEntries === updatedState[index].maxEntries
    )
      return;

    updatedState[index].currentEntries += 1;
    updatedState[index].maxEntries -= 1;
    updatedState[index].entries.push(competitor);
    updatedState[index].result.push({
      id: updatedState[index].currentEntries,
      competitor: competitor,
      total: "",
    });
    updatedState[index].classes.map((item) => {
      return item.result.push({
        id: updatedState[index].currentEntries,
        competitor: competitor,
        one: "",
        two: "",
        three: "",
        four: "",
        total: "",
      });
    });
    updatedState[index].classes.map((item) => {
      return item.unPublishedResult.push({
        id: updatedState[index].currentEntries,
        competitor: competitor,
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

export const createCompetition = (competition, user) => {
  const admin = [];
  admin.push(user);
  return (dispatch) => {
    const comp = {
      admins: admin,
      classes: competition.classes,
      currentEntries: 0,
      result: [],
      entries: [],
      country: competition.country,
      maxEntries: competition.maxEntries,
      name: competition.name,
      price: competition.price,
      referee: competition.referee,
      id: 6,
    };
    fetch(
      "https://us-central1-farrier-project.cloudfunctions.net/app/competitions/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comp),
      }
    )
      .then((data) => {
        dispatch({
          type: CREATE_COMPETITON,
          data: comp,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};
export const deleteCompetition = (competition) => {
  return (dispatch) => {
    fetch(
      `https://us-central1-farrier-project.cloudfunctions.net/app/competitions/${competition}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((competition) => {
        dispatch({
          type: DELETE_COMPETITION,
          data: competition,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};

export const fetchCompetitions = (competitions) => {
  return {
    type: FETCH_COMPETITIONS,
    data: competitions,
  };
};
