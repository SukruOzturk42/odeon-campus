import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as auth from "../../../redux/auth/authRedux";
import { login } from "../../../redux/auth/authCrud";
import jwtDecoder from "jwt-decode";
import { GlobalContext } from "../../../context/GlobalState";
import { GOOGLE_AUTH_URL } from "../../../common/constants/CommonConstants";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";

const initialValues = {
  username: "",
  password: "",
};

function Login(props) {
  const history = useHistory();
  const { setUser } = useContext(GlobalContext);
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });
  /*useEffect(() => {
    let token = new URLSearchParams(window.location.search).get("token");
    if (token !== undefined && token !== null) {
      localStorage.setItem("access_token", token);
      setUser(jwtDecoder(token));
      props.login(token);
    }
  }, []);*/

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        login(values.username, values.password).then((response) => {
          if (response) {
            disableLoading();
            localStorage.setItem("access_token", response.data.data);
            setUser(jwtDecoder(response.data.data));
            history.push("/cm-campaigns");
            //props.login(response.data.data);
          } else {
            disableLoading();
            setSubmitting(false);
          }
        });
      }, 1000);
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/*<img*/}
      {/*    alt="logo"*/}
      {/*    src={toAbsoluteUrl("/media/logos/kampus.jfif")}*/}
      {/*    className="login-logo"*/}
      {/*/>*/}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          {intl.formatMessage({ id: "AUTH.USER.INFORMATIONS" })}
        </h3>
        <p className="text-muted font-weight-bold">
          {intl.formatMessage({ id: "AUTH.USER.INFORMATIONS.PLEASE" })}
        </p>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder={intl.formatMessage({ id: "AUTH.INPUT.USERNAME" })}
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "username"
            )}`}
            name="username"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.username}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder={intl.formatMessage({ id: "AUTH.INPUT.PASSWORD" })}
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>{intl.formatMessage({ id: "AUTH.LOGIN.BUTTON" })}</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
