import React, { useState, useEffect, useContext } from "react";
import {
  getSaleCampaignInformation,
  getSaleCampaignSummary,
  getAllSaleCampaignInformation,
} from "../../../services/campaignService";
import {
  startResendGift,
  startSenddGift,
  stopSenddGift,
} from "../../../services/rewardService";
import { GlobalContext } from "../../../context/GlobalState";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import DashBoardDetailView from "./DashboardDetailView";
import ConfirmModal from "../../../components/base-component/ConfirmModal";
import { SuccessModal } from "../../../components/base-component/SuccessModal";

export default function DashBoardDetailContainer() {
  const { activeSubMenu } = useContext(GlobalContext);
  const [rewards, setRewards] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [campaignSummary, setCampaignSummary] = useState(null);
  const [showStopWarningModal, setStopWarningShowModal] = useState(false);
  const [showStartWarningModal, setStartWarningShowModal] = useState(false);
  const [showRestartWarningModal, setRestartWarningShowModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filterObject, setFilterObject] = useState({
    campaignId: activeSubMenu.campaignId,
    deliveryType: "",
    requestType: "POLICY",
  });
  useEffect(() => {
    getAllSaleInformation();
  }, []);

  useEffect(() => {
    getAllSaleInformation();
  }, [filterObject]);

  const getAllSaleInformation = () => {
    getAllSaleCampaignInformation(filterObject)
      .then((response) => {
        response && response.data && setRewards(response.data);
      })
      .then(() => {
        getSaleCampaignSummary(activeSubMenu.campaignId).then((response) => {
          response && response.data && setCampaignSummary(response.data);
        });
      });
  };

  const handleStartGift = () => {
    startSenddGift(campaignSummary.campaignId).then((response) => {
      response &&
        response.data &&
        setCampaignSummary((prevState) => ({
          ...prevState,
          ["isStartedRewardSend"]: !prevState.isStartedRewardSend,
        }));
      setShowModal(true);
    });
  };

  const handleStoptGift = () => {
    stopSenddGift(campaignSummary.campaignId).then((response) => {
      response &&
        response.data &&
        setCampaignSummary((prevState) => ({
          ...prevState,
          ["isStartedRewardSend"]: !prevState.isStartedRewardSend,
        }));
      setShowModal(true);
    });
  };

  const handleResendGift = () => {
    startResendGift(campaignSummary.campaignId).then((response) => {
      response &&
        response.data &&
        setCampaignSummary((prevState) => ({
          ...prevState,
          ["isTriggeredRewardSend"]: true,
        }));
      setShowModal(true);
    });
  };

  const onAreaChange = (event) => {
    const { id, value, label } = event;
    if (id === "deliveryType") {
      setFilterObject({ ...filterObject, deliveryType: value });
    } else if (id === "requestType") {
      setFilterObject({ ...filterObject, requestType: value });
    }
  };

  return (
    <>
      <DashBoardDetailView
        rewards={rewards}
        setTotalPage={setTotalPage}
        totalPage={totalPage}
        setRewards={setRewards}
        campaignSummary={campaignSummary}
        onChange={onAreaChange}
        filterObject={filterObject}
        handleStartGift={() => setStartWarningShowModal(true)}
        handleStoptGift={() => setStopWarningShowModal(true)}
        handleResendGift={() => setRestartWarningShowModal(true)}
      ></DashBoardDetailView>
      <ConfirmModal
        show={showStartWarningModal}
        setShow={setStartWarningShowModal}
        title={"Onay"}
        bodyMessage={
          "Ödül Gonderim Başlatılacaktır. Devam etmek istediğinize emin misiniz?"
        }
        onOk={() => {
          handleStartGift();
        }}
      />
      <ConfirmModal
        show={showStopWarningModal}
        setShow={setStopWarningShowModal}
        title={"Onay"}
        bodyMessage={
          "Ödül Gonderim Durdurulacaktır. Devam etmek istediğinize emin misiniz?"
        }
        onOk={() => {
          handleStoptGift();
        }}
      />
      <ConfirmModal
        show={showRestartWarningModal}
        setShow={setRestartWarningShowModal}
        title={"Onay"}
        bodyMessage={
          "Ödül Gonderim Tarkrardan Başlatılacaktır. Devam etmek istediğinize emin misiniz?"
        }
        onOk={() => {
          handleResendGift();
        }}
      />
      <SuccessModal
        show={showModal}
        setShow={setShowModal}
        onOk={() => {
          setShowModal(false);
        }}
      ></SuccessModal>
    </>
  );
}
