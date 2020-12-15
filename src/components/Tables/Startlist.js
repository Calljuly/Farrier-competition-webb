import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SubHeader from "../UI/SubHeader";
import PageHeader from "../UI/PageHeader";
import { useLocation, useHistory } from "react-router-dom";
import CustomButton from "../CustomButton";
import P from "../UI/Paragraph";
import { Alert } from "@material-ui/lab";

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

const StartList = () => {
  const classes = useStyles();
  const l = useLocation();
  const entries = l.entries;
  const competitionName = l.name;
  const history = useHistory();

  if (!entries) {
    history.push("/admin");
  }
  return (
    <>
      <PageHeader>Startlist</PageHeader>
      <div className="divOrange" />
      <div className="divBlack" />
      <div
        style={{
          margin: "auto",
          width: "80%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SubHeader>{competitionName}</SubHeader>

        {entries && entries.length > 0 ? (
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ verticalAlign: "bottom", padding: 0 }}>
                    <p>Id</p>
                  </TableCell>
                  <TableCell style={{ verticalAlign: "bottom", padding: 0 }}>
                    <p>Competitor</p>
                  </TableCell>
                  <TableCell style={{ verticalAlign: "bottom", padding: 0 }}>
                    <p>Country</p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entries &&
                  entries.map((item, index) => {
                    const color = index % 2 === 0;
                    return (
                      <TableRow
                        key={item.id}
                        style={{ backgroundColor: color ? "#DCDCDC" : "white" }}
                      >
                        <TableCell align="left">{item.competitor}</TableCell>
                        <TableCell align="left">{item.id}</TableCell>
                        <TableCell align="left">{item.country}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="error">No startlist avalibale</Alert>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomButton title="Print startlist" onClick={() => {}} />
          <CustomButton title="Go back" onClick={() => history.goBack()} />
        </div>
      </div>
    </>
  );
};

export default StartList;
