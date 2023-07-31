import React from 'react'
import Datatable from '../../../components/base-component/Datatable'
import { textFilter } from 'react-bootstrap-table2-filter';
import { dateFormat } from '../../../common/utils/Util';

export default function CreateTaskListDataTableView(props) {

    const {
        removeTaskListButton,
        editTaskListButton,
        tasks
    } = props;

    const taskListColumns = [
        {
            dataField: "id",
            text: "Liste ID",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "name",
            text: "Kampüs Liste İsmi",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "policyNumbers",
            text: "Poliçe Tipleri",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "startDate",
            text: "Satış Fırsatı Başlangıç Tarihi",
            sort: true,
            filter: textFilter({ placeholder: ' ' }),
            formatter: dateFormat
        },
        {
            dataField: "endDate",
            text: "Satış Fırsatı Bitiş Tarihi",
            sort: true,
            filter: textFilter({ placeholder: ' ' }),
            formatter: dateFormat
        },
        {
            dataField: "createdAt",
            text: "Oluşturulma Tarihi",
            sort: true,
            filter: textFilter({ placeholder: ' ' }),
            formatter: dateFormat
        },
        {
            dataField: "action1",
            text: "Sil",
            editable: false,
            formatter: removeTaskListButton,
        },
        {
            dataField: "action2",
            text: "Düzenle",
            editable: false,
            formatter: editTaskListButton,
        },
    ];

    const defaultSortedBy = [{
        dataField: "createdAt",
        order: "desc"  // or asc
      }];

    return (
        <div>
            <Datatable
                data={tasks}
                columns={taskListColumns}
                keyfield="id"
                hidePagination={false}
                sizePerPage={15}
                defaultSorted={defaultSortedBy}
            />
            <br />
            <span>
                {tasks && tasks.length > 0 ? (
                    <>Toplam {tasks.length} kayıt gösterilmektedir. </>
                ) : (
                    <>Kayıt bulunamadı.</>
                )}
            </span>
        </div>
    )
}
