import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import Button from "../../../../components/base-component/Button";
import Datatable from "../../../../components/base-component/Datatable";
import RuleDetailModal from "../../../../components/business-component/RuleDetailModal";
import * as RuleService from "../../../../services/ruleService";
import { TocSharp } from "@material-ui/icons";
import { Tooltip, Fab } from "@material-ui/core";

const RuleListView = (props) => {
  const {
    intl,
    activeSubMenu,
    rules,
    showDetail,
  } = props;
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [rule, setRule] = useState();

  const campaignUpdateFormatter = (cell, row) => {
    return (
      <Tooltip title={"Detay"} placement={"top-start"} >
        <Fab
          size="small"
          color={"primary"}
          onClick={() => showRuleDetail(row)}
        >
          <TocSharp />
        </Fab>
      </Tooltip>
    );
  };

  const showRuleDetail = (row) => {
    setShowRuleModal(true);
    RuleService.getRuleDetail(row.id).then(result => {
      result && result.data && setRule(result.data);
    })
  }

  const ruleListColumns = [
    {
      dataField: "id",
      text: "Kural Id",
    },
    {
      dataField: "name",
      text: "Kural İsmi",
    },
    {
      dataField: "action",
      text: "Detay",
      editable: false,
      formatter: campaignUpdateFormatter,
      headerAlign: "center",
      style: { textAlign: "center" },
    },
  ];

  return (
    <div>
      <Datatable
        data={rules}
        columns={ruleListColumns}
        keyField={"id"}
        hidePagination={true}
      />
      <RuleDetailModal
        show={showRuleModal}
        setShow={setShowRuleModal}
        data={rule}
      />
    </div>
  );
};

export default injectIntl(RuleListView);
