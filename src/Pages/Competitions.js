import React, { useState } from "react";
import { useSelector } from "react-redux";
import CompetitionsListItem from "../components/ListItems/CompetitionsListItem";
import PageHeader from "../components/UI/PageHeader";
import { Route, Switch } from "react-router-dom";
import StartList from "./Startlist";
import Result from "./Result";
import TabPanel from "../components/UI/TabPanel";
import CustomTab from "../components/UI/Tabs";
import EnterCompetition from "../Pages/EnterCompetition";
import { Alert } from "@material-ui/lab";
import FilterController from "../components/FilterController";
import TopPagesHeader from "../components/UI/TopPagesHeader";

const Competitions = () => {
  const [value, setValue] = useState(0);
  const filter = useSelector((state) => state.filter.sort);

  const competitions = useSelector((state) => {
    const a = state.competitions.competitions;
    if (filter === "sortName") {
      return a.sort((a, b) =>
        a.competition.name.toLowerCase() > b.competition.name.toLowerCase()
          ? 1
          : -1
      );
    } else if (filter === "sortDate") {
      return a.sort((a, b) =>
        a.competition.name > b.competition.name ? 1 : -1
      );
    } else {
      return a;
    }
  });

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

  const competitionsActive = competitions.filter((item, index) => {
    const competitionEndDate = new Date(item.competition.dateTo);

    if (competitionEndDate > todayDate) {
      return item;
    }
  });

  const competitionsDone = competitions.filter((item, index) => {
    const competitionToDate = new Date(item.competition.dateTo);
    if (competitionToDate < todayDate) {
      return item;
    }
  });

  return (
    <div style={{ marginTop: 0, width: "100%" }}>
      <Switch>
        <Route exact path="/competitions">
          <TopPagesHeader title="Competitions">
            <CustomTab
              buttons={buttons}
              value={value}
              handleChange={handleChange}
            />
          </TopPagesHeader>

          <TabPanel value={value} index={0}>
            <PageHeader>Active competitions</PageHeader>
            <FilterController />

            {competitionsActive.length === 0 && (
              <Alert severity="error">No competitions avalible</Alert>
            )}
            {competitionsActive.map((item, index) => {
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
                  divisions={item.divisions}
                  disabled={
                    item.competition.anvils === item.competition.currentEntries
                  }
                  entries={item.competition.entries}
                  dateFrom={item.competition.dateFrom}
                  dateTo={item.competition.dateTo}
                  result={item.competition.result}
                  openForEntries={item.competition.openForEntries}
                  startCompetition={item.competition.startCompetition}
                  divisionList={item.competition.divisions}
                  hotels={item.competition.hotels}
                  parking={item.competition.parking}
                  information={item.competition.information}
                  competition={item.competition}
                />
              );
            })}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PageHeader>Past competitions</PageHeader>
            <FilterController />

            {competitionsDone.length === 0 && (
              <Alert severity="error">No competitions avalible</Alert>
            )}
            {competitionsDone.map((item, index) => {
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
                  divisions={item.divisions}
                  disabled={
                    item.competition.anvils === item.competition.currentEntries
                  }
                  entries={item.competition.entries}
                  dateFrom={item.competition.dateFrom}
                  dateTo={item.competition.dateTo}
                  result={item.competition.result}
                  openForEntries={item.competition.openForEntries}
                  startCompetition={item.competition.startCompetition}
                  divisionList={item.competition.divisions}
                  hotels={item.competition.hotels}
                  parking={item.competition.parking}
                  information={item.competition.information}
                  competition={item.competition}
                />
              );
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
