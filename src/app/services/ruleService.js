import { request, requestAll } from "../common/utils/Request";

export const postCreateRule = (data) => {
  const options = {
    method: "post",
    path: "rule",
    data: data,
  };

  return request(options);
};

export const getRules = () => {
  const options = {
    method: "get",
    path: "rules",
  };

  return request(options);
}

export const getRuleDetail = (ruleGroupId) => {
  const options = {
    method: "get",
    path: "rule-detail",
    params: ["ruleGroupId"],
    values: [ruleGroupId],
  };

  return request(options);
}

export default { postCreateRule, getRules, getRuleDetail };
