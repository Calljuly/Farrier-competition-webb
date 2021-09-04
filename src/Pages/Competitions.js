import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import FilterController from "../components/UI/FilterController";
import CompetitionsListItem from "../components/ListItems/CompetitionsListItem";
import PageHeader from "../components/UI/PageHeader";
import TabPanel from "../components/UI/TabPanel";
import CustomTab from "../components/UI/Tabs";
import TopPagesHeader from "../components/UI/TopPagesHeader";
import EnterCompetition from "./EnterCompetition";
import Result from "./Result";
import StartList from "./Startlist";
import { competitionButtons } from './constants/constants';

const Competitions = () => {

  const todayDate = new Date();

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

  const competitionsActive = competitions.filter((item) => {
    const competitionEndDate = new Date(item.competition.dateTo);

    if (competitionEndDate > todayDate) {
      return item;
    }
  });

  const competitionsDone = competitions.filter((item) => {
    const competitionToDate = new Date(item.competition.dateTo);
    if (competitionToDate < todayDate) {
      return item;
    }
  });

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <div style={{ marginTop: 0, width: "100%" }}>
      <Switch>
        <Route exact path="/competitions">
          <TopPagesHeader title="Competitions">
            <CustomTab
              buttons={competitionButtons}
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
