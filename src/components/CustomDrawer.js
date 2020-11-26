import React from "react";
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Colors } from "../colors";
import { NavLink } from "react-router-dom";

const CustomDrawer = ({
  drawerState,
  toggleDrawer,
  navLinks,
  auth,
  logOut,
}) => {
  const classes = useStyle();
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
              <ListItemText primary={<h1>Admin</h1>} />
            </NavLink>
          </ListItem>
        )}
        <ListItem classes={{ root: classes.tabs }} button>
          <NavLink onClick={logOut} className={classes.tabs} to="/">
            <ListItemText primary={<h1>Logout</h1>} />
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
