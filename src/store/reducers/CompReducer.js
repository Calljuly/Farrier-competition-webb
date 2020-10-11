import { ADD, SUB } from "../actions/actions";
import { FETCH_COMPETITIONS } from "../actions/CompActions";
import { firestore } from "../../components/firebase";

const initialState = {
  competitions: [],
};

const CompReducer = (state = initialState, actions) => {
  const updatedState = [...state.competitions];
  switch (actions.type) {
    case ADD:
      if (
        updatedState[actions.index].entries.find(
          (user) => user === actions.data
        )
      )
        return state;

      console.log(updatedState[actions.index]);
      updatedState[actions.index].currentEntries += 1;
      updatedState[actions.index].maxEntries -= 1;
      updatedState[actions.index].entries.push(actions.data);
      updatedState[actions.index].result.push({
        id: updatedState[actions.index].currentEntries,
        competitor: actions.data,
      });

      firestore.collection("competitions").doc(actions.id).update({
        currentEntries: updatedState[actions.index].currentEntries,
        maxEntries: updatedState[actions.index].maxEntries,
        entries: updatedState[actions.index].entries,
        result: updatedState[actions.index].result,
      });
      return {
        ...state,
        competitions: updatedState,
      };
    case SUB:
      console.log(actions.data.title);
      const newState = updatedState.filter((item) => {
        return item.title !== actions.data;
      });
      console.log(newState);
      return {
        ...state,
        shoes: newState,
      };
    case FETCH_COMPETITIONS:
      return {
        competitions: actions.data,
      };
    default:
      return state;
  }
};
export default CompReducer;
