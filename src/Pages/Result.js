import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Alert } from "@material-ui/lab";
import React, { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import CustomButton from "../components/UI/CustomButton";
import ComponentToPrint from "../components/UI/PdfGenerator";
import SponsorCard from "../components/UI/SponsorCard";
import ButtonContainer from "../components/UI/ButtonContainer";
import Devider from "../components/UI/Devider";
import PageHeader from "../components/UI/PageHeader";
import SubHeader from "../components/UI/SubHeader";
import TopPagesHeader from "../components/UI/TopPagesHeader";
import { compClasses } from "../dummyData";
import { resultPageStyle } from './styles/styles';

const Result = () => {

  const result = [];
  const savedClasses = [];

  const classes = resultPageStyle();
  const location = useLocation();
  const history = useHistory();
  const resultRef = useRef();

  const incomingResult = location.result ? location.result : [];
  const competitionName = location.name ? location.name : "No name avalilable";
  const sponsor = location.divisions ? location.divisions : [];

  const handleResultPrint = useReactToPrint({
    content: () => resultRef.current,
  });

  const classResultRef = useRef();
  const handleClassPrint = useReactToPrint({
    content: () => classResultRef.current,
  });

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

  incomingResult.forEach((i) => {
    i.class.map((item) => {
      result.push({
        division: item.division,
        className: item.className,
        result: item.result.sort((a, b) =>
          a.shoeOne.total + a.shoeTwo.total < b.shoeOne.total + b.shoeTwo.total
            ? 1
            : -1
        ),
      });
    });
  });

  return sponsor ? (
    <>
      <TopPagesHeader title="Result" />
      <div className={classes.contentContainer}>
        <PageHeader>{competitionName}</PageHeader>
        <div className={classes.sponsorContainer}>
          {sponsor &&
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
        <PageHeader>Result for the competition</PageHeader>

        {result.length === 0 && (
          <Alert severity="error">
            This competition has no finnished results yet
          </Alert>
        )}
        <ComponentToPrint ref={resultRef}>
          {result.length > 0 &&
            result.map((item) => {
              return (
                <>
                  <TableContainer component={Paper}>
                    <SubHeader>{item.className}</SubHeader>
                    <Table className={classes.table} aria-label="a dense table">
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
                                  style={{
                                    verticalAlign: "bottom",
                                    padding: 0,
                                  }}
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
                                  width: "100%",
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
                          } else {
                            return null;
                          }
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Devider margin={50} />
                </>
              );
            })}
        </ComponentToPrint>

        <PageHeader>Published result for classes</PageHeader>
        <ComponentToPrint ref={classResultRef}>
          {savedClasses.length === 0 && (
            <Alert severity="error">No divisions has saved results</Alert>
          )}
          {savedClasses.length > 0 &&
            savedClasses.map((item, index) => {
              return (
                <TableContainer
                  key={index}
                  component={Paper}
                  className={classes.tableContainer}
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
                        {compClasses[1].headerTitles.map((comp) => {
                          if (comp !== "Total Points") {
                            return (
                              <TableCell key={comp}>
                                <p>{comp}</p>
                              </TableCell>
                            );
                          }
                        })}
                        {compClasses[0].headerTitles.map((comp) => {
                          if (comp !== "Competitor") {
                            return (
                              <TableCell key={comp}>
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
        <Devider margin={20} />

        <ButtonContainer>
          <CustomButton onClick={handleResultPrint} title="Print result" />
          <CustomButton onClick={handleClassPrint} title="Print class result" />
          <CustomButton onClick={() => history.goBack()} title="Go Back" />
        </ButtonContainer>
      </div>
    </>
  ) : null;
};

export default Result;
