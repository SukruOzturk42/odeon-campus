import jwtDecoder from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const getFullName = () => {
  const authToken = getToken();
  return authToken ? jwtDecoder(authToken).details.fullName : null;
};

export const getUserRole = () => {
  const authToken = getToken();
  return authToken ? jwtDecoder(authToken).details.userRole.id : null;
};

export const getUserRoleName = () => {
  const authToken = getToken();
  return authToken ? jwtDecoder(authToken).details.userRole.name : null;
};

export const getAuthType = () => {
  const authToken = getToken();
  return authToken ? jwtDecoder(authToken).details.userAuthorizationType : null;
};

export const getUserAuthType = () => {
  const authToken = getToken();
  const userDetails = jwtDecoder(authToken).details;
  const userRole = userDetails.userRole;
  return userRole ? userRole.auth : null;
};

export const hasUserAuthorization = () => {
  const userAuthType = getUserAuthType();
  return userAuthType && userAuthType === "EDIT";
};

export const getMenuList = () => {
  const authToken = getToken();
  const userDetails = jwtDecoder(authToken).details;
  const menuItems = userDetails.menuItems;
  return menuItems;
};
