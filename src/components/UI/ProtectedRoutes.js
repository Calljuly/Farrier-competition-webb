import React from "react";
import { Route, Switch } from "react-router-dom";
import Competitions from "../../pages/Competitions";
import Layout from "./Layout";
import User from "../../pages/User";
import Home from "../../pages/Home";
import Contact from "../../pages/Contact";
import Login from "../../pages/Login";
import Admin from "../../pages/Admin";
import ErrorPage from "./ErrorPage";
import EditProfile from "../DataCreators/editProfil";
import About from "../../pages/About";

export const getUnProtectedRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />

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

export const getProtectedUserRoutes = (
  isAuthenticated
) => {
  if (isAuthenticated) {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/myProfile" component={User} />
          <Route path="/myProfile/editProfile" component={EditProfile} />
          <Route path="/myProfile/result" component={User} />
          <Route path="/competitions" component={Competitions} />
          <Route path="/contact" component={Contact} />
          <Route path="/signIn" component={Login} />

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
        <Route exact path="/about" component={About} />
        <Route exact path="/myProfile" component={User} />
        <Route path="/myProfile/editProfile" component={EditProfile} />
        <Route path="/myProfile/result" component={User} />
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

export const getRoutes = (
  isAuthenticated,
  Admin
) => {
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
