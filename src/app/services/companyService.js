import { request, requestAll } from "../common/utils/Request";

export const getCompanyStuctureByCampanyName = (name) => {
  const options = {
    method: "get",
    path: "campany-structure",
    params: ["campanyName"],
    values: [name],
  };

  return request(options);
};

export default { getCompanyStuctureByCampanyName };
