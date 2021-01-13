import React from "react";
import { Route, Switch } from "react-router-dom";
import Competitions from "../Pages/Competitions";
import Layout from "../components/UI/Layout";
import User from "../Pages/User";
import Home from "../Pages/Home";
import Contact from "../Pages/Contact";
import Login from "../Pages/Login";
import Admin from "../Pages/Admin";
import ErrorPage from "./UI/ErrorPage";

export const getUnProtectedRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/competitions" component={Competitions} />
        <Route path="/contact" component={Contact} />
        <Route path="/signIn" component={Login} />
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </Layout>
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
          <Route>
            <ErrorPage />
          </Route>
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
        <Route path="/signIn" component={Login} />
        <Route>
          <ErrorPage />
        </Route>
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
