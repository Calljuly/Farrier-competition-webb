import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import PageHeader from "../components/UI/PageHeader";
import SubHeader from "../components/UI/SubHeader";
import TopPagesHeader from "../components/UI/TopPagesHeader";
import { userPageStyle } from './styles/styles';

const User = () => {
  const classes = userPageStyle();
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
