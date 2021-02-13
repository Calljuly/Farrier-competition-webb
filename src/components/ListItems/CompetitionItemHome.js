import React from "react";
import { Colors } from "../../colors";

const CompetitionItemHome = ({ name, location, dateFrom, status }) => {
  return (
    <div
      style={{
        width: 250,
        overflow: "hidden",
        margin: 20,
        backgroundColor: "#DCDCDC",
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
      <p style={{ margin: 10 }}>{location}</p>
      <p style={{ margin: 10 }}>{dateFrom}</p>
      <p style={{ margin: 10 }}>{status && "Status"}</p>
    </div>
  );
};

export default CompetitionItemHome;
