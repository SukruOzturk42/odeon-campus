import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { GlobalContext } from "../../../../context/GlobalState";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";
import PolicySaleCodeUploadView from "./PolicySaleCodeUploadView";
import Button from "../../../../components/base-component/Button";
import * as PolicySaleGiftCodeService from "../../../../services/PolicySaleGiftCodeService";
import * as CodeUploadService from "../../../../services/CodeUploadService";
import { validate } from "./PolicySaleCodeUploadValidator";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";
import { SuccessModal } from "../../../../components/base-component/SuccessModal";
import PolicySaleCodeDatatableView from "./PolicySaleCodeDatatableView";
import { WarningModal } from "../../../../components/base-component/WarningModal";

export default function PolicySaleCodeUploadContainer() {
  const { activeSubMenu } = useContext(GlobalContext);
  const [codes, setCodes] = useState([]);
  const [errors, setErrors] = useState({});
  const [code, setCode] = useState({});
  const [campaignList, setCampaignList] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  useEffect(() => {
    getAllPolicySaleGiftCodeInformation();
  }, []);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      getAllPolicySaleGiftCodeInformation();
    }, 1000 * 30);
    return () => clearInterval(refreshInterval);
  }, []);

  /*const getCampaignsByGiftCodeInformationId = (giftCodeInformationId) => {
    CodeUploadService.getCampaignsByGiftCodeInformationId(giftCodeInformationId).then(response => {
      response && setCampaignList(response);
    })
  }*/

  const saveCode = () => {
    const error = validate(code, codes);
    if (ObjectUtils.isEmptyObject(error)) {
      PolicySaleGiftCodeService.savePolicySaleGiftCodeInformation(code).then(response => {
        setShowSuccessModal(true);
        getAllPolicySaleGiftCodeInformation();
      })
      setErrors({});
      setCode({});
    } else {
      setErrors(error);
      if(error.sameCode !== undefined) {
        setShowWarningModal(true);
      }
    }
  }

  const getAllPolicySaleGiftCodeInformation = () => {
    PolicySaleGiftCodeService.getPolicySaleGiftCodeInformations().then(response => {
      response && setCodes(response);
    })
  }

  const onAreaChange = (event) => {
    const { id, value } = event;
    setCode((state) => ({ ...state, [id]: value }));
    setErrors(ObjectUtils.removeKeyFromObject(errors, id));
  };

  const exportToTempExcel = () => {
    CodeUploadService.getGiftCodeTempExcel().then((response) => {
      try {
        if (response) {
          let blob = new Blob([response], { type: "application/vnd.ms-excel" })
          let url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "template-gift-code.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  return (
    <PageContentArea
      buttonText={"Örnek Excel İndir"}
      buttonOnClick={exportToTempExcel}
    >
      <div>
        <div>
          <PolicySaleCodeUploadView
            activeSubMenu={activeSubMenu}
            code={code}
            onChange={onAreaChange}
            setCode={setCode}
            errors={errors}
            saveCode={saveCode}
            showSuccessModal={showSuccessModal}
            setShowSuccessModal={setShowSuccessModal}
          />
        </div>
        <div>
          <Row>
            <Col md={6}></Col>
            <Button
              md={3}
              onClick={() => { setCode({}) }}
            >
              Temizle
            </Button>
            <Button
              md={3}
              onClick={() => { saveCode() }}
            >
              Kaydet
            </Button>
          </Row>
        </div>
        <div>
          <PolicySaleCodeDatatableView
            activeSubMenu={activeSubMenu}
            codes={codes}
            //getCampaignsByGiftCodeInformationId={getCampaignsByGiftCodeInformationId}
            campaignList={campaignList}
          />
        </div>
        <SuccessModal
          show={showSuccessModal}
          setShow={setShowSuccessModal}
        />
        <WarningModal
          show={showWarningModal}
          setShow={setShowWarningModal}
          body={"Aynı Fayda ve Şirket Bilgisi İle Sadece Bir Adet Kod Kümesi Kaydedilebilir."}
        />
      </div>
    </PageContentArea>
  );
}