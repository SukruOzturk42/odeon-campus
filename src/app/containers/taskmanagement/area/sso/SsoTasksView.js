import React from 'react'
import { textFilter } from "react-bootstrap-table2-filter";
import { Row, Col, Container } from 'react-bootstrap';
import Datatable from '../../../../components/base-component/Datatable';
import { PageContentArea } from '../../../../components/base-component/PageContentArea';
import SsoTasksDetailContainer from './SsoTasksDetailContainer';
import { SuccessModal } from '../../../../components/base-component/SuccessModal';
import TaskAgencySelect from '../../../../components/business-component/TaskAgencySelect';

export default function SsoTasksView(props) {

    const { 
        taskManagementDetailFormatter,
        selectedTask,
        onAreaChange,
        onClick,
        showSuccessModal,
        setShowSuccessModal,
        agencyCode,
        setAgencyCode,
        agencyTasks,
        setSelectedTask
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
            filter: textFilter({ placeholder: ' ' })
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
        setAgencyCode(value)
    };

    return (
        <>

            {!selectedTask.id ?
                (<Col md={9}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                        <PageContentArea title={"Acente Task Yönetimi"} buttonText={selectedTask.id ? "Geri Dön" : ""} buttonOnClick={onClick} >
                            <Row className="align-items-center justify-content-center">
                                <Col md={12}>
                                    <TaskAgencySelect
                                        md={5}
                                        onChange={onChange}
                                        value={agencyCode}
                                        setAgencyCode={setAgencyCode}
                                    />
                                    <Datatable
                                        md={12}
                                        data={agencyTasks}
                                        columns={taskColumns}
                                        keyfield="id"
                                        hidePagination={false}
                                        sizePerPage={15}
                                    />
                                </Col>
                            </Row>
                        </PageContentArea>
                    </div>
                </Col>
                )
                :
                (

                    <Col md={{ span: 9, offset: 0 }} style={{ marginTop: "50px" }}>
                        <PageContentArea title={"Acente Task Yönetimi"} buttonText={selectedTask.id ? "Geri Dön" : ""} buttonOnClick={onClick} >
                            <Row className="align-items-center justify-content-center">
                                <Col md={{ span: 12, offset: 0.5 }}>
                                    <SsoTasksDetailContainer
                                        selectedTask={selectedTask}
                                        setSelectedTask={setSelectedTask}
                                        onChange={onAreaChange}
                                    />
                                </Col>
                            </Row>
                        </PageContentArea>
                    </Col>
                )
            }
            <SuccessModal
                show={showSuccessModal}
                setShow={setShowSuccessModal}
            />
        </>
    )
}