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
import { Grid } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

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
}) => {
  const classes = useStyle();
  const history = useHistory();

  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const competitionStartDate = new Date(dateFrom);
  const competitionEndDate = new Date(dateTo);
  const todayDate = new Date();
  const [shoeOne, setShoeOne] = useState("");
  const [shoeTwo, setShoeTwo] = useState("");

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
                fontSize: 30,
              }}
            >
              <HighlightOffIcon alt="Competition has ended" />
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
            <div style={{ marginLeft: 10 }}>
              <P>Country : {country}</P>
              <P>Judge: {referee}</P>

              <P>Anvils avaliabel : {anvils}</P>
              <P>Current Entries : {current}</P>
              <P>Start Date: {dateFrom}</P>
              <P>End Date : {dateTo}</P>
            </div>
          </div>
          <PageHeader>Classes : </PageHeader>
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
                        <h2>{item.className}</h2>
                        <Grid
                          container
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "start",
                            margin: 0,
                          }}
                        >
                          <Grid item xs={12} sm={3}>
                            <P>Type: {item.type}</P>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <P>Time : {item.time}</P>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <SubHeader>Shoes</SubHeader>
                            <P>{item.shoeOne}</P>
                            <img src={shoeOne} alt="shoe one" />
                            <P>{item.shoeTwo}</P>
                            <img src={shoeTwo} alt="shoe two"/>
                          </Grid>
                        </Grid>
                      </div>
                    );
                  });
                });
              })}
          </div>
          <Grid container style={{ padding: 10 }}>
            {isAuth &&
              openForEntries &&
              !startCompetition &&
              competitionStartDate > todayDate &&
              !Object.values(entries).includes(user.name) && (
                <>
                  <Grid item md={4} xs={12}>
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
                  </Grid>
                </>
              )}
            <Grid item md={4} xs={12}>
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
            </Grid>
            <Grid item md={4} xs={12}>
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
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default CompetitionsListItem;
