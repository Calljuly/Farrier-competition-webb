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
  const compClasses = l.compClasses;
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  if (!compClasses) {
    history.push("/competitions");
  }

  const [newstate, setnewState] = useState(
    compClasses.map((item) => {
      return {
        name: item.className,
        checked: false,
      };
    })
  );

  const enterCompetition = () => {
   /* const a = entries.filter((item) => {
      return user.name === item.competitor;
    });
    console.log(a);
    if (a.length > 0) {
      setError(true);
      return;
    }
    dispatch(actions.enterCompetition(user, compClasses, competition, id));
    setSuccess(true);*/
  };

  const handleChange = (event, index) => {
    setnewState((prev) => {
      const newState = [...newstate];

      newState[index].checked = event.target.checked;
      console.log(newState);
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
