import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/competitionAction";
import { Paper } from "@material-ui/core";
import CustomButton from "../CustomButton";
import ValidationModal from "../ValidationModal";
import { useHistory } from "react-router-dom";
import P from "../UI/Paragraph";
import SubHeader from "../UI/SubHeader";
import PageHeader from "../UI/PageHeader";

const useStyle = makeStyles({
  container: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
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
const CompetitionListItemAdmin = ({
  id,
  name,
  price,
  country,
  compClasses,
  referee,
  current,
  maxEntries,
  index,
}) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [modalOpen, setOpenModal] = useState(false);
  const history = useHistory();
  return (
    <>
      <ValidationModal
        isOpen={modalOpen}
        handleClose={() => setOpenModal(false)}
        description="Are you sure you want to delete this competition ? All data will be removed"
        action={() => dispatch(actions.deleteCompetition(id))}
      />
      <Paper elevation={4} className={classes.container}>
        <PageHeader>{name}</PageHeader>
        <div className={classes.infoContainer}>
          <div style={{ marginLeft: 10 }}>
            <P>Price : {price}</P>
            <P>Country : {country}</P>
            <P> Referee: {referee}</P>
          </div>
          <div style={{ marginLeft: 10 }}>
            <P>Anvils avaliabel : {maxEntries}</P>
            <P>Current Entries : {current}</P>
          </div>
        </div>
        <div>
          <SubHeader>Classes : </SubHeader>
          <div className={classes.classesContainer}>
            {compClasses &&
              compClasses.map((item) => {
                return (
                  <div className={classes.classes} key={item.shoeToHorse}>
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
            <Grid item md={4} xs={12}>
              <CustomButton
                title="Fill in scores"
                onClick={() =>
                  history.push({
                    pathname: "/admin/scores",
                    state: compClasses,
                    compIndex: id,
                  })
                }
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <CustomButton
                title="Create Class"
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
                title="Publish all results"
                onClick={() => dispatch(actions.saveAllResult(id, compClasses))}
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
        </div>
      </Paper>
    </>
  );
};

export default CompetitionListItemAdmin;
