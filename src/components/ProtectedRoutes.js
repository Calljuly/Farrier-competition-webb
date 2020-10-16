import React from "react";
import { Route, Switch } from "react-router-dom";
import Competitions from "../Pages/Competitions";
import Layout from "../components/UI/Layout";
import User from "../Pages/User";
import Home from "../Pages/Home";
import Contact from "../Pages/Contact";
import Login from "../components/LogIn.js/Login";
import Admin from "../Pages/Admin";
export const getUnProtectedRoutes = (signIn, isAuthenticated) => {
  return (
    <Route exact path="/">
      <Login loginFailed={isAuthenticated} auth={signIn} />
    </Route>
  );
};
export const getProtectedUserRoutes = (logOut, signIn, isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Layout logOut={logOut}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/myProfile" component={User} />
          <Route path="/competitions" component={Competitions} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </Layout>
    );
  } else return getUnProtectedRoutes(logOut, signIn, isAuthenticated);
};
export const getProtectedAdminRoutes = (logOut) => {
  return (
    <Layout logOut={logOut}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/myProfile" component={User} />
        <Route path="/competitions" component={Competitions} />
        <Route path="/admin" component={Admin} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </Layout>
  );
};

export const getRoutes = (logOut, signIn, isAuthenticated, Admin) => {
  if (!isAuthenticated) {
    return getProtectedUserRoutes(signIn, isAuthenticated);
  }
  if (isAuthenticated) {
    if (Admin) {
      return getProtectedAdminRoutes(logOut, signIn, isAuthenticated);
    } else {
      return getProtectedUserRoutes(logOut, signIn, isAuthenticated);
    }
  }
};
