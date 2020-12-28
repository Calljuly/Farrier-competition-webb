import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors } from "../colors";
import { Grid } from "@material-ui/core";
import P from "./UI/Paragraph";

const useStyle = makeStyles({
  container: {
    width: "100%",
    height: 300,
    backgroundColor: Colors.black,
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
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
const Footer = () => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12} className={classes.gridItem}>
          <P style={{ color: Colors.orange }}>Logga</P>
        </Grid>
        <Grid item md={4} xs={12} className={classes.gridItem}>
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
          <P style={{ color: Colors.orange }}>Contact information</P>
        </Grid>
        <Grid item md={4} xs={12} className={classes.gridItem}></Grid>
      </Grid>
    </div>
  );
};
export default Footer;
