import React from "react";
import { makeStyles } from "@material-ui/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import { Colors } from "../../colors";

const useStyle = makeStyles({
  tabs: {
    minWidth: 120,
    height: 40,
    textDecoration: "none",
    color: Colors.black,
    fontSize: 10,
    margin: 5,
    padding: 5,
    ["@media (max-width:1253px)"]: {
      width: 300,
    },
  },
  active: {
    minWidth: 120,
    minHeight: 30,
    margin: 5,
    marginBottom: 0,
    textDecoration: "none",
    color: "#101820FF",
    backgroundColor: "#F2AA4CFF",
    fontSize: 10,
    borderRadius: 3,
    padding: 5,
    ["@media (max-width:1253px)"]: {
      width: 300,
    },
  },
});

const CustomTab = ({ buttons, value, handleChange }) => {
  const classes = useStyle();
  const { innerWidth: width } = window;
  return (
    <Tabs
      TabIndicatorProps={{
        style: {
          height: "0px",
        },
      }}
      value={value}
      onChange={handleChange}
      orientation={width < 1000 ? "vertical" : "horizontal"}
    >
      {buttons.map((item) => {
        return (
          <Tab
            key={item.id}
            className={classes.tabs}
            classes={{ selected: classes.active }}
            label={item.label}
          />
        );
      })}
    </Tabs>
  );
};

export default CustomTab;
