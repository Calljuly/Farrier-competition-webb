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
import PageHeader from "../UI/PageHeader";
import { useLocation, useHistory } from "react-router-dom";
import CustomButton from "../CustomButton";
const useStyles = makeStyles({
  table: {
    width: "95%",
    margin: "auto",
  },
  paragraf: {
    "-webkit-transform": "rotate(90deg)",
    "-moz-transform": "rotate(90deg)",
    "-ms-transform": "rotate(90deg)",
    "-o-transform": "rotate(90deg)",
    transform: "rotate(90deg)",
    display: "block",
    textAlign: "top",
    verticalAlign: "top",
    margin: "0px",
    padding: "0px",
    paddingTop: "10px",
    whiteSpace: "nowrap",
    transformOrigin: "left left 0",
    width: "100%",
    height: "100%",
  },
});

const Result = () => {
  const classes = useStyles();
  const l = useLocation();
  const result = l.result;
  const competitionName = l.name;
  const history = useHistory();

  if (!result) {
    history.push("/admin");
  }
  return (
    <div>
      <PageHeader>Result</PageHeader>
      <div className="divOrange" />
      <div className="divBlack" />
      <div style={{ margin: "auto", width: "80%" }}>
        <SubHeader>{competitionName}</SubHeader>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                {compClasses[1].headerTitles.map((comp, index) => {
                  if (comp !== "Total Points") {
                    return (
                      <TableCell
                        key={comp}
                        style={{ verticalAlign: "bottom", padding: 0 }}
                      >
                        <p>{comp}</p>
                      </TableCell>
                    );
                  }
                })}
                {compClasses[0].headerTitles.map((comp, index) => {
                  if (comp !== "Competitor") {
                    return (
                      <TableCell
                        key={comp}
                        style={{ verticalAlign: "bottom", marginRight: 0 }}
                      >
                        <p>{comp}</p>
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {result &&
                result.map((item, index) => {
                  const color = index % 2 === 0;
                  return item.result.map((res) => {
                    if (res.shoeOne && res.shoeTwo) {
                      return (
                        <TableRow
                          key={item.id}
                          style={{
                            backgroundColor: color ? "#DCDCDC" : "white",
                          }}
                        >
                          <TableCell align="left">{res.competitor}</TableCell>
                          <TableCell align="left">{res.shoeOne.one}</TableCell>
                          <TableCell align="left">{res.shoeOne.two}</TableCell>
                          <TableCell align="left">
                            {res.shoeOne.three}
                          </TableCell>
                          <TableCell align="left">{res.shoeOne.four}</TableCell>
                          <TableCell align="left">{res.shoeTwo.one}</TableCell>
                          <TableCell align="left">{res.shoeTwo.two}</TableCell>
                          <TableCell align="left">
                            {res.shoeTwo.three}
                          </TableCell>
                          <TableCell align="left">{res.shoeTwo.four}</TableCell>
                          <TableCell align="left">
                            {res.shoeOne.total + res.shoeTwo.total}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  });
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomButton onClick={() => history.goBack()} title="Go Back" />
        </div>
      </div>
    </div>
  );
};

export default Result;
