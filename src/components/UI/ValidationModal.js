import Modal from "@material-ui/core/Modal";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { validationModalStyle } from './styles/styles';
import PageHeader from "./UI/PageHeader";
import P from "./UI/Paragraph";

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

const CustomModal = ({ isOpen, handleClose, description, action }) => {
  const classes = validationModalStyle();
  const [modalStyle] = useState(getModalStyle);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div style={modalStyle} className={classes.paper}>
        <PageHeader>Are you sure ?</PageHeader>

        <div>
          <P>{description}</P>
        </div>
        <div style={{ display: "flex" }}>
          <CustomButton onClick={handleClose} title="Cancel" />

          <CustomButton onClick={action} title="Accept" />
        </div>
      </div>
    </Modal>
  );
};
export default CustomModal;
