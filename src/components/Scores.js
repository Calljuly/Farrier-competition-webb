import React, { useState } from "react";
import ShoingClass from "./Tables/ShoingClass";
import ForgingClass from "./Tables/ForgingClass";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import CustomModal from "../components/Modal";
import * as actions from "../store/actions/resultAction";
import { useLocation } from "react-router-dom";

const Scores = () => {
  const [modalopen, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const dispatch = useDispatch();
  const l = useLocation();
  const compClasses = l.state;
  const compIndex = l.compIndex;

  const closeModalHandler = (data) => {
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
    setModal(false);
  };
  const saveResults = () => {
    dispatch(actions.savePoints());
  };

  const handleModalContent = (id, cell, title, index, compIndex) => {
    setModalData({
      id: id,
      cellId: cell,
      title: title,
      index: index,
      compIndex: compIndex,
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
        return classes.type === "shoeing" ? (
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
        ) : (
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
      })}
    </div>
  );
};

export default Scores;
