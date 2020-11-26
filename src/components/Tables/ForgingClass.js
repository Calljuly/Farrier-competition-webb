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
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import P from "../UI/Paragraph";
import CustomButton from "../CustomButton";
import Devider from "../UI/Devider";
import SubHeader from "../UI/SubHeader";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const ForgingClass = ({
  saveResults,
  handleModalContent,
  pointsToMultiply,
  result,
  index,
  compIndex,
  className,
}) => {
  const savedState = useSelector((state) => state.result.saved);
  const { goBack } = useHistory();
  const classes = useStyles();
  return (
    <div>
      <SubHeader>{className}</SubHeader>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {compClasses[0].headerTitles.map((comp, index) => (
                <TableCell key={comp} align="left">
                  {` ${comp} , `}
                  <strong>{index > 0 && pointsToMultiply[index - 1]}</strong>
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
                              compClasses[1].headerTitles[1],
                              index,
                              compIndex
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
                              compClasses[1].headerTitles[2],
                              index,
                              compIndex
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
                              compClasses[1].headerTitles[3],
                              index,
                              compIndex
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
                              compClasses[1].headerTitles[4],
                              index,
                              compIndex
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
      <Devider margin={60} />

      <P>
        If you press save the results will be saved but wont be shown to the
        pulic.
      </P>
      <P>You wont be able to edit these results after saving them</P>
      <CustomButton onClick={saveResults} title="Save results" />
      <CustomButton onClick={() => goBack()} title="Go Back" />
    </div>
  );
};

export default ForgingClass;
