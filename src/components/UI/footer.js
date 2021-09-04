import React from "react";
import { Grid } from "@material-ui/core";
import LocalPhoneOutlinedIcon from "@material-ui/icons/LocalPhoneOutlined";
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import ForgingScoreLoggo from "../../assets/Images/ForgingScores-Logo-White.jpg";
import { footerStyle } from './styles/styles'

const Footer = () => {
  const classes = footerStyle();
  const history = useHistory();
  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item lg={4} xs={12} className={classes.gridItem}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={ForgingScoreLoggo}
              alt="Loggo"
              style={{ width: "80%", margin: 20 }}
            />
          </div>
        </Grid>
        <Grid item lg={4} xs={12} className={classes.gridItem}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <div className={classes.itemContainer}>
                <MailOutlinedIcon className={classes.icon} />

                <a className={classes.email} href="mailto: calljuly@gmail.com">
                  Calljuly@gmail.com
                </a>
              </div>
              <div className={classes.itemContainer}>
                <LocalPhoneOutlinedIcon className={classes.icon} />

                <a className={classes.email} href="tel:0705222633">
                  +46705222633
                </a>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={4} xs={12} className={classes.gridItem}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <div className={classes.buttonContainer}>
                <Button
                  className={classes.button}
                  onClick={() => history.push("/contact")}
                >
                  Contact
                </Button>
                <Button
                  className={classes.button}
                  onClick={() => history.push("/competitions")}
                >
                  Competitions
                </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default Footer;
