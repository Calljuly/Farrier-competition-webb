import React, { useState } from "react";
import { useSelector } from "react-redux";
import CompetitionsListItem from "../components/ListItems/CompetitionsListItem";
import { Grid } from "@material-ui/core";
import P from "../components/UI/Paragraph";
import PageHeader from "../components/UI/PageHeader";
import { makeStyles } from "@material-ui/styles";
import { Route, Switch } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Colors } from "../colors";
import Devider from "../components/UI/Devider";
import StartList from "../components/Tables/Startlist";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{ margin: "auto", width: "100%" }}>{children}</div>
      )}
    </div>
  );
};
const useStyle = makeStyles({
  tabs: {
    width: 210,
    height: 50,
    textDecoration: "none",
    color: Colors.black,
    fontSize: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  active: {
    margin: 5,
    marginBottom: 0,
    textDecoration: "none",
    color: "#101820FF",
    backgroundColor: "#F2AA4CFF",
    fontSize: 20,
    borderRadius: 3,
    padding: 5,
  },
});
const Competitions = () => {
  const classes = useStyle();
  const [value, setValue] = useState(0);
  const competitions = useSelector((state) => state.competitions.competitions);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };
  const todayDate = new Date();

  return (
    <div style={{ marginTop: 0, width: "100%" }}>
      <Switch>
        <Route exact path="/competitions">
          <div style={{ display: "flex", alignItems: "center" }}>
            <PageHeader>Competitions</PageHeader>
            <Tabs
              TabIndicatorProps={{
                style: {
                  height: "0px",
                },
              }}
              value={value}
              onChange={handleChange}
              orientation="horizontal"
            >
              <Tab
                className={classes.tabs}
                classes={{ selected: classes.active, root: classes.tabs }}
                label="Active"
              />
              <Tab
                className={classes.tabs}
                classes={{ selected: classes.active }}
                label="Past"
              />
              <Tab
                className={classes.tabs}
                classes={{ selected: classes.active }}
                label="Search"
              />
            </Tabs>
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
      </Switch>
    </div>
  );
};

export default Competitions;
