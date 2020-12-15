import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/competitionAction";
import CustomButton from "../CustomButton";
import { useHistory } from "react-router-dom";
import P from "../UI/Paragraph";
import SubHeader from "../UI/SubHeader";
import PageHeader from "../UI/PageHeader";

const useStyle = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    margin: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    borderBottom: "1px solid black",
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
    flexDirection: "column",
    flexWrap: "wrap",
    cursor: "pointer",
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
const CompetitionListItemAdmin = ({
  id,
  name,
  country,
  compClasses,
  referee,
  current,
  anvils,
  index,
  dateFrom,
  dateTo,
  result,
}) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const competitionEndDate = new Date(dateTo);
  const competitionStartDate = new Date(dateFrom);
  const todayDate = new Date();

  return (
    <>
      <div className={classes.container}>
        <PageHeader>{name}</PageHeader>
        <div className={classes.infoContainer}>
          <div style={{ marginLeft: 10 }}>
            <P>Country : {country}</P>
            <P> Referee: {referee}</P>
          </div>
          <div style={{ marginLeft: 10 }}>
            <P>Anvils avaliabel : {anvils}</P>
            <P>Current Entries : {current}</P>
          </div>
        </div>
        <div>
          <SubHeader>Classes : </SubHeader>
          <div className={classes.classesContainer}>
            {compClasses &&
              compClasses.map((item) => {
                return (
                  <div
                    onClick={() =>
                      history.push({
                        pathname: "/admin/scores",
                        state: item,
                        id: id,
                      })
                    }
                    className={classes.classes}
                    key={item.className}
                  >
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
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <Grid container>
            {todayDate < competitionStartDate && (
              <>
                <Grid item md={4} xs={12}>
                  <CustomButton
                    title="Create Class"
                    onClick={() =>
                      history.push({
                        pathname: "/admin/addClass",
                        state: compClasses,
                        id: id,
                      })
                    }
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <CustomButton
                    title="Edit competition"
                    onClick={() =>
                      history.push({
                        pathname: "/admin/editCompetition",
                        state: compClasses,
                        id: id,
                      })
                    }
                  />
                </Grid>

                <Grid item md={4} xs={12}>
                  <CustomButton
                    title="Create proposition"
                    onClick={() =>
                      history.push({
                        pathname: "/admin/createProposition",
                        state: compClasses,
                        compIndex: index,
                      })
                    }
                  />
                </Grid>
              </>
            )}
            <Grid container>
              <Grid item md={4} xs={12}>
                <CustomButton
                  title="Publish all results"
                  onClick={() =>
                    dispatch(actions.saveAllResult(id, compClasses))
                  }
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <CustomButton title="Print proposition" onClick={() => {}} />
              </Grid>
              <Grid item md={4} xs={12}>
                <CustomButton title="Print scoresheet" onClick={() => {}} />
              </Grid>
              <Grid item md={4} xs={12}>
                <CustomButton title="Print startlist" onClick={() => {}} />
              </Grid>
            </Grid>
            {todayDate < competitionEndDate && result.length > 0 && (
              <CustomButton
                title="Result"
                onClick={() =>
                  history.push({
                    pathname: "/admin/result",
                    result: result,
                    name: name,
                  })
                }
              />
            )}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default CompetitionListItemAdmin;
