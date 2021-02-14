import React from "react";
import img from "../assets/Images/newpic.jpg";
import { Colors } from "../colors";
import { useSelector } from "react-redux";
import CompetitionItemHome from "../components/ListItems/CompetitionItemHome";
import { makeStyles } from "@material-ui/core";

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
});

const Home = () => {

  const competitions = useSelector((state) => {
    const a = state.competitions.competitions;

    return a.sort((a, b) =>
      a.competition.dateFrom > b.competition.dateFrom ? 1 : -1
    );
  });

  const comps = competitions.filter((item) => {
    const startDate = new Date(item.competition.dateFrom);
    const today = new Date();

    if (startDate > today) {
      return item;
    }
  });

  const kalenderItems = comps.map((item) => {
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
  const classes = useStyle();

  return (
    <div style={{ backgroundColor: "white" }}>
      <div
        style={{
          backgroundColor: Colors.black,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={img}
          style={{
            width: "100%",
          }}
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
        <div
          style={{
            backgroundColor: Colors.orange,
            width: "90%",
            height: "2px",
            margin: "auto",
          }}
        />
        <div
          style={{
            backgroundColor: "white",
            marginTop: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "80%", marginTop: 40 }}>
            <div>
              <p style={{ fontSize: 40 }}>Upcoming events</p>
            </div>
            <div
              style={{
                backgroundColor: Colors.orange,
                width: "100%",
                height: "2px",
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: 40,
          paddingBottom: 40,
        }}
      >
        {kalenderItems}
      </div>
    </div>
  );
};

export default Home;
