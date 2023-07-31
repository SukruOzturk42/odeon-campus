import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import Button from "../../../../components/base-component/Button";
import { Input } from "../../../../components/base-component/Input";
import { SuccessModal } from "../../../../components/base-component/SuccessModal";
import Select from "../../../../components/base-component/Select";
import CampaignTypeSelect from "../../../../components/business-component/CampaignTypeSelect";


const ParamaterDefinitonCreateView = (props) => {
  const { intl, activeSubMenu, attribute, onChange, errors, showSuccessModal, setShowSuccessModal, onClick, campaignTypeId, updateCampaignTypeId } = props;

  const [data, setData] = useState([
    { label: "SELECT", value: "SELECT" },
    { label: "DATETIME", value: "DATETIME" },
    { label: "RADIO", value: "RADIO" },
    { label: "INPUT", value: "INPUT" },
    { label: "INPUT_DECIMAL", value: "INPUT_DECIMAL" },
    { label: "DATE", value: "DATE" }
  ]);

  return (
    <>
      <Row>
        <Input
          id={"name"}
          name={"name"}
          label={"İsmi"}
          md={4}
          onChange={onChange}
          error={errors.name}
          value={attribute.name ? attribute.name : undefined}
        />
      </Row>
      <Row>
        <Input
          id={"description"}
          name={"description"}
          label={"Açıklama"}
          md={4}
          onChange={onChange}
          error={errors.description}
          value={attribute.description ? attribute.description : undefined}
        />
      </Row>
      <Row>
        <Select
          md={3}
          id="dataType"
          name="dataType"
          label={"Data Tipi"}
          options={data ? data : undefined}
          onChange={onChange}
          error={errors.dataType}
          value={attribute.dataType ? attribute.dataType : undefined}
          isClearable={true}
        />
      </Row>
      <Row>
        <CampaignTypeSelect
          md={2}
          error={errors.campaignTypeId}
          onChange={updateCampaignTypeId}
          value={campaignTypeId ? campaignTypeId : undefined}
        />
        <Button
          md={2}
          id="attributeId"
          name="attributeId"
          value={"Kaydet"}
          onClick={onClick}
        >
          Kaydet
        </Button>
      </Row>
      <SuccessModal
        show={showSuccessModal}
        setShow={setShowSuccessModal}
      />
    </>
  )
}

export default injectIntl(ParamaterDefinitonCreateView);