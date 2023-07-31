import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";
import { Row, Col } from "react-bootstrap";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";
import CodesView from "./CodesView";
import * as CampaignCodeService from "../../../../services/CampaignCodeService";
import * as CodeUploadService from "../../../../services/CodeUploadService";

export default function CodesContainer() {
  const { activeSubMenu, campaign } = useContext(GlobalContext);
  const [codeType, setCodeType] = useState();
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    if (codeType === 1) {
      CampaignCodeService.getAllDiscountCodes().then(response => {
        response && response.data && setCodes(response.data.items);
      })
    } else if (codeType === 2) {
      CodeUploadService.getAllGiftCodes().then(response => {
        response && response.data && setCodes(response.data.items);
      })
    }
  }, [codeType]);

  return (
    <PageContentArea>
      <CodesView
        codes={codes}
        codeType={codeType}
        setCodeType={setCodeType}
      />
    </PageContentArea>
  )
}