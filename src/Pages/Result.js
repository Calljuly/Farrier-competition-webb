import React from "react";
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
  const sponsor = l.classes;
  const history = useHistory();
  console.log(sponsor);
  if (!result) {
    history.push("/competitions");
  }

  return (
    <>
      <PageHeader>Result</PageHeader>
      <div className="divOrange" />
      <div className="divBlack" />
      <div style={{ margin: 40 }}>
        <SubHeader>{competitionName}</SubHeader>
        <SubHeader>Sponsors of all classes this competition</SubHeader>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            marginBottom: 30,
          }}
        >
          {sponsor.map((item) => (
            <SponsorCard
              sponsorName={item.sponsors}
              sponsorUrl={item.sponsorLoggo}
              className={item.className}
            />
          ))}
        </div>
        {result &&
          result.map((item, index) => {
            return (
              <TableContainer
                component={Paper}
                style={{ marginBottom: "20px" }}
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
                            <TableCell align="left">{res.competitor}</TableCell>
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

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomButton onClick={() => {}} title="Print result" />
          <CustomButton onClick={() => history.goBack()} title="Go Back" />
        </div>
      </div>
    </>
  );
};

export default Result;
