import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { choiseModalStyle } from './styles/styles';

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

const ChoiseModal = ({ isOpen, handleClose, children }) => {
  const classes = choiseModalStyle();
  const [modalStyle] = useState(getModalStyle);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div style={modalStyle} className={classes.paper}>
        {children}
      </div>
    </Modal>
  );
};
export default ChoiseModal;
