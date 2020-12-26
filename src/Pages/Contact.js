import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import P from "../components/UI/Paragraph";
import PageHeader from "../components/UI/PageHeader";
import { Colors } from "../colors";
import Devider from "../components/UI/Devider";
import TextInput from "../components/TextInput";
import { Button } from "@material-ui/core";
import SubHeader from "../components/UI/SubHeader";
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
  button: {
    backgroundColor: Colors.black,
    color: Colors.orange,
    width: 200,
    padding: 10,
    margin: "10px 0px 10px 10px",
    ["@media (max-width:956px)"]: {
      width: "100%",
    },
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
            <SubHeader>Fill out the form to contact me</SubHeader>
            <form
              className={classes.formContainer}
              name="contact"
              method="post"
            >
              <input type="hidden" name="form-name" value="contact" />

              <TextInput
                type="text"
                style={{ width: "90%", margin: 20 }}
                label="First name"
                placeholder="First name"
                name="firstName"
              />
              <TextInput
                type="text"
                style={{ width: "90%", margin: 20 }}
                label="Last name"
                placeholder="Last name"
                name="lastName"
              />
              <TextInput
                type="text"
                style={{ width: "90%", margin: 20 }}
                label="Email"
                placeholder="Email"
                name="email"
              />
              <TextInput
                style={{ width: "90%", margin: 20 }}
                label="Phone"
                placeholder="Phone"
                type="number"
                name="phone"
              />
              <TextInput
                type="text"
                style={{ width: "90%", margin: 20 }}
                label="Message"
                multiline
                rows={4}
                name="message"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: 60,
                }}
              >
                <Button name="button" type="submit" className={classes.button}>
                  Send Message
                </Button>
              </div>
            </form>
          </Grid>
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
        </Grid>
      </div>
    </div>
  );
};
export default Contact;
