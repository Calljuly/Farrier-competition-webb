import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { TextField, Button } from "@material-ui/core";
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

const CustomModal = ({ isOpen, handleClose, modalData, title }) => {
  const classes = useStyles();
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
        <h4>Enter points for : </h4>

        <div>
          <h2>{modalData.title}</h2>
        </div>
        <div>
          <TextField
            InputProps={{ inputProps: { min: 0, max: 10 } }}
            type="number"
            onChange={(event) => handler(event)}
          />
        </div>

        <Button onClick={onSubmitHandler}>Save</Button>
      </div>
    </Modal>
  );
};
export default CustomModal;
