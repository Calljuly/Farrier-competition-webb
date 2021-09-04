import { makeStyles } from "@material-ui/styles";
import { Colors } from '../../../colors';

export const addClassStyle = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginRight: 20,
  },
  "&.makeStyles-formControl-42": {
    margin: 0,
  },
  select: {
    "&:before": {
      margin: 0,
      borderBottom: `1px solid ${Colors.black}`,
    },
    "&:after": {
      borderBottom: `1px solid ${Colors.orange}`,
    },
    "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
      borderBottom: `1px solid ${Colors.orange}`,
    },
  },
}));

export const editProfileStyle = makeStyles({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    ["@media (max-width:1000px)"]: {
      width: "90%",
      margin: "auto",
    },
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 20,
    margin: 10,
  },
});