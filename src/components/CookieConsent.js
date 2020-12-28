import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import P from "./UI/Paragraph";

const CookieConsent = () => {
  const classes = useStyle();
  const [accept, setAccept] = useState(false);
  const cookieAccepted = () => {
    setAccept(true);
    localStorage.setItem("cookieAccepted", true);
  };
  if (localStorage.getItem("cookieAccepted") || accept) {
    return <></>;
  }
  return (
    <div className={classes.container}>
      <P>
        Vi använder cookies på den här sidan. Vill du läsa mer om vår policy
        klicka vidare på länkarna
        <a href="/">Policy</a>
        and
        <a href="/">Cookies</a>
      </P>

      <button onClick={cookieAccepted}>Accept</button>
    </div>
  );
};

const useStyle = makeStyles({
  container: {
    position: "fixed",
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.6,
    color: "white",
    width: "100%",
    zIndex: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    ["@media (max-width:1253px)"]: {
      flexDirection: "column",
      alignItems: "start",
    },
    "& > p ": {
      margin: 20,
      textDecoration: "none",
      color: "white",
      "& > a": {
        textDecoration: "none",
        color: "white",
        margin: "0px 10px 0px 10px",
        "&:hover": {
          color: "white",
        },
      },
    },
    "& > button": {
      margin: 20,
      backgroundColor: "white",
      color: "black",
      border: "none",
      padding: 10,
    },
  },
});
export default CookieConsent;
