import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const getModalStyle = () => {
  return {
    margin: "auto",
    width: "50%",
    height: "50%",
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    boxShadow: theme.shadows[5],
    backgroundColor: "white",
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    overflow: "scroll",
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

const ChoiseModal = ({ isOpen, handleClose, children }) => {
  const classes = useStyles();
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
