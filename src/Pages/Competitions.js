import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CompetitionsListItem from "../components/ListItems/CompetitionsListItem";
import { Grid } from "@material-ui/core";
import P from "../components/UI/Paragraph";
import PageHeader from "../components/UI/PageHeader";
import { Route, Switch } from "react-router-dom";
import Devider from "../components/UI/Devider";
import StartList from "./Startlist";
import Result from "./Result";
import TabPanel from "../components/UI/TabPanel";
import CustomTab from "../components/UI/Tabs";
import { makeStyles } from "@material-ui/styles";
import EnterCompetition from "../Pages/EnterCompetition";
import { Alert } from "@material-ui/lab";
import FilterController from "../components/FilterController";

const useStyle = makeStyles({
  headerContainer: {
    display: "flex",
    alignItems: "center",
    ["@media (max-width:1000px)"]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
});
const Competitions = () => {
  const [value, setValue] = useState(0);
  const filter = useSelector((state) => state.result.sortName);

  const competitions = useSelector((state) => {
    const a = state.competitions.competitions;
    if (filter) {
      return a.sort((a, b) =>
        a.competition.name > b.competition.name ? 1 : -1
      );
    } else {
      return a;
    }
  });

  console.log(competitions);
  
  const classes = useStyle();
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };
  const todayDate = new Date();
  const buttons = [
    {
      id: 0,
      label: "Active",
    },
    {
      id: 1,
      label: "Past",
    },
  ];

  return (
    <div style={{ marginTop: 0, width: "100%" }}>
      <Switch>
        <Route exact path="/competitions">
          <div className={classes.headerContainer}>
            <PageHeader>Competitions</PageHeader>
            <CustomTab
              buttons={buttons}
              value={value}
              handleChange={handleChange}
            />
          </div>
          <div className="divOrange" />
          <div className="divBlack" />
          <Devider margin={30} />

          <FilterController />

          <TabPanel value={value} index={0}>
            <PageHeader>Active competitions</PageHeader>
            {competitions.length === 0 && (
              <Alert severity="error">No competitions avalible</Alert>
            )}
            {competitions.map((item, index) => {
              const competitionEndDate = new Date(item.competition.dateTo);

              if (competitionEndDate > todayDate) {
                return (
                  <CompetitionsListItem
                    key={item.competition.id}
                    index={index}
                    id={item.competition.id}
                    name={item.competition.name}
                    referee={item.competition.referee}
                    country={item.competition.country}
                    anvils={item.competition.anvils}
                    current={item.competition.currentEntries}
                    compClasses={item.classes}
                    disabled={
                      item.competition.anvils ===
                      item.competition.currentEntries
                    }
                    entries={item.competition.entries}
                    dateFrom={item.competition.dateFrom}
                    dateTo={item.competition.dateTo}
                    result={item.competition.result}
                    openForEntries={item.competition.openForEntries}
                    startCompetition={item.competition.startCompetition}
                  />
                );
              }
            })}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PageHeader>Past competitions</PageHeader>
            {competitions.length === 0 && (
              <Alert severity="error">No competitions avalible</Alert>
            )}
            {competitions.map((item, index) => {
              const competitionToDate = new Date(item.competition.dateTo);

              if (competitionToDate < todayDate) {
                return (
                  <CompetitionsListItem
                    key={item.competition.id}
                    index={index}
                    id={item.competition.id}
                    name={item.competition.name}
                    referee={item.competition.referee}
                    country={item.competition.country}
                    anvils={item.competition.anvils}
                    current={item.competition.currentEntries}
                    compClasses={item.classes}
                    disabled={
                      item.competition.anvils ===
                      item.competition.currentEntries
                    }
                    dateFrom={item.competition.dateFrom}
                    dateTo={item.competition.dateTo}
                    result={item.competition.result}
                    entries={item.competition.entries}
                    openForEntries={item.competition.openForEntries}
                  />
                );
              }
            })}
          </TabPanel>
        </Route>
        <Route path="/competitions/startList">
          <StartList />
        </Route>
        <Route path="/competitions/result" exact>
          <Result />
        </Route>
        <Route path="/competitions/enterCompetition" exact>
          <EnterCompetition />
        </Route>
      </Switch>
    </div>
  );
};

export default Competitions;
