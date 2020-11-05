import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "ceneter",
    margin: "20px 0px 0px 0px",
    borderBottom: "1px solid black",
    borderTop: "1px solid black",
    padding: 20,
    "&>p": {
      fontSize: 20,
    },
  },
  headContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 20,
  },
  compContainer: {},
  button: {
    width: "100%",
    padding: 10,
    fontSize: 15,
    backgroundColor: "#b9babe",
    borderRadius: "0px 0px 10px 10px",
    border: "none",
    "&:hover": {
      backgroundColor: "#595658",
      color: "white",
    },
  },
});
const ResultListItem = ({ competition, points, placing }) => {
  const classes = useStyle();
  const [seeComp, setSeeComp] = useState(false);

  const handleCompSeeMore = () => {
    setSeeComp((prev) => !prev);
  };
  return (
    <>
      <div className={classes.container}>
        <h2>{competition}</h2>
        <p>Poäng : {points}</p>
        <p> Placering : {placing}</p>
      </div>
      <button className={classes.button} onClick={handleCompSeeMore}>
        {" "}
        Show full scorelist
      </button>
      {seeComp && (
        <div className={classes.compContainer}>
          <p>Results to come</p>
        </div>
      )}
    </>
  );
};

export default ResultListItem;
