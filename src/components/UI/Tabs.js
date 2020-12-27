import React from "react";
import { makeStyles } from "@material-ui/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import { Colors } from "../../colors";

const useStyle = makeStyles({
  tabs: {
    width: 250,
    height: 50,
    textDecoration: "none",
    color: Colors.black,
    fontSize: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  active: {
    width: 210,
    margin: 5,
    marginBottom: 0,
    textDecoration: "none",
    color: "#101820FF",
    backgroundColor: "#F2AA4CFF",
    fontSize: 20,
    borderRadius: 3,
    padding: 5,
  },
});

const CustomTab = ({ buttons, value, handleChange }) => {
  const classes = useStyle();
  return (
    <Tabs
      TabIndicatorProps={{
        style: {
          height: "0px",
        },
      }}
      value={value}
      onChange={handleChange}
      orientation="horizontal"
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
