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
  contentContainer: {
    margin: 40,
    ["@media (max-width: 1000px)"]: {
      margin: 0,
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

  if (!result || !sponsor) {
    history.push("/competitions");
  }

  const savedClasses = [];
  if (sponsor) {
    sponsor.forEach((item) => {
      return Object.values(item).forEach((i) => {
        return i.forEach((e) => {
          if (e.savedResult) {
            savedClasses.push(e);
          }
        });
      });
    });
  }

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
      <div className={classes.contentContainer}>
        <PageHeader>{competitionName}</PageHeader>

        {sponsor && (
          <>
            <SubHeader>Sponsors of all classes this competition</SubHeader>

            <div className={classes.sponsorContainer}>
              {sponsor.length > 0 &&
                sponsor.map((item) => {
                  return Object.values(item).map((i) => {
                    return i.map((u, index) => {
                      return (
                        <SponsorCard
                          key={index}
                          sponsorName={u.sponsors}
                          sponsorUrl={u.sponsorLoggo}
                          className={u.className}
                        />
                      );
                    });
                  });
                })}
            </div>
          </>
        )}
        {Object.keys(result).length === 0 && (
          <Alert severity="error">
            This competition has no finnished results yet
          </Alert>
        )}
        <ComponentToPrint ref={componentRef}>
          {result.length > 0 &&
            result.map((item, index) => {
              return (
                <TableContainer
                  key={index}
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
        <PageHeader>Published result for classes</PageHeader>
        <ComponentToPrint ref={componentRef}>
          {savedClasses.length > 0 &&
            savedClasses.map((item, index) => {
              return (
                <TableContainer
                  key={index}
                  component={Paper}
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <SubHeader>{item.className}</SubHeader>
                  <SubHeader>{item.divisions}</SubHeader>
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
                      {item.unPublishedResult.map((a) => {
                        return a.starts.map((res, index) => {
                          const color = index % 2 === 0;

                          if (res.shoeOne && res.shoeTwo) {
                            return (
                              <TableRow
                                key={index}
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
                        });
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
