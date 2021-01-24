import React from "react";
import HomeButton from "../components/HomeButton";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import StarIcon from "@material-ui/icons/Star";
import PhoneIcon from "@material-ui/icons/Phone";
import Sponsors from "../components/Sponsors";
import img from "../assets/Images/newpic.jpg";
import { Colors } from "../colors";
const useStyle = makeStyles({
  container: {},
});
const Home = () => {
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <h1 style={{ fontSize: 50, textAlign: "center", margin: 0 }}>
        Forging Scores
      </h1>
      <h1 style={{ fontSize: 30, textAlign: "center" }}>
        Welcome to Forging Scores.
      </h1>
      <img
        src={img}
        style={{
          width: "100%",
          marginTop: 20,
          boxShadow: `0px 1px 1px ${Colors.black}`,
        }}
      />
      {/*<Sponsors data={null} />*/}

      <Grid container>
        <Grid
          item
          lg={4}
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HomeButton path="/" Icon={HomeIcon} title="Home" />
        </Grid>
        <Grid
          item
          lg={4}
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
            description="If you want see what competitions that are avalible to enter or just serach through results from past competitions"
          />
        </Grid>
        <Grid
          item
          lg={4}
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
            description="Have you enjoyed the side ? Or have you found something do dont like ? Please contact me and let me know what your experience with the side!"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
