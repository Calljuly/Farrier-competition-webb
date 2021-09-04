import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ForgingScoreLoggo from "../../assets/Images/ForgingScores-Logo-White.jpg";
import * as actions from "../../store/actions/auth";
import { linksAdmin, linksAuth, linksUnAuth } from './constants/constants';
import CustomDrawer from "./CustomDrawer";
import { navbarStyle } from './styles/styles';

const Navbar = () => {
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer = () => {
    setDrawerState((prev) => !prev);
  };
  const classes = navbarStyle();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const admin = useSelector((state) => state.auth.admin);
  const signInState = useSelector((state) => state.auth.signInState);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.container}>
      <CustomDrawer
        toggleDrawer={toggleDrawer}
        drawerState={drawerState}
        navLinks={user.admin ? linksAdmin : isAuth ? linksAuth : linksUnAuth}
        auth={admin}
      />
      <div className={classes.menuIconContainer}>
        <MenuIcon onClick={toggleDrawer} className={classes.menuIcon} />
      </div>
      <div className={classes.contentContainer}>
        <NavLink
          className={classes.link}
          activeClassName={classes.activeLink}
          to="/competitions"
        >
          <p>COMPETITIONS</p>
        </NavLink>
        <NavLink
          className={classes.link}
          activeClassName={classes.activeLink}
          to="/ABOUT"
        >
          <p>ABOUT</p>
        </NavLink>
        <NavLink excat to="/" style={{ width: "20%", margin: 20 }}>
          <img src={ForgingScoreLoggo} alt="Loggo" style={{ width: "100%" }} />
        </NavLink>
        <NavLink
          className={classes.link}
          activeClassName={classes.activeLink}
          to="/contact"
        >
          <p>CONTACT</p>
        </NavLink>
        {isAuth ? (
          <>
            <NavLink
              className={classes.link}
              activeClassName={classes.activeLink}
              to="/myProfile"
            >
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                style={{ color: "inherit", backgroundColor: "inherit" }}
                onMouseOver={handleClick}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 16,
                  }}
                >
                  <p>PROFILE </p>
                  <AccountCircleOutlinedIcon style={{ marginLeft: 10 }} />
                </div>
              </Button>
            </NavLink>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{ marginTop: 50, width: 230 }}
            >
              <MenuItem style={{ width: 190 }}>
                <NavLink
                  exact
                  to="/myProfile"
                  onClick={handleClose}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  My Profile
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink
                  to="/myProfile/editProfile"
                  onClick={handleClose}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Edit Profile
                </NavLink>
              </MenuItem>
              {admin && (
                <MenuItem>
                  <NavLink
                    to="/admin"
                    onClick={handleClose}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Admin
                  </NavLink>
                </MenuItem>
              )}
              <MenuItem>
                <NavLink
                  to="/"
                  onClick={() => dispatch(actions.logOut())}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Logout
                </NavLink>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <NavLink
            onClick={() => dispatch(actions.changeSignInState(!signInState))}
            className={classes.link}
            to="/"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>SIGN IN </p>
              <AccountCircleOutlinedIcon style={{ marginLeft: 10 }} />
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
