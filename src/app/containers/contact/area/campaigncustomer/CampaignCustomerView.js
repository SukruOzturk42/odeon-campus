import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Datatable } from "../../../../components/base-component/Datatable";
import { Input } from "../../../../components/base-component/Input";
import FileImport from "../../../../components/business-component/FileImport";
import Button from "../../../../components/base-component/Button";
import ClearSharp from "@material-ui/icons/ClearSharp";
import ArrowDownwardSharp from "@material-ui/icons/ArrowDownwardSharp";
import { isEmptyProp } from "../../../../common/utils/ObjectUtils";
import { makeStyles, Fab, Tooltip } from "@material-ui/core";

const CampaignCustomerView = (props) => {
  const {
    contactGroups,
    onChange,
    handleDeleteContactGroup,
    exportContacts,
    saveContactInformation,
    campaignContactGroup,
    error,
  } = props;

  const deleteFormatter = (cell, row) => {
    return (
      <Tooltip title={"Müşteri Grubu Sil"} placement="top-start">
        <Fab
          size="small"
          color={"primary"}
          aria-label="Add"
          onClick={() => handleDeleteContactGroup(row.contactGroupId)}
        >
          <ClearSharp />
        </Fab>
      </Tooltip>
    );
  };

  const exportFormatter = (cell, row) => {
    return (
      <Tooltip title={"Müşterileri Excele İndir"} placement="top-start">
        <Fab
          size="small"
          color={"danger"}
          aria-label="Add"
          onClick={() => exportContacts(row.contactGroupId)}
        >
          <ArrowDownwardSharp></ArrowDownwardSharp>
        </Fab>
      </Tooltip>
    );
  };

  const campaignCodeColumns = [
    {
      dataField: "groupName",
      text: "Grup Ismi",
    },

    {
      dataField: "action2",
      text: "İndir",
      editable: false,
      formatter: exportFormatter,
      headerAlign: "center",
      style: { textAlign: "center" },
    },
    {
      dataField: "action2",
      text: "Sil",
      editable: false,
      formatter: deleteFormatter,
      headerAlign: "center",
      style: { textAlign: "center" },
    },
  ];

  return (
    <div>
      <Row>
        <Col md={4}>
          <Input
            id="groupName"
            name="groupName"
            label={"Müşteri Grup İsmi"}
            onChange={onChange}
            value={campaignContactGroup.groupName}
            error={error && error.groupName}
          />
        </Col>
        <Col md={4}>
          <FileImport
            id="contactFile"
            type={"file"}
            name="contactFile"
            label={"Müsteri Dosyası Seç"}
            onChange={onChange}
            key={"customerFile"}
            accept={
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }
            error={error && error.contactFile}

          />
        </Col>
        <Col md={4}>
          <Button
            buttonText={"Kaydet"}
            onClick={saveContactInformation}
          >
            Kaydet
          </Button>
        </Col>
      </Row>
      <Row>
        <Datatable
          data={contactGroups}
          columns={campaignCodeColumns}
          keyfield={"campaignId"}
          hidePagination={true}
        />
      </Row>
    </div>
  );
};

export default CampaignCustomerView;
