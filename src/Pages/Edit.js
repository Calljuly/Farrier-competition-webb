import React, { useEffect } from "react";
import CustomButton from "../components/CustomButton";
import EditClass from "../components/Forms/editClass";
import Devider from "../components/UI/Devider";
import { useLocation, useHistory } from "react-router-dom";
import EditCompetition from "../components/Forms/editCompetition";
import PageHeader from "../components/UI/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/competitionAction";
import { Alert } from "@material-ui/lab";

const Edit = () => {
  const l = useLocation();
  const compClasses = l.state;
  const id = l.id;
  const history = useHistory();
  const sucsess = useSelector((state) => state.competitions.sucsess);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) {
      history.push("/admin");
    }
  }, [id]);

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
        {sucsess && (
          <Alert onClose={() => dispatch(actions.closeAlert())}>
            You updated sucsessfully!
          </Alert>
        )}
        <EditCompetition />
        {compClasses.map((item) => {
          console.log(item);
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
