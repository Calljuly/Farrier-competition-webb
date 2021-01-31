import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SubHeader from "../components/UI/SubHeader";
import PageHeader from "../components/UI/PageHeader";
import { useLocation, useHistory } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { Alert } from "@material-ui/lab";
import ComponentToPrint from "../components/PdfGenerator";
import { useReactToPrint } from "react-to-print";
import ButtonContainer from "../components/UI/ButtonContainer";

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

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!entries) {
    history.push("/competitions");
  }

  return (
    <>
      <PageHeader>Startlist</PageHeader>
      <div className="divOrange" />
      <div className="divBlack" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "start",
          margin: 30,
          marginBottom: 30,
        }}
      >
        <ComponentToPrint ref={componentRef}>
          <PageHeader>{competitionName}</PageHeader>

          {entries && Object.keys(entries).length > 0 ? (
            Object.keys(entries).map((divs, index) => (
              <TableContainer component={Paper}>
                <SubHeader>{divs}</SubHeader>

                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ verticalAlign: "bottom", padding: 0 }}
                      >
                        <p>Id</p>
                      </TableCell>
                      <TableCell
                        style={{ verticalAlign: "bottom", padding: 0 }}
                      >
                        <p>Competitor</p>
                      </TableCell>
                      <TableCell
                        style={{ verticalAlign: "bottom", padding: 0 }}
                      >
                        <p>Country</p>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {entries &&
                      entries[divs].map((item, index) => {
                        const color = index % 2 === 0;
                        return (
                          <TableRow
                            key={item.id}
                            style={{
                              backgroundColor: color ? "#DCDCDC" : "white",
                            }}
                          >
                            <TableCell align="left">
                              {item.competitor}
                            </TableCell>
                            <TableCell align="left">{item.id}</TableCell>
                            <TableCell align="left">{item.country}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            ))
          ) : (
            <Alert severity="error">No startlist avalibale</Alert>
          )}
        </ComponentToPrint>

        <ButtonContainer>
          <CustomButton title="Print startlist" onClick={handlePrint} />
          <CustomButton title="Go back" onClick={() => history.goBack()} />
        </ButtonContainer>
      </div>
    </>
  );
};

export default StartList;
