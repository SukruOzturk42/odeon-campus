import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { Datatable } from "../../../../components/base-component/Datatable";
import Button from "../../../../components/base-component/Button";
import PolicySaleRewardAddCodeModal from "../../../../components/business-component/policysale/PolicySaleRewardAddCodeModal";
import { ArrowUpwardSharp, HistorySharp, UpdateSharp, TocSharp } from "@material-ui/icons";
import { Tooltip, Fab } from "@material-ui/core";
import CampaignListByCodeInformationModal from "../../../../components/business-component/code/CampaignListByCodeInformationModal";

const PolicySaleCodeDatatableView = (props) => {
  const { intl, activeSubMenu, codes, /*getCampaignsByGiftCodeInformationId,*/ campaignList } = props;
  const [showAddCodeModal, setShowAddCodeModal] = useState(false);
  const [showCampaignListModal, setShowCampaignListModal] = useState(false);
  const [data, setData] = useState([]);
  const [code, setCode] = useState();

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
          }}
        >
          <TocSharp />
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
      <PolicySaleRewardAddCodeModal show={showAddCodeModal} setShow={setShowAddCodeModal} code={code} setCode={setCode}></PolicySaleRewardAddCodeModal>
      <CampaignListByCodeInformationModal
          show={showCampaignListModal}
          setShow={setShowCampaignListModal}
          data={campaignList}
        />
    </div >
  );
}

export default injectIntl(PolicySaleCodeDatatableView);