import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors } from "../colors";
import { Grid } from "@material-ui/core";
import LocalPhoneOutlinedIcon from "@material-ui/icons/LocalPhoneOutlined";
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import ForgingScoreLoggo from "../assets/Images/ForgingScores-Logo-White.jpg";

const useStyle = makeStyles({
  container: {
    width: "100%",
    height: 300,
    backgroundColor: Colors.black,
    ["@media (max-width:1400px)"]: {
      height: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      aligntItems: "center",
    },
  },
  text: {
    color: Colors.orange,
  },
  email: {
    textDecoration: "none",
    color: Colors.orange,
    fontSize: 20,
  },
  itemContainer: {
    color: Colors.orange,
    fontSize: 20,
    display: "flex",
    flexDirection: "row",
    ["@media (max-width:956px)"]: {
      width: "100%",
    },
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    flexDirection: "column",
    padding: 30,
    ["@media (max-width:956px)"]: {
      width: "100%",
    },
  },
  icon: {
    paddingRight: 10,
    paddingTop: 0,
    paddingBottom: 0,
    margin: 5,
    fontSize: 30,
  },
  button: {
    backgroundColor: Colors.orange,
    color: Colors.black,
    width: 200,
    padding: 10,
    margin: "10px 0px 10px 10px",
    ["@media (max-width:956px)"]: {
      width: "95%",
      margin: 10,
    },
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    width: "100%",
    ["@media (max-width:956px)"]: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

const Footer = () => {
  const classes = useStyle();
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
