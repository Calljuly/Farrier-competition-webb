import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CustomButton from "./CustomButton";
import P from "./UI/Paragraph";
import PageHeader from "./UI/PageHeader";
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
    width: 700,
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

const CustomModal = ({ isOpen, handleClose, description, action }) => {
  const classes = useStyles();
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
