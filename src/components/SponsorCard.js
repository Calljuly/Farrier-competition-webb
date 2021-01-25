import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import P from "./UI/Paragraph";
import SubHeader from "./UI/SubHeader";
import { storage } from "./firebase";

const useStyle = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    width: 301,
    border: "1px solid #DCDCDC",
    margin: 20,
    ["@media (max-width:956px)"]: {
      width: "95%",
      margin: 10,
    },
  },
});

const SponsorCard = ({ sponsorName, sponsorUrl, className }) => {
  const classes = useStyle();
  const [sponsor, setSponsor] = useState("");

  if (sponsorUrl) {
    storage
      .ref()
      .child(`sponsors/${sponsorUrl}`)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setSponsor(url);
      });
  }

  return (
    <div className={classes.card}>
      <SubHeader>Sponsor of {className}</SubHeader>
      <div className="divOrange" />
      <div className="divBlack" />
      <P>{sponsorName}</P>
      {sponsorUrl && (
        <img src={sponsor} style={{ width: "300px" }} alt={sponsorName} />
      )}
      {!sponsorUrl && <P>No image avalible</P>}
    </div>
  );
};

export default SponsorCard;
