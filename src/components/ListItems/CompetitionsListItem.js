import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import PageHeader from "../UI/PageHeader";
import SubHeader from "../UI/SubHeader";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import P from "../UI/Paragraph";
import CustomButton from "../CustomButton";
import { useHistory } from "react-router-dom";
import { storage } from "../firebase";
import { Alert } from "@material-ui/lab";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ButtonContainer from "../UI/ButtonContainer";
import ShoePic from "../../assets/Images/shoe1.jpg";

const useStyle = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    borderBottom: "1px solid #DCDCDC",
  },
  classesContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    cursor: "pointer",
    paddingBottom: 20,
    padding: 10,
  },
  classes: {
    width: "100%",
    padding: 10,
    "&:hover": {
      backgroundColor: "#DCDCDC",
    },
    borderBottom: "1px solid #DCDCDC",
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid black",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginBottom: 10,
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
  classContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#DCDCDC",
    },
  },
  icon: {
    marginRight: 20,
    fontSize: 30,
  },

  shoePic: {
    width: 200,
    height: 200,
    ["@media (max-width: 1000px)"]: {
      width: "100%",
      height: "100%",
    },
  },
  shoeContainer: {
    display: "flex",
    ["@media (max-width: 1000px)"]: {
      flexDirection: "column",
      margin: "10px 0px 20px 0px",
    },
  },
  classInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    margin: 0,
    ["@media (max-width: 1000px)"]: {
      flexDirection: "column",
    },
  },
});
const CompetitionsListItem = ({
  id,
  name,
  country,
  divisions,
  referee,
  current,
  anvils,
  disabled,
  dateFrom,
  dateTo,
  entries,
  result,
  openForEntries,
  startCompetition,
  divisionList,
  hotels,
  parking,
  information,
}) => {
  const classes = useStyle();
  const history = useHistory();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const competitionStartDate = new Date(dateFrom);
  const competitionEndDate = new Date(dateTo);
  const todayDate = new Date();

  const [showProposition, setShowProposition] = useState(false);
  const competition = {
    id: id,
    country: country,
    name: name,
    anvils: anvils,
    entries: entries,
    currentEntries: current,
  };

  return (
    <div className={classes.container}>
      <div
        onClick={() => setShowProposition((prev) => !prev)}
        className={classes.header}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PageHeader>{name}</PageHeader>
          <SubHeader>{dateFrom}</SubHeader>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {competitionStartDate > todayDate ? (
            <p
              style={{
                color: "green",
                fontWeight: "bold",
                marginRight: 20,
                fontSize: 20,
              }}
            >
              Active {openForEntries && " and open for entries"}
            </p>
          ) : todayDate < competitionEndDate ? (
            <p
              style={{
                color: "blue",
                fontWeight: "bold",
                marginRight: 20,
                fontSize: 20,
              }}
            >
              Ongoing
            </p>
          ) : (
            <p
              style={{
                color: "red",
                fontWeight: "bold",
                marginRight: 20,
                fontSize: 20,
              }}
            >
              Finnished
            </p>
          )}
          {showProposition ? (
            <KeyboardArrowUpIcon className={classes.icon} />
          ) : (
            <KeyboardArrowDownIcon className={classes.icon} />
          )}
        </div>
      </div>
      {showProposition && (
        <>
          <div className={classes.infoContainer}>
            <div style={{ marginLeft: 20 }}>
              <P>Country : {country}</P>
              <P>Judge: {referee}</P>

              <P>Anvils avaliable : {anvils}</P>
              <P>Current Entries : {current}</P>
              <P>Hotels nearby : {hotels}</P>
              <P>Parking : {parking}</P>
              <P>Start Date: {dateFrom}</P>
              <P>End Date : {dateTo}</P>
              <P>Other information: {information}</P>
            </div>
          </div>
          <div className={classes.classesContainer}>
            {divisions.length === 0 && (
              <Alert style={{ width: "100%" }} severity="error">
                <P>No classes to show yet</P>
              </Alert>
            )}
            {divisions.length > 0 &&
              divisions.map((divs, index) => {
                return Object.values(divs).map((data) => {
                  return data.map((item) => {
                    return (
                      <div className={classes.classes} key={item.className}>
                        <div className={classes.classInfo}>
                          <div>
                            <h1>{item.className}</h1>

                            <P>Type: {item.type}</P>
                            <P>Time : {item.time}</P>
                            <P>Division : {item.divisions}</P>
                            <P>Judge : {item.referee} </P>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginTop: 10,
                            }}
                          >
                            <h2>Shoes</h2>
                            <div className={classes.shoeContainer}>
                              <div style={{ marginRight: 10 }}>
                                <P>{item.shoeOne}</P>
                                <img
                                  className={classes.shoePic}
                                  src={ShoePic}
                                  alt="shoe pic"
                                />
                              </div>
                              <div style={{ marginRight: 10 }}>
                                <P>{item.shoeTwo}</P>
                                <img
                                  className={classes.shoePic}
                                  src={ShoePic}
                                  alt="shoe pic"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                });
              })}
          </div>
          <div style={{ padding: 20, width: "100%" }}>
            <ButtonContainer>
              {isAuth &&
                openForEntries &&
                !startCompetition &&
                competitionStartDate > todayDate &&
                !Object.values(entries).includes(user.name) && (
                  <>
                    <CustomButton
                      disabled={disabled}
                      onClick={() =>
                        history.push({
                          pathname: "/competitions/enterCompetition",
                          divisionList: divisionList,
                          competition: competition,
                          id: id,
                          divisions: divisions,
                        })
                      }
                      title={
                        disabled ? "Competition is full" : "Enter competition"
                      }
                    />
                  </>
                )}
              <CustomButton
                title="Show starts"
                onClick={() =>
                  history.push({
                    pathname: "/competitions/startList",
                    entries: entries,
                    name: name,
                  })
                }
              />
              <CustomButton
                title="Result"
                onClick={() =>
                  history.push({
                    pathname: "/competitions/result",
                    result: result,
                    name: name,
                    divisions: divisions,
                  })
                }
              />
            </ButtonContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CompetitionsListItem;
