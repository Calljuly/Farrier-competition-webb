import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import CompetitionsListItem from "../components/ListItems/CompetitionsListItem";
import { Grid } from "@material-ui/core";

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
      <Grid container spacing={2} justify="space-evenly" alignItems="center">
        {competitions.map((item, index) => {
          return (
            <Grid key={item.id} item lg={4} xs={12}>
              <CompetitionsListItem
                index={index}
                id={item.id}
                name={item.name}
                price={item.price}
                referee={item.referee}
                country={item.country}
                maxEntries={item.maxEntries}
                current={item.currentEntries}
                compClasses={item.classes}
                disabled={item.maxEntries === item.currentEntries}
                active={true}
                date={item.date}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Competitions;
