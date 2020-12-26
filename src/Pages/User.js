import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ResultListItem from "../components/ListItems/ResultListItem";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { useSelector, useDispatch } from "react-redux";
import { Colors } from "../colors";
import SubHeader from "../components/UI/SubHeader";
import PageHeader from "../components/UI/PageHeader";
import EditProfile from "../components/Forms/edirProfil";
import EditEmailAndPassword from "../components/Forms/editEmailAndPassword";

const useStyle = makeStyles({
  avatar: {
    margin: 40,
    width: 400,
    height: 400,
  },
  root: {
    display: "flex",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  headContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 20,
  },
  tabs: {
    width: 210,
    height: 80,
    textDecoration: "none",
    color: Colors.black,
    fontSize: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  active: {
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
  const [value, setValue] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const userImage = useSelector((state) => state.auth.userImage);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.container}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <PageHeader>{user.name}</PageHeader>
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
          <Tab
            className={classes.tabs}
            classes={{ selected: classes.active }}
            label="Password and Email"
          />
        </Tabs>
      </div>
      <div className="divOrange" />
      <div className="divBlack" />

      <div className={classes.root}>
        <Avatar className={classes.avatar} src={userImage} alt={user.name} />

        <TabPanel value={value} index={0} style={{ width: "90%" }}>
          <PageHeader>{user.name}</PageHeader>
          <SubHeader>{user.country}</SubHeader>
          <SubHeader>{user.bio}</SubHeader>
        </TabPanel>
        <TabPanel value={value} index={1} style={{ width: "90%" }}>
          <PageHeader>Results</PageHeader>
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
        </TabPanel>
        <TabPanel value={value} index={2} style={{ width: "90%" }}>
          <PageHeader>Update profile</PageHeader>
          <EditProfile />
        </TabPanel>
        <TabPanel value={value} index={3} style={{ width: "90%" }}>
          <EditEmailAndPassword />
        </TabPanel>
      </div>
    </div>
  );
};

export default User;
