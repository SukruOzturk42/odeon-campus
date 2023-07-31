import React, { useState, useEffect, useContext } from "react";
import CampaignBudgetView from "./CampaignBudgetView";
import { GlobalContext } from "../../../../context/GlobalState";
import {
  saveCampaignBudget,
  getAllCampaignBudgetsByCampaignId,
  getCampaignBudgetItemTypes,
  deleteCampaignBudgetById,
} from "../../../../services/CampaignBudgetService";
import moment from "moment";
import { validate } from "./campaignBudgetValidator";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";

export default function CampaignBudgetContainer(props) {
  const { activeSubMenu, campaign } = useContext(GlobalContext);
  const { intl, campaignId } = props;
  const [campaignBudgetList, setCampaignBudgetList] = useState([]);
  const [budgetItemOptions, setBudgetItemOptions] = useState([]);
  const [campaignBudget, setCampaignBudget] = useState({});
  const [errors, setErrors] = useState({});
  const saveBudget = () => {
    const error = validate(campaignBudget);
    campaignBudget.campaignId = campaign.id;
    campaignBudget.dateOfAdd = moment();
    if (ObjectUtils.isEmptyObject(error)) {
      saveCampaignBudget(campaignBudget).then((response) => {
        getAllCampaignBudgets(campaign.id);
      });
      setCampaignBudget({});
      setErrors({});
    } else {
      setErrors(error);
    }
  };

  const getAllCampaignBudgets = (campaignId) => {
    getAllCampaignBudgetsByCampaignId(campaign.id).then((response) => {
      setCampaignBudgetList(response.data.items);
    });
  };

  const clearCampaignBudget = () => {
    setCampaignBudget({});
  };

  const deleteCampaignBudget = (id) => {
    deleteCampaignBudgetById(id).then((response) => {
      getAllCampaignBudgets(campaign.id);
    });
  };

  const calculateTotalBudget = (budgetList) => {
    let totalAmount = budgetList
      .map((item) => item.budgetAmount)
      .reduce((prev, next) => prev + next);
    return totalAmount;
  };

  const onAreaChange = (event) => {
    const { id, value } = event;
    setCampaignBudget((state) => ({ ...state, [id]: value }));
    setErrors(ObjectUtils.removeKeyFromObject(errors, id));
  };
  useEffect(() => {
    getAllCampaignBudgets(campaign.id);
  }, []);
  return (
    <div>
      <PageContentArea title={activeSubMenu.title}>
        <CampaignBudgetView
          activeSubMenu={activeSubMenu}
          saveCampaignBudget={saveBudget}
          campaignBudgetList={campaignBudgetList}
          budgetItemOptions={budgetItemOptions}
          onChange={onAreaChange}
          campaignBudget={campaignBudget}
          setCampaignBudget={setCampaignBudget}
          clearCampaignBudget={clearCampaignBudget}
          deleteCampaignBudget={deleteCampaignBudget}
          error={errors}
          calculateTotalBudget={calculateTotalBudget}
        />
      </PageContentArea>
    </div>
  );
}
