import React, { useEffect, useState } from "react";
import Datatable from "../../../../components/base-component/Datatable";
import { Row, Col, Container } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { Fab, Tooltip } from "@material-ui/core";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";
import CampaignTypeSelect from "../../../../components/business-component/CampaignTypeSelect";
import Button from "../../../../components/base-component/Button";
import CampaignSearchStatusTypeSelect from "../../../../components/business-component/CampaignSearchStatusTypeSelect";
import { textFilter } from "react-bootstrap-table2-filter";
import CampaignListRuleGroupNameListModal from "../../../../components/business-component/CampaignListRuleGroupNameListModal";
import { VisibilitySharp, TocSharp } from "@material-ui/icons";

const CampaignListView = (props) => {
  const {
    intl,
    activeSubMenu,
    selectedCriteria,
    campaigns,
    onAreaChange,
    exportCampaign,
    getRuleGroupNamesByCampaignId,
    ruleGroupNames,
  } = props;
  const history = useHistory();
  const [show, setShow] = useState(false);

  const campaignUpdateFormatter = (cell, row) => {
    return (
      <Tooltip title={"Görüntüle"} placement={"top-start"} >
        <Fab
          size={"small"}
          color={"primary"}
          onClick={() => {
            history.push({
              pathname: "/cm-campaign",
              state: { customerCampaignId: row.campaignId },
            });
          }}
        >
          <VisibilitySharp />
        </Fab>
      </Tooltip>
    );
  };

  const campaignRuleGroupsFormatter = (cell, row) => {
    return (
      <Tooltip title={"Koşullar"} placement={"top-start"} >
        <Fab
          size={"small"}
          color={"primary"}
          onClick={() => {
            setShow(true);
            getRuleGroupNamesByCampaignId(row.campaignId);
          }}
        >
          <TocSharp />
        </Fab>
      </Tooltip>
    )
  }

  const campaignListColumns = [
    {
      dataField: "campaignId",
      text: "Kampanya Id",
      filter: textFilter({ placeholder: ' ' }),
      sort: true,
    },
    {
      dataField: "version",
      text: "Kampanya Versiyonu",
      sort: true,
      headerStyle: () => {
        return { width: "100px" };
      },
    },
    {
      dataField: "campaignName",
      text: "Kampanya Adı",
      sort: true,
      filter: textFilter({ placeholder: ' ' }),
    },
    {
      dataField: "campaignGroupName",
      text: "Kampanya Grubu",
      sort: true,
    },
    {
      dataField: "campaignTypeName",
      text: "Kampanya Tipi",
      sort: true,
    },
    {
      dataField: "campaignStatusName",
      text: "Kampanya Durumu",
      sort: true,
    },
    {
      dataField: "campaignStartDate",
      text: "Başlangıç Tarihi",
      sort: true,
    },

    {
      dataField: "campaignEndDate",
      text: "Bitiş Tarihi",
      sort: true,
    },
    {
      dataField: "createDate",
      text: "Oluşturulma Tarihi",
      sort: true,
    },
    {
      dataField: "action2",
      text: "Koşullar",
      editable: false,
      formatter: campaignRuleGroupsFormatter,
      headerAlign: "center",
      style: { textAlign: "center" },
    },
    {
      dataField: "action",
      text: "Detay Görüntüle",
      editable: false,
      formatter: campaignUpdateFormatter,
      headerAlign: "center",
      style: { textAlign: "center" },
    },
  ];

  return (
    <div>
      <PageContentArea title={"Kampanya Listeleme"}>
        <Row>
          <Col md={12}>
            <Row>
              <Col md={4}>
                <CampaignSearchStatusTypeSelect
                  onAreaChange={onAreaChange}
                  value={selectedCriteria.campaignSearchStatusEnum}
                />
              </Col>
              <Col md={4}>
                <CampaignTypeSelect
                  onChange={onAreaChange}
                  value={selectedCriteria.campaignTypeId}
                />
              </Col>
              <Col md={2} >
              </Col>
              <Col md={2} >
                <Button
                  id="exportCampaign"
                  name="exportCampaign"
                  md={12}
                  label={"Dışa Aktar"}
                  onClick={exportCampaign}
                  text={"Dışa Aktar"}></Button>
              </Col>
            </Row>
            <Row>
              {campaigns && campaigns.length > 0 && (
                <Datatable
                  data={campaigns}
                  columns={campaignListColumns}
                  keyField={"campaignId"}
                  hidePagination={false}
                  sizePerPage={15}
                />
              )}
              <span>{campaigns.length > 0 ? <>Toplam {campaigns.length} kayıt gösterilmektedir. </> :
                <>Kayıt bulunamadı.</>}</span>
            </Row>
          </Col>
        </Row>
      </PageContentArea>
      <CampaignListRuleGroupNameListModal
        show={show}
        setShow={setShow}
        data={ruleGroupNames}
      />
    </div>
  );
};

export default injectIntl(CampaignListView);
