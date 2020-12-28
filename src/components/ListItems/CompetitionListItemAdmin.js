import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/competitionAction";
import CustomButton from "../CustomButton";
import { useHistory } from "react-router-dom";
import P from "../UI/Paragraph";
import SubHeader from "../UI/SubHeader";
import PageHeader from "../UI/PageHeader";
import { Colors } from "../../colors";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

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
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  classesContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
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
  classes: {
    width: "100%",
    padding: 10,
    "&:hover": {
      backgroundColor: "#DCDCDC",
    },
    borderBottom: "1px solid #DCDCDC",
  },
  competitionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    margin: 0,
    "&:hover": {
      backgroundColor: "#DCDCDC",
    },
  },
  icon: {
    marginRight: 20,
    fontSize: 30,
  },
  classIcon: {
    fontSize: 20,
    marginRight: 20,
    marginLeft: 20,
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
  const [showProposition, setShowProposition] = useState(false);

  return (
    <div className={classes.container}>
      <div
        onClick={() => setShowProposition((prev) => !prev)}
        className={classes.competitionRow}
      >
        <div className={classes.header}>
          <PageHeader>{name}</PageHeader>
          <SubHeader>{dateFrom}</SubHeader>
        </div>
        {showProposition ? (
          <KeyboardArrowUpIcon className={classes.icon} />
        ) : (
          <KeyboardArrowDownIcon className={classes.icon} />
        )}
      </div>
      {showProposition && (
        <>
          <div className={classes.infoContainer}>
            <div style={{ marginLeft: 10 }}>
              <P>Country : {country}</P>
              <P> Referee: {referee}</P>

              <P>Anvils avaliabel : {anvils}</P>
              <P>Current Entries : {current}</P>
              <P>Start Date: {dateFrom}</P>
              <P>End Date : {dateTo}</P>
            </div>
          </div>
          <PageHeader>Classes : </PageHeader>
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
                        <P>{item.shoeTwo}</P>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={3}
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <P>Fill in scores</P>
                        <ArrowForwardIosIcon className={classes.classIcon} />
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
          </div>
          <h2>Handle your competition</h2>
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
        </>
      )}
    </div>
  );
};

export default CompetitionListItemAdmin;
