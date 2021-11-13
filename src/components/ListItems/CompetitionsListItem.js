import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CustomButton from "../UI/CustomButton";
import ButtonContainer from "../UI/ButtonContainer";
import PageHeader from "../UI/PageHeader";
import P from "../UI/Paragraph";
import SubHeader from "../UI/SubHeader";
import { competitionLitsItemStyle } from './styles/styles';

const CompetitionsListItem = ({
  id,
  name,
  country,
  divisions,
  referee,
  current,
  anvils,
  disabled,
  dateFrom,
  dateTo,
  entries,
  result,
  openForEntries,
  startCompetition,
  divisionList,
  hotels,
  parking,
  information,
}) => {
  const classes = competitionLitsItemStyle();
  const history = useHistory();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const competitionStartDate = new Date(dateFrom);
  const competitionEndDate = new Date(dateTo);
  const todayDate = new Date();

  const [showProposition, setShowProposition] = useState(false);
  const competition = {
    id: id,
    country: country,
    name: name,
    anvils: anvils,
    entries: entries,
    currentEntries: current,
  };

  return (
    <div className={classes.container}>
      <div
        onClick={() => setShowProposition((prev) => !prev)}
        className={classes.header}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PageHeader>{name}</PageHeader>
          <SubHeader>{dateFrom}</SubHeader>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {competitionStartDate > todayDate ? (
            <p
              style={{
                color: "green",
                fontWeight: "bold",
                marginRight: 20,
                fontSize: 20,
              }}
            >
              Active {openForEntries && " and open for entries"}
            </p>
          ) : todayDate < competitionEndDate ? (
            <p
              style={{
                color: "blue",
                fontWeight: "bold",
                marginRight: 20,
                fontSize: 20,
              }}
            >
              Ongoing
            </p>
          ) : (
            <p
              style={{
                color: "red",
                fontWeight: "bold",
                marginRight: 20,
                fontSize: 20,
              }}
            >
              Finnished
            </p>
          )}
          {showProposition ? (
            <KeyboardArrowUpIcon className={classes.icon} />
          ) : (
            <KeyboardArrowDownIcon className={classes.icon} />
          )}
        </div>
      </div>
      {showProposition && (
        <>
          <div className={classes.infoContainer}>
            <div style={{ marginLeft: 20 }}>
              <P>Country : {country}</P>
              <P>Judges: {referee}</P>
              <P>Anvils avaliable : {anvils}</P>
              <P>Current Entries : {current}</P>
              <P>Hotels nearby : {hotels}</P>
              <P>Parking : {parking}</P>
              <P>Start Date: {dateFrom}</P>
              <P>End Date : {dateTo}</P>
              <P>Other information: {information}</P>
            </div>
          </div>
          <div className={classes.classesContainer}>
            {divisions.length === 0 && (
              <Alert style={{ width: "100%" }} severity="error">
                <P>No classes to show yet</P>
              </Alert>
            )}
            {divisions.length > 0 &&
              divisions.map((divs, index) => {
                return Object.values(divs).map((data) => {
                  return data.map((item) => {
                    return (
                      <div className={classes.classes} key={item.className}>
                        <div className={classes.classInfo}>
                          <div>
                            <h1>{item.className}</h1>

                            <P>Type: {item.type}</P>
                            <P>Time : {item.time}</P>
                            <P>Division : {item.divisions}</P>
                            <P>Judge : {item.referee} </P>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginTop: 10,
                            }}
                          >
                            <h2>Shoes</h2>
                            <div className={classes.shoeContainer}>
                              <div style={{ marginRight: 10 }}>
                                <P>{item.shoeOne}</P>
                                <img
                                  className={classes.shoePic}
                                  src={item.shoeOneImg}
                                  alt="shoe pic"
                                />
                              </div>
                              <div style={{ marginRight: 10 }}>
                                <P>{item.shoeTwo}</P>
                                <img
                                  className={classes.shoePic}
                                  src={item.shoeTwoImg}
                                  alt="shoe pic"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                });
              })}
          </div>
          <div style={{ padding: 20, width: "100%" }}>
            <ButtonContainer>
              {isAuth &&
                openForEntries &&
                !startCompetition &&
                competitionStartDate > todayDate && (
                  <>
                    <CustomButton
                      disabled={disabled}
                      onClick={() =>
                        history.push({
                          pathname: "/competitions/enterCompetition",
                          divisionList: divisionList,
                          competition: competition,
                          id: id,
                          divisions: divisions,
                        })
                      }
                      title="Enter competition"
                    />
                  </>
                )}
              <CustomButton
                title="Show starts"
                onClick={() =>
                  history.push({
                    pathname: "/competitions/startList",
                    entries: entries,
                    name: name,
                  })
                }
              />
              <CustomButton
                title="Result"
                onClick={() =>
                  history.push({
                    pathname: "/competitions/result",
                    result: result,
                    name: name,
                    divisions: divisions,
                  })
                }
              />
            </ButtonContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CompetitionsListItem;
