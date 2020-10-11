import React from "react";
import { Avatar } from "@material-ui/core";
import { users } from "../dummyData";
import { makeStyles } from "@material-ui/styles";
import ResultListItem from "../components/ListItems/ResultListItem";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyle = makeStyles({
  avatar: {
    margin: 40,
    width: 400,
    height: 400,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  headContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 20,
  },
  root: {
    width: 700,
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const User = () => {
  const classes = useStyle();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar} src={users[0].img} />
      <div className={classes.root}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Results" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div className={classes.headContainer}>
            <h1>{users[0].name}</h1>
            <h3>{users[0].live}</h3>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {users[0].results.map((item) => {
            return (
              <ResultListItem
                competition={item.competition}
                points={item.points}
                placing={item.placing}
              />
            );
          })}
        </TabPanel>
      </div>
    </div>
  );
};

export default User;
