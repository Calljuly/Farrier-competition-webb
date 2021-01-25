import React from "react";
import { Colors } from "../../colors";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  header: {
    color: Colors.black,
    padding: 20,
    margin: 0,
    fontFamily: "Constantia",
    fontSize: 20,
    ["@media (max-width:956px)"]: {
      fontSize: 15,
    },
  },
});
const SubHeader = ({ children }) => {
  const classes = useStyle();
  return <h3 className={classes.header}>{children}</h3>;
};

export default SubHeader;
