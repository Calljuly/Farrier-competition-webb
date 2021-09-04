import React from "react";
import { useSelector } from "react-redux";
import img from "../assets/Images/newpic.jpg";
import CompetitionItemHome from "../components/ListItems/CompetitionItemHome";
import { homePageStyle } from './styles/styles';

const Home = () => {

  const classes = homePageStyle();

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
