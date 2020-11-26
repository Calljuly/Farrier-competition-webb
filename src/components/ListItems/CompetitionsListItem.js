import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { users } from "../../dummyData";
import * as actions from "../../store/actions/competitionAction";
import { Paper } from "@material-ui/core";
import MessageModal from "../MessageModal";

const useStyle = makeStyles({
  container: {
    borderRadius: 20,
    width: "90%",
    minHeight: 500,
    display: "flex",
    margin: 10,
    justifyContent: "space-around",
    alignItems: "flex-start",
    flexDirection: "column",
    padding: 20,
    "&>p": {
      margin: 0,
    },
  },
  classesContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid black",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    "&>p": {
      marginLeft: 10,
    },
  },
  button: {
    borderTop: "1px solid black",
    width: "100%",
    padding: 10,
    fontSize: 15,
    backgroundColor: "#b9babe",
    borderRadius: "0px 0px 10px 10px",
    border: "none",
    "&:hover": {
      backgroundColor: "#595658",
      color: "white",
    },
  },
  classes: {
    display: "flex",
    flexDirection: "row",
    "&>p": {
      margin: 10,
    },
  },
  buttonDisabled: {
    borderTop: "1px solid black",
    width: "100%",
    padding: 10,
    fontSize: 15,
    backgroundColor: "#b9babe",
    borderRadius: "0px 0px 10px 10px",
    border: "none",
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
  disabled,
  active,
  date,
}) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [modalOpen, setOpenModal] = useState(false);
  const comp = useSelector((state) => state.competitions.competitions);

  return (
    <>
      <MessageModal
        isOpen={modalOpen}
        handleClose={() => setOpenModal(false)}
        modalData={{
          title: "Entered!",
          description: "You have succsessfully entered the competition!",
        }}
      />
      <Paper elevation={4} className={classes.container}>
        <h1>{name}</h1> {active && <p style={{ color: "green" }}>Active</p>}
        <div className={classes.infoContainer}>
          <div style={{ marginLeft: 10 }}>
            <p>Price : {price}</p>
            <p>Country : {country}</p>
            <p> Referee: {referee}</p>
          </div>
          <div style={{ marginLeft: 10 }}>
            <p>Max Entries : {maxEntries}</p>
            <p>Current Entries : {current}</p>
          </div>
        </div>
        <div>
          <h3>Classes : </h3>
          <div className={classes.classesContainer}>
            {compClasses.map((item, index) => {
              return (
                <div key={index} className={classes.classes}>
                  <p>Type: {item.type}</p>
                  <p>Time : {item.time}</p>
                  {item.type !== "Eagel eye" && (
                    <p>
                      Shoes:
                      {item.shoeToHorse}
                      {item.shoeToForge}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <button
          disabled={disabled}
          className={disabled ? classes.buttonDisabled : classes.button}
          onClick={() => {
            dispatch(actions.enterCompetition(users[0].name, index, id, comp));
            setOpenModal(true);
          }}
        >
          {disabled ? "Competition is full" : "Enter competition"}
        </button>
      </Paper>
    </>
  );
};

export default CompetitionsListItem;
