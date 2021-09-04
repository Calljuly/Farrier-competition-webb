import React from "react";
import { sponsorCardStyle } from './styles/styles';
import P from "./Paragraph";
import SubHeader from "./SubHeader";

const SponsorCard = ({ sponsorName, sponsorUrl, className }) => {
  const classes = sponsorCardStyle();

  return (
    <div className={classes.card}>
      <SubHeader>Sponsor of {className}</SubHeader>
      <div className="divOrange" />
      <div className="divBlack" />
      <P>{sponsorName}</P>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "end",
          flexDirection: "column",
        }}
      >
        {sponsorUrl && (
          <img src={sponsorUrl} style={{ width: "300px" }} alt={sponsorName} />
        )}
        {!sponsorUrl && <P>No image avalible</P>}
      </div>
    </div>
  );
};

export default SponsorCard;
