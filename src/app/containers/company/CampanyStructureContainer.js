import React, { useState, useEffect, useContext } from "react";
import CampaignInformationView from "../campaign/area/createcampaign/CampaignInformationView";
import { GlobalContext } from "../../context/GlobalState";
import { getCompanyStuctureByCampanyName } from "../../services/companyService";
import { PageContentArea } from "../../components/base-component/PageContentArea";
import { companyCampaignAreas } from "./cm";

const CampanyStructureContainer = (props) => {
  const { onChange, campaign, error } = props;
  const [companyStructures, setCampanyStructures] = useState([
    {
      id: 1,
      route: "as-company-rule-product",
      name: "state",
      title: "Koşul Tanımlama",
      objectName: "campaignRuleGroups",
      children: [
        {
          id: 6,
          route: "as-company-rule-contact-group",
          name: "contactGroup",
          title: "Müşteri Grubu",
        },
        {
          id: 7,
          route: "as-company-rule-sale-task-group",
          name: "saleTaskType",
          title: "Satış Task Grubu",
        },

        {
          id: 3,
          route: "as-company-rule-owner-product",
          name: "ownerProduct",
          title: "Ürün Sahibi",
        },

        {
          id: 4,
          route: "as-company-rule-related-cooperation",
          name: "relatedCooperation",
          title: "Bağlantılı Kurum Bilgisi",
        },
        {
          id: 5,
          route: "as-company-rule-reward",
          name: "reward",
          title: "Kazanım",
        },
      ],
    },
  ]);

  /*useEffect(() => {
    getCompanyStuctureByCampanyName("as").then((response) => {
      response.data &&
        response.data.items &&
        setCampanyStructures(response.data.items);
    });
  }, []);*/

  const getComponent = (route) => {
    const subMenuItem = companyCampaignAreas[route];
    return subMenuItem !== undefined
      ? subMenuItem
      : companyCampaignAreas["as-company-rule-product"];
  };

  return (
    <div>
      <PageContentArea title={"Parametre/Kazanım Tanımı"}>
        {companyStructures &&
          companyStructures.map((item) => {
            let ContentComponent = getComponent(item.route);
            return (
              <ContentComponent
                error={error[item.objectName]}
                structureInformation={item}
                campaign={campaign}
                onChange={onChange}
              />
            );
          })}
      </PageContentArea>
    </div>
  );
};

export default CampanyStructureContainer;
