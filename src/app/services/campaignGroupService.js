import { request, requestAll } from "../common/utils/Request";

export const crateCampaignGroup = (name) => {
  const options = {
    method: "post",
    path: "campaign-group",
    data: { name: name },
  };

  return request(options);
};

export default { crateCampaignGroup };
