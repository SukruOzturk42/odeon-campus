import React, { useState, useEffect, useContext } from "react";
import {GlobalContext} from "../../../../context/GlobalState";
import {PageContentArea} from "../../../../components/base-component/PageContentArea";
import {Col, Row} from "react-bootstrap";
import Datatable from "../../../../components/base-component/Datatable";


export default function PolicySaleCampaignCustomerDetailView(props) {
    const {
        policySaleRewardCampaigns,
        campaignDetail
    } = props;
    const { activeSubMenu } = useContext(GlobalContext);


    const defaultSortedBy = [{
        dataField: "createDate",
        order: "desc"  // or desc
    }];
    const campaignListColumns = [

        {
            dataField: "customerNo",
            text: "Müşteri numarası",
            sort: true,
        },
        {
            dataField: "policySaleGiftCode",
            text: "Hediye kodu",
            sort: true,
        },
        {
            dataField: "giftCodeSendDate",
            text: "Gönderim Tarihi",
            sort: true,
        },
        {
            dataField: "policySaleGiftCodeSendStatus",
            text: "Gönderim Durumu",
            sort: true,
        },
    ];



    return (
        <div>
            <PageContentArea showHeader={false}>
                {campaignDetail!== null &&
                 <div className={"reward-detail-card"}>
                    <Row>
                        <Col md={12} className={"reward-detail-column reward-detail-bottom "}>
                            <span>Kampanya Id : </span> <span className={"reward-information"}>{campaignDetail.campaignName}</span>
                        </Col>
                    </Row>
                 </div>
                }
                <Row>
                    <Col md={12}>
                        <Row>
                                <Datatable
                                    data={policySaleRewardCampaigns}
                                    columns={campaignListColumns}
                                    keyField={"campaignId"}
                                    hidePagination={false}
                                />
                        </Row>
                    </Col>
                </Row>
            </PageContentArea>
        </div>
    );
}
