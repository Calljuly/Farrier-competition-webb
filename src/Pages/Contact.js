import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import P from "../components/UI/Paragraph";
import PageHeader from "../components/UI/PageHeader";
import { Colors } from "../colors";
import Devider from "../components/UI/Devider";

const useStyle = makeStyles({
  email: {
    textDecoration: "none",
    color: "black",
  },
  container: {
    width: "99%",
    padding: 20,
    marginTop: 10,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
const Contact = () => {
  const classes = useStyle();
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <PageHeader>Contact</PageHeader>
      </div>
      <div className="divOrange" />
      <div className="divBlack" />
      <Devider margin={30} />
      <div
        style={{
          display: "flex",
          margin: "auto",
          width: "80%",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <P>
              If you want to get in touch with the creator please contact me by
              the email or phone number beside.
            </P>
            <P>
              My name is Julia Call and I'm the creator of the site. The site
              has been made to make it easier for competitive farriers to enter
              their competitions, create them, follow results and keep live
              scores if wished.
              <br />
              <br />
            </P>
            <P>
              <strong>Mvh Julia Call</strong>
            </P>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.itemContainer}>
              <P>
                Email:
                <a className={classes.email} href="mailto: calljuly@gmail.com">
                  Calljuly@gmail.com
                </a>
              </P>
            </div>
            <div className={classes.itemContainer}>
              <P>
                Phone:
                <a className={classes.email} href="tel:0705222633">
                  +46705222633
                </a>
              </P>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Contact;
