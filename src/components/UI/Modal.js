import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import PageHeader from "./PageHeader";
import SubHeader from "./SubHeader";
import CustomButton from "./CustomButton";
import TextInput from "./TextInput";

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const CustomModal = ({ isOpen, handleClose, modalData }) => {
  const classes = modalStyle();
  const [modalStyle] = useState(getModalStyle);
  const [text, setText] = useState(0);

  const handler = (event) => {
    event.preventDefault();
    if (Number.isFinite(+event.target.value)) {
      setText(event.target.value);
    }
  };
  const onSubmitHandler = () => {
    handleClose(text, modalData.id, modalData.cellId);
  };
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div style={modalStyle} className={classes.paper}>
        <PageHeader>Enter points for : </PageHeader>
        <SubHeader>Competitor : {modalData.user}</SubHeader>
        <div>
          <SubHeader>{modalData.title}</SubHeader>
        </div>

        <div>
          <TextInput
            InputProps={{ inputProps: { min: 0, max: 10 } }}
            type="number"
            onChange={(event) => handler(event)}
          />
        </div>

        <CustomButton onClick={onSubmitHandler} title="Save" />
      </div>
    </Modal>
  );
};
export default CustomModal;
