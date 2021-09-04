import React, { useState } from "react";
import P from "./Paragraph";
import { coockieConsentStyle } from './styles/styles';

const CookieConsent = () => {
  const classes = coockieConsentStyle();
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

export default CookieConsent;
