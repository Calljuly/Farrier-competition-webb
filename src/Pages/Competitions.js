import React from "react";
import { useSelector } from "react-redux";
import CompetitionsListItem from "../components/ListItems/CompetitionsListItem";
import { Grid } from "@material-ui/core";
import P from "../components/UI/Paragraph";

const Competitions = () => {
  const competitions = useSelector((state) => state.competitions.competitions);

  return (
    <Grid container spacing={2}>
      {competitions.length === 0 && <P>No competitions avalible</P>}
      {competitions.map((item, index) => {
        return (
          <Grid key={item.id} item xs={12}>
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
  );
};

export default Competitions;
