import React, { Fragment, useEffect } from "react";
import useHttpErrorHandler from "../hooks/HttpClient";
import http from "../utils/Axios";
import { errorModal } from "../utils/ModalUtil";

const withErrorHandler = (WrappedComponent) => {
  return (props) => {
    const { intl } = props;
    const [error, clearError] = useHttpErrorHandler(http);

    useEffect(() => {
      if (error) {
        if (
          error &&
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          localStorage.removeItem("access_token");

          errorModal("Oturum Suresi Bitti");
          setTimeout(() => window.location.replace("/logout"), 4000);
        } else {
          let errorData;
          if (!error.response) {
            setTimeout(() => window.location.replace("/error"), 200);
          } else {
            if (error.response.data.errors !== null) {
              errorData = error.response.data.errors.errorDescription + "";
              errorModal(errorData);
            }
          }
        }
        clearError();
      }
    }, [error]);

    return (
      <Fragment>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};

export default withErrorHandler;
