import React, { useState, useContext } from "react";
import { Datatable } from "../../../../components/base-component/Datatable";
import { Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { Tooltip, Fab } from "@material-ui/core";
import { ArrowUpwardSharp, HistorySharp, UpdateSharp } from "@material-ui/icons";
import { GlobalContext } from "../../../../context/GlobalState";
import { VisibilitySharp } from "@material-ui/icons";
import { textFilter } from "react-bootstrap-table2-filter";

const ParameterDefinitionDatatableView = (props) => {
  const { intl, activeSubMenu, attributes, removeAttributeButton, editParameter } = props;

  const { setActiveSubMenu } = useContext(GlobalContext);

  const saleCampaignDetailFormatter = (cell, row) => {
    return (
      <Tooltip title={"Görüntüle"} placement={"top-start"}>
        <Fab
          style={{
            backgroundColor: 'cornflowerblue',
          }}
          size={"small"}
          color={"primary"}
          onClick={() => {
            setActiveSubMenu({
              title: "Parametre Detayı",
              component: "test",
              name: "Parametre Detayı",
              menuRoute: "admin-sub-menu-paramater-detail",
              parameterId: row.id,
              parameterName: row.name,
              parameterDesc: row.description,
              parameterOperator: row.dataType

            })
          }
          }
        >
          <VisibilitySharp />
        </Fab>
      </Tooltip>
    );
  };

  const parameterDefinitionColumns = [
    {
      dataField: "id",
      text: "ID",
      sort: true
    },
    {
      dataField: "name",
      text: "İsim",
      sort: true,
      filter: textFilter({ placeholder: ' ' })
    },
    {
      dataField: "description",
      text: "Açıklama",
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
      dataField: "campaignType",
      text: "Kampanya Tipi",
      sort: true,
      filter: textFilter({ placeholder: ' ' })
    },
    {
      dataField: "action1",
      text: "Sil",
      editable: false,
      formatter: removeAttributeButton,
    },
    {
      dataField: "action2",
      text: "Düzenle",
      editable: false,
      formatter: editParameter,
    },
    {
      dataField: "action",
      text: "Detay Görüntüle",
      editable: false,
      formatter: saleCampaignDetailFormatter,
      headerAlign: "center",
      style: { textAlign: "center" },
    }
  ];

  return (
    <>
      <Row>
        <Datatable
          data={attributes ? attributes : []}
          columns={parameterDefinitionColumns}
          keyfield={"id"}
          hidePagination={false}
          sizePerPage={15}
        />
      </Row>
    </>
  )
}

export default injectIntl(ParameterDefinitionDatatableView);