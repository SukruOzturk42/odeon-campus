import React, { useContext, useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Input } from "../../../../components/base-component/Input";
import GiftTicketNameSelect from "../../../../components/business-component/policysale/GiftTicketNameSelect";
import PolicySaleRewardSendMethodTypeSelect
  from "../../../../components/business-component/policysale/PolicySaleRewardSendMethodTypeSelect";
import { currencyFormat, dateFormat, dateFormatWithHour } from "../../../../common/utils/Util";
import { Fab, Tooltip } from "@material-ui/core";
import { HistorySharp, VisibilitySharp, RssFeedSharp } from "@material-ui/icons";
import Datatable from "../../../../components/base-component/Datatable";
import FileImport from "../../../../components/business-component/FileImport";
import Button from "../../../../components/base-component/Button";
import PolicySaleRewardGiftTicketSelect
  from "../../../../components/business-component/policysale/PolicySaleRewardGiftTicketSelect";

export default function CustomerView(props) {
  const { policySaleRewardCampaigns,
    policySaleRewardCampaign,
    setPolicySaleRewardCampaign,
    savePolicySaleRewardCampaign,
    setActiveSubMenu,
    errors,
    onChange } = props;

  const saleRewardCampaignFormatter = (cell, row) => {
    return (
      <Tooltip title={"Görüntüle"} placement={"top-start"}>
        <Fab
          size={"small"}
          color={"primary"}
          onClick={() => {
            console.log(row)
            setActiveSubMenu({
              title: "Kampanya Detayı",
              component: "test",
              name: "Kampanya Detayı",
              menuRoute: "campaigns-sub-menu-policy-sale-reward-customer-detail",
              campaignId: row.id,
            })
          }}
        >
          <VisibilitySharp />
        </Fab>
      </Tooltip>
    );
  };
  const Switch = props => {
    const { test, children } = props
    return children.find(child => {
      return child.props.value === test
    })
  }
  const defaultSortedBy = [{
    dataField: "createDate",
    order: "desc"
  }];
  const distributeCodeToCustomers = (cell, row) => {
    return (
      <Switch test={row.totalCustomer - row.unassignedCustomerCount > 0}>
        <div value={true}>
          <Tooltip title={"Kod Dağıtma"} placement={"top-start"}>
            <Fab
              size={"small"}
              color={"primary"}
              onClick={() => {
                props.distributeCodeToCustomer(row.id)
              }
              }
            >
              <RssFeedSharp />
            </Fab>
          </Tooltip>
        </div>
        <div value={false}></div>
      </Switch>)

  };

  const SaleRewardCampaignColumns = [
    {
      dataField: "id",
      text: "Kampanya id",
      hidden: true,
    },
    {
      dataField: "customerFileName",
      text: "Müşteri Listesi",
      sort: true,
    },
    {
      dataField: "campaignName",
      text: "Kampanya Adı",
    },
    {
      dataField: "policySaleGiftCodeInformation",
      text: "Hediye Çeki ismi",
    },
    {
      dataField: "rewardGiftSendMethodType",
      text: "Gönderim Yöntemi",
    },
    {
      dataField: "createDate",
      text: "Oluşturma Tarihi",
      hidden: true,
    },

    {
      dataField: "totalCustomer",
      text: "Toplam Müşteri Sayısı",
    },
    {
      dataField: "unassignedCustomerCount",
      text: "Kodsuz Müşteri Sayısı",
    },
    {
      dataField: "action2",
      text: "Detay",
      editable: false,
      formatter: saleRewardCampaignFormatter,
      headerAlign: 'center',
      style: { textAlign: 'center' }
    },
    {
      dataField: "action2",
      text: "Kod Dağıtma",
      editable: false,
      formatter: distributeCodeToCustomers,
      headerAlign: 'center',
      style: { textAlign: 'center' }
    },

  ];

  return (
    <div>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={4}>
              <Input
                id="campaignName"
                name="campaignName"
                onChange={onChange}
                error={errors.campaignName}
                value={policySaleRewardCampaign.campaignName}
                label={"Kampanya adı"} />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <GiftTicketNameSelect
                onChange={onChange}
                error={errors.policySaleGiftCodeInformationId}
                value={policySaleRewardCampaign.policySaleGiftCodeInformationId}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <PolicySaleRewardSendMethodTypeSelect
                onChange={onChange}
                error={errors.giftSendMethodTypeId}
                value={policySaleRewardCampaign.giftSendMethodTypeId}
              />
            </Col>
          </Row>
          {policySaleRewardCampaign.policySaleGiftCodeInformationId && policySaleRewardCampaign.campaignName &&
            policySaleRewardCampaign.giftSendMethodTypeId &&
            <Row>
              <FileImport
                id={"campaignFile"}
                text={"Dosya Yükle"}
                md={3}
                type={"file"}
                error={errors.campaignFile}
                onChange={onChange}
              />
            </Row>
          }

          <Row>
            <Col md={6}></Col>
            <Button
              md={3}
              onClick={() => { setPolicySaleRewardCampaign({}) }}
            >
              Temizle
            </Button>
            <Button
              md={3}
              onClick={() => { savePolicySaleRewardCampaign() }}
            >
              Kaydet
            </Button>
          </Row>
        </Col>
      </Row>
      <Datatable
        data={policySaleRewardCampaigns}
        columns={SaleRewardCampaignColumns}
        keyField={"id"}
        defaultSorted={defaultSortedBy}
        hidePagination={true}
      />
    </div>
  );
}
