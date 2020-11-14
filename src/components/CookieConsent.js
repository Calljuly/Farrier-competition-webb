import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";

const CookieConsent = () => {
  //localStorage.removeItem("cookieAccepted");
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
      <p>
        Vi använder cookies på den här sidan. Vill du läsa mer om vår policy
        klicka vidare på länkarna
        <a href="/">Policy</a>
        and
        <a href="/">Cookies</a>
      </p>

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
