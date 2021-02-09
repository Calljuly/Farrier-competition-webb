import { firestore, auth } from "../../components/firebase";
import {
  enterCompetitions,
  addNewPoint,
  fetchAllCompetitions,
} from "../../ApiFunctions/Api";
export const ADD_COMPETITOR = "ADD_COMPETITOR";
export const FETCH_COMPETITIONS = "FETCH_COMPETITIONS";
export const UPDATE_RESULTS = "UPDATE_RESULTS";
export const CREATE_COMPETITON = "CREATE_COMPETITION";
export const DELETE_COMPETITION = "DELETE_COMPETITION";
export const COMPETITION_LOADING = "COMPETITION_LOADING";
export const SUCSESS = "SUCSESS";
export const ADD_POINT = "ADD_POINT";

export const enterCompetition = (competitor, competition, id, division) => {
  const updatedState = competition;
  return (dispatch) => {
    dispatch({
      type: COMPETITION_LOADING,
      loading: true,
    });

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

        updatedState.entries[item.name] = array;
      }
    });
    const user = auth.currentUser;
    return user.getIdToken().then(async (token) => {
      enterCompetitions(token, updatedState, id)
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
    });
  };
};

export const fetchCompetitions = () => {
  return (dispatch) => {
    dispatch({
      type: COMPETITION_LOADING,
      loading: true,
    });

    fetchAllCompetitions()
      .then((competition) => {
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
            allDivisions.push({ [divs]: classes });
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

    const result = classes.map((item) => {
      let newClassResult = [];
      Object.values(item).forEach((i) => {
        newClassResult = i.map((o) => {
          resultArray = [];

          o.unPublishedResult.forEach((p) => {
            const a = [...resultArray];
            resultArray = a.concat(p.starts);
          });

          return {
            division: Object.keys(item)[0],
            className: o.className,
            result: resultArray,
          };
        });
      });

      return {
        division: Object.keys(item)[0],
        class: newClassResult,
      };
    });
    console.log(result);

    classes.map((item) => {
      return Object.values(item).map((i) => {
        i.forEach((o) => {
          firestore
            .collection("competitions")
            .doc(competitionId)
            .collection(o.divisions)
            .doc(o.className)
            .update({ savedResult: true });
        });
      });
    });

    firestore
      .collection("competitions")
      .doc(competitionId)
      .update({ result: result });

    /*
    const user = auth.currentUser;
    user.getIdToken().then(async (token) => {
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
        .then((data) => {
          console.log(data.json());
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
    });*/
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

    const c = competitor.map((item) => {
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
        return {
          heat: heat,
          division: item.division,
          starts: aa,
        };
      } else {
        return item;
      }
    });

    state.unPublishedResult = c;
    const user = auth.currentUser;

    user
      .getIdToken()
      .then(async (token) => {
        addNewPoint(compIndex, token, state)
          .then((data) => {
            console.log(data.message);
            dispatch({ type: ADD_POINT, updatedState: state, id: compIndex });
            //dispatch(fetchCompetitions());
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const reCalculateTotal = (updatedState, points) => {
  const first = +updatedState.one * points[0];
  const second = +updatedState.two * points[1];
  const third = +updatedState.three * points[2];
  const fourth = +updatedState.four * points[3];

  return first + second + third + fourth;
};
