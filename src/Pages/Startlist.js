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
import ButtonContainer from "../components/UI/ButtonContainer";
import Devider from "../components/UI/Devider";
import PageHeader from "../components/UI/PageHeader";
import SubHeader from "../components/UI/SubHeader";
import TopPagesHeader from "../components/UI/TopPagesHeader";
import { startListPageStyle } from './styles/styles';

const StartList = () => {

  const classes = startListPageStyle();
  const location = useLocation();
  const entries = location.entries;
  const competitionName = location.name;
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
      <TopPagesHeader title="StartList" />
      <div className={classes.startListContainer}>
        <ComponentToPrint ref={componentRef}>
          <PageHeader>{competitionName}</PageHeader>

          {entries && Object.keys(entries).length > 0 ? (
            Object.keys(entries).map((divs) => (
              <TableContainer component={Paper}>
                <SubHeader>{divs}</SubHeader>

                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        <p>Competitor</p>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <p>Id</p>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
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
        <Devider margin={20} />
        <ButtonContainer>
          <CustomButton title="Print startlist" onClick={handlePrint} />
          <CustomButton title="Go back" onClick={() => history.goBack()} />
        </ButtonContainer>
      </div>
    </>
  );
};

export default StartList;
