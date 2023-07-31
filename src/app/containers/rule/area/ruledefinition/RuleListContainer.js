import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";
import RuleListView from "./RuleListView";

export default function RuleListContainer(props) {
  const { activeSubMenu } = useContext(GlobalContext);
  const { rules } = props;
  const showDetail = (cell, row) => {

  }

  return (
    <div>
      <PageContentArea
        title={"Kurallar"}
      >
        <RuleListView
          rules={rules}
          showDetail={showDetail}
        />
      </PageContentArea>
    </div>
  );
}
