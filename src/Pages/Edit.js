import React, { useEffect } from "react";
import CustomButton from "../components/CustomButton";
import EditClass from "../components/Forms/editClass";
import Devider from "../components/UI/Devider";
import { useLocation, useHistory } from "react-router-dom";
import EditCompetition from "../components/Forms/editCompetition";
import PageHeader from "../components/UI/PageHeader";

const Edit = () => {
  const l = useLocation();
  const compClasses = l.state;
  const id = l.id;
  const history = useHistory();

  if (!id) {
    history.push("/admin");
  }

  return (
    <>
      <PageHeader>Edit competition</PageHeader>
      <div className="divOrange" />
      <div className="divBlack" />
      <div
        style={{
          margin: "auto",
          width: "80%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <EditCompetition />
        {compClasses.map((item) => {
          return <EditClass key={item.className} classes={item} />;
        })}
        <Devider margin={30} />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomButton onClick={() => history.goBack()} title="Go Back" />
        </div>
      </div>
    </>
  );
};

export default Edit;