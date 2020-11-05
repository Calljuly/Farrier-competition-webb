import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Competitions from "../Pages/Competitions";
import Layout from "../components/UI/Layout";
import User from "../Pages/User";
import Home from "../Pages/Home";
import Contact from "../Pages/Contact";
import Login from "../components/LogIn.js/Login";
import Admin from "../Pages/Admin";

export const getUnProtectedRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Redirect exact to="/" />
    </Switch>
  );
};
export const getProtectedUserRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/myProfile" component={User} />
          <Route path="/competitions" component={Competitions} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </Layout>
    );
  } else return getUnProtectedRoutes(isAuthenticated);
};
export const getProtectedAdminRoutes = () => {
  return (
    <Layout>
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

export const getRoutes = (isAuthenticated, Admin) => {
  if (!isAuthenticated) {
    return getUnProtectedRoutes(isAuthenticated);
  }
  if (isAuthenticated) {
    if (Admin) {
      return getProtectedAdminRoutes(isAuthenticated);
    } else {
      return getProtectedUserRoutes(isAuthenticated);
    }
  }
};
