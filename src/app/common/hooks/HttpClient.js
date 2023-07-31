import { useEffect, useState } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);
  const reqInterceptor = httpClient.interceptors.request.use(
    (req) => {
      const accessToken = "Bearer " + localStorage.getItem("access_token");

      req.headers["Authorization"] = accessToken;
      setError(null);
      return req;
    },
    (error) => {
      setError(error);
      return error;
    }
  );
  const resInterceptor = httpClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      setError(error);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
