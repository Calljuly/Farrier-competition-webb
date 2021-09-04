import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import { tabsStyle } from './styles/styles';

const CustomTab = ({ buttons, value, handleChange }) => {
  const classes = tabsStyle()
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
      style={{ dispaly: 'flex', flexWrap: 'wrap' }}
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
