import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ResultListItem from "../components/ListItems/ResultListItem";
import { useSelector } from "react-redux";
import SubHeader from "../components/UI/SubHeader";
import PageHeader from "../components/UI/PageHeader";
import EditProfile from "../components/DataCreators/edirProfil";
import EditEmailAndPassword from "../components/DataCreators/editEmailAndPassword";
import TabPanel from "../components/UI/TabPanel";
import CustomTab from "../components/UI/Tabs";
import { auth } from "../components/firebase";

const useStyle = makeStyles({
  avatar: {
    margin: 40,
    width: 400,
    height: 400,
    ["@media (max-width:1000px)"]: {
      width: "80%",
      height: "80%",
    },
  },
  root: {
    display: "flex",
    width: "100%",
    ["@media (max-width:1000px)"]: {
      flexDirection: "column",
      alignItems: "center",
    },
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
  header: {
    display: "flex",
    alignItems: "center",
    ["@media (max-width:1000px)"]: {
      flexDirection: "column",
    },
  },
});

const User = () => {
  const classes = useStyle();
  const [value, setValue] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const userImage = useSelector((state) => state.auth.userImage);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const buttons = [
    {
      id: 0,
      label: "Profile",
    },
    {
      id: 1,
      label: "Result",
    },
    {
      id: 2,
      label: "Edit profile",
    },
    {
      id: 3,
      label: "Password and Email",
    },
  ];

  const createAdmin = () => {
    const user = auth.currentUser;
    user.getIdToken().then(async (token) => {
      fetch(
        `https://us-central1-farrier-project.cloudfunctions.net/app/createAdmin/hoastimmy@gmail.com`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: 'hoastimmy@gmail.com' })
        }
      )
        .then((res) => {
          //console.log(res.json())
          //res.header.setValue('Access-Control-Allow-Origin', '*')
          //res.set('Access-Control-Allow-Origin', '*');
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <PageHeader>{user.name}</PageHeader>
        <CustomTab
          buttons={buttons}
          value={value}
          handleChange={handleChange}
        />
      </div>
      <div className="divOrange" />
      <div className="divBlack" />

      <div className={classes.root}>
      <button onClick={createAdmin}>Klick</button>
        <Avatar className={classes.avatar} src={userImage} alt={user.name} />

        <TabPanel value={value} index={0} style={{ width: "90%" }}>
          <PageHeader>{user.name}</PageHeader>
          <SubHeader>{user.country}</SubHeader>
          <SubHeader>{user.bio}</SubHeader>
        </TabPanel>
        <TabPanel value={value} index={1}>
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
        <TabPanel value={value} index={2}>
          <PageHeader>Update profile</PageHeader>
          <EditProfile />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <EditEmailAndPassword />
        </TabPanel>
      </div>
    </div>
  );
};

export default User;
