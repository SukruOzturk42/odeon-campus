import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { Datatable } from "../../../../components/base-component/Datatable";
import CodesTypeSelect from "../../../../components/business-component/code/CodesTypeSelect"
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

const CodesView = (props) => {
  const { intl, activeSubMenu, onChange, codes, codeType, setCodeType } = props;

  const codesColumns = [
    {
      dataField: "codeGroupId",
      text: "Kod Kümesi ID",
      filter: textFilter({ placeholder: ' ' }),
      sort: true,
    },
    {
      dataField: "codeGroupName",
      text: "Kod Kümesi İsmi",
      filter: textFilter({ placeholder: ' ' }),
      sort: true,
    },
    {
      dataField: "codeTypeName",
      text: "Kod Tipi",
      sort: true,
    },
    {
      dataField: "code",
      text: "Kod",
      filter: textFilter({ placeholder: ' ' }),
      sort: true,
    },
    {
      dataField: "contactNumber",
      text: "Müşteri No",
      filter: textFilter({ placeholder: ' ' }),
      sort: true,
    },
    {
      dataField: "codeStatus",
      text: "Kod Durumu",
      filter: textFilter({ placeholder: ' ' }),
      sort: true,
    },
  ];

  return (
    <div>
      <Row>
        <CodesTypeSelect
          value={codeType}
          setValue={setCodeType}
          md={4}
        />
      </Row>
      <Row>
        <Datatable
          data={codes ? codes : []}
          columns={codesColumns}
          keyfield={"codeGroupId"}
          hidePagination={true}
          sizePerPage={50}
        />
      </Row>
    </div >
  );
};

export default injectIntl(CodesView);
