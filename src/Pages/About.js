import React from "react";
import img from "../assets/Images/newpic.jpg";
import { Colors } from "../colors";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  card: {
    backgroundColor: "rgba(255,255,255, 0.8)",
    width: 600,
    height: "80%",
    position: "absolute",
    top: 50,
    left: 70,
    ["@media (max-width:1300px)"]: {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
    },
  },
});

const About = () => {
  const classes = useStyle();
  return (
    <div style={{ position: "relative" }}>
      <img
        src={img}
        style={{
          width: "100%",
        }}
        alt="Home of Timmy Hoas"
      />
      <div className={classes.card}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h1 style={{ margin: 20 }}>ABOUT US</h1>
          <div
            style={{ backgroundColor: Colors.black, height: 2, width: "80%" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            margin: "auto",
          }}
        >
          <p style={{ marginBottom: 20 }}>
            This site has been created to simplify your life as a competitive
            farrier or organiser. A simple way for you to register and enter a
            competition, register scores and keep up to date with live scores
            and the latest news. <br />
            <br />
            Our names are Julia Call and Timmy Hoas and we are the creators of
            the site. If you wish to get in contact with us, please go to our
            contact page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
