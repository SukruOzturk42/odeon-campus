import React from 'react'
import { Datatable } from "../../../../components/base-component/Datatable";
import { Row } from "react-bootstrap";
import { textFilter } from "react-bootstrap-table2-filter";

export default function MessageManagementDataTableView(props) {

    const { messages, removeMessage, editMessage } = props;

    const parameterDefinitionColumns = [
        {
            dataField: "id",
            text: "ID",
            sort: true,
            hidden: true
        },
        {
            dataField: "code",
            text: "Mesaj Kodu",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "key",
            text: "Key",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "description",
            text: "Mesaj Açıklaması",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "note",
            text: "Mesaj Notu",
            sort: true
        },
        {
            dataField: "action1",
            text: "Sil",
            editable: false,
            formatter: removeMessage,
        },
        {
            dataField: "action2",
            text: "Düzenle",
            editable: false,
            formatter: editMessage,
        }
    ];

    return (
        <>
            <Row>
                <Datatable
                    data={messages ? messages : []}
                    columns={parameterDefinitionColumns}
                    keyfield="id"
                    hidePagination={false}
                    sizePerPage={15}
                />
            </Row>
        </>
    )
}
