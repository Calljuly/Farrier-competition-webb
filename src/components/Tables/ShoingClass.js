import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { compClasses } from "../../dummyData";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const ShoingClass = ({ saveResults, goBack, handleModalContent }) => {
  const savedState = useSelector((state) => state.result.saved);
  const result = useSelector((state) => state.result.result);

  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {compClasses[2].headerTitles.map((comp) => (
                <TableCell key={comp} align="left">
                  {comp}
                </TableCell>
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
                        : () =>
                            handleModalContent(
                              item.id,
                              "one",
                              compClasses[2].headerTitles[1]
                            )
                    }
                    align="left"
                  >
                    {item.one}
                  </TableCell>
                  <TableCell
                    onClick={
                      savedState
                        ? () => alert("You can no longer edit these results")
                        : () =>
                            handleModalContent(
                              item.id,
                              "two",
                              compClasses[2].headerTitles[2]
                            )
                    }
                    align="left"
                  >
                    {item.two}
                  </TableCell>
                  <TableCell
                    onClick={
                      savedState
                        ? () => alert("You can no longer edit these results")
                        : () =>
                            handleModalContent(
                              item.id,
                              "three",
                              compClasses[2].headerTitles[3]
                            )
                    }
                    align="left"
                  >
                    {item.three}
                  </TableCell>
                  <TableCell
                    onClick={
                      savedState
                        ? () => alert("You can no longer edit these results")
                        : () =>
                            handleModalContent(
                              item.id,
                              "four",
                              compClasses[2].headerTitles[4]
                            )
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
      <Button onClick={goBack}>Go Back</Button>
    </div>
  );
};

export default ShoingClass;
