import React from "react";
import HomeButton from "../components/HomeButton";
import { Grid } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import StarIcon from "@material-ui/icons/Star";
import PhoneIcon from "@material-ui/icons/Phone";

const Home = () => {
  return (
    <>
      <h1>Hom pages</h1>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <HomeButton path="/" Icon={HomeIcon} title="Home" />
        </Grid>
        <Grid item md={4} xs={12}>
          <HomeButton
            path="/competitions"
            Icon={StarIcon}
            title="Our competitions"
            description="If you want see what competitions that are avalible to enter or just serach through results from past competitions"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <HomeButton
            path="/contact"
            Icon={PhoneIcon}
            title="Do you want to contact us?"
            description="Have you enjoyed the side ? Or have you found something do dont like ? Please contact me and let me know what your experience with the side!"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
