import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import AddCompetition from "../components/Forms/addCompetition";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Colors } from "../colors";
import CompetitionListItemAdmin from "../components/ListItems/CompetitionListItemAdmin";
import { Route, Switch } from "react-router-dom";
import Scores from "../components/Scores";
import EditCompetition from "../components/Forms/editCompetition";
import P from "../components/UI/Paragraph";
import PageHeader from "../components/UI/PageHeader";
import Devider from '../components/UI/Devider'

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
        <div style={{ margin: "auto", width: "80%" }}>{children}</div>
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

const Admin = () => {
  const classes = useStyle();

  const [value, setValue] = useState(0);
  const user = useSelector((state) => state.auth.user);

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

  return (
    <>
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
            label="Information"
          />
          <Tab
            className={classes.tabs}
            classes={{ selected: classes.active }}
            label="New competition "
          />
          <Tab
            className={classes.tabs}
            classes={{ selected: classes.active }}
            label="My competitions"
          />
        </Tabs>
      </div>
      <div
        style={{
          backgroundColor: Colors.orange,
          height: "3px",
          width: "50%",
          marginBottom: 4,
        }}
      />
      <div
        style={{ backgroundColor: Colors.black, height: "3px", width: "60%" }}
      />
      <Devider margin={30} />

      <Switch>
        <Route path="/admin" exact>
          <div>
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
                      maxEntries={item.competition.anvils}
                      current={item.competition.currentEntries}
                      compClasses={item.classes}
                      disabled={
                        item.competition.anvils ===
                        item.competition.currentEntries
                      }
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
          <Scores compClasses={compClasses} />
        </Route>
        <Route path="/admin/editCompetition" exact>
          <EditCompetition />
        </Route>
        <Route path="/admin/createProposition" exact>
          <h1>Create Proposition</h1>
        </Route>
      </Switch>
    </>
  );
};

export default Admin;
