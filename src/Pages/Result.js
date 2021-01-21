import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { compClasses } from "../dummyData";
import SubHeader from "../components/UI/SubHeader";
import PageHeader from "../components/UI/PageHeader";
import { useLocation, useHistory } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import SponsorCard from "../components/SponsorCard";
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
  sponsorContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: 30,
    ["@media (max-width: 1000px)"]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
});

const Result = () => {
  const classes = useStyles();
  const l = useLocation();
  const result = l.result;
  const competitionName = l.name;
  const sponsor = l.divisions;
  const history = useHistory();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!result || !sponsor) {
    history.push("/competitions");
    return null;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: 30,
        }}
      >
        <PageHeader>Result</PageHeader>
        <CustomButton onClick={() => history.goBack()} title="Go Back" />
      </div>
      <div className="divOrange" />
      <div className="divBlack" />
      <div style={{ margin: 40 }}>
        <SubHeader>{competitionName}</SubHeader>
        <SubHeader>Sponsors of all classes this competition</SubHeader>

        {false &&<div className={classes.sponsorContainer}>
          {sponsor.map((item) => (
            <SponsorCard
              sponsorName={item.sponsors}
              sponsorUrl={item.sponsorLoggo}
              className={item.className}
            />
          ))}
        </div>}
        <ComponentToPrint ref={componentRef}>
          {result &&
            result.map((item, index) => {
              return (
                <TableContainer
                  key={item.competitor}
                  component={Paper}
                  style={{ margin: "50px" }}
                >
                  <SubHeader>{item.className}</SubHeader>
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
                                style={{
                                  verticalAlign: "bottom",
                                  padding: 0,
                                  fontSize: 16,
                                }}
                                classes={{ root: { fontSize: 16 } }}
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
                                style={{ verticalAlign: "bottom", padding: 0 }}
                              >
                                <p>{comp}</p>
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item.result.map((res, index) => {
                        const color = index % 2 === 0;

                        if (res.shoeOne && res.shoeTwo) {
                          return (
                            <TableRow
                              key={item.id}
                              style={{
                                backgroundColor: color ? "#DCDCDC" : "white",
                              }}
                            >
                              <TableCell align="left">
                                {res.competitor}
                              </TableCell>
                              <TableCell align="left">
                                {res.shoeOne.one}
                              </TableCell>
                              <TableCell align="left">
                                {res.shoeOne.two}
                              </TableCell>
                              <TableCell align="left">
                                {res.shoeOne.three}
                              </TableCell>
                              <TableCell align="left">
                                {res.shoeOne.four}
                              </TableCell>
                              <TableCell align="left">
                                {res.shoeTwo.one}
                              </TableCell>
                              <TableCell align="left">
                                {res.shoeTwo.two}
                              </TableCell>
                              <TableCell align="left">
                                {res.shoeTwo.three}
                              </TableCell>
                              <TableCell align="left">
                                {res.shoeTwo.four}
                              </TableCell>
                              <TableCell align="left">
                                {res.shoeOne.total + res.shoeTwo.total}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              );
            })}
        </ComponentToPrint>
        <ButtonContainer>
          <CustomButton onClick={handlePrint} title="Print result" />
          <CustomButton onClick={() => history.goBack()} title="Go Back" />
        </ButtonContainer>
      </div>
    </>
  );
};

export default Result;
