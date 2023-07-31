import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { Datatable } from "../../../../components/base-component/Datatable";
import Select from "../../../../components/base-component/Select";
import Button from "../../../../components/base-component/Button";
import { Input } from "../../../../components/base-component/Input";
import CampaignGoalTypeSelect from "../../../../components/business-component/CampaignGoalTypeSelect";
import CampaignSaleChannelTypeSelect from "../../../../components/business-component/CampaignSaleChannelTypeSelect";
import CampaignPolicyTypeSelect from "../../../../components/business-component/CampaignPolicyTypeSelect";
import { Tooltip, Fab } from "@material-ui/core";
import { ClearSharp, ArrowUpwardSharp } from "@material-ui/icons";
import { currencyFormat } from "../../../../common/utils/Util";
import ConfirmModal from "../../../../components/base-component/ConfirmModal";

const CampaignGoalView = (props) => {
  const {
    intl,
    activeSubMenu,
    onChange,
    errors,
    campaignGoal,
    setCampaignGoal,
    campaignGoals,
    saveOrUpdateCampaignGoal,
    deleteCampaignGoal,
    goalTypeDisabled,
    setGoalTypeDisabled,
    saleOrPolicyDisabled,
    setSaleOrPolicyDisabled,
    clearCampaignGoal,
    selectedGoalType,
    setSelectedGoalType,
    campaignTypeId,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [rowToBeDeleted, setRowToBeDeleted] = useState(null);

  const goalUpdateFormatter = (cell, row) => {
    return (
      <Tooltip title={"Güncelle"} placement={"top-start"}>
        <Fab
          size="small"
          color={"primary"}
          aria-label="History"
          onClick={() => {
            setCampaignGoal(row);
            setSelectedGoalType({
              id: row.goalTypeId,
              name: row.goalTypeName,
              description: row.goalType,
            });
            setGoalTypeDisabled(true);
            setSaleOrPolicyDisabled(true);
          }}
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

  const openConfirmDeleteModal = (id) => {
    setRowToBeDeleted(id);
    setShowModal(true);
  };
  const defaultSortedBy = [
    {
      dataField: "updatedAt",
      order: "desc", // or desc
    },
  ];

  const campaignGoalsColumns = [
    {
      dataField: "goalType",
      text: "Hedef Tipi",
    },
    {
      dataField: "referenceTypeDescription",
      text: "Hedef Degeri",
    },
    {
      dataField: "amountGoal",
      text: "Hedef Tutar",
      formatter: currencyFormat,
    },
    {
      dataField: "policyGoal",
      text: "Hedef Poliçe",
    },
    {
      dataField: "insuredGoal",
      text: "Hedef Sigortalı",
      hidden: true,
    },
    {
      dataField: "campaignId",
      text: "Kampanya ID",
    },
    {
      dataField: "updatedAt",
      text: "güncelleme tarihi",
      sort: true,
      hidden: true,
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
        <CampaignGoalTypeSelect
          md={3}
          value={campaignGoal.goalTypeId}
          onChange={onChange}
          error={errors.goalTypeId}
          setSelectedGoalType={setSelectedGoalType}
          disabled={goalTypeDisabled}
        />
      </Row>
      {selectedGoalType &&
        {
          salesChannel: (
            <Row>
              <CampaignSaleChannelTypeSelect
                md={3}
                value={campaignGoal.referenceTypeId}
                onChange={onChange}
                error={errors.referenceTypeId}
                disabled={saleOrPolicyDisabled}
                campaignTypeId={campaignTypeId}
              />
            </Row>
          ),
          policyCode: (
            <Row>
              <CampaignPolicyTypeSelect
                md={3}
                value={campaignGoal.referenceTypeId}
                onChange={onChange}
                error={errors.referenceTypeId}
                disabled={saleOrPolicyDisabled}
                campaignTypeId={campaignTypeId}
              />
            </Row>
          ),
        }[selectedGoalType.name]}
      <Row>
        <Input
          id={"amountGoal"}
          name={"amountGoal"}
          label={"Hedef Tutar"}
          md={3}
          mode={"number"}
          value={campaignGoal.amountGoal ? campaignGoal.amountGoal : undefined}
          onChange={onChange}
        />
      </Row>
      <Row>
        <Input
          id={"policyGoal"}
          name={"policyGoal"}
          label={"Hedef Poliçe"}
          md={3}
          mode={"number"}
          value={campaignGoal.policyGoal ? campaignGoal.policyGoal : undefined}
          onChange={onChange}
        />
      </Row>
      <Row>
        <Input
          id={"insuredGoal"}
          name={"insuredGoal"}
          label={"Hedef Sigortalı"}
          md={3}
          mode={"number"}
          value={
            campaignGoal.insuredGoal ? campaignGoal.insuredGoal : undefined
          }
          onChange={onChange}
        />
        <Button md={3} onClick={saveOrUpdateCampaignGoal}>
          {" "}
          Ekle{" "}
        </Button>
        <Button md={3} onClick={clearCampaignGoal}>
          {" "}
          Temizle{" "}
        </Button>
      </Row>
      <Row>
        <Datatable
          data={campaignGoals ? campaignGoals : []}
          columns={campaignGoalsColumns}
          keyfield={"id"}
          hidePagination={true}
          defaultSorted={defaultSortedBy}
        />
        <span>
          {campaignGoals.length > 0 ? (
            <>Toplam {campaignGoals.length} kayıt gösterilmektedir. </>
          ) : (
            <>Kayıt bulunamadı.</>
          )}
        </span>
      </Row>
      <ConfirmModal
        show={showModal}
        setShow={setShowModal}
        title={"Uyarı"}
        bodyMessage={"Kampanya Bütçesi silinecektir!"}
        onOk={() => deleteCampaignGoal(rowToBeDeleted)}
      />
    </div>
  );
};

export default injectIntl(CampaignGoalView);
