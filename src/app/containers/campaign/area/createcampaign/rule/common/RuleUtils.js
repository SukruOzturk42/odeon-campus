import _ from "lodash";

export const isRelatedCampaignRuleGroup = (ruleGroup) => {
    return ruleGroup.relatedCooperation && ruleGroup.relatedCooperation.attributes;
};
export const isHaveOwnerProduct = (ownerProduct) => {
    return ownerProduct && ownerProduct.attributes;
};
export const isCrossSaleCampaignRuleGroup = (ownerProduct) => {
    return ownerProduct && ownerProduct.attributes
}

export const isRuleExist = (attributes,ruleId) => {
    return attributes.findIndex(x => x.attributeId === ruleId) !== -1;
}

export const hasRuleSubProduct = (attributes) => {
    var attribute=_.find(attributes,item=>item.subProduct);
    var result=(attribute!==undefined) && 
    !_.isUndefined(attribute.subProduct.attributes)&&
    _.isArray(attribute.subProduct.attributes) 
    return result;
}
export const validateSalesCampaign = (campaignRuleGroups) => {
    let havePolicyType = false;
    if (campaignRuleGroups || campaignRuleGroups.length > 0) {
        campaignRuleGroups.attributes.map((item, index) => {
            if (item.attributeId === 18) {
                havePolicyType = true;
            }
        });
    }
    return havePolicyType;
};