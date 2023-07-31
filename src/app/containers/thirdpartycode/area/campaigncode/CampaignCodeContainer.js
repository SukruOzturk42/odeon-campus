import React, { useState, useEffect, useContext } from "react";
import CampaignCodeView from "./CampaignCodeView";
import { GlobalContext } from "../../../../context/GlobalState";
import CampaignCodeDatatableView from "./CampaignCodeDatatableView";
import Button from "../../../../components/base-component/Button";
import * as CampaignCodeService from "../../../../services/CampaignCodeService";
import { validate } from "./campaignCodeValidator";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";
import { Row, Col } from "react-bootstrap";
import { PageContentAreaDoubleButton } from "../../../../components/base-component/PageContentAreaDoubleButton";

export default function CampaignCodeContainer() {
  const { activeSubMenu, campaign } = useContext(GlobalContext);
  const initialState = { isPairedWithCustomers: false };
  const [campaignCode, setCampaignCode] = useState(initialState);
  const [campaignCodes, setCampaignCodes] = useState([]);
  const [campaignList, setCampaignList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedCodeType, setSelectedCodeType] = useState([{ name: "" }]);

  useEffect(() => {
    getCampaignCodes();
  }, []);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      getCampaignCodes();
    }, 1000 * 30);
    return () => clearInterval(refreshInterval);
  }, []);

  const onAreaChange = (event) => {
    const { id, value } = event;
    setCampaignCode((state) => ({ ...state, [id]: value }));
    setErrors((state) => ({ ...state, [id]: "" }));
  };

  const saveCampaignCode = () => {
    const error = validate(campaignCode, selectedCodeType);
    if (ObjectUtils.isEmptyObject(error)) {
      CampaignCodeService.saveOrUpdateCampaignCode(campaignCode).then(response => {
        response && response.data && setCampaignCode(response.data);
        setErrors({});
        setCampaignCode(initialState);
        alert("Kod Kümesi Başarıyla Kaydedildi.")
        getCampaignCodes();
      })
    } else {
      setErrors(error);
    }
  }

  const getCampaignCodes = () => {
    CampaignCodeService.getCampaignCodeByCampaignId(campaign.id).then(response => {
      response && response.data && setCampaignCodes(response.data.items);
    });
  };

  const getCampaignsByDiscountCodeInformationId = (discountCodeInformationId) => {
    CampaignCodeService.getCampaignsByDiscountCodeInformationId(discountCodeInformationId).then(response => {
      response && setCampaignList(response);
    })
  }

  const exportToExcel = (discountCodeInformation) => {
    CampaignCodeService.getExcelExportOfCodesByDiscountCodeInformation(discountCodeInformation.id).then(response => {
      try {
        if (response) {
          let blob = new Blob([response], { type: "application/vnd.ms-excel" });
          let url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", discountCodeInformation.codeGroupName + ".xlsx");
          document.body.appendChild(link);
          link.click();
        }
      }
      catch (e) {
        console.log(e);
      }
    });
  };

  const exportToTempExcel = () => {
    CampaignCodeService.getDiscountCodeTempExcel().then((response) => {
      try {
        if (response) {
          let blob = new Blob([response], { type: "application/vnd.ms-excel" })
          let url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "template-discount-code.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  const exportToThirdPartyTempExcel = () => {
    CampaignCodeService.getThirdPartyDiscountCodeTempExcel().then((response) => {
      try {
        if (response) {
          let blob = new Blob([response], { type: "application/vnd.ms-excel" })
          let url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "template-third-party-discount-code.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  return (
    <PageContentAreaDoubleButton
      buttonText={"Örnek Excel İndir"}
      buttonOnClick={exportToTempExcel}
      buttonTextSecond={"3.Parti Excel İndir"}
      buttonOnClickSecond={exportToThirdPartyTempExcel}
    >
      <div>
        <div>
          <CampaignCodeView
            onChange={onAreaChange}
            campaignCode={campaignCode}
            isDisabled={isDisabled}
            errors={errors}
            setSelectedCodeType={setSelectedCodeType}
            selectedCodeType={selectedCodeType}
          />
        </div>
        <div>
          <Row>
            <Col md={6}></Col>
            <Button
              md={3}
              onClick={() => {
                setIsDisabled(false);
                setCampaignCode(initialState);
              }}
            >
              Temizle
            </Button>
            <Button
              md={3}
              onClick={() => { saveCampaignCode() }}
            >
              Kaydet
            </Button>
          </Row>
        </div>
        <div>
          <CampaignCodeDatatableView
            campaignCodes={campaignCodes}
            setCampaignCode={setCampaignCode}
            setIsDisabled={setIsDisabled}
            exportToExcel={exportToExcel}
            getCampaignsByDiscountCodeInformationId={getCampaignsByDiscountCodeInformationId}
            campaignList={campaignList}
          />
        </div>
      </div>
    </PageContentAreaDoubleButton>
  )
}