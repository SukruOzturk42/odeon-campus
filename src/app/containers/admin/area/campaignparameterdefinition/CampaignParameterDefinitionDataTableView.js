import React from 'react'
import { Datatable } from "../../../../components/base-component/Datatable";
import { Row } from "react-bootstrap";
import { Tooltip, Fab } from "@material-ui/core";
import { textFilter } from "react-bootstrap-table2-filter";

export default function CampaignParameterDefinitionDataTableView(props) {

    const { campaignAttributes, removeCampaignAttribute } = props;

    const campaignParameterDefinitionColumns = [
        {
          dataField: "id",
          text: "ID",
          sort: true
        },
        {
          dataField: "name",
          text: "Parametre Adı",
          sort: true,
          filter: textFilter({ placeholder: ' ' })
        },
        {
          dataField: "description",
          text: "Parametre Açıklaması",
          sort: true,
          filter: textFilter({ placeholder: ' ' })
        },
        {
          dataField: "attributeType",
          text: "Parametre Tipi",
          sort: true,
          filter: textFilter({ placeholder: ' ' })
        },
        {
          dataField: "dataType",
          text: "Data Tipi",
          sort: true,
          filter: textFilter({ placeholder: ' ' })
        },
        {
          dataField: "order",
          text: "Sıra",
          sort: true,
          filter: textFilter({ placeholder: ' ' })
        },
        {
          dataField: "action1",
          text: "Sil",
          editable: false,
          formatter: removeCampaignAttribute,
        },
      ];

  return (
    <>
      <Row>
        <Datatable
          data={campaignAttributes ? campaignAttributes : []}
          columns={campaignParameterDefinitionColumns}
          keyfield={"id"}
          hidePagination={false}
          sizePerPage={15}
        />
      </Row>
    </>
  )
}
