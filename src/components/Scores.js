import React, { useState } from "react";
import ShoingClass from "./Tables/ShoingClass";
import ForgingClass from "./Tables/ForgingClass";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import CustomModal from "../components/Modal";
import * as actions from "../store/actions/resultAction";
import { useLocation, useHistory } from "react-router-dom";
import P from "./UI/Paragraph";
import CustomButton from "./CustomButton";
import Devider from "./UI/Devider";

const Scores = () => {
  const [modalopen, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const { goBack } = useHistory();

  const dispatch = useDispatch();
  const l = useLocation();
  const compClasses = l.state;
  const compIndex = l.compIndex;

  const closeModalHandler = (data) => {
    if (+data) {
      dispatch(
        actions.addPoint(
          data,
          modalData.id,
          modalData.cellId,
          modalData.index,
          modalData.compIndex,
          compClasses
        )
      );
    }
    setModal(false);
  };
  const saveResults = () => {
    dispatch(actions.savePoints());
  };

  const handleModalContent = (id, cell, title, index, compIndex, user) => {
    setModalData({
      id: id,
      cellId: cell,
      title: title,
      index: index,
      compIndex: compIndex,
      user: user,
    });
    setModal(true);
  };
  return (
    <div style={{ margin: 30 }}>
      <CustomModal
        isOpen={modalopen}
        handleClose={closeModalHandler}
        modalData={modalData}
      />
      {compClasses.map((classes, index) => {
        switch (classes.type) {
          case "forging":
            return (
              <ForgingClass
                key={index}
                className={classes.className}
                handleModalContent={handleModalContent}
                saveResults={saveResults}
                pointsToMultiply={classes.pointsToMultiply}
                result={classes.unPublishedResult}
                index={index}
                compIndex={compIndex}
              />
            );

          case "shoeing":
            return (
              <ShoingClass
                key={index}
                className={classes.className}
                handleModalContent={handleModalContent}
                saveResults={saveResults}
                pointsToMultiply={classes.pointsToMultiply}
                result={classes.unPublishedResult}
                index={index}
                compIndex={compIndex}
              />
            );
          case "comboClass":
            return <></>;
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
      })}
      <Devider margin={60} />

      <P>
        If you press save the results will be saved but wont be shown to the
        pulic.
      </P>
      <P>You wont be able to edit these results after saving them</P>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CustomButton onClick={() => {}} title="Publish result" />
        <CustomButton onClick={() => goBack()} title="Go Back" />
      </div>
    </div>
  );
};

export default Scores;
