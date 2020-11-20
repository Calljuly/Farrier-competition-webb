import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CustomButton from "./CustomButton";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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

const CreateCompetitionModal = ({
  isOpen,
  handleClose,
  modalData,
  title,
  children,
}) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [text, setText] = useState(0);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div style={modalStyle} className={classes.paper}>
        {children}
      </div>
    </Modal>
  );
};
export default CreateCompetitionModal;
