import React, {useState} from 'react'
import { textFilter } from "react-bootstrap-table2-filter";
import { Row, Col } from 'react-bootstrap';
import Datatable from '../../../components/base-component/Datatable';
import TaskDetailContainer from './TaskDetailContainer';
import { PageContentArea } from '../../../components/base-component/PageContentArea';
import { SuccessModal } from '../../../components/base-component/SuccessModal';
import TaskAgencySelect from '../../../components/business-component/TaskAgencySelect';
import { dateFormat } from '../../../common/utils/Util';

export default function TasksView(props) {

    const {
        taskManagementDetailFormatter,
        selectedTask,
        onAreaChange,
        onClick,
        showSuccessModal,
        setShowSuccessModal,
        agencyCodes,
        setAgencyCodes,
        agencyTasks,
        setSelectedTask,
        temp,
        setTemp
    } = props;

    const taskColumns = [
        {
            dataField: "id",
            text: "Task ID",
            sort: true,
        },
        {
            dataField: "customerNo",
            text: "Müşteri No",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "customerName",
            text: "Müşteri Adı",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "name",
            text: "Task listesi ismi",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "agencyNo",
            text: "Acente Kodu",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "agencyRegionCode",
            text: "Bölge Kodu",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "policyBranch",
            text: "Branş Adı",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "taskState",
            text: "Task Durumu",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "expireDate",
            text: "Bitiş Tarihi",
            sort: true,
            filter: textFilter({ placeholder: ' ' }),
            formatter: dateFormat
        },
        {
            dataField: "action",
            text: "Detay Görüntüle",
            editable: false,
            formatter: taskManagementDetailFormatter,
            headerAlign: "center",
            style: { textAlign: "center" },
        },
    ];

    const onChange = (event) => {
        const { id, value } = event;
        setAgencyCodes(value)
    };

    return (
        <Col md={{ span: 10, offset: 1 }}>
            <PageContentArea title={"Acente Task Yönetimi"} buttonText={selectedTask.id ? "Geri Dön" : ""} buttonOnClick={onClick} >
                {!selectedTask.id ?
                    (
                        <>
                            <TaskAgencySelect
                                md={5}
                                value={agencyCodes}
                                onChange={onChange}
                                setAgencyCodes={setAgencyCodes}
                                temp={temp}
                            />
                            <Datatable
                                data={agencyTasks}
                                columns={taskColumns}
                                keyfield="id"
                                hidePagination={false}
                                sizePerPage={agencyTasks.length < 1 ? "" : 15}
                            />
                            <br />
                            <span>
                                {agencyTasks && agencyTasks.length > 0 ? (
                                    <>Toplam {agencyTasks.length} kayıt gösterilmektedir. </>
                                ) : (
                                    <>Kayıt bulunamadı.</>
                                )}
                            </span>
                        </>
                    ) :
                    (<TaskDetailContainer
                        selectedTask={selectedTask}
                        setSelectedTask={setSelectedTask}
                        onChange={onAreaChange}
                    />)
                }
            </PageContentArea>
            <SuccessModal
                show={showSuccessModal}
                setShow={setShowSuccessModal}
            />
        </Col>
    )
}
