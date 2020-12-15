import React from "react";
import P from "../UI/Paragraph";
import CustomButton from "../CustomButton";

const ClassItemAdmin = ({
  className,
  pointsToMultiply,
  shoeToForge,
  shoeToFoot,
  time,
  type,
  sponsors,
}) => {
  return (
    <div>
      {type === "shoeing" ? (
        <>
          <P>Name : {className}</P>
          <P>Shoe to foot : {shoeToFoot}</P>
          <P>Shoe to Forge : {shoeToForge}</P>
          <P>Time : {time}</P>
          <P>Sponsors : {sponsors}</P>
        </>
      ) : (
        <>
          <P>Name : {className}</P>

          <P>Shoe to Forge : {shoeToForge}</P>
          <P>Time : {time}</P>
          <P>Sponsors : {sponsors}</P>
        </>
      )}
      <CustomButton title="Delete Class" />
    </div>
  );
};

export default ClassItemAdmin;
