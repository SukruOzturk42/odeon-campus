import React, { Fragment, useEffect, useContext } from "react";
import localStorage from "redux-persist/es/storage";
import { loginRequest } from "../../../common/utils/Request";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as auth from "../../../redux/auth/authRedux";
import { GlobalContext } from "../../../context/GlobalState";
import jwtDecoder from "jwt-decode";
import { useHistory } from "react-router-dom";

function SsoLogin(props) {
  const { setUser } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    props.logout();
    const queries = getQuery(props.location.search);

    const withoutToolbars = queries["withoutToolbars"];
    const withoutIsam = queries["withoutisam"];

    const ssoRequest = {
      method: "post",
      path: "single-sign-on",
      data: { withoutToolbars, withoutIsam },
    };

    loginRequest(ssoRequest)
      .then((response) => {
        if (response && response.data) {
          const token = response.data.data;
          if (token !== undefined && token !== null) {
            localStorage.setItem("access_token", token);
            setUser(jwtDecoder(token));
            props.login(token);
            history.push(props.toLocation);
          }
        } else {
          history.push(props.toLocation);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getQuery = (string) => {
    return string
      .slice(1)
      .split("&")
      .map((q) => q.split("="))
      .reduce((a, c) => {
        a[c[0]] = c[1];
        return a;
      }, {});
  };

  return <Fragment>"Yönlendiriliyorsunuz..."</Fragment>;
}

export default injectIntl(connect(null, auth.actions)(SsoLogin));
