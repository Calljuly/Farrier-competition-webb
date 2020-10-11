import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { enterCompetition } from "../../store/actions/CompActions";
import { useDispatch } from "react-redux";
import { users } from "../../dummyData";
import Admin from "../../Pages/Admin";
import * as actions from "../../store/actions/CompActions";
const useStyle = makeStyles({
  container: {
    borderRadius: 20,
    border: "2px solid black",
    width: 600,
    marginLeft: 0,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    padding: 20,
    "&>p": {
      margin: 0,
    },
  },
  classesContainer: {
    "&>p": {
      margin: 0,
    },
  },
});
const CompetitionsListItem = ({
  id,
  name,
  price,
  country,
  compClasses,
  referee,
  current,
  maxEntries,
  index,
  result,
}) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [modalopen, setModal] = useState(true);
  return (
    <>
      {modalopen ? (
        <div className={classes.container} onClick={() => setModal(false)}>
          <h1>{name}</h1>
          <p>Price : {price}</p>
          <p> Country : {country}</p>
          <p> Referee: {referee}</p>
          <p>Max Entries : {maxEntries}</p>
          <p>Current Entries : {current}</p>
          <div>
            Classes:
            {compClasses.map((item) => {
              return (
                <div key={item.type} className={classes.classesContainer}>
                  <p>Type: {item.type}</p>
                  <p>Time : {item.time}</p>
                  {item.type !== "Eagel eye" && (
                    <p>
                      Shoes:
                      {item.shoes.shoeToHorse}
                      {item.shoes.shoeToForge}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={() =>
              dispatch(actions.enterCompetition(users[0].name, index, id))
            }
          >
            Enter
          </button>
        </div>
      ) : (
        <Admin />
      )}
    </>
  );
};

export default CompetitionsListItem;
