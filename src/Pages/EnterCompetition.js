import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import ChoiseModal from "../components/UI/ChoiseModal";
import CustomButton from "../components/UI/CustomButton";
import ButtonContainer from "../components/UI/ButtonContainer";
import PageHeader from "../components/UI/PageHeader";
import P from "../components/UI/Paragraph";
import SubHeader from "../components/UI/SubHeader";
import TopPagesHeader from "../components/UI/TopPagesHeader";
import * as actions from "../store/actions/competitionAction";
import { enterCompetitionPageStyle } from './styles/styles';

const EnterCompetition = () => {

  const classes = enterCompetitionPageStyle();
  const location = useLocation();
  const divisionList = location.divisionList;
  const competition = location.competition;
  const id = location.id;
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  if (!divisionList) {
    history.push("/competitions");
  }

  const state = divisionList
    ? divisionList.map((item) => {
      return {
        name: item,
        checked: false,
      };
    })
    : null;

  const [newstate, setnewState] = useState(state);

  const enterCompetition = () => {
    const choise = newstate.filter((item) => {
      if (item.checked) {
        return item.name;
      }
    });

    dispatch(actions.enterCompetition(user, competition, id, choise));
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

  return divisionList ? (
    <>
      <ChoiseModal isOpen={modal} handleClose={() => setModal(false)}>
        <PageHeader>Are you sure ?</PageHeader>
        <P>Are you sure you want to enter these divisions and classes ?</P>
        <div style={{ display: "flex" }}>
          <CustomButton title="Cancel" onClick={() => setModal(false)} />
          <CustomButton title="Im sure" onClick={enterCompetition} />
        </div>
      </ChoiseModal>
      <TopPagesHeader title="Enter Competition" />
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
          <Alert style={{ width: "100%" }} onClose={() => setSuccess(false)}>
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
  ) : null;
};

export default EnterCompetition;
