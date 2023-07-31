import React, { useContext, useState, useEffect } from "react";
import CustomerView from "./CustomerView";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";
import PolicySaleRewardCampaignService, { distributeCodeToEntity } from "../../../../services/PolicySaleRewardCampaignService";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";
import { createContactGroup } from "../../../../services/contactService";
import { GlobalContext } from "../../../../context/GlobalState";
import { validate } from "../customer/PolicySaleCustomerUploadValidator";
import {
  getContactGroupsTempExcel,
} from "../../../../services/contactService";

export default function CustomerContainer() {

  const [policySaleRewardCampaigns, setPolicySaleRewardCampaigns] = useState([]);
  const [policySaleRewardCampaign, setPolicySaleRewardCampaign] = useState({})
  const [errors, setErrors] = useState({});
  const { setActiveSubMenu } = useContext(GlobalContext);

  useEffect(() => {
    getPolicySaleRewardCampiagns()
  }, [])

  const getPolicySaleRewardCampiagns = () => {
    PolicySaleRewardCampaignService.getAllPolicySaleRewardCampaigns()
      .then((response) => {
        response.data &&
          setPolicySaleRewardCampaigns(response.data.items);
      })
  }
  const onAreaChange = (event) => {
    const { id, value } = event;
    console.log(policySaleRewardCampaign)
    setPolicySaleRewardCampaign((state) => ({ ...state, [id]: value }));
    setErrors(ObjectUtils.removeKeyFromObject(errors, id));
  };

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      getPolicySaleRewardCampiagns();
    }, 1000 * 30);
    return () => clearInterval(refreshInterval);
  }, []);

  const savePolicySaleRewardCampaign = () => {
    const error = validate(policySaleRewardCampaign);
    if (ObjectUtils.isEmptyObject(error)) {
      PolicySaleRewardCampaignService.createPolicySaleRewardCampaign(policySaleRewardCampaign)
        .then((response) => {
          if (response) {
            alert("Ekleme Başarılı");
          }
        });
      setErrors({});
      setPolicySaleRewardCampaign({});
    } else {
      setErrors(error);
    }
    getPolicySaleRewardCampiagns()
  }

  const distributeCodeToCustomer = (campaignId) => {
    PolicySaleRewardCampaignService.distributeCodeToEntity(campaignId)
      .then((response) => {
        if (response) {
          alert("Kod dağıtma Başarılı");
        }
      })
    getPolicySaleRewardCampiagns()
  }

  const exportToTempExcel = () => {
    getContactGroupsTempExcel().then((response) => {
      try {
        if (response) {
          let blob = new Blob([response], { type: "application/vnd.ms-excel" });
          let url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "template-contact-group.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  return (
    <PageContentArea
      buttonText={"Örnek Excel İndir"}
      buttonOnClick={exportToTempExcel}
    >
      <CustomerView
        policySaleRewardCampaigns={policySaleRewardCampaigns}
        policySaleRewardCampaign={policySaleRewardCampaign}
        setPolicySaleRewardCampaign={setPolicySaleRewardCampaign}
        savePolicySaleRewardCampaign={savePolicySaleRewardCampaign}
        errors={errors}
        setActiveSubMenu={setActiveSubMenu}
        distributeCodeToCustomer={distributeCodeToCustomer}
        onChange={onAreaChange} />
    </PageContentArea>
  );
}
