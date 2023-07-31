import React, { useState, useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import Select from '../../../../components/base-component/Select';
import AttributeSelect from '../../../../components/business-component/AttributeSelect';
import CampaignTypeSelect from '../../../../components/business-component/CampaignTypeSelect';
import Button from '../../../../components/base-component/Button';
import { SuccessModal } from '../../../../components/base-component/SuccessModal';

export default function CampaignParameterDefinitionView(props) {

  const {
    onChange,
    errors,
    campaignStructures,
    campaignAttribute,
    saveCampaignAttribute,
    showSuccessModal,
    setShowSuccessModal,
    setCampaignTypeId,
    campaignTypeId
  } = props;

  const [data, setData] = useState([
    { label: "SELECT", value: "SELECT" },
    { label: "DATETIME", value: "DATETIME" },
    { label: "RADIO", value: "RADIO" },
    { label: "INPUT", value: "INPUT" },
    { label: "INPUT_DECIMAL", value: "INPUT_DECIMAL" },
    { label: "DATE", value: "DATE" }
  ]);

  const [selectedParameter, setSelectedParameter] = useState();

  const updateCampaignTypeId = (event) => {
    const { id, value } = event;
    setCampaignTypeId(value);
  }

  return (
    <div>
      <Row>
        <Col md={3} className={"nopadding-margin"}>
          <Select
            id={"structureId"}
            name={"structureId"}
            label={"Kampanya Yapısı"}
            error={errors.structureId}
            md={7}
            onChange={onChange}
            options={campaignStructures}
            value={campaignAttribute.structureId}
          />
        </Col>
        <Col md={3} className={"nopadding-margin"}>
          <CampaignTypeSelect
            md={7}
            onChange={updateCampaignTypeId}
            value={campaignTypeId ? campaignTypeId : undefined}
          />
        </Col>
        <Col md={3} className={"nopadding-margin"}>
          <AttributeSelect
            setSelectedParameter={setSelectedParameter}
            campaignTypeId={campaignTypeId}
            error={errors.parameterId}
            value={campaignAttribute.attributeId}
            onChange={onChange}
            md={7}
          />
        </Col>
        <Col md={3}>
          <Button
            md={4}
            id="campaignAttributeId"
            name="campaignAttributeId"
            value={"Kaydet"}
            onClick={saveCampaignAttribute}
          >
            Kaydet
          </Button>
        </Col>
      </Row>
      <Row>
        <SuccessModal
          show={showSuccessModal}
          setShow={setShowSuccessModal}
        />
      </Row>
    </div>
  )
}
