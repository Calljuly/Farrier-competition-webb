import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "../components/Modal";
import * as actions from "../store/actions/resultAction";
import ShoingClass from "../components/Tables/ShoingClass";
import ForgingClass from "../components/Tables/ForgingClass";
import AddCompetition from "../components/Forms/addCompetition";

const Admin = () => {
  const [modalopen, setModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const dispatch = useDispatch();
  const compClasses = useSelector((state) =>
    state.competitions.competitions.filter((comp) => {
      if (comp.id === "gjhAkbUpupIBrgysmoAG") {
        return comp.classes;
      }
    })
  );

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
      <h1>Admin</h1>
      <AddCompetition />
      {compClasses.map((item, index) => {
        const a = item.classes;
        return (
          <ShoingClass
            key={a[index].type}
            handleModalContent={handleModalContent}
            saveResults={saveResults}
            pointsToMultiply={a[index].pointsToMultiply}
            result={a[index].result}
          />
        );
      })}
    </div>
  );
};

export default Admin;
