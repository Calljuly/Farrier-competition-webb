import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PageHeader from "../components/UI/PageHeader";
import SubHeader from "../components/UI/SubHeader";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import CustomButton from "../components/CustomButton";
import ButtonContainer from "../components/UI/ButtonContainer";
import ChoiseModal from "../components/ChoiseModal";
import P from "../components/UI/Paragraph";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/competitionAction";

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

const EnterCompetition = () => {
  const classes = useStyles();
  const l = useLocation();
  const divisionList = l.divisionList;
  const competition = l.competition;
  const id = l.id;
  const divisions = l.divisions;
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  if (!divisionList) {
    history.push("/competitions");
  }

  const [newstate, setnewState] = useState(() => {
    if (divisionList) {
      divisionList.map((item) => {
        return {
          name: item,
          checked: false,
        };
      });
    }
  });

  const enterCompetition = () => {
    const choise = newstate.filter((item) => {
      if (item.checked) {
        return item.name;
      }
    });

    dispatch(actions.enterCompetition(user, classes, competition, id, choise));
    setSuccess(true);
    setModal(false);
  };

  const handleChange = (event, index) => {
    setnewState((prev) => {
      const newState = [...newstate];

      newState[index].checked = event.target.checked;
      return newState;
    });
  };

  return (
    <>
      <ChoiseModal isOpen={modal} handleClose={() => setModal(false)}>
        <PageHeader>Are you sure ?</PageHeader>
        <P>Are you sure you want to enter these divisions and classes ?</P>
        <div style={{ display: "flex" }}>
          <CustomButton title="Cancel" onClick={() => setModal(false)} />
          <CustomButton title="Im sure" onClick={enterCompetition} />
        </div>
      </ChoiseModal>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: 30,
        }}
      >
        <PageHeader>Enter Competition</PageHeader>
        <CustomButton onClick={() => history.goBack()} title="Go Back" />
      </div>
      <div className="divOrange" />
      <div className="divBlack" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "start",
          margin: 30,
          marginBottom: 30,
        }}
      >
      {success && (
        <Alert style={{ width: "100%" }} onClick={() => setSuccess(false)}>
          You entered the competition!
        </Alert>
      )}
      {error && (
        <Alert
          style={{ width: "100%" }}
          severity="error"
          onClick={() => setError(false)}
        >
          <P>You could not enter the competition</P>
        </Alert>
      )}
        <SubHeader>
          Choose which classes or divisions you want to enter
        </SubHeader>
        <FormControl
          required
          error={null}
          component="fieldset"
          className={classes.formControl}
        >
          <FormGroup>
            {newstate.map((item, index) => {
              return (
                <FormControlLabel
                  key={item.name}
                  control={
                    <Checkbox
                      checked={item.checked}
                      onChange={(event) => handleChange(event, index)}
                      name={item.name}
                    />
                  }
                  label={item.name}
                />
              );
            })}
          </FormGroup>
          <FormHelperText>
            If you want to read more about the classes,
            <Link to="/competitions">Press here</Link>
          </FormHelperText>
        </FormControl>
        <ButtonContainer>
          <CustomButton onClick={() => history.goBack()} title="Go Back" />
          <CustomButton
            onClick={() => setModal(true)}
            title="Enter classes and divisions"
          />
        </ButtonContainer>
      </div>
    </>
  );
};

export default EnterCompetition;
