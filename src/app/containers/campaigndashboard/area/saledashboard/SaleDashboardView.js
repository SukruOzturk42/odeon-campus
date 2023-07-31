import React, { useContext, useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Datatable from "../../../../components/base-component/Datatable";
import { Row, Col, Container } from "react-bootstrap";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";
import Button from "../../../../components/base-component/Button";
import { textFilter } from "react-bootstrap-table2-filter";
import { GlobalContext } from "../../../../context/GlobalState";
import { dateFormatWithHour } from "../../../../common/utils/Util";
import LineChart from "../../../../components/business-component/charts/LineChart";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import * as CampaignService from "../../../../services/campaignService";
import { getSaleCampaignInformation } from "../../../../services/campaignService";
import { Fab, Tooltip } from "@material-ui/core";
import { VisibilitySharp } from "@material-ui/icons";

const SaleDashboardView = (props) => {
  const { campaigns } = props;
  const { setActiveSubMenu } = useContext(GlobalContext);

  const campaignDetailFormatter = (cell, row) => {
    return (
      <Tooltip title={"Görüntüle"} placement={"top-start"}>
        <Fab
          size={"small"}
          color={"primary"}
          onClick={() => {
            setActiveSubMenu({
              title: "Ödül Detayı",
              component: "test",
              name: "Ödül Detayı",
              menuRoute: "cm-sub-menu-reward-detail",
              campaignId: row.campaignId,
              campaignVersion: null,
            });
          }}
        >
          <VisibilitySharp />
        </Fab>
      </Tooltip>
    );
  };

  const campaignSendOperationStatusFormatter = (cell, row) => {
    return row.isStartedRewardSend ? (
      <Tooltip title={"Gönderim Aktif"} placement={"top-start"}>
        <Fab size={"small"} color={"primary"}>
          <VisibilitySharp />
        </Fab>
      </Tooltip>
    ) : (
      <Tooltip title={"Gönderim Kapalı"} placement={"top-start"}>
        <Fab size={"small"} color={"danger"}>
          <VisibilitySharp />
        </Fab>
      </Tooltip>
    );
  };

  const campaignListColumns = [
    {
      dataField: "campaignId",
      text: "Kampanya Id",
      filter: textFilter({ placeholder: " " }),
      sort: true,
    },
    {
      dataField: "campaignName",
      text: "Kampanya Adı",
      sort: true,
      filter: textFilter({ placeholder: " " }),
    },
    {
      dataField: "campaignStartDate",
      text: "Başlangıç Tarihi",
      sort: true,
      formatter: dateFormatWithHour,
    },
    {
      dataField: "campaignEndDate",
      text: "Bitiş Tarihi",
      sort: true,
      formatter: dateFormatWithHour,
    },
    {
      dataField: "createDate",
      text: "Oluşturulma Tarihi",
      formatter: dateFormatWithHour,
      sort: true,
    },
    {
      dataField: "action",
      text: "Ödül Gönderim Durumu",
      editable: false,
      formatter: campaignSendOperationStatusFormatter,
      headerAlign: "center",
      style: { textAlign: "center" },
    },
    {
      dataField: "action",
      text: "Detay Görüntüle",
      editable: false,
      formatter: campaignDetailFormatter,
      headerAlign: "center",
      style: { textAlign: "center" },
    },
  ];

  return (
    <div>
      <PageContentArea>
        <Row>
          <Col md={12}>
            <Row>
              {campaigns && (
                <Datatable
                  data={campaigns}
                  columns={campaignListColumns}
                  keyField={"campaignId"}
                  hidePagination={false}
                  sizePerPage={15}
                />
              )}
              <span>
                {campaigns && campaigns.length > 0 ? (
                  <>Toplam {campaigns.length} kayıt gösterilmektedir. </>
                ) : (
                  <>Kayıt bulunamadı.</>
                )}
              </span>
            </Row>
            {/*<Row>*/}
            {/*    <LineChart />*/}
            {/*</Row>*/}
          </Col>
        </Row>
      </PageContentArea>
    </div>
  );
};

export default injectIntl(SaleDashboardView);
