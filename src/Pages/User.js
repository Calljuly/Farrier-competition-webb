import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useSelector } from "react-redux";
import PageHeader from "../components/UI/PageHeader";
import SubHeader from "../components/UI/SubHeader";
import TopPagesHeader from "../components/UI/TopPagesHeader";

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
  const user = useSelector((state) => state.auth.user);
  const userImage = useSelector((state) => state.auth.userImage);

  return (
    <div className={classes.container}>
      <TopPagesHeader title={user.name} />

      <div className={classes.root}>
        <Avatar className={classes.avatar} src={userImage} alt={user.name} />
        <div>
          <PageHeader>{user.name}</PageHeader>
          <SubHeader>Age : {user.age}</SubHeader>
          <SubHeader>Address : {user.address}</SubHeader>
          <SubHeader>Phone : {user.phone}</SubHeader>
          <SubHeader>Country : {user.country}</SubHeader>
          <SubHeader>Information : {user.bio}</SubHeader>
        </div>
      </div>
    </div>
  );
};

export default User;
