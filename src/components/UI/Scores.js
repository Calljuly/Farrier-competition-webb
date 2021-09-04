import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import CustomModal from "./Modal";
import * as actions from "../../store/actions/competitionAction";
import CustomButton from "./CustomButton";
import { firestore } from "./firebase";
import ScoreSheet from "../Tables/ScoreSheet";
import ButtonContainer from "./ButtonContainer";
import Devider from "./Devider";
import P from "./Paragraph";
import TopPagesHeader from "./TopPagesHeader";

const Scores = () => {
  const [modalopen, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const compClass = location.state ? location.state : [];
  const compIndex = location.id;
  const heat = location.heat ? location.heat : [];
  const heatId = location.heatId;
  const shoe = location.shoe ? location.shoe : "";
  const judges = location.judges ? location.judges : [];

  const [judge, setJudge] = useState(
    compClass.referee.length > 0 ? compClass.referee : ""
  );

  const closeModalHandler = (data) => {
    if (+data) {
      dispatch(
        actions.addPoint(
          data,
          modalData.user,
          modalData.cellId,
          compIndex,
          compClass,
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

  if (compClass.length === 0 || heat.length === 0 || judges.length === 0) {
    history.push("/admin");
  }

  const handleClasses = (event) => {
    const value = event.target.value;

    setJudge(value);

    firestore
      .collection("competitions")
      .doc(compIndex)
      .collection(compClass.divisions)
      .doc(compClass.className)
      .update({
        referee: value,
      });
  };

  return judges ? (
    <>
      <TopPagesHeader title="ScoreSheet" />
      <div style={{ margin: 30 }}>
        <CustomModal
          isOpen={modalopen}
          handleClose={closeModalHandler}
          modalData={modalData}
        />
        {compClass.savedResult && (
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
          className={compClass.className}
          handleModalContent={handleModalContent}
          savedResult={compClass.savedResult}
          pointsToMultiply={compClass.pointsToMultiply}
          result={heat}
          compIndex={compIndex}
          shoe={shoe}
          heatId={heatId}
          type={
            shoe === "shoeOne"
              ? compClass.shoeOneType
              : compClass.shoeTwoType
          }
          title={shoe === "shoeOne" ? "Shoe One" : "Shoe Two"}
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
