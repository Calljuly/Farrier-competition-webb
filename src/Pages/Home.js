import React from "react";
import HomeButton from "../components/HomeButton";
import { Grid } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import PhoneIcon from "@material-ui/icons/Phone";
import img from "../assets/Images/newpic.jpg";

const Home = () => {
  return (
    <>
      <img
        src={img}
        style={{
          width: "100%",
        }}
        alt="Home of Timmy Hoas"
      />

      <Grid container>
        <Grid
          item
          lg={6}
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HomeButton
            path="/competitions"
            Icon={StarIcon}
            title="Our competitions"
          />
        </Grid>
        <Grid
          item
          lg={6}
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HomeButton
            path="/contact"
            Icon={PhoneIcon}
            title="Do you want to contact us?"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
