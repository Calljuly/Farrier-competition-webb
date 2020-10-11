import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { TextField, Button } from "@material-ui/core";
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
  const [modalStyle] = React.useState(getModalStyle);
  const [text, setText] = useState(0);

  const handler = (event) => {
    event.preventDefault();
    setText(event.target.value);
  };
  const onSubmitHandler = () => {
    handleClose(text, modalData.id, modalData.cellId);
    setText(0);
  };
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className={classes.modalContent}>
        <div>
          <p>{title}</p>
        </div>
        <div>
          <TextField
            InputProps={{ inputProps: { min: 0, max: 10 } }}
            type="number"
            onChange={(event) => handler(event)}
          />
        </div>

        <Button onClick={onSubmitHandler}>Klick</Button>
      </div>
    </Modal>
  );
};
export default CustomModal;
