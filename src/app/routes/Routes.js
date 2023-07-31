import React, { useContext, useEffect } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { Layout } from "../_metronic/layout";
import BasePage from "../BasePage";
import { AuthPage } from "../containers/user/auth/AuthPage";
import Logout from "../containers/user/logout/Logout";
import ErrorsPage from "../common/shared/errors/ErrorsPage";
import { getMenuList } from "../services/TokenService";
import { GlobalContext } from "../../app/context/GlobalState";
import { useLocation } from "react-router-dom";
import SsoLogin from "../containers/user/login/SsoLogin";

export function Routes() {
  const location = useLocation();

  const isAuthorized = localStorage.getItem("access_token") != null;

  return (
    <Switch>
      {location.pathname === "/sso-task-management" && (
        <Route>
          <SsoLogin location={location} toLocation={"/task-management"} />
        </Route>
      )}
      {location.pathname === "/sso-login" && (
        <Route>
          <SsoLogin location={location} toLocation={"/cm-campaigns"} />
        </Route>
      )}
      {!isAuthorized ? (
        <Route>
          <AuthPage />
        </Route>
      ) : (
        <Redirect from="/auth" to="/" />
      )}
      <Route path="/error" component={ErrorsPage} />
      <Route path="/logout" component={Logout} />

      {!isAuthorized ? (
        <Redirect to="/auth/login" />
      ) : (
        <Layout>
          <BasePage />
        </Layout>
      )}
    </Switch>
  );
}
