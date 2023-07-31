import React, { useState, useEffect, useContext } from "react";
import { injectIntl } from "react-intl";
import { PageContentArea } from "../../../../../../components/base-component/PageContentArea";
import CampaignOwnerProductRuleView from "./CampaignOwnerProductRuleView";
import {
  getUid,
} from "../../../../../../common/utils/Util";
import AddCircle from "@material-ui/icons/AddCircle";
import {  Fab, Tooltip } from "@material-ui/core";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import { GlobalContext } from "../../../../../../context/GlobalState";
import  {isRelatedCampaignRuleGroup,isCrossSaleCampaignRuleGroup} from '../common/RuleUtils'
import Button from "../../../../../../components/base-component/Button";

const CampaignOwnerProductRuleContainer = (props) => {
  const { structureInformation, rule, onParentAreaChange, error } = props;
  const tempOwnerProduct = {
    name: structureInformation.name,
    id: getUid(),
    attributes: [{ id: getUid(), type: "PARAMETER" }],
  };
  const { isCampaignTypeChanged } = useContext(
    GlobalContext
  );
  const [ownerProduct, setOwnerProduct] = useState();

  useEffect(() => {
    if (rule.ownerProduct) {
      setOwnerProduct(rule.ownerProduct);
    }
  }, [rule]);

  useEffect(() => {
    if (isCampaignTypeChanged) {
      setOwnerProduct({});
      onParentAreaChange({
        id: "ownerProduct",
        value: {},
      });
    }
  }, [isCampaignTypeChanged]);

  const onAreaChange = (event) => {
    const { id, value } = event;
    ownerProduct[id] = value;
    setOwnerProduct(ownerProduct);
    onParentAreaChange({
      id: "ownerProduct",
      value: ownerProduct,
    });
  };

  const handleDeleteOwnerProduct = (id) => {
    setOwnerProduct({});
    onParentAreaChange({
      id: "ownerProduct",
      value: {},
    });
  };
  const handleAddOwnerProduct = (id) => {
    if(!isRelatedCampaignRuleGroup(rule)){
      setOwnerProduct(tempOwnerProduct);
      onParentAreaChange({
        id: "ownerProduct",
        value: tempOwnerProduct,
      });
    }else{
        alert("Bağlantılı Kurum Bilgisi Parametresi Eklendiyse Ürün Sahibi Bilgisi Girelemez.")
    }
  };

  return (
    <div>
      {ownerProduct && ownerProduct.name ? (
        <>
          <PageContentArea title={structureInformation.title}>
            <Tooltip title={"Ürün Sahibi Sil"} placement="top-start">
              <Fab
                size="small"
                color={"primary"}
                aria-label="Add"
                onClick={() => handleDeleteOwnerProduct()}
              >
                <DeleteForeverRounded />
              </Fab>
            </Tooltip>
            <CampaignOwnerProductRuleView
              error={error ? error.ownerProduct : {}}
              ownerProduct={ownerProduct}
              onChange={onAreaChange}
              structureInformation={structureInformation}
            />
          </PageContentArea>
        </>
      ) : (
          <Button
              buttonText={"Ürün Sahipligi Ekle"}
              title={"Ürün Sahibi Ekle"}
              placement="top-start"
              className="col-md-2"
              onClick={() => handleAddOwnerProduct()}>
            Ürün Sahipliği Ekle
          </Button>
      )}
    </div>
  );
};

export default injectIntl(CampaignOwnerProductRuleContainer);
