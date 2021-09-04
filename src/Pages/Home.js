import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import img from "../assets/Images/newpic.jpg";
import { Colors } from "../colors";
import CompetitionItemHome from "../components/ListItems/CompetitionItemHome";

const useStyle = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    ["@media (max-width:1300px)"]: {
      display: "block",
    },
  },
  headerText: {
    color: Colors.orange,
    fontSize: 45,
    fontWeight: "bold",
    marginLeft: 60,
    ["@media (max-width:1300px)"]: {
      textAlign: "center",
      margin: 0,
      fontSize: 30,
    },
  },
  headerTextSec: {
    color: "white",
    fontSize: 30,
    margin: "40px 100px 40px 40px",
    ["@media (max-width:1300px)"]: {
      margin: 20,
      fontSize: 20,
      textAlign: "center",
    },
  },
  welcomeText: {
    color: Colors.orange,
    fontSize: 40,
    marginLeft: 60,
    ["@media (max-width:1300px)"]: {
      textAlign: "center",
      margin: 0,
    },
  },
  calendarContainer: {
    display: "flex",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 40,
    paddingBottom: 40,
  },
  orangeLine: {
    backgroundColor: Colors.orange,
    width: "100%",
    height: "2px",
  },
  upcomingEvent: {
    width: "80%",
    marginTop: 40,
    fontSize: 40
  },
  upcomingEventContainer: {
    backgroundColor: "white",
    marginTop: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  homeBackground: {
    backgroundColor: Colors.black,
    width: "100%",
    overflow: "hidden",
  },
  img: {
    width: "100%",
  },
});

const Home = () => {

  const classes = useStyle();

  const competitions = useSelector((state) => {
    const allCompetitions = state.competitions.competitions;

    return allCompetitions.sort((a, b) =>
      a.competition.dateFrom > b.competition.dateFrom ? 1 : -1
    );
  });

  const competitionsList = competitions.filter((item) => {
    const startDate = new Date(item.competition.dateFrom);
    const today = new Date();

    if (startDate > today) {
      return item;
    }
  });

  const calendarItems = competitionsList.map((item) => {
    return (
      <CompetitionItemHome
        key={item.competition.id}
        name={item.competition.name}
        location={item.competition.location}
        dateFrom={item.competition.dateFrom}
        openForEntries={item.competition.openForEntries}
        dateEnd={item.competition.dateTo}
      />
    );
  });

  return (
    <>
      <div className={classes.homeBackground}>
        <img
          src={img}
          className={classes.img}
          alt="Home of Timmy Hoas"
        />
        <div className={classes.header}>
          <div style={{ margin: 40 }}>
            <p className={classes.welcomeText}>Welcome to</p>
            <p className={classes.headerText}>Forging scores</p>
          </div>
          <p className={classes.headerTextSec}>
            Here to simplify life as a<br /> competetive farrier or organizer
          </p>
        </div>
        <div className={classes.upcomingEventContainer}>
          <div className={classes.upcomingEvent}>
            <p>Upcoming events</p>
            <div className={classes.orangeLine} />
          </div>
        </div>
      </div>
      <div className={classes.calendarContainer}>
        {calendarItems}
      </div>
    </>
  );
};

export default Home;
