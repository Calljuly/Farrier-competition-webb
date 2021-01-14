import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddCompetition from "../components/Forms/addCompetition";
import CompetitionListItemAdmin from "../components/ListItems/CompetitionListItemAdmin";
import { Route, Switch } from "react-router-dom";
import Scores from "../components/Scores";
import Edit from "./Edit";
import P from "../components/UI/Paragraph";
import PageHeader from "../components/UI/PageHeader";
import Devider from "../components/UI/Devider";
import AddClass from "../components/Forms/addClass";
import Result from "./Result";
import TabPanel from "../components/UI/TabPanel";
import CustomTab from "../components/UI/Tabs";
import { makeStyles } from "@material-ui/styles";
import ScorePicker from "./ScorePicker";

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

const Admin = () => {
  const [value, setValue] = useState(0);
  
  const user = useSelector((state) => state.auth.user);
  const classes = useStyle();

  const compClasses = useSelector((state) => {
    return state.competitions.competitions;
  });

  let adminCompetitions = compClasses.filter((item, index) => {
    if (item.competition.admins.includes(user.name)) {
      return item;
    }
  });

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };
  const buttons = [
    {
      id: 0,
      label: "Information",
    },
    {
      id: 1,
      label: "Create Competition",
    },
    {
      id: 2,
      label: "My Competitions",
    },
  ];

  return (
    <>
      <Switch>
        <Route path="/admin" exact>
          <div>
            <div className={classes.headerContainer}>
              <PageHeader>Admin</PageHeader>
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
              <h1>Information</h1>
              <P>
                If you are authurized you can reach what your are authurized to
                do here.
                <br />
                To create a competition click on "New Competition" and fill in
                the form given to you. Remeber to fill a the inputs
                <br />
                If you have any ongoing competitions you can start adding scores
                to the score board
              </P>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PageHeader>Add new competition</PageHeader>
              <AddCompetition />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <PageHeader>My competitions</PageHeader>
              {adminCompetitions.length !== 0 ? (
                adminCompetitions.map((item, index) => {
                  return (
                    <CompetitionListItemAdmin
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
                })
              ) : (
                <P>No competitions to show</P>
              )}
            </TabPanel>
          </div>
        </Route>
        <Route path="/admin/scores" exact>
          <Scores />
        </Route>
        <Route path="/admin/editCompetition" exact>
          <Edit />
        </Route>
        <Route path="/admin/addClass" exact>
          <AddClass />
        </Route>
        <Route path="/admin/createProposition" exact>
          <h1>Create Proposition</h1>
        </Route>
        <Route path="/admin/result" exact>
          <Result />
        </Route>
        <Route path="/admin/pickScore/:id" exact>
          <ScorePicker />
        </Route>
      </Switch>
    </>
  );
};

export default Admin;
