import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { Datatable } from "../../../../components/base-component/Datatable";
import Button from "../../../../components/base-component/Button";
import AddCodeModal from "../../../../components/business-component/code/AddCodeModal";
import { ArrowUpwardSharp, ArrowDownwardSharp, UpdateSharp, TocSharp } from "@material-ui/icons";
import { Tooltip, Fab } from "@material-ui/core";
import CampaignListByCodeInformationModal from "../../../../components/business-component/code/CampaignListByCodeInformationModal";

const CodeDatatableView = (props) => {
  const { intl, activeSubMenu, codes, getCampaignsByGiftCodeInformationId, exportToExcel, campaignList } = props;
  const [showAddCodeModal, setShowAddCodeModal] = useState(false);
  const [showCampaignListModal, setShowCampaignListModal] = useState(false);
  const [data, setData] = useState([]);
  const [code, setCode] = useState();
  const [codeGroupId, setCodeGroupId] = useState();
  const [codeGroupName, setCodeGroupName] = useState();

  const addCodeButton = (cell, row) => {
    return (
      <Tooltip title={"Kod Ekle"} placement={"top-start"}>
        <Fab
          size="small"
          color={"primary"}
          aria-label="History"
          onClick={() => showBudgetDetailList(row)}
        >
          <ArrowUpwardSharp></ArrowUpwardSharp>
        </Fab>
      </Tooltip>
    );
  };

  const campaignListByCodeFormatter = (cell, row) => {
    return (
      <Tooltip title={"Kampanyalar"} placement={"top-start"}>
        <Fab
          size={"small"}
          color={"primary"}
          onClick={() => {
            setShowCampaignListModal(true);
            getCampaignsByGiftCodeInformationId(row.id)
            setCodeGroupId(row.id);
            setCodeGroupName(row.companyInformationName + " - " + row.rewardGiftTicketTypeName);
          }}
        >
          <TocSharp />
        </Fab>
      </Tooltip>
    );
  };

  const codeExportFormatter = (cell, row) => {
    return (
      <Tooltip title={"Excel Export"} placement={"top-start"}>
        <Fab
          size={"small"}
          color={"primary"}
          onClick={() => {
            exportToExcel(row);
          }}
        >
          <ArrowDownwardSharp />
        </Fab>
      </Tooltip>
    );
  };

  const showBudgetDetailList = (row) => {
    setShowAddCodeModal(true)
    setCode(row);
  }

  const codeColumns = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "companyInformationName",
      text: "Şirket Bilgisi",
    },
    {
      dataField: "totalCodeCount",
      text: "Toplam Kod",
    },
    {
      dataField: "usedCodeCount",
      text: "Kullanılan Kod",
    },
    {
      dataField: "remainingCodeCount",
      text: "Kalan Kod"
    },
    {
      dataField: "rewardGiftTicketTypeName",
      text: "Fayda İsmi",
    },
    {
      dataField: "fileUploadEnum",
      text: "Yüklenme Durumu",
    },
    {
      dataField: "action3",
      text: "Kampanyalar",
      editable: false,
      formatter: campaignListByCodeFormatter,
      headerAlign: "center",
      style: { textAlign: "center" },
    },
    {
      dataField: "action1",
      text: "Kod Ekle",
      editable: false,
      formatter: addCodeButton,
      headerAlign: "center",
      style: { textAlign: "center" },
    },
    {
      dataField: "action2",
      text: "Excel Export",
      editable: false,
      formatter: codeExportFormatter,
      headerAlign: "center",
      style: { textAlign: "center" },
    },
  ];

  return (
    <div>
      <Row>
        <Datatable
          data={codes ? codes : []}
          columns={codeColumns}
          keyfield={"id"}
          hidePagination={true}
        />
      </Row>
      <AddCodeModal show={showAddCodeModal} setShow={setShowAddCodeModal} code={code} setCode={setCode}></AddCodeModal>
      <CampaignListByCodeInformationModal
        show={showCampaignListModal}
        setShow={setShowCampaignListModal}
        data={campaignList}
        codeGroupId={codeGroupId}
        codeGroupName={codeGroupName}
      />
    </div >
  );
}

export default injectIntl(CodeDatatableView);