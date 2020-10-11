import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { compClasses } from "../dummyData";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "../components/Modal";
import * as actions from "../store/actions/resultAction";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Admin = () => {
  const classes = useStyles();
  const [modalopen, setModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const dispatch = useDispatch();
  const result = useSelector((state) => state.result.result);
  const savedState = useSelector((state) => state.result.saved);

  const handleModalContent = (id, cell) => {
    setModalData({
      id: id,
      cellId: cell,
    });
    setModal(true);
  };
  const closeModalHandler = (data, id, cellId) => {
    console.log(data);
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
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {compClasses[2].headerTitles.map((comp) => (
                <TableCell align="left">{comp}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell align="left">
                    {savedState ? item.competitor : item.id}
                  </TableCell>
                  <TableCell
                    onClick={
                      savedState
                        ? () => alert("You can no longer edit these results")
                        : () => handleModalContent(item.id, "one")
                    }
                    align="left"
                  >
                    {item.one}
                  </TableCell>
                  <TableCell
                    onClick={
                      savedState
                        ? () => alert("You can no longer edit these results")
                        : () => handleModalContent(item.id, "two")
                    }
                    align="left"
                  >
                    {item.two}
                  </TableCell>
                  <TableCell
                    onClick={
                      savedState
                        ? () => alert("You can no longer edit these results")
                        : () => handleModalContent(item.id, "three")
                    }
                    align="left"
                  >
                    {item.three}
                  </TableCell>
                  <TableCell
                    onClick={
                      savedState
                        ? () => alert("You can no longer edit these results")
                        : () => handleModalContent(item.id, "four")
                    }
                    align="left"
                  >
                    {item.four}
                  </TableCell>
                  <TableCell align="left">{item.total}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <p>
        If you press save the results will be saved but wont be shown to the
        pulic.
      </p>
      <p>You wont be able to edit these results after saving them</p>
      <Button onClick={saveResults}>Save results</Button>
    </div>
  );
};

export default Admin;
