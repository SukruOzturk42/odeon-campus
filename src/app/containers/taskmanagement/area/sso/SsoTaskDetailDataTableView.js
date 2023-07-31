import React from 'react'
import { textFilter } from 'react-bootstrap-table2-filter';
import Datatable from '../../../../components/base-component/Datatable';

export default function SsoTaskDetailDataTableView(props) {

    const taskStateColumns = [
        {
            dataField: "id",
            text: "Task ID",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "customerNo",
            text: "Müşteri No",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "state",
            text: "Task Durumu",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "note",
            text: "Not",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "contactMethod",
            text: "İletişim Yöntemi",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
    ];

    return (
        <div>
            <Datatable
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', weight: '100vh' }}
                md={12}
                data={[]}
                columns={taskStateColumns}
                keyfield="id"
                hidePagination={false}
                sizePerPage={5}
            />
        </div>
    )
}
