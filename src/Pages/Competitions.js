import React, { useState } from "react";
import { useSelector } from "react-redux";
import CompetitionsListItem from "../components/ListItems/CompetitionsListItem";
import { Grid } from "@material-ui/core";
import P from "../components/UI/Paragraph";
import PageHeader from "../components/UI/PageHeader";
import { makeStyles } from "@material-ui/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Colors } from "../colors";
import Devider from "../components/UI/Devider";
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

  return (
    <div style={{ marginTop: 0, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <PageHeader>Admin</PageHeader>
        <Tabs
          TabIndicatorProps={{
            style: {
              height: "0px",
            },
          }}
          value={value}
          onChange={handleChange}
          orientation="horisontal"
        >
          <Tab
            className={classes.tabs}
            classes={{ selected: classes.active, root: classes.tabs }}
            label="Active competitions"
          />
          <Tab
            className={classes.tabs}
            classes={{ selected: classes.active }}
            label="Past competitions"
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
        <PageHeader>Active competitions</PageHeader>
        {competitions.length === 0 && <P>No competitions avalible</P>}
        {competitions.map((item, index) => {
          return (
            <CompetitionsListItem
              key={item.competition.id}
              index={index}
              id={item.competition.id}
              name={item.competition.name}
              price={item.competition.price}
              referee={item.competition.referee}
              country={item.competition.country}
              maxEntries={item.competition.anvils}
              current={item.competition.currentEntries}
              compClasses={item.classes}
              disabled={
                item.competition.anvils === item.competition.currentEntries
              }
              active={true}
              date={item.date}
            />
          );
        })}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PageHeader>Past competitions</PageHeader>
        {competitions.length === 0 && <P>No competitions avalible</P>}
        {competitions.map((item, index) => {
          return (
            <CompetitionsListItem
              key={item.competition.id}
              index={index}
              id={item.competition.id}
              name={item.competition.name}
              price={item.competition.price}
              referee={item.competition.referee}
              country={item.competition.country}
              maxEntries={item.competition.anvils}
              current={item.competition.currentEntries}
              compClasses={item.classes}
              disabled={
                item.competition.anvils === item.competition.currentEntries
              }
              active={true}
              date={item.date}
            />
          );
        })}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container spacing={2}>
          <PageHeader>Search for results</PageHeader>
        </Grid>
      </TabPanel>
    </div>
  );
};

export default Competitions;
