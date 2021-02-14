import React from "react";
import { useHistory } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import PageHeader from "../components/UI/PageHeader";
import P from "../components/UI/Paragraph";
import ButtonContainer from "../components/UI/ButtonContainer";
import { useDispatch } from "react-redux";
import { fetchCompetitions } from "../store/actions/competitionAction";
import { saveClassResult } from "../ApiFunctions/Api";
import { auth } from "../components/firebase";
import Devider from "../components/UI/Devider";
import TopPagesHeader from "../components/UI/TopPagesHeader";

const ScorePicker = ({ judges, state, id, goBackAdmin }) => {
  const history = useHistory();
  const compClasses = state;

  const dispatch = useDispatch();

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
      <TopPagesHeader title="Pick shoe" />
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
                      judges: judges,
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
                      judges: judges,
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
          <CustomButton onClick={() => goBackAdmin()} title="Admin" />
        </ButtonContainer>
      </div>
    </>
  );
};

export default ScorePicker;
