import { request, requestAll } from "../common/utils/Request";

export const getAttributes = () => {
    const options = {
        method: "get",
        path: "attributes",
    };

    return request(options);
}

export const getAttributeById = (id) => {
    const options = {
        method: "get",
        path: "attribute",
        params: ["id"],
        values: [id],
    };

    return request(options);
}

export const getAttributeOperatorByAttributeId = (id) => {
    const options = {
        method: "get",
        path: "attribute-operator-id",
        params: ["attributeId"],
        values: [id],
    };

    return request(options);
}

export const getReferenceTypeByAttributeId = (id) => {
    const options = {
        method: "get",
        path: "attribute-reference-type",
        params: ["attributeId"],
        values: [id],
    };

    return request(options);
}

export const saveMessage = (data) => {
    const options = {
        method: "post",
        path: "business-message",
        data: data,
    };

    return request(options);
}

export const updateMessage = (data) => {
    const options = {
        method: "put",
        path: "business-message",
        data: data,
    };

    return request(options);
};

export const getMessages = () => {
    const options = {
        method: "get",
        path: "business-message",
    };

    return request(options);
}

export const getMessageById = (id) =>{
    const options = {
        method: "get",
        path: "business-message/" + id,
    }
    return request(options);
}

export const deleteMessage = (id) =>{

    const options = {
        method: "delete",
        path: "business-message",
        params: ["id"],
        values: [id],
    }

    return request(options);
}

export const deleteReferenceType = (id) =>{

    const options = {
        method: "delete",
        path: "attribute-reference-type",
        params: ["id"],
        values: [id],
    }

    return request(options);
}

export const deleteOperatorType = (id) =>{

    const options = {
        method: "delete",
        path: "delete-attribute-operator",
        params: ["id"],
        values: [id],
    }

    return request(options);
}

export const exportMessages = (data) => {
    const options = {
      method: "get",
      path: "business-message-excel-export",
      headers: {
        accept: "*/*",
      },
      responseType: "blob",
    };
  
    return request(options);
  };

  export const saveReferenceType = (data, id) => {
    const options = {
        method: "post",
        path: "attribute-reference-type-contains-attribute",
        data: data,
        params: ["attributeId"],
        values: [id],
    };

    return request(options);
}

export const saveOperatorType = (id, operator) => {
    const options = {
        method: "post",
        path: "add-attribute-operator",
        params: ["attributeId","operator"],
        values: [id,operator],
    };

    return request(options);
}

export const saveAllOperators = (id, operators) => {
    const options = {
        method: "post",
        path: "add-all-attribute-operators",
        params: ["attributeId","operators"],
        values: [id,operators],
    };

    return request(options);
}

export const updateOperatorType = (attributeId, operator,id) => {
    const options = {
        method: "put",
        path: "update-attribute-operator",
        params: ["attributeId","operator","id"],
        values: [attributeId,operator,id],
    };

    return request(options);
}

export const saveParameter = (data,campaignTypeId) => {
    const options = {
        method: "post",
        path: "attribute",
        data: data,
        params: ["campaignTypeId"],
        values: [campaignTypeId],
    };

    return request(options);
}

export const deleteParameter = (id) =>{

    const options = {
        method: "delete",
        path: "attribute",
        params: ["id"],
        values: [id],
    }

    return request(options);
}

export const getCampaignAttributes = () => {
    const options = {
        method: "get",
        path: "campaign-attributes-all",
    };

    return request(options);
}

export const getCompanyCampaignStructures = (id) => {
    const options = {
        method: "get",
        path: "company-campaign-structures",
    };

    return request(options);
}

export const saveCampaignAttribute = (data) => {
    const options = {
        method: "post",
        path: "campaign-attribute",
        data: data,
    };

    return request(options);
}

export const deleteCampaignAttribute = (id) =>{

    const options = {
        method: "delete",
        path: "campaign-attribute",
        params: ["id"],
        values: [id],
    }

    return request(options);
}

export const getCampaingAttributeById = (id) => {
    const options = {
        method: "get",
        path: "campaign-attribute",
        params: ["id"],
        values: [id],
    };

    return request(options);
}