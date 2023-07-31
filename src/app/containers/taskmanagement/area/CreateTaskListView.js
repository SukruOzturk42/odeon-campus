import React, { useEffect, useState } from 'react'
import { Input } from '../../../components/base-component/Input';
import Button from '../../../components/base-component/Button';
import { Col, Row } from 'react-bootstrap';
import { SuccessModal } from '../../../components/base-component/SuccessModal';
import TaskListSelect from '../../../components/business-component/TaskListSelect';
import { DatePicker } from '../../../components/base-component/DatePicker';
import moment from 'moment';
import CampaignPolicyTypeSelect from '../../../components/business-component/CampaignPolicyTypeSelect';

export default function CreateTaskListView(props) {

    const {
        errors,
        task,
        tasks,
        setTask,
        onAreaChange,
        onClick,
        showSuccessModal,
        setShowSuccessModal,
        clearTask
    } = props;

    const [isEndDateDisabled, setIsEndDateDisabled] = useState(false);
    const [isPolicyNumbers, setIsPolicyNumbers] = useState("policyNumbers");

    useEffect(() => {
        if (task.startDate) {
            setIsEndDateDisabled(true)
        }
    }, [task.startDate])

    const onAreaChangeStartDate = (event, dateString) => {
        if (event !== null && event !== undefined) {
            const date = event;
            onAreaChange({
                id: "startDate",
                value: moment(date, "YYYY-MM-DD HH:mm"),
            });
        }
    };

    const onAreaChangeEndDate = (event, dateString) => {
        if (event !== null && event !== undefined) {
            const date = event;
            onAreaChange({
                id: "endDate",
                value: moment(date, "YYYY-MM-DD HH:mm"),
            });
        }
    };

    return (
        <div>
            <div>
                <Row>
                    <Col md={6}>
                        <TaskListSelect
                            isClearable={task.id ? false : true}
                            md={5}
                            tasks={tasks}
                            selectedTask={task}
                            onChange={onAreaChange}
                            error={errors.taskTypeId}
                            value={task.taskTypeId ? task.taskTypeId : undefined}
                        />
                        <Input
                            id={"name"}
                            name={"name"}
                            label={"Kampüs Satış Fırsatı Liste İsmi"}
                            md={5}
                            onChange={onAreaChange}
                            error={errors.name}
                            value={task.name ? task.name : undefined}
                        />
                        <Input
                            id={"text"}
                            name={"text"}
                            label={"Görev Metni"}
                            md={5}
                            onChange={onAreaChange}
                            error={errors.text}
                            value={task.text ? task.text : undefined}
                        />
                        {task.id ? "" :
                            <CampaignPolicyTypeSelect
                                md={5}
                                isPolicyNumbers={isPolicyNumbers}
                                value={task.policyNumbers}
                                onChange={onAreaChange}
                                error={errors.policyNumbers}
                                isMulti={true}
                                campaignTypeId={2}
                                setTask={setTask}
                            />
                        }
                        <Input
                            id={"description"}
                            name={"description"}
                            label={"Açıklama"}
                            md={5}
                            onChange={onAreaChange}
                            error={errors.description}
                            value={task.description ? task.description : undefined}
                        />
                    </Col>
                    <Col md={6}>
                        <Row>
                            <DatePicker
                                disabledDate={(current) => {
                                    let customDate = moment().format("YYYY-MM-DD");
                                    return current && current < moment(customDate, "YYYY-MM-DD");
                                }}
                                id="startDate"
                                name="startDate"
                                label={"Satış Fırsatı Başlangıç Tarihi"}
                                value={task.startDate ? task.startDate : undefined}
                                error={errors.startDate}
                                onChange={onAreaChangeStartDate}
                                md={4}
                                rows={3}
                            />
                        </Row>
                        <Row>
                            <DatePicker
                                disabledDate={(current) => current.isBefore(task.startDate)}
                                id="endDate"
                                name="endDate"
                                label={"Satış Fırsatı Bitiş Tarihi"}
                                value={task.endDate ? task.endDate : undefined}
                                error={errors.endDate}
                                onChange={onAreaChangeEndDate}
                                md={4}
                                rows={3}
                                disabled={!isEndDateDisabled}
                            />
                        </Row>
                        <Row>
                            <Button
                                style={{ backgroundColor: "gold", borderColor: "gold"}}
                                md={2}
                                id="clear"
                                name="clear"
                                value={"Temizle"}
                                onClick={clearTask}
                            >
                                Temizle
                            </Button>
                            <Button
                                md={2}
                                id="taskId"
                                name="taskId"
                                value={"Kaydet"}
                                onClick={onClick}
                            >
                                Kaydet
                            </Button>
                        </Row>
                    </Col>
                </Row>
                <SuccessModal
                    show={showSuccessModal}
                    setShow={setShowSuccessModal}
                />
            </div>
        </div>
    )
}
