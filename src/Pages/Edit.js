import React from "react";
import CustomButton from "../components/CustomButton";
import EditClass from "../components/DataCreators/editClass";
import Devider from "../components/UI/Devider";
import { useLocation, useHistory } from "react-router-dom";
import EditCompetition from "../components/DataCreators/editCompetition";
import PageHeader from "../components/UI/PageHeader";
import ButtonContainer from "../components/UI/ButtonContainer";

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
        {compClasses.length > 0 &&
          compClasses.map((divs, index) => {
            return Object.values(divs).map((data) => {
              return data.map((item) => {
                return <EditClass key={item.className} classes={item} />;
              });
            });
          })}
        <Devider margin={30} />

        <ButtonContainer>
          <CustomButton onClick={() => history.goBack()} title="Go Back" />
        </ButtonContainer>
      </div>
    </>
  );
};

export default Edit;
