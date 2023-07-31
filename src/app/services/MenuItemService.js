import { request, requestAll } from "../common/utils/Request";

export const getMenuItemByUserRoleName = (roleName) => {
  const options = {
    method: "get",
    path: "menu-item",
    params: ["role-name"],
    values: [roleName],
  };

  return request(options);
};

export default { getMenuItemByUserRoleName };
