import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
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
import { startCompetitions, openCompetition } from "../../ApiFunctions/Api";
import { auth } from "../firebase";
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
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 10,
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
    margin: 0,
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

const CompetitionListItemAdmin = ({
  id,
  name,
  country,
  divisions,
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
  divisionList,
  competition,
  hotels,
  parking,
  information,
  handleScorePicker,
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
    event.persist();
    setOpen(event.target.checked);
    const user = auth.currentUser;
    user.getIdToken().then(async (token) => {
      await openCompetition(token, id, event.target.checked)
        .then((res) => {
          dispatch(actions.fetchCompetitions());
        })
        .catch((err) => {
          console.log(err);
        });
    });
    setShowProposition(false);
    dispatch(actions.fetchCompetitions());
  };

  const startCompetitionHandler = async (event) => {
    let array = [];

    divisions.forEach(async (item) => {
      console.log(item);
      if (item) {
      }
      const a = randomnizeEntries(entries[Object.keys(item)]);
      const heat =
        entries[Object.keys(item)].length /
        (entries[Object.keys(item)].length / anvils);
      let numberOfHeat = 1;
      do {
        const amountOfStarts = a.splice(0, heat);
        array.push({
          heat: numberOfHeat,
          division: Object.keys(item)[0],
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

      divisions.map((e) => {
        Object.values(e).map((r) => {
          return r.map((u) => {
            const a = array.filter((item) => {
              return item.division === u.divisions;
            });

            const user = auth.currentUser;
            user.getIdToken().then(async (token) => {
              a.forEach(async (m) => {
                await startCompetitions(token, id, u, a)
                  .then((res) => {
                    dispatch(actions.fetchCompetitions());
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
            });
          });
        });
      });
    });
    setShowProposition(false);
    dispatch(actions.fetchCompetitions());
  };

  const randomnizeEntries = (listOfEntries) => {
    let array = [...listOfEntries];
    for (let i = array.length - 1; i > 0; i--) {
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
            onClick={() => {
              setModal(false);
              dispatch(actions.saveAllResult(id, divisions));
            }}
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
            {divisions.length > 0 &&
              divisions.map((divs) => {
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
                                  src={
                                    item.shoeOneImg === ""
                                      ? ShoePic
                                      : item.shoeOneImg
                                  }
                                  alt="shoe pic"
                                />
                              </div>
                              <div style={{ marginRight: 10 }}>
                                <P>{item.shoeTwo}</P>
                                <img
                                  className={classes.shoePic}
                                  src={
                                    item.shoeTwoImg === ""
                                      ? ShoePic
                                      : item.shoeTwoImg
                                  }
                                  alt="shoe pic"
                                />
                              </div>
                            </div>
                          </div>
                          {startCompetition && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={() =>
                                handleScorePicker({
                                  state: item,
                                  judges: referee,
                                  id: id,
                                })
                              }
                            >
                              <P>Fill in scores</P>
                              <ArrowForwardIosIcon
                                className={classes.classIcon}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  });
                });
              })}
          </div>
          <div style={{ width: "100%", padding: 20 }}>
            <h2>Handle your competition</h2>
            <div style={{ margin: 15 }}>
              <FormControlLabel
                control={
                  <Switch
                    classes={{
                      track: classes.switch_track,
                      switchBase: classes.switch_base,
                      colorPrimary: classes.switch_primary,
                    }}
                    checked={open}
                    onChange={
                      startCompetition ? () => {} : openCompetitionForEntries
                    }
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
                      startCompetition || divisions.length === 0
                        ? () => {}
                        : startCompetitionHandler
                    }
                    name="Open competition for entries"
                  />
                }
                label="Start competition"
              />
            </div>
            <ButtonContainer>
              {todayDate < competitionStartDate && (
                <>
                  {!startCompetition && (
                    <CustomButton
                      title="Create Class"
                      onClick={() =>
                        history.push({
                          pathname: "/admin/addClass",
                          state: divisions,
                          id: id,
                          competitionDivisions: divisionList,
                        })
                      }
                    />
                  )}
                  <CustomButton
                    title="Edit competition"
                    onClick={() =>
                      history.push({
                        pathname: "/admin/editCompetition",
                        state: divisions,
                        id: id,
                        competition: competition,
                      })
                    }
                  />
                </>
              )}
              {startCompetition && (
                <CustomButton
                  title="Publish all results"
                  onClick={() => setModal(true)}
                />
              )}
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
            </ButtonContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CompetitionListItemAdmin;
