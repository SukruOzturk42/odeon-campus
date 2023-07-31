import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { Datatable } from "../../../../components/base-component/Datatable";
import Select from "../../../../components/base-component/Select";
import Button from "../../../../components/base-component/Button";
import { Input } from "../../../../components/base-component/Input";
import CampaignSaleChannelTypeSelect from "../../../../components/business-component/CampaignSaleChannelTypeSelect";
import FileImport from "../../../../components/business-component/FileImport";
import { TextArea } from "../../../../components/base-component/TextArea";
import { dateFormatWithHour } from "../../../../common/utils/Util";
import { Tooltip, Fab } from "@material-ui/core";
import { ImageSearchSharp, ClearSharp, ArrowUpwardSharp } from "@material-ui/icons";
import ConfirmModal from "../../../../components/base-component/ConfirmModal";
import CampaignDetailImageModal from "../../../../components/business-component/CampaignDetailImageModal";
import * as CampaignDetailService from "../../../../services/campaignDetailService";

const CampaignDetailView = (props) => {
  const {
    intl,
    activeSubMenu,
    onChange,
    errors,
    campaignDetail,
    setCampaignDetail,
    campaignDetails,
    saveOrUpdateCampaignDetail,
    deleteCampaignDetail,
    showFileImport,
    campaignTypeId,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [rowToBeDeleted, setRowToBeDeleted] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const goalUpdateFormatter = (cell, row) => {
    return (
      <Tooltip title={"Güncelle"} placement={"top-start"}>
        <Fab
          size="small"
          color={"primary"}
          aria-label="History"
          onClick={() => setCampaignDetail(row)}
        >
          <ArrowUpwardSharp />
        </Fab>
      </Tooltip>
    );
  };

  const goalDeleteFormatter = (cell, row) => {
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
  };

  const showDetailImage = (cell, row) => {
    return (
      <Tooltip title={"Resmi Görüntüle"} placement={"top-start"}>
        <Fab
          size="small"
          color="primary"
          disabled={row.fileName === undefined || row.fileName === null}
          aria-label="History"
          onClick={() => getImageDetail(row.id)}
        >
          <ImageSearchSharp />
        </Fab>
      </Tooltip>
    );
  };

  const getImageDetail = (id) => {
    CampaignDetailService.getCampaignImageByCampaignDetailId(id).then(
      (response) => {
        setImageUrl(response.data);
      }
    );
    setShowImageModal(true);
  };

  const openConfirmDeleteModal = (id) => {
    setRowToBeDeleted(id);
    setShowModal(true);
  };

  const campaignDetailsColumns = [
    {
      dataField: "referenceTypeDescription",
      text: "Kanal Parametresi",
    },
    {
      dataField: "campaignLink",
      text: "Kampanya Linki",
    },
    {
      dataField: "createdDate",
      text: "Eklenme Tarihi",
      formatter: dateFormatWithHour,
    },
    {
      dataField: "fileName",
      text: "Dosya İsmi",
    },
    {
      dataField: "campaignId",
      text: "Kampanya ID",
    },
    {
      dataField: "action3",
      text: "Resmi Görüntüle",
      editable: false,
      formatter: showDetailImage,
      headerAlign: "center",
      style: { textAlign: "center" },
    },
    {
      dataField: "action1",
      text: "Güncelle",
      editable: false,
      formatter: goalUpdateFormatter,
      headerAlign: "center",
      style: { textAlign: "center" },
    },
    {
      dataField: "action2",
      text: "Sil",
      editable: false,
      formatter: goalDeleteFormatter,
      headerAlign: "center",
      style: { textAlign: "center" },
    },
  ];

  return (
    <div>
      <Row>
        <CampaignSaleChannelTypeSelect
          md={3}
          value={campaignDetail.referenceTypeId}
          onChange={onChange}
          error={errors.referenceTypeId}
          campaignTypeId={campaignTypeId}
        />
      </Row>
      <Row>
        <Input
          id={"campaignLink"}
          name={"campaignLink"}
          label={"Kampanya Linki"}
          md={3}
          value={
            campaignDetail.campaignLink
              ? campaignDetail.campaignLink
              : undefined
          }
          onChange={onChange}
          error={errors.campaignLink}
        />
      </Row>
      {showFileImport && (
        <Row>
          <FileImport
            id={"file"}
            text={"Dosya Yükle"}
            md={3}
            type={"file"}
            selectedFile={campaignDetail.selectedFile}
            onChange={onChange}
            accept={"image/jpeg"}
            error={errors.file}
          />
        </Row>
      )}
      <Row>
        <TextArea
          id={"campaignText"}
          name={"campaignText"}
          label={"Kampanya Metni"}
          md={4}
          value={
            campaignDetail.campaignText
              ? campaignDetail.campaignText
              : undefined
          }
          onChange={onChange}
          error={errors.campaignText}
          as="textarea"
          rows={2}
        />
        <Button md={3} onClick={saveOrUpdateCampaignDetail}>
          {" "}
          Ekle{" "}
        </Button>
      </Row>
      <Row>
        <Datatable
          data={campaignDetails ? campaignDetails : []}
          columns={campaignDetailsColumns}
          keyfield={"id"}
          hidePagination={true}
        />
        <span>
          {campaignDetails.length > 0 ? (
            <>Toplam {campaignDetails.length} kayıt gösterilmektedir. </>
          ) : (
            <>Kayıt bulunamadı.</>
          )}
        </span>
      </Row>
      <ConfirmModal
        show={showModal}
        setShow={setShowModal}
        title={"Uyarı"}
        bodyMessage={"Kampanya Metin ve Görsel Silinecektir!"}
        onOk={() => deleteCampaignDetail(rowToBeDeleted)}
      />
      <CampaignDetailImageModal
        show={showImageModal}
        setShow={setShowImageModal}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />
    </div>
  );
};

export default injectIntl(CampaignDetailView);
