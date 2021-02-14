import React from "react";
import { Colors } from "../../colors";
import { NavLink } from "react-router-dom";

const CompetitionItemHome = ({
  name,
  location,
  dateFrom,
  openForEntries,
  dateEnd,
}) => {
  const competitionStartDate = new Date(dateFrom);
  const competitionEndDate = new Date(dateEnd);
  const todayDate = new Date();

  const status =
    competitionStartDate > todayDate ? (
      <p
        style={{
          color: "green",
          fontWeight: "bold",
          marginRight: 20,
          fontSize: 20,
        }}
      >
        Open {openForEntries && " and open for entries"}
      </p>
    ) : todayDate < competitionEndDate ? (
      <p
        style={{
          color: "blue",
          fontWeight: "bold",
          marginRight: 20,
          fontSize: 20,
        }}
      >
        Open
      </p>
    ) : (
      <p
        style={{
          color: "red",
          fontWeight: "bold",
          marginRight: 20,
          fontSize: 20,
        }}
      >
        Closed
      </p>
    );

  return (
    <NavLink
      to="/competitions"
      style={{
        cursor: "pointer",
        width: 250,
        overflow: "hidden",
        margin: 20,
        backgroundColor: "#DCDCDC",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          color: "white",
          height: 50,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",

          backgroundColor: Colors.orange,
        }}
      >
        <p style={{ margin: 10 }}>{name}</p>
      </div>
      <p style={{ margin: 10, color: Colors.black }}>{location}</p>
      <p style={{ margin: 10, color: Colors.black }}>{dateFrom}</p>
      <div style={{ margin: 10, color: Colors.black }}>{status}</div>
    </NavLink>
  );
};

export default CompetitionItemHome;
