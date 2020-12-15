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

const Scores = () => {
  const [modalopen, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const l = useLocation();
  const compClasses = l.state;
  const compIndex = l.id;

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
    <div style={{ margin: 30 }}>
      <CustomModal
        isOpen={modalopen}
        handleClose={closeModalHandler}
        modalData={modalData}
      />
      {getScore(compClasses)}
      <Devider margin={60} />

      <P>
        If you press save the results will be saved but wont be shown to the
        pulic.
      </P>
      <P>You wont be able to edit these results after saving them</P>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CustomButton onClick={() => {}} title="Publish result" />
        <CustomButton onClick={() => history.goBack()} title="Go Back" />
      </div>
    </div>
  );
};

export default Scores;
