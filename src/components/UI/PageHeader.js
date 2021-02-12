import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors } from "../../colors";

const useStyle = makeStyles({
  header: {
    color: Colors.black,
    padding: 20,
    margin: 0,
    fontFamily: "Kohinoor Telugu",
    fontSize: 30,
    ["@media (max-width:956px)"]: {
      fontSize: 20,
    },
  },
});
const PageHeader = ({ children }) => {
  const classes = useStyle();

  return <h1 className={classes.header}>{children}</h1>;
};

export default PageHeader;
