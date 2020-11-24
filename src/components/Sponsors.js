import React from "react";

const Sponsors = ({ sponsors }) => {
  return (
    <div>
      <h1>Our sponsors</h1>
      {sponsors ? (
        sponsors.map((item) => {
          return item;
        })
      ) : (
        <h3>We dont have any sponsors to show</h3>
      )}
    </div>
  );
};

export default Sponsors;
