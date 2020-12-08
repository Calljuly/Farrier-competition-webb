import { firestore } from "../../components/firebase";
import { compClasses } from "../../dummyData";

export const ADD_COMPETITOR = "ADD_COMPETITOR";
export const FETCH_COMPETITIONS = "FETCH_COMPETITIONS";
export const UPDATE_RESULTS = "UPDATE_RESULTS";
export const CREATE_COMPETITON = "CREATE_COMPETITION";
export const DELETE_COMPETITION = "DELETE_COMPETITION";
export const COMPETITION_LOADING = "COMPETITION_LOADING";

export const enterCompetition = (competitor, index, id, state) => {
  const updatedState = [...state];
  return (dispatch) => {
    dispatch({
      type: COMPETITION_LOADING,
      loading: true,
    });
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
        shoeOne: { one: "", two: "", three: "", four: "", total: "" },
        shoeTwo: { one: "", two: "", three: "", four: "", total: "" },
      });
    });
    updatedState[index].classes.map((item) => {
      return item.unPublishedResult.push({
        id: updatedState[index].currentEntries,
        competitor: competitor,
        shoeOne: { one: "", two: "", three: "", four: "", total: "" },
        shoeTwo: { one: "", two: "", three: "", four: "", total: "" },
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
      .then(() => {
        dispatch({
          type: COMPETITION_LOADING,
          isLoading: false,
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
    dispatch({
      type: COMPETITION_LOADING,
      loading: true,
    });

    firestore
      .collection("competitions")
      .add({
        id: "1",
        admins: admin,
        currentEntries: 0,
        result: [],
        entries: [],
        country: competition.country.value,
        location: competition.location.value,
        anvils: competition.anvils.value,
        name: competition.name.value,
        referee: competition.referee.value,
        dateTo: competition.dateTo.value,
        dateFrom: competition.dateFrom.value,
        hotels: competition.hotels.value,
        parking: competition.parking.value,
      })
      .then(() => {
        fetchCompetitions();
      })
      .then(() => {
        dispatch({
          type: COMPETITION_LOADING,
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    /*
    fetch(
      "https://us-central1-farrier-project.cloudfunctions.net/app/competitions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comp),
      }
    )
      .then(() => {
        fetchCompetitions();
      })
      .then(() => {
        dispatch({
          type: COMPETITION_LOADING,
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      */
  };
};
export const deleteCompetition = (competition) => {
  return (dispatch) => {
    dispatch({
      type: COMPETITION_LOADING,
      loading: true,
    });
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
      .then(() => {
        dispatch({
          type: COMPETITION_LOADING,
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};

export const fetchCompetitions = () => {
  return (dispatch) => {
    dispatch({
      type: COMPETITION_LOADING,
      loading: true,
    });

    fetch(
      "https://us-central1-farrier-project.cloudfunctions.net/app/competitions",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((competition) => {
        //Competition håller på mer data, mappar för att inte behöva bygga om appen nu
        const comps = competition.competitions.map((item) => {
          return item.competition;
        });
/*
        let array = [];
        comps.forEach(async (item, index) => {
          const data = await firestore
            .collection("competitions")
            .doc(item.id)
            .collection("classes")
            .get();
          const classes = data.docs.map((doc) => {
            return doc.data();
          });
          array.push({ competition: comps[index], classes: classes });
        });

        console.log(array);
        console.log(array.length);
        console.log(array[0]);
        */
        dispatch({
          type: FETCH_COMPETITIONS,
          data: comps,
        });
      })
      .then(() => {
        dispatch({
          type: COMPETITION_LOADING,
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: COMPETITION_LOADING,
          loading: false,
        });
      });
  };
};
export const saveAllResult = (competitionId, classes) => {
  return (dispatch) => {
    dispatch({
      type: COMPETITION_LOADING,
      loading: true,
    });
    console.log(classes);
    console.log(competitionId);

    const a = classes.map((item) => {
      return {
        className: item.className,
        result: item.unPublishedResult,
      };
    });
    console.log(a);

    firestore
      .collection("competitions")
      .doc(competitionId)
      .update({
        result: a,
      })
      .then(() => {
        compClasses.forEach((item) => {
          firestore
            .collection("competitions")
            .doc(competitionId)
            .collection("classes")
            .update({
              savedResult: true,
            })
            .then(() => {
              dispatch({
                type: COMPETITION_LOADING,
                loading: false,
              });
            })
            .catch((error) => {
              console.log(error);
              dispatch({
                type: COMPETITION_LOADING,
                loading: false,
              });
            });
        });
      })
      .then(() => {
        fetchCompetitions();
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: COMPETITION_LOADING,
          loading: false,
        });
      });
  };
};
