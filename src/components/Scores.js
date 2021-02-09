import React, { useState } from "react";
import ScoreSheet from "./Tables/ScoreSheet";
import { useDispatch } from "react-redux";
import CustomModal from "../components/Modal";
import * as actions from "../store/actions/competitionAction";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import P from "./UI/Paragraph";
import CustomButton from "./CustomButton";
import Devider from "./UI/Devider";
import PageHeader from "./UI/PageHeader";
import { Alert } from "@material-ui/lab";
import ButtonContainer from "./UI/ButtonContainer";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { firestore } from "./firebase";

const Scores = () => {
  const [modalopen, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const l = useLocation();
  const compClasses = l.state;
  const compIndex = l.id;
  const heat = l.heat;
  const heatId = l.heatId;
  const shoe = l.shoe;
  const judges = l.judges;

  const [judge, setJudge] = useState(
    compClasses.referee.length > 0 ? compClasses.referee : ""
  );

  const closeModalHandler = (data) => {
    if (+data) {
      dispatch(
        actions.addPoint(
          data,
          modalData.user,
          modalData.cellId,
          compIndex,
          compClasses,
          modalData.type,
          modalData.heat
        )
      );
    }
    setModal(false);
  };

  const handleModalContent = (heat, cell, title, compIndex, user, type) => {
    setModalData({
      heat: heat,
      cellId: cell,
      title: title,
      compIndex: compIndex,
      user: user,
      type: type,
    });
    setModal(true);
  };

  if (!compClasses || !heat || !judges) {
    history.push("/admin");
  }

  const handleClasses = (event) => {
    const value = event.target.value;

    setJudge(value);

    firestore
      .collection("competitions")
      .doc(compIndex)
      .collection(compClasses.divisions)
      .doc(compClasses.className)
      .update({
        referee: value,
      });
  };

  return judges ? (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: 30,
        }}
      >
        <PageHeader>Scores</PageHeader>
        <CustomButton onClick={() => history.goBack()} title="Go Back" />
      </div>
      <div className="divOrange" />
      <div className="divBlack" />
      <div style={{ margin: 30 }}>
        <CustomModal
          isOpen={modalopen}
          handleClose={closeModalHandler}
          modalData={modalData}
        />
        {compClasses.savedResult && (
          <Alert>
            <P>This class is saved and you wont be able to change the scores</P>
          </Alert>
        )}
        <ButtonContainer>
          <FormControl component="fieldset">
            <P>Pick Judge for this class</P>
            <RadioGroup
              row
              name="Judges"
              value={judge}
              onChange={(event) => handleClasses(event)}
            >
              {judges.map((item) => {
                return (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={<Radio />}
                    label={item}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </ButtonContainer>
        <ScoreSheet
          className={compClasses.className}
          handleModalContent={handleModalContent}
          savedResult={compClasses.savedResult}
          pointsToMultiply={compClasses.pointsToMultiply}
          result={heat}
          compIndex={compIndex}
          shoe={shoe}
          heatId={heatId}
          type={
            shoe === "shoeOne"
              ? compClasses.shoeOneType
              : compClasses.shoeTwoType
          }
        />
        <Devider margin={60} />
        <ButtonContainer>
          <CustomButton onClick={() => history.goBack()} title="Go Back" />
        </ButtonContainer>
      </div>
    </>
  ) : null;
};

export default Scores;
