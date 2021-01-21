import { firestore, auth } from "../../components/firebase";

export const ADD_COMPETITOR = "ADD_COMPETITOR";
export const FETCH_COMPETITIONS = "FETCH_COMPETITIONS";
export const UPDATE_RESULTS = "UPDATE_RESULTS";
export const CREATE_COMPETITON = "CREATE_COMPETITION";
export const DELETE_COMPETITION = "DELETE_COMPETITION";
export const COMPETITION_LOADING = "COMPETITION_LOADING";
export const SUCSESS = "SUCSESS";
export const ADD_POINT = "ADD_POINT";

//Ska få route i api, logik för att anmäla sig till olika divisioner ska in innan funktion
export const enterCompetition = (
  competitor,
  classes,
  competition,
  id,
  division
) => {
  const updatedState = competition;
  return (dispatch) => {
    dispatch({
      type: COMPETITION_LOADING,
      loading: true,
    });
    /*
    if (
      updatedState.entries.find((user) => user === competitor) ||
      updatedState.currentEntries === updatedState.anvils
    ) {
      dispatch({
        type: COMPETITION_LOADING,
        loading: false,
      });
      return;
    }*/

    updatedState.currentEntries += 1;
    updatedState.maxEntries -= 1;

    division.map((item) => {
      if (updatedState.entries[item.name]) {
        updatedState.entries[item.name].push({
          competitor: competitor.name,
          country: competitor.country,
          id: updatedState.currentEntries,
        });
      } else {
        const array = [];
        array.push({
          competitor: competitor.name,
          country: competitor.country,
          id: updatedState.currentEntries,
        });

        updatedState.entries[item] = array;
      }
    });

    console.log(updatedState);

    firestore
      .collection("competitions")
      .doc(id)
      .update({
        currentEntries: updatedState.currentEntries,
        anvils: updatedState.anvils,
        entries: updatedState.entries,
      })
      .then(() => {
        dispatch(fetchCompetitions());
      })
      .then(() => {
        dispatch({
          type: COMPETITION_LOADING,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: COMPETITION_LOADING,
          isLoading: false,
        });
      });
  };
};
//Fungerar
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

        let array = [];
        comps.forEach(async (item, index) => {
          const allDivisions = [];
          item.divisions.forEach(async (divs) => {
            const data = await firestore
              .collection("competitions")
              .doc(item.id)
              .collection(divs)
              .get();

            const classes = data.docs.map((doc, index) => {
              return doc.data();
            });
            allDivisions.push({ [classes[index].divisions]: classes });
          });
          array.push({ competition: comps[index], divisions: allDivisions });
        });
        dispatch({
          type: FETCH_COMPETITIONS,
          data: array,
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
//Fungerar
export const saveAllResult = (competitionId, classes) => {
  return (dispatch) => {
    dispatch({
      type: COMPETITION_LOADING,
      loading: true,
    });
    let resultArray = [];
    const result = classes.map((item, index) => {
      resultArray = [];
      item.unPublishedResult.forEach((items) => {
        const a = [...resultArray];
        resultArray = a.concat(items.starts);
      });
      return {
        className: item.className,
        result: resultArray,
      };
    });

    const user = auth.currentUser;
    return user.getIdToken().then(async (token) => {
      fetch(
        `https://us-central1-farrier-project.cloudfunctions.net/app/saveResult/${competitionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ competition: result, classes: classes }),
        }
      )
        .then(() => {
          dispatch(fetchCompetitions());
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
  };
};

export const saveClassResult = (competitionId, classes) => {
  return (dispatch) => {
    dispatch({
      type: COMPETITION_LOADING,
      loading: true,
    });
    const a = classes.map((item) => {
      return {
        className: item.className,
        result: item.unPublishedResult,
      };
    });
    const updateClasses = classes.map((item) => {
      return {
        ...item,
        savedResult: true,
      };
    });

    fetch(
      `https://us-central1-farrier-project.cloudfunctions.net/app/saveResult/${competitionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ classes: updateClasses, competition: a }),
      }
    )
      .then(() => {
        dispatch(fetchCompetitions());
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
  };
};
export const loading = (value) => {
  return (dispatch) => {
    dispatch({
      type: COMPETITION_LOADING,
      loading: value,
    });
  };
};

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
        return { starts: aa };
      } else {
        return item;
      }
    });

    state.unPublishedResult = c;
    firestore
      .collection("competitions")
      .doc(compIndex)
      .collection(state.divisions)
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
