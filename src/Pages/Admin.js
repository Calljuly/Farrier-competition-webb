import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { compClasses } from "../dummyData";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "../components/Modal";
import * as actions from "../store/actions/resultAction";
import { Button } from "@material-ui/core";
import ShoingClass from "../components/Tables/ShoingClass";
import { result, resultTwo } from "../dummyData";

const Admin = ({ goBack, compClasses }) => {
  const [modalopen, setModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const dispatch = useDispatch();

  const handleModalContent = (id, cell, title) => {
    setModalData({
      id: id,
      cellId: cell,
      title: title,
    });
    setModal(true);
  };
  const closeModalHandler = (data, id, cellId) => {
    dispatch(actions.addPoint(data, id, cellId));
    setModal(false);
  };
  const saveResults = () => {
    dispatch(actions.savePoints());
  };
  return (
    <div>
      <CustomModal
        isOpen={modalopen}
        handleClose={closeModalHandler}
        modalData={modalData}
      />
      {compClasses.map((item, index) => {
        return (
          <ShoingClass
            key={item.title}
            handleModalContent={handleModalContent}
            saveResults={saveResults}
            goBack={goBack}
          />
        );
      })}
    </div>
  );
};

export default Admin;
