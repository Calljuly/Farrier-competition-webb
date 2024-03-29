import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Pic from "../assets/Images/hov1.jpg";
import AddClass from "../components/DataCreators/addClass";
import AddCompetition from "../components/DataCreators/addCompetition";
import { auth } from "../components/UI/firebase";
import CompetitionListItemAdmin from "../components/ListItems/CompetitionListItemAdmin";
import Scores from "../components/UI/Scores";
import PageHeader from "../components/UI/PageHeader";
import P from "../components/UI/Paragraph";
import TabPanel from "../components/UI/TabPanel";
import CustomTab from "../components/UI/Tabs";
import TopPagesHeader from "../components/UI/TopPagesHeader";
import EditCompetitionPage from "./EditCompetitionPage";
import Result from "./Result";
import ScorePicker from "./ScorePicker";
import { adminPage } from './styles/styles'
import { adminButtons } from './constants/constants'

const Admin = () => {
  const classes = adminPage();
  const [value, setValue] = useState(0);
  const [scorePickerData, setscorePickerData] = useState({});

  const user = auth.currentUser;

  const compClasses = useSelector((state) => {
    return state.competitions.competitions;
  });

  let adminCompetitions = compClasses.filter((item, index) => {
    if (item.competition.admins.includes(user.uid)) {
      return item;
    }
  });

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const handleScorePicker = (newValue) => {
    if (!newValue) {
      return;
    }

    setscorePickerData({
      state: newValue.state,
      judges: newValue.judges,
      id: newValue.id,
    });
    setValue(3);
  };

  const myCompetitions =
    adminCompetitions.length !== 0 ? (
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
            handleScorePicker={handleScorePicker}
          />
        );
      })
    ) : (
      <P>No competitions to show</P>
    );

  return (
    <>
      <Switch>
        <Route path="/admin" exact>
          {value === 3 ? (
            <ScorePicker
              state={scorePickerData.state}
              judges={scorePickerData.judges}
              id={scorePickerData.id}
              goBackAdmin={() => setValue(2)}
            />
          ) : (
            <>
              <TopPagesHeader title="Admin">
                <CustomTab
                  buttons={adminButtons}
                  value={value}
                  handleChange={handleChange}
                />
              </TopPagesHeader>
              <TabPanel value={value} index={0} style={{ padding: 20 }}>
                <h1>Authurized as admin</h1>
                <Grid container>
                  <Grid item xs={12} lg={6}>
                    <P>
                      If you are authurized as an admin you will here be able
                      to create competitions and manege them as you wish. You
                      will be able to create the competition , add classes to
                      it after you choise, open competition for entries, start
                      competition on starting date and fill out the scores for
                      each competitor dureing the competition.
                      <br />
                      <br />
                    </P>
                    <h1>How do i start ?</h1>
                    <P>
                      To create your competition you start with clicking the
                      tab above "Create Competition". Fill out the form , make
                      sure the data på enter is correct bufor pressing the
                      button in the end of the form "Create Competition". When
                      you done you should have recived a response from the
                      server if you creating of competition were success full
                      or not. If Succsess you can now navigate to your
                      competitions by pressing the tab above "My competition"
                      and you will find it there.
                      <br />
                      <br />
                      To view the information about each competition you have
                      you can press the expand icon. When you have open up you
                      will see all informations about your competition and
                      what you can manege.
                      <br />
                      Press the button "Add class" to create classes to your
                      competition. We have made some premade types of classes
                      you can choose between and they all have diffrent forms
                      to fill out.
                      <br />
                      <br />
                      When you have created all the classes to their belonging
                      divisions or category you can choose to edit you
                      competitions if more data is required for your
                      competition or you can now wait until its time to press
                      the switsh "Open for entries". When doing that you have
                      made you competition open for competitors to enter.
                      <br />
                      <br />
                      When you have started the competition the entries are
                      sorted out in heats in the classes and divisions they
                      have entered. When the competition has started
                      competitor can no longer enter your classes. You will
                      now be able to fill out the scores for each class and
                      each heat. You'll find this if you expand the
                      competition under "My competitions".
                    </P>
                  </Grid>
                  <Grid
                    xs={12}
                    lg={6}
                    item
                    className={classes.imgContainer}
                  >
                    <img
                      src={Pic}
                      alt="Timmy Hoas and Fredrik Strange"
                      style={{ width: "80%" }}
                    />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <PageHeader>Add new competition</PageHeader>
                <AddCompetition />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <PageHeader>My competitions</PageHeader>
                {myCompetitions}
              </TabPanel>
            </>
          )}
        </Route>
        <Route path="/admin/scores" exact>
          <Scores />
        </Route>
        <Route path="/admin/editCompetition" exact>
          <EditCompetitionPage />
        </Route>
        <Route path="/admin/addClass" exact>
          <AddClass />
        </Route>
        <Route path="/admin/result" exact>
          <Result />
        </Route>
      </Switch>
    </>
  );
};

export default Admin;
