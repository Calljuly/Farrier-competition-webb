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
import ChoiseModal from "../ChoiseModal";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { firestore } from "../firebase";

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
    cursor: "pointer",
  },
  classesContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    cursor: "pointer",
    paddingBottom: 20,
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
    cursor: "pointer",
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
  switch_track: {
    backgroundColor: Colors.black,
    color: Colors.black,
  },
  switch_base: {
    color: Colors.black,
    "&.Mui-disabled": {
      color: "#e886a9",
    },
    "&.Mui-checked": {
      color: Colors.orange,
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: Colors.black,
    },
  },
  switch_primary: {
    "&.Mui-checked": {
      color: "#4CAF50",
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: Colors.orange,
    },
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
  openForEntries,
  startCompetition,
  entries,
}) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const competitionEndDate = new Date(dateTo);
  const competitionStartDate = new Date(dateFrom);
  const todayDate = new Date();
  const [showProposition, setShowProposition] = useState(false);
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(openForEntries);
  const [started, setStarted] = useState(startCompetition);

  const openCompetitionForEntries = async (event) => {
    setOpen(event.target.checked);
    await firestore.collection("competitions").doc(id).update({
      openForEntries: event.target.checked,
    });
    dispatch(actions.fetchCompetitions());
  };

  const startCompetitionHandler = async (event) => {
    const a = randomnizeEntries(entries);
    const heat = entries.length / (entries.length / anvils);
    let array = [];
    let numberOfHeat = 1;
    do {
      const amountOfStarts = a.splice(0, heat);
      array.push({
        heat: numberOfHeat,
        starts: amountOfStarts.map((item) => {
          return {
            competitor: item.competitor,
            id: item.id,
            country: item.country,
            shoeOne: { one: "", two: "", three: "", four: "", total: "" },
            shoeTwo: { one: "", two: "", three: "", four: "", total: "" },
          };
        }),
      });
      numberOfHeat++;
    } while (a.length !== 0);

    setStarted(event.target.checked);

    await firestore.collection("competitions").doc(id).update({
      startCompetition: event.target.checked,
      openForEntries: false,
    });
    compClasses.forEach(async (item) => {
      await firestore
        .collection("competitions")
        .doc(id)
        .collection("classes")
        .doc(item.className)
        .update({
          unPublishedResult: array,
        });
    });
    dispatch(actions.fetchCompetitions());
  };

  const randomnizeEntries = (listOfEntries) => {
    let array = [...listOfEntries];
    for (var i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  return (
    <div className={classes.container}>
      <ChoiseModal isOpen={modal} handleClose={() => setModal(false)}>
        <PageHeader>Are you sure ?</PageHeader>
        <P>
          Are you sure you want to publish these results ? You wont be able to
          change them afterwords
        </P>
        <div style={{ display: "flex" }}>
          <CustomButton title="Cancel" onClick={() => setModal(false)} />
          <CustomButton
            title="Im sure"
            onClick={() => dispatch(actions.saveAllResult(id, compClasses))}
          />
        </div>
      </ChoiseModal>
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
              <P>Referee: {referee}</P>

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
                        <P>{item.shoeTwo}</P>
                      </Grid>
                      {startCompetition && (
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
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onClick={() =>
                              history.push({
                                pathname: `/admin/pickScore/${id}`,
                                state: item,
                                id: id,
                              })
                            }
                          >
                            <P>Fill in scores</P>
                            <ArrowForwardIosIcon
                              className={classes.classIcon}
                            />
                          </div>
                        </Grid>
                      )}
                    </Grid>
                  </div>
                );
              })}
          </div>
          <h2>Handle your competition</h2>
          <div style={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Switch
                  classes={{
                    track: classes.switch_track,
                    switchBase: classes.switch_base,
                    colorPrimary: classes.switch_primary,
                  }}
                  checked={open}
                  onChange={openCompetitionForEntries}
                  name="Open competition"
                />
              }
              label="Open competitions for entries"
            />
            <FormControlLabel
              control={
                <Switch
                  classes={{
                    track: classes.switch_track,
                    switchBase: classes.switch_base,
                    colorPrimary: classes.switch_primary,
                  }}
                  checked={started}
                  onChange={
                    startCompetition || compClasses.length === 0
                      ? () => {}
                      : startCompetitionHandler
                  }
                  name="Open competition for entries"
                />
              }
              label="Start competition"
            />
          </div>
          <Grid container>
            {todayDate < competitionStartDate && (
              <>
                {!startCompetition && (
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
                )}
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
              </>
            )}
            <Grid container>
              <Grid item md={4} xs={12}>
                <CustomButton
                  title="Publish all results"
                  onClick={() => setModal(true)}
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
                    pathname: "/competitions/result",
                    result: result,
                    name: name,
                  })
                }
              />
            )}
          </Grid>
        </>
      )}
    </div>
  );
};

export default CompetitionListItemAdmin;
