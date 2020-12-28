import React, { useState, useEffect } from "react";
import ShoingClass from "./Tables/ShoingClass";
import ForgingClass from "./Tables/ForgingClass";
import { useDispatch } from "react-redux";
import CustomModal from "../components/Modal";
import * as actions from "../store/actions/resultAction";
import { useLocation, useHistory } from "react-router-dom";
import P from "./UI/Paragraph";
import CustomButton from "./CustomButton";
import Devider from "./UI/Devider";
import PageHeader from "./UI/PageHeader";
import ComboClass from "./Tables/ComboClass";
import { Alert } from "@material-ui/lab";
import { storage } from "./firebase";

const Scores = () => {
  const [modalopen, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const l = useLocation();
  const compClasses = l.state;
  const compIndex = l.id;
  const [sponsor, setSponsor] = useState("");
  const closeModalHandler = (data) => {
    if (+data) {
      dispatch(
        actions.addPoint(
          data,
          modalData.id,
          modalData.cellId,
          compIndex,
          compClasses,
          modalData.type
        )
      );
    }
    setModal(false);
  };
  const handleModalContent = (id, cell, title, compIndex, user, type) => {
    console.log(id);
    console.log(cell);
    console.log(title);
    console.log(compIndex);
    console.log(user);
    console.log(type);

    setModalData({
      id: id,
      cellId: cell,
      title: title,
      compIndex: compIndex,
      user: user,
      type: type,
    });
    setModal(true);
  };

  useEffect(() => {
    if (!compIndex) {
      history.push("/admin");
    }
  }, [compClasses]);

  if (compClasses.sponsorLoggo) {
    storage
      .ref()
      .child(`images/${compClasses.sponsorLoggo}`)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setSponsor(url);
      });
  }

  if (compClasses.length === 0) {
    return (
      <>
        <PageHeader>
          No classes to add scores to
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CustomButton onClick={() => history.goBack()} title="Go Back" />
          </div>
        </PageHeader>
      </>
    );
  }
  const getScore = (classes) => {
    console.log(classes);
    switch (classes.type) {
      case "Forging":
        return (
          <ForgingClass
            className={classes.className}
            handleModalContent={handleModalContent}
            savedResult={classes.savedResult}
            pointsToMultiply={classes.pointsToMultiply}
            result={classes.unPublishedResult}
            compIndex={compIndex}
          />
        );

      case "Shoeing":
        return (
          <ShoingClass
            className={classes.className}
            handleModalContent={handleModalContent}
            savedResult={classes.savedResult}
            pointsToMultiply={classes.pointsToMultiply}
            result={classes.unPublishedResult}
            compIndex={compIndex}
          />
        );
      case "ComboClass":
        return (
          <ComboClass
            className={classes.className}
            handleModalContent={handleModalContent}
            savedResult={classes.savedResult}
            pointsToMultiply={classes.pointsToMultiply}
            result={classes.unPublishedResult}
            compIndex={compIndex}
          />
        );
      case "eagleEye":
        return <></>;
      case "speedForging":
        break;
      case "team":
        break;
      case "pairs":
        break;
      default:
        return <></>;
    }
  };
  return (
    <>
      <PageHeader>Scores</PageHeader>
      <div className="divOrange" />
      <div className="divBlack" />
      <div style={{ margin: 30 }}>
        <CustomModal
          isOpen={modalopen}
          handleClose={closeModalHandler}
          modalData={modalData}
        />
        {compClasses.savedResult && (
          <Alert>
            <P>This class is saved and you wont be able to change the scores</P>
          </Alert>
        )}
        {getScore(compClasses)}
        <Devider margin={60} />

        <P>
          If you press save the results will be saved but wont be shown to the
          pulic.
        </P>
        <P>You wont be able to edit these results after saving them</P>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {!compClasses.savedResult && (
            <CustomButton onClick={() => {}} title="Publish result" />
          )}
          <CustomButton onClick={() => history.goBack()} title="Go Back" />
        </div>
      </div>
    </>
  );
};

export default Scores;
