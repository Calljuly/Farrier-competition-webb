import React from "react";
import { Avatar } from "@material-ui/core";
import { users } from "../dummyData";
import { makeStyles } from "@material-ui/styles";
import ResultListItem from "../components/ListItems/ResultListItem";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
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
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};
const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const User = () => {
  const classes = useStyle();
  const [value, setValue] = React.useState(0);
  const user = useSelector((state) => state.auth.user);

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
          <Tab label="Edit profile" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Paper elevation={4}>
            <div className={classes.headContainer}>
              <h1>{user.name}</h1>
              <h3>{user.location}</h3>
              <h3>{user.info}</h3>
            </div>
          </Paper>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Paper elevation={4} style={{ padding: 20 }}>
            <h1>Results</h1>
            {user.result.length > 0 &&
              user.result.map((item) => {
                return (
                  <ResultListItem
                    key={item.competition}
                    competition={item.competition}
                    points={item.points}
                    placing={item.placing}
                  />
                );
              })}
          </Paper>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Paper elevation={4}>
            <h1>Edit profil</h1>
          </Paper>
        </TabPanel>
      </div>
    </div>
  );
};

export default User;
