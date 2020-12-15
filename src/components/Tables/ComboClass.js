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
import SubHeader from "../UI/SubHeader";
import Devider from "../UI/Devider";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const ShoingClass = ({
  savedResult,
  handleModalContent,
  pointsToMultiply,
  result,
  index,
  compIndex,
  className,
}) => {
  const classes = useStyles();
  return (
    <div>
      <SubHeader>{className}</SubHeader>
      <SubHeader>Shoe to forge</SubHeader>
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
            {result.map((item, index) => {
              const color = index % 2 === 0;

              return (
                <TableRow
                  key={item.id}
                  style={{ backgroundColor: color ? "#DCDCDC" : "white" }}
                >
                  <TableCell align="left">
                    {savedResult ? item.competitor : item.id}
                  </TableCell>
                  <TableCell
                    onClick={
                      savedResult
                        ? () => alert("You can no longer edit these results")
                        : () =>
                            handleModalContent(
                              item.id,
                              "one",
                              compClasses[0].headerTitles[1],
                              compIndex,
                              item.id,
                              "shoeTwo"
                            )
                    }
                    align="left"
                  >
                    {item.shoeTwo.one}
                  </TableCell>
                  <TableCell
                    onClick={
                      savedResult
                        ? () => alert("You can no longer edit these results")
                        : () =>
                            handleModalContent(
                              item.id,
                              "two",
                              compClasses[0].headerTitles[2],
                              compIndex,
                              item.id,
                              "shoeTwo"
                            )
                    }
                    align="left"
                  >
                    {item.shoeTwo.two}
                  </TableCell>
                  <TableCell
                    onClick={
                      savedResult
                        ? () => alert("You can no longer edit these results")
                        : () =>
                            handleModalContent(
                              item.id,
                              "three",
                              compClasses[0].headerTitles[3],
                              compIndex,
                              item.id,
                              "shoeTwo"
                            )
                    }
                    align="left"
                  >
                    {item.shoeTwo.three}
                  </TableCell>
                  <TableCell
                    onClick={
                      savedResult
                        ? () => alert("You can no longer edit these results")
                        : () =>
                            handleModalContent(
                              item.id,
                              "four",
                              compClasses[0].headerTitles[4],
                              compIndex,
                              item.id,
                              "shoeTwo"
                            )
                    }
                    align="left"
                  >
                    {item.shoeTwo.four}
                  </TableCell>
                  <TableCell align="left">{item.shoeTwo.total}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Devider margin={50} />
      <SubHeader>Shoe to foot</SubHeader>

      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {compClasses[1].headerTitles.map((comp, index) => (
                <TableCell key={comp} align="left">
                  {` ${comp} , `}
                  <strong>{index > 0 && pointsToMultiply[index - 1]}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((item, index) => {
              const color = index % 2 === 0;
              return (
                <TableRow
                  key={item.id}
                  style={{ backgroundColor: color ? "#DCDCDC" : "white" }}
                >
                  <TableCell align="left">
                    {savedResult ? item.competitor : item.id}
                  </TableCell>
                  <TableCell
                    onClick={
                      savedResult
                        ? () => alert("You can no longer edit these results")
                        : () =>
                            handleModalContent(
                              item.id,
                              "one",
                              compClasses[1].headerTitles[1],
                              index,
                              compIndex,
                              item.id
                            )
                    }
                    align="left"
                  >
                    {item.one}
                  </TableCell>
                  <TableCell
                    onClick={
                      savedResult
                        ? () => alert("You can no longer edit these results")
                        : () =>
                            handleModalContent(
                              item.id,
                              "two",
                              compClasses[1].headerTitles[2],
                              index,
                              compIndex,
                              item.id
                            )
                    }
                    align="left"
                  >
                    {item.two}
                  </TableCell>
                  <TableCell
                    onClick={
                      savedResult
                        ? () => alert("You can no longer edit these results")
                        : () =>
                            handleModalContent(
                              item.id,
                              "three",
                              compClasses[1].headerTitles[3],
                              index,
                              compIndex,
                              item.id
                            )
                    }
                    align="left"
                  >
                    {item.three}
                  </TableCell>
                  <TableCell
                    onClick={
                      savedResult
                        ? () => alert("You can no longer edit these results")
                        : () =>
                            handleModalContent(
                              item.id,
                              "four",
                              compClasses[1].headerTitles[4],
                              index,
                              compIndex,
                              item.id
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
    </div>
  );
};

export default ShoingClass;
