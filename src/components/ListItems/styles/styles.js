import { makeStyles } from "@material-ui/styles";
import { Colors } from '../../../colors';

export const competitionListItemAdminStyle = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    borderBottom: "1px solid #DCDCDC",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 10,
  },
  classesContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    cursor: "pointer",
    paddingBottom: 20,
    padding: 10,
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid black",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginBottom: 10,
    "&>p": {
      marginLeft: 10,
    },
  },
  classes: {
    width: "100%",
    padding: 10,
    margin: 0,
    "&:hover": {
      backgroundColor: "#DCDCDC",
    },
    borderBottom: "1px solid #DCDCDC",
  },
  competitionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    margin: 0,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#DCDCDC",
    },
  },
  icon: {
    marginRight: 20,
    fontSize: 30,
  },
  classIcon: {
    fontSize: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  switch_track: {
    backgroundColor: Colors.black,
    color: Colors.black,
  },
  switch_base: {
    color: Colors.black,
    "&.Mui-disabled": {
      color: "#e886a9",
    },
    "&.Mui-checked": {
      color: Colors.orange,
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: Colors.black,
    },
  },
  switch_primary: {
    "&.Mui-checked": {
      color: "#4CAF50",
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: Colors.orange,
    },
  },
  shoePic: {
    width: 200,
    height: 200,
    ["@media (max-width: 1000px)"]: {
      width: "100%",
      height: "100%",
    },
  },
  shoeContainer: {
    display: "flex",
    ["@media (max-width: 1000px)"]: {
      flexDirection: "column",
      margin: "10px 0px 20px 0px",
    },
  },
  classInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    margin: 0,
    ["@media (max-width: 1000px)"]: {
      flexDirection: "column",
    },
  },
});

export const competitionLitsItemStyle = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    borderBottom: "1px solid #DCDCDC",
  },
  classesContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    cursor: "pointer",
    paddingBottom: 20,
    padding: 10,
  },
  classes: {
    width: "100%",
    padding: 10,
    "&:hover": {
      backgroundColor: "#DCDCDC",
    },
    borderBottom: "1px solid #DCDCDC",
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid black",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginBottom: 10,
    "&>p": {
      marginLeft: 10,
    },
  },
  button: {
    borderTop: "1px solid black",
    width: "100%",
    padding: 10,
    fontSize: 15,
    backgroundColor: "#b9babe",
    borderRadius: "0px 0px 10px 10px",
    border: "none",
    "&:hover": {
      backgroundColor: "#595658",
      color: "white",
    },
  },
  classContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#DCDCDC",
    },
  },
  icon: {
    marginRight: 20,
    fontSize: 30,
  },

  shoePic: {
    width: 200,
    height: 200,
    ["@media (max-width: 1000px)"]: {
      width: "100%",
      height: "100%",
    },
  },
  shoeContainer: {
    display: "flex",
    ["@media (max-width: 1000px)"]: {
      flexDirection: "column",
      margin: "10px 0px 20px 0px",
    },
  },
  classInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    margin: 0,
    ["@media (max-width: 1000px)"]: {
      flexDirection: "column",
    },
  },
});