import React, { useState, useEffect, useContext } from "react";
import { injectIntl } from "react-intl";
import { PageContentArea } from "../../../../../../components/base-component/PageContentArea";
import CampaignRelatedCooperationRuleView from "./CampaignRelatedCooperationRuleView";
import { getUid } from "../../../../../../common/utils/Util";
import AddCircle from "@material-ui/icons/AddCircle";
import { Fab, Tooltip } from "@material-ui/core";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import { GlobalContext } from "../../../../../../context/GlobalState";
import {
  isRelatedCampaignRuleGroup,
  isCrossSaleCampaignRuleGroup,
  isHaveOwnerProduct
} from "../common/RuleUtils";
import Button from "../../../../../../components/base-component/Button";

const CampaignRelatedCooperationRuleContainer = (props) => {
  const { structureInformation, rule, onParentAreaChange, error } = props;
  const tempOwnerProduct = {
    name: structureInformation.name,
    id: getUid(),
    attributes: [{ id: getUid(), type: "PARAMETER" }],
  };
  const { isCampaignTypeChanged } = useContext(GlobalContext);
  const [relatedCooperation, setRelatedCooperation] = useState();

  useEffect(() => {
    if (rule.relatedCooperation) {
      setRelatedCooperation(rule.relatedCooperation);
    }
  }, [rule]);

  useEffect(() => {
    if (isCampaignTypeChanged) {
      setRelatedCooperation({});
      onParentAreaChange({
        id: "relatedCooperation",
        value: {},
      });
    }
  }, [isCampaignTypeChanged]);

  const onAreaChange = (event) => {
    const { id, value } = event;
    relatedCooperation[id] = value;
    setRelatedCooperation(relatedCooperation);
    onParentAreaChange({
      id: "relatedCooperation",
      value: relatedCooperation,
    });
  };

  const handleDeleteOwnerProduct = (id) => {
    setRelatedCooperation({});
    onParentAreaChange({
      id: "relatedCooperation",
      value: {},
    });
  };
  const handleAddRelatedCooperation = (id) => {
    if (!isHaveOwnerProduct(rule.ownerProduct)) {
      setRelatedCooperation(tempOwnerProduct);
      onParentAreaChange({
        id: "relatedCooperation",
        value: tempOwnerProduct,
      });
    } else {
      alert(
        "Ürün Sahibi Parametresi Eklendiyse Web Servisle Müşteri Doğrulama Bilgisi Girelemez"
      );
    }
  };

  return (
    <div>
      {relatedCooperation && relatedCooperation.name ? (
        <>
          <PageContentArea title={structureInformation.title}>
            <Tooltip
              title={"Baglantılı Kurum Bilgisi Sil"}
              placement="top-start"
            >
              <Fab
                size="small"
                color={"primary"}
                aria-label="Add"
                onClick={() => handleDeleteOwnerProduct()}
              >
                <DeleteForeverRounded />
              </Fab>
            </Tooltip>
            <CampaignRelatedCooperationRuleView
              error={error ? error.relatedCooperation : {}}
              relatedCooperation={relatedCooperation}
              onChange={onAreaChange}
              structureInformation={structureInformation}
            />
          </PageContentArea>
        </>
      ) : (
          <Button
              buttonText={"Web Servisle Müşteri Doğrulama Ekle"}
              title={"Web Servisle Müşteri Doğrulama Ekle"}
              placement="top-start"
              className="col-md-2 "
              onClick={() => handleAddRelatedCooperation()}>
            Web Servisle Müşteri Doğrulama Ekle
          </Button>
      )}
    </div>
  );
};

export default injectIntl(CampaignRelatedCooperationRuleContainer);
