import React from "react";
import HomeButton from "../components/HomeButton";
import { Grid } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import StarIcon from "@material-ui/icons/Star";
import PhoneIcon from "@material-ui/icons/Phone";
import Sponsors from "../components/Sponsors";
import img from "../assets/Images/newpic.jpg";
import { Colors } from "../colors";
import ForgingScoreLoggo from "../assets/Images/ForgingScores-Logo.jpg";

const Home = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={ForgingScoreLoggo}
          alt="Forging Scores"
          style={{ width: "40%", margin: 20, alignSelf: "center" }}
        />
      </div>
    
      <img
        src={img}
        style={{
          width: "100%",
          marginTop: 20,
          boxShadow: `0px 1px 1px ${Colors.black}`,
        }}
        alt="Home image of Timmy Hoas"
      />
      {/*<Sponsors data={null} />*/}

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
            description="If you want see what competitions that are avalible to enter or just serach through results from past competitions"
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
            description="Have you enjoyed the side ? Or have you found something do dont like ? Please contact me and let me know what your experience with the side!"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
