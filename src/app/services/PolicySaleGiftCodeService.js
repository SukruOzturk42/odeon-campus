import { request, requestAll } from "../common/utils/Request";

export const createPolicySaleRewardGiftTicket = (name) => {
    const options = {
        method: "post",
        path: "policy-sale-reward-gift-ticket",
        data: { name: name },
    };

    return request(options);
};

export const getPolicySaleRewardGiftTickets = () => {
    const options = {
        method: "get",
        path: "policy-sale-reward-gift-ticket",
    };

    return request(options);
}

export const createPolicySaleRewardCompanyInformation = (name) => {
    const options = {
        method: "post",
        path: "policy-sale-reward-company-information",
        data: { name: name },
    };

    return request(options);
}

export const getPolicySaleRewardCompanyInformations = () => {
    const options = {
        method: "get",
        path: "policy-sale-reward-company-information",
    };

    return request(options);
}

export const savePolicySaleGiftCodeInformation = (policySaleGiftCodeInformation) => {
    const options = {
        method: "post",
        path: "policy-sale-gift-code-information",
        data: policySaleGiftCodeInformation,
    };

    return request(options);
}

export const getPolicySaleGiftCodeInformations = () => {
    const options = {
        method: "get",
        path: "policy-sale-gift-code-information",
    };

    return request(options);
}