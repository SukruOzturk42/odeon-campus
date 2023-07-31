import { request, requestAll } from "../common/utils/Request";

export const getAllContactGroups = () => {
  const options = {
    method: "get",
    path: "contact-groups",
  };

  return request(options);
};

export const exportContactGroupContacts = (contactGroupId) => {
  const options = {
    method: "get",
    path: "contact-group-excel-export",
    params: ["contactGroupId"],
    values: [contactGroupId],
    headers: {
      accept: "*/*",
    },
    responseType: "blob",
  };

  return request(options);
};

export const getContactGroupsTempExcel = () => {
  const options = {
    method: "get",
    path: "contact-group-excel-template",
    headers: {
      accept: "*/*",
    },
    responseType: "blob",
  };

  return request(options);
};

export const createContactGroup = (data) => {
  const options = {
    method: "put",
    path: "contact-group",
    data: data,
    responseType: "arraybuffer",
  };

  return request(options);
};

export const deleteContactGroup = (contactGroupId) => {
  const options = {
    method: "delete",
    path: "contact-group",
    params: ["contactGroupId"],
    values: [contactGroupId],
  };

  return request(options);
};
