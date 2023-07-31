import React from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import { ContentRoute } from "../../../_metronic/layout";

import "../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";

import Login from "../login/Login";

export function AuthPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
          id="kt_login"
        >
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundImage: `#ffffff`,
            }}
          >
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              <Link to="/" className="flex-column-auto mt-5">
                <img
                  alt="Logo"
                  className="max-h-300px"
                  src={toAbsoluteUrl("/media/logos/kampus.jfif")}
                />
              </Link>

              <div className="flex-column-fluid d-flex flex-column justify-content-center">

              </div>
            </div>
          </div>

          <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                &copy; 2021 AS
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
