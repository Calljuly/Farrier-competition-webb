import {
  List,
  ListItem,
  ListItemText, SwipeableDrawer
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Colors } from "../../colors";
import * as actions from "../../store/actions/auth";

const CustomDrawer = ({ drawerState, toggleDrawer, navLinks, auth }) => {
  const classes = useStyle();
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <SwipeableDrawer
      anchor="left"
      open={drawerState}
      onClose={toggleDrawer}
      onOpen={toggleDrawer}
    >
      <List style={{ width: "300px" }}>
        {navLinks.map((item) => {
          return (
            <ListItem key={item.id} classes={{ root: classes.tabs }} button>
              <NavLink
                activeClassName={classes.activeTab}
                className={classes.tabs}
                exact
                to={item.path}
              >
                <ListItemText primary={<h1>{item.label}</h1>} />
              </NavLink>
            </ListItem>
          );
        })}
        {auth && (
          <ListItem classes={{ root: classes.tabs }} button>
            <NavLink
              activeClassName={classes.activeTab}
              className={classes.tabs}
              to="/admin"
            >
              <ListItemText primary={<h1>ADMIN</h1>} />
            </NavLink>
          </ListItem>
        )}
        <ListItem classes={{ root: classes.tabs }} button>
          <NavLink
            onClick={
              auth
                ? () => dispatch(actions.logOut())
                : () => history.push("/signIn")
            }
            className={classes.tabs}
            to={auth ? "/" : "/signIn"}
          >
            <ListItemText
              primary={auth ? <h1>SIGN OUT</h1> : <h1>SIGN IN</h1>}
            />
          </NavLink>
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
};
const useStyle = makeStyles({
  tabs: {
    margin: 0,
    width: "100%",
    padding: 10,
    textDecoration: "none",
    color: Colors.black,
    fontSize: 20,
  },
  activeTab: {
    margin: 0,
    backgroundColor: Colors.orange,
    color: Colors.black,
    textDecoration: "none",
  },
});
export default CustomDrawer;
