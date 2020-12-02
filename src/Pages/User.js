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
import { Colors } from "../colors";

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
    display: "flex",
  },
  tabs: {
    width: 250,
    height: 100,
    textDecoration: "none",
    color: Colors.orange,
    backgroundColor: Colors.black,
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
  },
  active: {
    margin: 5,
    textDecoration: "none",
    color: "#101820FF",
    backgroundColor: "#F2AA4CFF",
    fontSize: 30,
    borderRadius: 10,
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

const User = () => {
  const classes = useStyle();
  const [value, setValue] = React.useState(0);
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar} src={users[0].img} />

      <div className={classes.root}>
        <Tabs
          TabIndicatorProps={{
            style: {
              height: "0px",
            },
          }}
          value={value}
          onChange={handleChange}
          orientation="vertical"
        >
          <Tab
            className={classes.tabs}
            classes={{ selected: classes.active, root: classes.tabs }}
            label="Profile"
          />
          <Tab
            className={classes.tabs}
            classes={{ selected: classes.active }}
            label="Results "
          />
          <Tab
            className={classes.tabs}
            classes={{ selected: classes.active }}
            label="Edit profile"
          />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Paper elevation={4} style={{ padding: 20 }}>
            <h1>{user.name}</h1>
            <h3>{user.location}</h3>
            <h3>{user.info}</h3>
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
            <h1>Edit profile</h1>
          </Paper>
        </TabPanel>
      </div>
    </div>
  );
};

export default User;
