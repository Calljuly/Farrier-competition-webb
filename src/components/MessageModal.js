import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
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

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    justifyContent: "cenetr",
    alignItems: "center",
    flexDirection: "column",
  },
  modalContent: {
    backgroundColor: "white",
    width: "80%",
    height: 300,
    alignSelf: "center",
  },
}));

const MessageModal = ({ isOpen, handleClose, modalData }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div style={modalStyle} className={classes.paper}>
        <div>
          <h1>{modalData.title}</h1>
        </div>
        <div>
          <P>{modalData.description}</P>
        </div>

        <Button onClick={handleClose}>Okey</Button>
      </div>
    </Modal>
  );
};
export default MessageModal;
