import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { Datatable } from "../../../../components/base-component/Datatable";
import { Input } from "../../../../components/base-component/Input";
import Button from "../../../../components/base-component/Button";
import { Tooltip, Fab } from "@material-ui/core";
import { ClearSharp, ArrowUpwardSharp } from "@material-ui/icons";
import CampaignReasonDatePicker from "../../../../components/business-component/CampaignReasonDatePicker";
import {dateFormat, dateFormatWithHour} from "../../../../common/utils/Util";
import ConfirmModal from "../../../../components/base-component/ConfirmModal";

const CampaignReasonView = (props) => {
  const { intl, activeSubMenu, onChange, campaignReason,
    setCampaignReason, campaignReasons, saveOrUpdateCampaignReason,
    deleteCampaignReason, errors, clearCampaignReason, isUpdatingState,
    setIsUpdatingState } = props;

  const [showModal, setShowModal] = useState(false);
  const [rowToBeDeleted,setRowToBeDeleted] = useState(null)

  const reasonUpdateFormatter = (cell, row) => {
    return (
      <Tooltip title={"Güncelle"} placement={"top-start"}>
        <Fab
          size="small"
          color={"primary"}
          aria-label="History"
          onClick={() => {
            setCampaignReason(row);
            setIsUpdatingState(true);
          }}
        >
          <ArrowUpwardSharp />
        </Fab>
      </Tooltip>
    );
  }

  const reasonDeleteFormatter = (cell, row) => {
    return (
      <Tooltip title={"Sil"} placement={"top-start"}>
        <Fab
          size="small"
          color="primary"
          aria-label="History"
          onClick={() => openConfirmDeleteModal(row)}
        >
          <ClearSharp />
        </Fab>
      </Tooltip>
    );
  }

  const openConfirmDeleteModal = (id) => {
    setRowToBeDeleted(id)
    setShowModal(true)
  }


  const campaignReasonColumns = [
    {
      dataField: "decidingOrganization",
      text: "Kararı Alan",
    },
    {
      dataField: "decisionNumber",
      text: "Karar No",
    },
    {
      dataField: "decisionDate",
      text: "Karar Tarihi",
      formatter: dateFormat
    },
    {
      dataField: "createdDate",
      text: "Eklenme Tarihi",
      formatter: dateFormatWithHour
    },
    {
      dataField: "decisionDescription",
      text: "Açıklama"
    },
    {
      dataField: "campaignId",
      text: "Kampanya ID",
    },
    {
      dataField: "action1",
      text: "Güncelle",
      editable: false,
      formatter: reasonUpdateFormatter,
      headerAlign: 'center',
      style: { textAlign: 'center' }
    },
    {
      dataField: "action2",
      text: "Sil",
      editable: false,
      formatter: reasonDeleteFormatter,
      headerAlign: 'center',
      style: { textAlign: 'center' }
    },
  ];

  return (
    <div>
      <Row>
        <Input
          id={"decidingOrganization"}
          name={"decidingOrganization"}
          label={"Kararı Alan Organizasyon"}
          md={3}
          value={campaignReason.decidingOrganization ? campaignReason.decidingOrganization : undefined}
          onChange={onChange}
          error={errors.decidingOrganization}
        />
      </Row>
      <Row>
        <Input
          id={"decisionNumber"}
          name={"decisionNumber"}
          label={"Karar Numarası"}
          md={3}
          value={campaignReason.decisionNumber ? campaignReason.decisionNumber : undefined}
          onChange={onChange}
          error={errors.campaignLink}
        />
      </Row>
      <Row>
        <CampaignReasonDatePicker
          md={3}
          value={campaignReason.decisionDate}
          onChange={onChange}
          error={errors.decisionDate}
        />
      </Row>
      <Row>
        <Input
          id={"decisionDescription"}
          name={"decisionDescription"}
          label={"Açıklama"}
          md={3}
          value={campaignReason.decisionDescription ? campaignReason.decisionDescription : undefined}
          onChange={onChange}
          error={errors.decisionDescription}
        />
        {isUpdatingState === true ?
          <Button
            md={3}
            onClick={saveOrUpdateCampaignReason}
          > Güncelle </Button>
          : <Button
            md={3}
            onClick={saveOrUpdateCampaignReason}
          > Ekle </Button>}
        <Button
          md={3}
          onClick={clearCampaignReason}
        > Temizle </Button>
      </Row>
      <Row>
        <Datatable
          data={campaignReasons ? campaignReasons : []}
          columns={campaignReasonColumns}
          keyfield={"id"}
          hidePagination={true}
        />
        <span>{campaignReasons.length > 0 ? <>Toplam {campaignReasons.length} kayıt gösterilmektedir. </>:
            <>Kayıt bulunamadı.</>}</span>
      </Row>
      <ConfirmModal
          show={showModal}
          setShow={setShowModal}
          title={"Uyarı"}
          bodyMessage={"Kampanya Sebebi Silinecektir!"}
          onOk={() =>deleteCampaignReason(rowToBeDeleted)}
      />
    </div >
  );
}

export default injectIntl(CampaignReasonView);