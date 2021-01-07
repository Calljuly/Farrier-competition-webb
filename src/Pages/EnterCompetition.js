import React, { useRef } from "react";
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

  if (!compClasses) {
    history.push("/competitions");
  }

  const [newstate, setnewState] = React.useState(
    compClasses.map((item) => {
      return {
        name: item.className,
        checked: false,
      };
    })
  );
  const enterCompetition = () => {
    /* if (entries.includes(user.name)) {
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
      <PageHeader>Enter Competition</PageHeader>
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
          <CustomButton
            onClick={enterCompetition}
            title="Enter classes and divisions"
          />
        </ButtonContainer>
      </div>
    </>
  );
};

export default EnterCompetition;
