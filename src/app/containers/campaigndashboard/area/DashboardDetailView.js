import React, { useState, useEffect, useContext } from "react";
import { getSaleCampaignInformation } from "../../../services/campaignService";
import { GlobalContext } from "../../../context/GlobalState";
import { PageContentArea } from "../../../components/base-component/PageContentArea";
import { Col, Row } from "react-bootstrap";
import Datatable from "../../../components/base-component/Datatable";
import Button from "../../../components/base-component/Button";
import { dateFormatWithHour } from "../../../common/utils/Util";
import DeliveryTypeSelect from "../../../components/business-component/rewarddashboard/DeliveryTypeSelect";
import Select from "../../../components/base-component/Select";
import { textFilter, selectFilter } from "react-bootstrap-table2-filter";
import ReferenceDataService from "../../../services/ReferenceDataService";

import DashBoardDetailFilter from "../../../components/business-component/rewarddashboard/DashBoardDetailFilter";

export default function DashBoardDetailView(props) {
  const {
    rewards,
    totalPage,
    setTotalPage,
    setRewards,
    onChange,
    filterObject,
    handleStartGift,
    handleStoptGift,
    handleResendGift,
  } = props;
  const { activeSubMenu } = useContext(GlobalContext);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [campaignVersions, setCampaignVersions] = useState([]);

  useEffect(() => {
    ReferenceDataService.getCampaignVersions(activeSubMenu.campaignId)
      .then((response) => {
        if (response.data) {
          const versions = response.data.items.map((item) => {
            return { label: item.version + "", value: item.version };
          });
          setCampaignVersions(versions);
        }
      })
      .catch((error) => {});
  }, []);

  const campaignListColumns = [
    {
      dataField: "contactNumber",
      text: "Müşteri no",
      sort: true,
      filter: textFilter({ placeholder: " " }),
    },
    {
      dataField: "version",
      text: "Kampanya Versiyonu",
      sort: true,
      headerStyle: () => {
        return { width: "100px" };
      },
      formatter: (cell) =>
        campaignVersions.find((opt) => opt.value === cell)
          ? campaignVersions.find((opt) => opt.value === cell).label
          : "",
      filter: selectFilter({
        options: campaignVersions,
      }),
    },
    {
      dataField: "ruleGroupName",
      text: "Koşul Adı",
      sort: true,
    },
    {
      dataField: "discount",
      text: "Kampanya İndirimi",
      sort: true,
    },
    {
      dataField: "rewardGiftName",
      text: "Hediye Çeki İsmi",
      sort: true,
    },
    {
      dataField: "giftCode",
      text: "Hediye Kodu",
      sort: true,
      filter: textFilter({ placeholder: " " }),
    },
    {
      dataField: "discountCode",
      text: "İndirim Kodu",
      sort: true,
    },
    {
      dataField: "createDate",
      text: "Katılma Tarihi",
      formatter: dateFormatWithHour,
      sort: true,
    },
    {
      dataField: "rewardOwnerContactNo",
      text: "Ödül Sahibi",
      sort: true,
    },
    {
      dataField: "deliveryDate",
      text: "Hediye Çeki Gönderim Tarihi",
      formatter: dateFormatWithHour,
      sort: true,
    },
    {
      dataField: "deliverySendMethodType",
      text: "Gönderim Yöntemi",
      sort: true,
    },
    {
      dataField: "deliveryStatus",
      text: "Gönderim Durumu",
      sort: true,
    },
    {
      dataField: "notificationDeliveryDescription",
      text: "Gönderim Açıklaması",
      sort: true,
    },
    {
      dataField: "policyNumber",
      text: "Poliçe no",
      sort: true,
      filter: textFilter({ placeholder: " " }),
    },
    {
      dataField: "proposalNumber",
      text: "Teklif Numarası",
      filter: textFilter({ placeholder: " " }),
      sort: true,
    },
  ];

  return (
    <div>
      <PageContentArea showHeader={false}>
        {props.campaignSummary !== null && (
          <div className={"reward-detail-card"}>
            <Row>
              <Col md={12} className={"reward-detail-column"}>
                <span>Kampanya Id : </span>{" "}
                <span className={"reward-information"}>
                  {props.campaignSummary.campaignId}
                </span>
              </Col>
            </Row>
            <Row>
              <Col md={12} className={"reward-detail-column"}>
                <span>Kampanya Adı :</span>{" "}
                <span className={"reward-information"}>
                  {props.campaignSummary.campaignName}
                </span>
              </Col>
            </Row>
            <Row>
              <Col md={6} className={"reward-detail-column"}>
                <span>Toplam Teklif Sayısı :</span>{" "}
                <span className={"reward-information"}>
                  {props.campaignSummary.totalProposalCount}
                </span>
              </Col>
            </Row>
            <Row>
              <Col
                md={12}
                className={"reward-detail-column reward-detail-bottom"}
              >
                <span> Toplam Satış Sayısı :</span>{" "}
                <span className={"reward-information"}>
                  {props.campaignSummary.totalSaleCount}
                </span>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 8 }}>
                {props.campaignSummary.isStartedRewardSend ? (
                  <>
                    <Button
                      disabled={
                        props.campaignSummary.isTriggeredRewardSend
                          ? props.campaignSummary.isTriggeredRewardSend
                          : false
                      }
                      onClick={handleResendGift}
                    >
                      Tetikle
                    </Button>

                    <Button onClick={handleStoptGift}>
                      Hediye Gonderimi Durdur
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleStartGift}>
                    Hediye Gonderimi Başlat
                  </Button>
                )}
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <Select
                  id="requestType"
                  name="requestType"
                  label={"Kayıt Tipi"}
                  onChange={onChange}
                  options={[
                    { value: "POLICY", label: "Satış" },
                    { value: "PROPOSAL", label: "Teklif" },
                  ]}
                  value={filterObject.requestType}
                  isClearable={false}
                />
              </Col>
              <Col md={3}>
                <DeliveryTypeSelect
                  onChange={onChange}
                  filterObject={filterObject}
                />
              </Col>
            </Row>
          </div>
        )}
        <Row>
          <Col md={12}>
            <Row>
              {rewards && rewards.items && rewards.items.length > 0 && (
                <Datatable
                  data={rewards.items}
                  columns={campaignListColumns}
                  keyField={"campaignId"}
                  hidePagination={false}
                  sizePerPage={sizePerPage}
                />
              )}
              <span>
                {rewards && rewards.items && rewards.items.length > 0 ? (
                  <>Toplam {rewards.items.length} kayıt gösterilmektedir. </>
                ) : (
                  <>Kayıt bulunamadı.</>
                )}
              </span>
            </Row>
          </Col>
        </Row>
      </PageContentArea>
    </div>
  );
}
