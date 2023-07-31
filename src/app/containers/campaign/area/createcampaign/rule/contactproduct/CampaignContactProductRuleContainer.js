import React, { useState, useEffect, useContext } from "react";
import { injectIntl } from "react-intl";
import { PageContentArea } from "../../../../../../components/base-component/PageContentArea";
import CampaignContactProductRuleView from "./CampaignContactProductRuleView";
import { getUid } from "../../../../../../common/utils/Util";
import AddCircle from "@material-ui/icons/AddCircle";
import { Fab, Tooltip } from "@material-ui/core";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import { GlobalContext } from "../../../../../../context/GlobalState";
import Button from "../../../../../../components/base-component/Button";

const CampaignContactProductRuleContainer = (props) => {
  const { structureInformation, rule, onParentAreaChange, error } = props;
  const tempOwnerProduct = {
    name: structureInformation.name,
    id: getUid(),
    attributes: [{ id: getUid(), type: "PARAMETER" }],
  };
  const { isCampaignTypeChanged } = useContext(GlobalContext);
  const [contactProduct, setContactProduct] = useState();

  useEffect(() => {
    if (rule.contactProduct) {
      setContactProduct(rule.contactProduct);
    }
  }, [rule]);

  useEffect(() => {
    if (isCampaignTypeChanged) {
      setContactProduct({});
      onParentAreaChange({
        id: "contactProduct",
        value: {},
      });
    }
  }, [isCampaignTypeChanged]);

  const onAreaChange = (event) => {
    const { id, value } = event;
    contactProduct[id] = value;
    setContactProduct(contactProduct);
    onParentAreaChange({
      id: "contactProduct",
      value: contactProduct,
    });
  };

  const handleDeleteOwnerProduct = (id) => {
    setContactProduct({});
    onParentAreaChange({
      id: "contactProduct",
      value: {},
    });
  };
  const handleAddRelatedCooperation = (id) => {
      setContactProduct(tempOwnerProduct);
      onParentAreaChange({
        id: "contactProduct",
        value: tempOwnerProduct,
      });
  };

  return (
    <div>
      {contactProduct && contactProduct.name ? (
        <>
          <PageContentArea title={structureInformation.title}>
            <Tooltip
              title={"Müşteri Ürün Bilgisi Sil"}
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
            <CampaignContactProductRuleView
              error={error ? error.relatedCooperation : {}}
              contactProduct={contactProduct}
              onChange={onAreaChange}
              structureInformation={structureInformation}
            />
          </PageContentArea>
        </>
      ) : (
          <Button
              buttonText={"Müşteri Ürün Bilgisi Ekle"}
              title={"Müşteri Ürün Bilgisi Ekle"}
              placement="top-start"
              className="col-md-2 "
              onClick={() => handleAddRelatedCooperation()}>
            Müşteri Ürün Bilgisi Ekle
          </Button>
      )}
    </div>
  );
};

export default injectIntl(CampaignContactProductRuleContainer);
