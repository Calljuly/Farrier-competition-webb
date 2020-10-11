import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";

const useStyle = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: 20,
    border: "1px solid black",
    padding: 10,
    "&>p": {
      margin: 0,
    },
  },
  headContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 20,
  },
  compContainer: {},
});
const ResultListItem = ({ competition, points, placing }) => {
  const classes = useStyle();
  const [seeComp, setSeeComp] = useState(false);
  const state = useSelector((state) => state.competitions.competitions);
  const comp = state.filter((item, index) => item.name === competition);

  const handleCompSeeMore = () => {
    setSeeComp((prev) => !prev);
  };
  return (
    <div className={classes.container}>
      <p>Tävling : {competition}</p>
      <p>Poäng : {points}</p>
      <p> Placering : {placing}</p>
      <p>Vill du se fler resultat från denna tävlingen ?</p>
      <button onClick={handleCompSeeMore}> Se mer </button>
      {seeComp && (
        <div className={classes.compContainer}>
          <p>Results to come</p>
        </div>
      )}
    </div>
  );
};

export default ResultListItem;
