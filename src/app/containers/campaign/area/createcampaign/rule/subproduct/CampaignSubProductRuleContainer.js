import React, { useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import { makeStyles, Fab, Tooltip } from "@material-ui/core";
import CampaignSubProductRuleView from "./CampaignSubProductRuleView";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import AddCircle from "@material-ui/icons/AddCircle";
import {
  getUid,
  getEmptyObjectHasId,
} from "../../../../../../common/utils/Util";

const CampaignSubProductRuleContainer = (props) => {
  const { onChange, index, parameter, type } = props;

  const tempSubProduct = {
    name: "subProduct",
    id: getUid(),
    attributes: [{ id: getUid(), type: "PARAMETER" }],
  };
  const [subProduct, setSubProduct] = useState(
    parameter.subProduct ? parameter.subProduct : {}
  );

  useEffect(() => {
    onChange({
      id: "subProduct",
      value: subProduct,
      key: index,
    });
  }, [subProduct]);

  const onAreaChange = (event) => {
    const { id, value } = event;
    setSubProduct((prev) => ({ ...prev, [id]: value }));
  };

  const handleDeleteSubProduct = (id) => {
    setSubProduct({});
    onChange({
      id: "subProduct",
      value: {},
    });
  };
  const handleAddSubProduct = (id) => {
    setSubProduct(tempSubProduct);
    onChange({
      id: "subProduct",
      value: tempSubProduct,
    });
  };

  return (
    <div>
      {subProduct && subProduct.name ? (
        <>
          <Tooltip title={"Alt Ürün Sil"} placement="top-start">
            <Fab
              size="small"
              color={"primary"}
              aria-label="Add"
              onClick={() => handleDeleteSubProduct()}
            >
              <DeleteForeverRounded />
            </Fab>
          </Tooltip>
          <CampaignSubProductRuleView
            subProduct={subProduct}
            parameter={parameter}
            key={index}
            onChange={onAreaChange}
            type={type}
          />
        </>
      ) : (
        <Tooltip title={"Alt Ürün Ekle"} placement="top-start">
          <Fab
            size="small"
            color={"primary"}
            aria-label="Add"
            onClick={() => handleAddSubProduct()}
          >
            <AddCircle />
          </Fab>
        </Tooltip>
      )}
    </div>
  );
};

export default injectIntl(CampaignSubProductRuleContainer);
