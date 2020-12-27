import React, { useState } from "react";
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

const Competitions = () => {
  const [value, setValue] = useState(0);
  const competitions = useSelector((state) => state.competitions.competitions);

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
    {
      id: 2,
      label: "Searchs",
    },
  ];
  return (
    <div style={{ marginTop: 0, width: "100%" }}>
      <Switch>
        <Route exact path="/competitions">
          <div style={{ display: "flex", alignItems: "center" }}>
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
          <TabPanel value={value} index={0}>
            <div style={{ marginLeft: 160 }}>
              <PageHeader>Active competitions</PageHeader>
            </div>
            {competitions.length === 0 && <P>No competitions avalible</P>}
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
                  />
                );
              }
            })}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div style={{ marginLeft: 160 }}>
              <PageHeader>Past competitions</PageHeader>
            </div>
            {competitions.length === 0 && <P>No competitions avalible</P>}
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
                  />
                );
              }
            })}
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid container spacing={2}>
              <div style={{ marginLeft: 160 }}>
                <PageHeader>Search for results</PageHeader>
              </div>
            </Grid>
          </TabPanel>
        </Route>
        <Route path="/competitions/startList">
          <StartList />
        </Route>
        <Route path="/competitions/result" exact>
          <Result />
        </Route>
      </Switch>
    </div>
  );
};

export default Competitions;
