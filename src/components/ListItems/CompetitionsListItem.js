import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/competitionAction";
import MessageModal from "../MessageModal";
import PageHeader from "../UI/PageHeader";
import SubHeader from "../UI/SubHeader";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import P from "../UI/Paragraph";

import { Colors } from "../../colors";

const useStyle = makeStyles({
  container: {
    width: "95%",
    display: "flex",
    margin: "auto",
    flexDirection: "column",
    padding: 10,
    "&:hover": {
      border: `1px solid ${Colors.orange}`,
    },
  },
  classesContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);

  const [showProposition, setShowProposition] = useState(false);
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
      <div className={classes.container}>
        <div
          onClick={() => setShowProposition((prev) => !prev)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ width: "300px" }}>
            <PageHeader>{name}</PageHeader>
          </div>
          {showProposition ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
          {active && (
            <p style={{ color: "green", fontWeight: "bold" }}>Active</p>
          )}
        </div>
        {showProposition && (
          <>
            <div className={classes.infoContainer}>
              <P>Price : {price}</P>
              <P>Country : {country}</P>
              <P> Referee: {referee}</P>

              <P>Max Entries : {maxEntries}</P>
              <P>Current Entries : {current}</P>
            </div>
            {compClasses && (
              <>
                <SubHeader>Classes : </SubHeader>
                {compClasses.map((item, index) => {
                  return (
                    <div key={index} className={classes.infoContainer}>
                      <P>Type: {item.type}</P>
                      <P>Time : {item.time}</P>
                      {item.type !== "Eagel eye" && (
                        <P>
                          Shoes:
                          {item.shoeToHorse}
                          {item.shoeToForge}
                        </P>
                      )}
                    </div>
                  );
                })}
              </>
            )}
            {isAuth && (
              <button
                disabled={disabled}
                className={disabled ? classes.buttonDisabled : classes.button}
                onClick={() => {
                  dispatch(
                    actions.enterCompetition(user.name, index, id, comp)
                  );
                  setOpenModal(true);
                }}
              >
                {disabled ? "Competition is full" : "Enter competition"}
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CompetitionsListItem;
