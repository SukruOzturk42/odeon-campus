import React from "react";
import { injectIntl } from "react-intl";
import { Button } from "../../../../../components/base-component/Button";
import { Input } from "../../../../../components/base-component/Input";
import { Datatable } from "../../../../../components/base-component/Datatable";
import { Row, Col } from "react-bootstrap";

const CampaignActionView = (props) => {
  const {
    onHandleAddDescription,
    onHandleDeleteDescription,
    onChange,
    actionDescriptions,
    description,
    isEnabledAddButton,
    onHandleActionsRowClick,
  } = props;

  const deleteDescription = (cell, row) => {
    return (
      <>
        {row.id ? (
          <></>
        ) : (
          <Button buttonText={"Sil"} onClick={onHandleDeleteDescription}>
            Sil
          </Button>
        )}
      </>
    );
  };
  const campaignListColumns = [
    {
      dataField: "id",
      text: "id",
      hidden: true,
    },
    {
      dataField: "version",
      text: "Kampanya Versiyonu",
    },
    {
      dataField: "description",
      text: "Açıklama",
    },
    {
      dataField: "action",
      editable: false,
      formatter: deleteDescription,
    },
  ];
  return (
    <div>
      <Row>
        <Col md={6}>
          <Input
            id="actionDescription"
            name="actionDescription"
            label={"Kampanya Onay Açıklaması"}
            value={description}
            onChange={onChange}
            md={12}
            maxLength={150}
          />
        </Col>
        <Col md={6}>
          <Button
            onClick={onHandleAddDescription}
            disabled={!isEnabledAddButton || description.length === 0}
          >
            Ekle
          </Button>
        </Col>
      </Row>
      <Row>
        <Datatable
          data={actionDescriptions}
          columns={campaignListColumns}
          keyField={"campaignId"}
          rowClick={onHandleActionsRowClick}
        />
      </Row>
    </div>
  );
};

export default injectIntl(CampaignActionView);
