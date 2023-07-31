import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { Datatable } from "../../../../components/base-component/Datatable";
import Button from "../../../../components/base-component/Button";
import { ArrowUpwardSharp, ArrowDownwardSharp, HistorySharp, TocSharp } from "@material-ui/icons";
import { Tooltip, Fab } from "@material-ui/core";
import DiscountCodeInformationDetailModal from "../../../../components/business-component/code/DiscountCodeInformationDetailModal";
import CampaignListByCodeInformationModal from "../../../../components/business-component/code/CampaignListByCodeInformationModal";

const CampaignCodeDatatableView = (props) => {
  const { intl, activeSubMenu, onChange, campaignCodes, setCampaignCode, setIsDisabled, exportToExcel,
    getCampaignsByDiscountCodeInformationId, campaignList } = props;
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCampaignListModal, setShowCampaignListModal] = useState(false);
  const [data, setData] = useState([]);
  const [codeGroupId, setCodeGroupId] = useState();
  const [codeGroupName, setCodeGroupName] = useState();

  const codeUpdateFormatter = (cell, row) => {
    return (
      <Tooltip title={"Güncelle"} placement={"top-start"}>
        {row.fileUploadStatus === '' && row.codeTypeId !== 2 ?
          <Fab
            size="small"
            color={"primary"}
            aria-label="Update"
            onClick={() => {
              setIsDisabled(true);
              setCampaignCode(row);
            }}
          >
            <ArrowUpwardSharp></ArrowUpwardSharp>
          </Fab>
          :
          <Fab
            size="small"
            color={"primary"}
            disabled="True"
            aria-label="Update"
            onClick={() => {

            }}
          >
            <ArrowUpwardSharp></ArrowUpwardSharp>
          </Fab>
        }
      </Tooltip>
    );
  };

  const codeDetailFormatter = (cell, row) => {
    return (
      <Tooltip title={"Detay"} placement={"top-start"}>
        <Fab
          size="small"
          color={"danger"}
          aria-label="History"
          onClick={() => {
            setShowDetailModal(true);
            setData(row.discountCodeInformationDetailList);
            setCodeGroupId(row.id);
            setCodeGroupName(row.codeGroupName);
          }}
        >
          <HistorySharp></HistorySharp>
        </Fab>
      </Tooltip>
    );
  }

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

  const campaignListByCodeFormatter = (cell, row) => {
    return (
      <Tooltip title={"Kampanyalar"} placement={"top-start"}>
        <Fab
          size={"small"}
          color={"primary"}
          onClick={() => {
            setCodeGroupId(row.id);
            setCodeGroupName(row.codeGroupName);
            setShowCampaignListModal(true);
            getCampaignsByDiscountCodeInformationId(row.id)
          }}
        >
          <TocSharp />
        </Fab>
      </Tooltip>
    );
  };

  const campaignCodeColumns = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "codeGroupName",
      text: "Kod Kümesi İsmi",
    },
    {
      dataField: "codeTypeName",
      text: "Kod Tipi",
    },
    {
      dataField: "codeCharacterLength",
      text: "Kod Karakter Sayısı",
    },
    {
      dataField: "codeGeneratedCount" ? "codeGeneratedCount" : "codeTypeName",
      text: "Oluşturulan Kod Sayısı",
    },
    {
      dataField: "fileUploadStatus",
      text: "Yüklenme Durumu",
    },
    {
      dataField: "action1",
      text: "Güncelle",
      editable: false,
      formatter: codeUpdateFormatter,
      headerAlign: "center",
      style: { textAlign: "center" },
    },
    {
      dataField: "action2",
      text: "Detay",
      editable: false,
      formatter: codeDetailFormatter,
      headerAlign: "center",
      style: { textAlign: "center" },
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
          data={campaignCodes ? campaignCodes : []}
          columns={campaignCodeColumns}
          keyfield={"campaignId"}
          hidePagination={true}
        />
        <DiscountCodeInformationDetailModal
          show={showDetailModal}
          setShow={setShowDetailModal}
          data={data}
          codeGroupId={codeGroupId}
          codeGroupName={codeGroupName}
        />
        <CampaignListByCodeInformationModal
          show={showCampaignListModal}
          setShow={setShowCampaignListModal}
          data={campaignList}
          codeGroupId={codeGroupId}
          codeGroupName={codeGroupName}
        />
      </Row>
    </div >
  );
};

export default injectIntl(CampaignCodeDatatableView);
