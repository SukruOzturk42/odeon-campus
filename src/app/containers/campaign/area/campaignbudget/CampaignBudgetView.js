import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { Col, Row } from "react-bootstrap";
import Datatable from "../../../../components/base-component/Datatable";
import Button from "../../../../components/base-component/Button";
import CampaignBudgetDatePicker from "../../../../components/business-component/budget/CampaignBudgetDatePicker";
import CampaignBudgetItemSelect from "../../../../components/business-component/budget/CampaignBudgetItemSelect";
import { Input } from "../../../../components/base-component/Input";
import moment from "moment";
import DetailModal from "../../../../components/business-component/budget/BudgetDetailModal";
import { HistorySharp, ClearSharp, ArrowUpwardSharp } from "@material-ui/icons";
import { Tooltip, Fab } from "@material-ui/core";
import {dateFormatWithHour,dateFormat,currencyFormat} from "../../../../common/utils/Util";
import ConfirmModal from "../../../../components/base-component/ConfirmModal";

const CampaignBudgetView = (props) => {

  const { intl,
    activeSubMenu,
    saveCampaignBudget,
    campaignBudgetList,
    budgetItemOptions,
    onChange,
    campaignBudget,
    setCampaignBudget,
    clearCampaignBudget,
    deleteCampaignBudget,
    calculateTotalBudget,
    error,
  } = props;

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [budgetDetail, setBudgetDetail] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [rowToBeDeleted,setRowToBeDeleted] = useState(null)
  
  const budgetUpdateFormatter = (cell, row) => {
    return (
      <Tooltip title={"Güncelle"} placement={"top-start"}>
        <Fab
          size="small"
          color={"primary"}
          aria-label="History"
          onClick={() => setCampaignBudget(row)}
        >
          <ArrowUpwardSharp />
        </Fab>
      </Tooltip>
    );
  };

  const budgetDetailFormatter = (cell, row) => {
    return (
      <Tooltip title={"Detay"} placement={"top-start"}>
        <Fab
          size="small"
          color={"danger"}
          aria-label="History"
          onClick={() => showBudgetDetailList(row)}
        >
          <HistorySharp></HistorySharp>
        </Fab>
      </Tooltip>
    );
  };

  const deleteBudget = (cell, row) => {
    return (
      <Tooltip title={"Sil"} placement={"top-start"}>
        <Fab
          size="small"
          color="primary"
          aria-label="History"
          onClick={() => {
            openConfirmDeleteModal(row.id)
          }}
        >
          <ClearSharp />
        </Fab>
      </Tooltip>
    );
  };

  const openConfirmDeleteModal = (id) => {
    setRowToBeDeleted(id)
    setShowModal(true)
  }
  const showBudgetDetailList = (row) => {
    setShowDetailModal(true)
    setBudgetDetail(row.campaignBudgetDetail);

  }
  const BudgetListColumns = [
    {
      dataField: "createdAt",
      text: "Eklenme Tarihi",
      formatter: dateFormatWithHour,
      sort: true,
    },
    {
      dataField: "budgetDate",
      text: "Bütçe Tarihi",
      formatter: dateFormat
    },
    {
      dataField: "budgetItemType",
      text: "Bütçe kalemi",
    },
    {
      dataField: "budgetItemId",
      text: "Bütçe kalemi",
      hidden: true
    },
    {
      dataField: "campaignBudgetDetail",
      text: "Bütçe Detayları",
      hidden: true
    },
    {
      dataField: "campaignId",
      text: "kampanya id",
      hidden: true
    },
    {
      dataField: "budgetAmount",
      text: "Tutar",
      formatter:currencyFormat
    },
    {
      dataField: "campaignId",
      text: "Kampanya ID",
    },
    {
      dataField: "action1",
      text: "Güncelle",
      editable: false,
      formatter: budgetUpdateFormatter,
      headerAlign: 'center',
      style: { textAlign: 'center' }
    },
    {
      dataField: "action2",
      text: "Detay",
      editable: false,
      formatter: budgetDetailFormatter,
      headerAlign: 'center',
      style: { textAlign: 'center' }

    },
    {
      dataField: "action2",
      text: "Sil",
      editable: false,
      formatter: deleteBudget,
      headerAlign: 'center',
      style: { textAlign: 'center' }
    },
  ];

  const defaultSortedBy = [{
    dataField: "createdAt",
    order: "asc"  // or desc
  }];

  return <div>
    <Row>
      <Col md={12}>
        <Row>
          <Col md={6}>
            <CampaignBudgetDatePicker
              onChange={onChange}
              md={5}
              value={campaignBudget.budgetDate}
            />
            <CampaignBudgetItemSelect
              id={"budgetItemType"}
              onChange={onChange}
              md={5}
              options={budgetItemOptions}
              value={campaignBudget.budgetItemId}
              disabled={campaignBudget.id}
              error={error && error.budgetItemId}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Row>
              <Col md={3}>
                <Input
                  id={"budgetAmount"}
                  onChange={onChange}
                  md={11}
                  value={campaignBudget.budgetAmount}
                  label={"Bütçe tutarı"}
                  error={error && error.budgetAmount}
                  maxLength={9}
                  mode={"number"}
                />
              </Col>
              {campaignBudget.id &&
                <Col md={2}>
                  <Button
                    id="ClearBudgetFormButton"
                    name="ClearBudgetFormButton"
                    value={"Temizle"}
                    onClick={clearCampaignBudget}>
                    Temizle
                  </Button>
                </Col>}
              <Col md={2}>
                <Button
                  id="addBudgetButton"
                  name="addBudgetButton"
                  value={"Ekle"}
                  onClick={saveCampaignBudget}>
                  Ekle
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Datatable
          data={campaignBudgetList ? campaignBudgetList : []}
          columns={BudgetListColumns}
          keyField={"id"}
          hidePagination={true}
          defaultSorted={defaultSortedBy}
        />
        <span>{campaignBudgetList.length > 0 ? <>Toplam {campaignBudgetList.length} kayıt gösterilmektedir. </>:
            <>Kayıt bulunamadı.</>}</span>

        <span className={"float-right budget-total-amount"}>{campaignBudgetList.length > 0 ?
            <>Toplam Bütçe: {currencyFormat(calculateTotalBudget(campaignBudgetList))} TL </> :
            <>Toplam Bütçe: 0 TL </>}</span>
      </Col>
    </Row>
    <DetailModal show={showDetailModal} setShow={setShowDetailModal} data={budgetDetail}></DetailModal>
    <ConfirmModal
        show={showModal}
        setShow={setShowModal}
        title={"Uyarı"}
        bodyMessage={"Kampanya Bütçesi silinecektir!"}
        onOk={() =>deleteCampaignBudget(rowToBeDeleted)}
    />
  </div>;
};

export default injectIntl(CampaignBudgetView);
