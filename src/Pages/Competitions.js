import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import CompetitionsListItem from "../components/ListItems/CompetitionsListItem";
import {users} from '../dummyData'
const useStyle = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
  },
});
const Competitions = () => {
  const competitions = useSelector((state) => state.competitions.competitions);
  const classes = useStyle();

  return (
    <div className={classes.container}>
      {competitions.map((item, index) => {
        return (
          <CompetitionsListItem
            key={item.id}
            index={index}
            id={item.id}
            name={item.name}
            price={item.price}
            referee={item.referee}
            country={item.country}
            maxEntries={item.maxEntries}
            current={item.currentEntries}
            compClasses={item.classes}
          />
        );
      })}
    </div>
  );
};

export default Competitions;
