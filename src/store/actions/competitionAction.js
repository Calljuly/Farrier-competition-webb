import { firestore, auth } from "../../components/firebase";

export const ADD_COMPETITOR = "ADD_COMPETITOR";
export const FETCH_COMPETITIONS = "FETCH_COMPETITIONS";
export const UPDATE_RESULTS = "UPDATE_RESULTS";
export const CREATE_COMPETITON = "CREATE_COMPETITION";
export const DELETE_COMPETITION = "DELETE_COMPETITION";
export const COMPETITION_LOADING = "COMPETITION_LOADING";
export const SUCSESS = "SUCSESS";

//Ska få route i api, inte klar
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
    const classes = {
      classes: updatedState[index].classes,
    };
    const comp = {
      currentEntries: updatedState[index].currentEntries,
      anvils: updatedState[index].anvils,
      entries: updatedState[index].entries,
    };
    /*
    //Bygga en api route för att anmäla en user till tävling 
    fetch(
      "https://us-central1-farrier-project.cloudfunctions.net/app/competitions",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({classes: classes, competition: comp}),
      }
    )*/
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
//Fungerar
export const createCompetition = (competition, user) => {
  const admin = [];
  admin.push(user);
  return (dispatch) => {
    dispatch({
      type: COMPETITION_LOADING,
      loading: true,
    });
    const comp = {
      currentEntries: 0,
      result: [],
      entries: [],
      country: competition.country.value,
      anvils: competition.anvils.value,
      name: competition.name.value,
      referee: competition.referee.value,
      admins: admin,
      dateTo: competition.dateTo.value,
      dateFrom: competition.dateFrom.value,
      location: competition.location.value,
      hotels: competition.hotels.value,
      parking: competition.parking.value,
    };
    var user = auth.currentUser;
    return user.getIdToken().then((token) => {
      fetch(
        "https://us-central1-farrier-project.cloudfunctions.net/app/competitions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(comp),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.message === "Succsess") {
            dispatch({
              type: SUCSESS,
              sucsess: true,
            });
            dispatch(fetchCompetitions());
          } else {
            dispatch({
              type: SUCSESS,
              sucsess: false,
            });
          }
        })
        .then(() => {
          dispatch({
            type: COMPETITION_LOADING,
            loading: false,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          dispatch({
            type: COMPETITION_LOADING,
            loading: false,
          });
        });
    });
  };
};
//Inte i behov av
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
    const result = classes.map((item) => {
      return {
        className: item.className,
        result: item.unPublishedResult.map((res) => {
          return {
            competitor: res.competitor,
            id: res.id,
            shoeOne: res.shoeOne,
            shoeTwo: res.shoeTwo,
          };
        }),
      };
    });
    var user = auth.currentUser;
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
    console.log(updateClasses);
    console.log(a);
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
//Fungerar
export const addNewClass = (competitionId, classes) => {
  return (dispatch) => {
    dispatch({
      type: COMPETITION_LOADING,
      loading: true,
    });
    fetch(
      `https://us-central1-farrier-project.cloudfunctions.net/app/classes/${competitionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classes),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.message === "Succsess") {
          dispatch({
            type: SUCSESS,
            sucsess: true,
          });
          dispatch(fetchCompetitions());
        } else {
          dispatch({
            type: SUCSESS,
            sucsess: false,
          });
        }
      })
      .then(() => {
        dispatch({
          type: COMPETITION_LOADING,
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        dispatch({
          type: COMPETITION_LOADING,
          loading: false,
        });
      });
  };
};
//Inte kopplad , ska modifieras
export const updateClass = (competitionId, classes, className) => {
  return (dispatch) => {
    dispatch({
      type: COMPETITION_LOADING,
      loading: true,
    });

    fetch(
      `https://us-central1-farrier-project.cloudfunctions.net/app/classes/${competitionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ className: className, classes: classes }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res.message);
        if (res.message === "Succsess") {
          dispatch({
            type: SUCSESS,
            sucsess: true,
          });
          dispatch(fetchCompetitions());
        } else {
          dispatch({
            type: SUCSESS,
            sucsess: false,
          });
        }
      })
      .then(() => {
        dispatch({
          type: COMPETITION_LOADING,
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        dispatch({
          type: COMPETITION_LOADING,
          loading: false,
        });
      });
  };
};
//Fungerar , ska modifieras
export const updateCompetition = (competition, id) => {
  return (dispatch) => {
    dispatch({
      type: COMPETITION_LOADING,
      loading: true,
    });

    const comp = {
      country: competition.country.value,
      anvils: competition.anvils.value,
      name: competition.name.value,
      referee: competition.referee.value,
      dateTo: competition.dateTo.value,
      dateFrom: competition.dateFrom.value,
      location: competition.location.value,
      hotels: competition.hotels.value,
      parking: competition.parking.value,
    };
    fetch(
      `https://us-central1-farrier-project.cloudfunctions.net/app/competitions/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comp),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.message === "Succsess") {
          dispatch({
            type: SUCSESS,
            sucsess: true,
          });
          dispatch(fetchCompetitions());
        } else {
          dispatch({
            type: SUCSESS,
            sucsess: false,
          });
        }
      })
      .then(() => {
        dispatch({
          type: COMPETITION_LOADING,
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
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
