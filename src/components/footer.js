import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors } from "../colors";
import { Grid } from "@material-ui/core";

const useStyle = makeStyles({
  container: {
    width: "100%",
    height: 300,
    backgroundColor: Colors.black,
    marginTop: 50,
    borderRadius: "10px 10px 0px 0px",
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
          <p className={classes.text}>Logga</p>
        </Grid>
        <Grid item md={4} xs={12} className={classes.gridItem}>
          <div className={classes.itemContainer}>
            <p>
              Email:
              <a className={classes.email} href="mailto: calljuly@gmail.com">
                Calljuly@gmail.com
              </a>
            </p>
          </div>
          <div className={classes.itemContainer}>
            <p>
              Phone:
              <a className={classes.email} href="tel:0705222633">
                +46705222633
              </a>
            </p>
          </div>
          <p className={classes.text}>Contact information</p>
        </Grid>
        <Grid item md={4} xs={12} className={classes.gridItem}></Grid>
      </Grid>
    </div>
  );
};
export default Footer;
