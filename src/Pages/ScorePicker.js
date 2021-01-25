import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, useHistory, useParams } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import PageHeader from "../components/UI/PageHeader";
import P from "../components/UI/Paragraph";
import ButtonContainer from "../components/UI/ButtonContainer";
import { useDispatch } from "react-redux";
import { fetchCompetitions } from "../store/actions/competitionAction";
import { saveClassResult } from "../ApiFunctions/Api";
import { auth } from "../components/firebase";
import Devider from "../components/UI/Devider";

const useStyles = makeStyles({});

const ScorePicker = () => {
  const history = useHistory();
  const l = useLocation();
  const compClasses = l.state;
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();

  if (!compClasses) {
    history.push("/admin");
  }

  const saveClassResults = async () => {
    const user = auth.currentUser;
    user.getIdTokenResult(async (token) => {
      await saveClassResult(
        token,
        id,
        compClasses.divisions,
        compClasses.className
      );
    });
    history.push("/admin");
    dispatch(fetchCompetitions());
  };

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
        <PageHeader>Pick scoresheet</PageHeader>
        <CustomButton onClick={() => history.goBack()} title="Go Back" />
      </div>
      <div className="divOrange" />
      <div className="divBlack" />
      <div style={{ margin: 40 }}>
        <P>Pick the shoe or heat you would like to fill the scores for below</P>

        {compClasses.unPublishedResult.map((item, index) => {
          return (
            <div key={item.heat}>
              <PageHeader>Heat {item.heat}</PageHeader>
              <ol
                style={{
                  listStyleType: "none",
                  fontSize: 30,
                  fontFamily: "Constantia",
                  cursor: "pointer",
                }}
              >
                <li
                  onClick={() =>
                    history.push({
                      pathname: "/admin/scores",
                      state: compClasses,
                      id: id,
                      heat: item.starts,
                      heatId: item.heat,
                      shoe: "shoeOne",
                    })
                  }
                >
                  Shoe One
                </li>
                <li
                  onClick={() =>
                    history.push({
                      pathname: "/admin/scores",
                      state: compClasses,
                      id: id,
                      heat: item.starts,
                      heatId: item.heat,
                      shoe: "shoeTwo",
                    })
                  }
                >
                  Shoe Two
                </li>
              </ol>
            </div>
          );
        })}
        <Devider margin={50} />
        <P>Whhen you press publish result anyone will be able to see them.</P>
        <P>You wont be able to edit these results after saving them</P>
        <ButtonContainer>
          {!compClasses.savedResult && (
            <CustomButton onClick={saveClassResults} title="Publish result" />
          )}
          <CustomButton onClick={() => history.goBack()} title="Go Back" />
        </ButtonContainer>
      </div>
    </>
  );
};

export default ScorePicker;
