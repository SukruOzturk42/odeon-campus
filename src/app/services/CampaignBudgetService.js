import { request, requestAll } from "../common/utils/Request";

export const saveCampaignBudget = (data) => {
    const options = {
        method: "post",
        path: "campaign-budget",
        data: data,
    };

    return request(options);
};

export const getAllCampaignBudgetsByCampaignId = (campaignId) => {
    const options = {
        method: "get",
        path: "campaign-budgets/"+ campaignId,
    };
    return request(options);
};

export const getCampaignBudgetItemTypes = () => {
    const options = {
        method: "get",
        path: "campaign-budget-items-type",
    };
    return request(options);
};

export const deleteCampaignBudgetById = (id) => {
    const options = {
        method: "delete",
        path: "campaign-budget/"+ id,
    };
    return request(options);
};
export default {
    saveCampaignBudget,
};
