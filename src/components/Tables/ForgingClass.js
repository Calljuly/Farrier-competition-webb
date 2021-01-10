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

const ForgingClass = ({
  savedResult,
  handleModalContent,
  pointsToMultiply,
  result,
  index,
  compIndex,
  className,
  shoe,
  heatId,
}) => {
  const classes = useStyles();
  const rows = [
    {
      id: 0,
      cell: "one",
    },
    {
      id: 1,
      cell: "two",
    },
    {
      id: 2,
      cell: "three",
    },
    {
      id: 3,
      cell: "four",
    },
  ];

  return (
    <div>
      <SubHeader>{className}</SubHeader>
      <Devider margin={50} />

      <SubHeader>Shoe one</SubHeader>
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
            {result.length > 0 &&
              result.map((item, index) => {
                const color = index % 2 === 0;
                return (
                  <TableRow
                    key={item.id}
                    style={{ backgroundColor: color ? "#DCDCDC" : "white" }}
                  >
                    <TableCell align="left">
                      {savedResult ? item.competitor : item.id}
                    </TableCell>
                    {rows.map((row) => (
                      <TableCell
                        key={row.id}
                        onClick={
                          savedResult
                            ? () =>
                                alert("You can no longer edit these results")
                            : () =>
                                handleModalContent(
                                  heatId,
                                  row.cell,
                                  compClasses[0].headerTitles[1],
                                  compIndex,
                                  item.id,
                                  shoe
                                )
                        }
                        align="left"
                      >
                        {item[shoe][row.cell]}
                      </TableCell>
                    ))}
                    <TableCell align="left">{item[shoe].total}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ForgingClass;
