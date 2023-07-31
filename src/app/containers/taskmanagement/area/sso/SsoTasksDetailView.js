import React, { useState, useEffect } from 'react'
import { PageContentArea } from '../../../../components/base-component/PageContentArea';
import { Row, Col } from 'react-bootstrap';
import Select from '../../../../components/base-component/Select';
import Input from '../../../../components/base-component/Input';
import Button from '../../../../components/base-component/Button';
import { Fab, Tooltip } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';
import * as TaskService from '../../../../services/TaskService'
import { AddBox } from '@material-ui/icons';
import { SuccessModal } from '../../../../components/base-component/SuccessModal';
import SsoTaskDetailDataTableView from './SsoTaskDetailDataTableView';
import AddTaskOwnerModal from '../../../../components/business-component/AddTaskOwnerModal';

export default function SsoTasksDetailView(props) {

    const {
        selectedTask,
        onChange,
        onAreaChange,
        onClick,
        saveTaskState,
        showSuccessModal,
        setShowSuccessModal,
        data,
        taskState,
        isClicked,
    } = props;

    return (
        <div>
            <PageContentArea title="Detay" >
                <Row>
                    <Select
                        md={3}
                        id="state"
                        name="state"
                        label={"Task Durum"}
                        options={Array.isArray(data) ? data.map((item) => {
                            return { label: item.name, value: item.id };
                        }) : []}
                        onChange={onAreaChange}
                        value={taskState.state ? taskState.state : undefined}
                        isClearable={false}
                    />
                    <Input
                        id={"note"}
                        name={"note"}
                        label={"Not"}
                        md={5}
                        onChange={onAreaChange}
                        value={taskState.note ? taskState.note : undefined}
                        as={"textarea"}
                    />
                    <Button
                        md={2}
                        id="selectedTaskId"
                        name="selectedTaskId"
                        value={"Kaydet"}
                        onClick={saveTaskState}
                    >
                        Kaydet
                    </Button>
                </Row>
            </PageContentArea>
            <PageContentArea>
                <Row>
                    <Button variant="text" style={{ textAlign: "left" }} md={4} onClick={() => onClick("taskInformations", isClicked.taskInformations)} >
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}> {isClicked.taskInformations ?
                            <Fab variant='extended' style={{ boxShadow: 'none', backgroundColor: '#fff', }} size="small">
                                <KeyboardArrowDown />
                            </Fab> :
                            <Fab variant='extended' style={{ boxShadow: 'none', backgroundColor: '#fff', }} size="small">
                                <KeyboardArrowRight />
                            </Fab>
                        } Task Bilgileri</span>
                    </Button>
                </Row>
                {isClicked.taskInformations !== false ?
                    (<>
                        <Row>
                            <Input
                                id={"state"}
                                name={"state"}
                                label={"Task Durumu"}
                                md={5}
                                onChange={onChange}
                                disabled={true}
                                value={selectedTask.taskState ? selectedTask.taskState : undefined}
                            />
                        </Row>
                        <Row>
                            <Input
                                id={"taskOwnerName"}
                                name={"taskOwnerName"}
                                label={"Sorumlu Kişi"}
                                md={5}
                                onChange={onChange}
                                disabled={true}
                                value={selectedTask.taskOwnerName ? selectedTask.taskOwnerName : undefined}
                            />
                        </Row>
                        <Row>
                            <Input
                                id={"taskOwnerUserName"}
                                name={"taskOwnerUserName"}
                                label={"Sorumlu Kullanıcı Adı"}
                                md={5}
                                onChange={onChange}
                                disabled={true}
                                value={selectedTask.taskOwnerUserName ? selectedTask.taskOwnerUserName : undefined}
                            />
                        </Row>
                    </>)
                    : ""}
                <Row>
                    <Button variant="text" style={{ textAlign: "left" }} md={4} onClick={() => onClick("customerInformations", isClicked.customerInformations)} >
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}> {isClicked.customerInformations ?
                            <Fab variant='extended' style={{ boxShadow: 'none', backgroundColor: '#fff', }} size="small">
                                <KeyboardArrowDown />
                            </Fab> :
                            <Fab variant='extended' style={{ boxShadow: 'none', backgroundColor: '#fff', }} size="small">
                                <KeyboardArrowRight />
                            </Fab>
                        } Müşteri Bilgileri</span>
                    </Button>
                </Row>
                {isClicked.customerInformations !== false ?
                    (<>
                        <Input
                            id={"taskId"}
                            name={"taskId"}
                            label={"Task ID"}
                            md={5}
                            onChange={onChange}
                            disabled={true}
                            value={selectedTask.id ? selectedTask.id : undefined}
                        />
                        <Input
                            id={"customerNo"}
                            name={"customerNo"}
                            label={"Müşteri No"}
                            md={5}
                            onChange={onChange}
                            disabled={true}
                            value={selectedTask.customerNo ? selectedTask.customerNo : undefined}
                        />
                        <Input
                            id={"customerType"}
                            name={"customerType"}
                            label={"Müşteri Tipi (o/t)"}
                            md={5}
                            onChange={onChange}
                            disabled={true}
                            value={selectedTask.customerType ? selectedTask.customerType : undefined}
                        />
                        <Input
                            id={"customerName"}
                            name={"customerName"}
                            label={"Müşteri Adı"}
                            md={5}
                            onChange={onChange}
                            disabled={true}
                            value={selectedTask.customerName ? selectedTask.customerName : undefined}
                        />
                        <Input
                            id={"customerPhone"}
                            name={"customerPhone"}
                            label={"Cep Telefonu"}
                            md={5}
                            onChange={onChange}
                            disabled={true}
                            value={selectedTask.customerPhone ? selectedTask.customerPhone : undefined}
                        />
                        <Input
                            id={"customerEmail"}
                            name={"customerEmail"}
                            label={"Email"}
                            md={5}
                            onChange={onChange}
                            disabled={true}
                            value={selectedTask.customerEmail ? selectedTask.customerEmail : undefined}
                        />
                    </>)
                    : ""}
                <Row>
                    <Button variant="text" style={{ textAlign: "left" }} md={4} onClick={() => onClick("policyInformations", isClicked.policyInformations)} >
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}> {isClicked.policyInformations ?
                            <Fab variant='extended' style={{ boxShadow: 'none', backgroundColor: '#fff', }} size="small">
                                <KeyboardArrowDown />
                            </Fab> :
                            <Fab variant='extended' style={{ boxShadow: 'none', backgroundColor: '#fff', }} size="small">
                                <KeyboardArrowRight />
                            </Fab>
                        } Poliçe Bilgileri</span>
                    </Button>
                </Row>
                {isClicked.policyInformations !== false ?
                    (
                        <>
                            <Input
                                id={"policyType"}
                                name={"policyType"}
                                label={"Geçerli Poliçe Tipleri"}
                                md={5}
                                onChange={onChange}
                                disabled={true}
                                value={selectedTask.policyType ? selectedTask.policyType : undefined}
                            />
                            <Input
                                id={"agencyNo"}
                                name={"agencyNo"}
                                label={"Acente Kodu"}
                                md={5}
                                onChange={onChange}
                                disabled={true}
                                value={selectedTask.agencyNo ? selectedTask.agencyNo : undefined}
                            />
                            <Input
                                id={"policyBranch"}
                                name={"policyBranch"}
                                label={"Branş Adı"}
                                md={5}
                                onChange={onChange}
                                disabled={true}
                                value={selectedTask.policyBranch ? selectedTask.policyBranch : undefined}
                            />
                            <Input
                                id={"policyNumber"}
                                name={"policyNumber"}
                                label={"Mevcut Poliçe Numarası"}
                                md={5}
                                onChange={onChange}
                                disabled={true}
                                value={selectedTask.policyNumber ? selectedTask.policyNumber : undefined}
                            />
                            <Input
                                id={"renewalNumber"}
                                name={"renewalNumber"}
                                label={"Yenileme Numarası"}
                                md={5}
                                onChange={onChange}
                                disabled={true}
                                value={selectedTask.renewalNumber ? selectedTask.renewalNumber : undefined}
                            />
                            <Input
                                id={"subjectType"}
                                name={"subjectType"}
                                label={"Sigorta Konusu Tipi"}
                                md={5}
                                onChange={onChange}
                                disabled={true}
                                value={selectedTask.subjectType ? selectedTask.subjectType : undefined}
                            />
                            <Input
                                id={"subjectValue"}
                                name={"subjectValue"}
                                label={"Sigorta Konusu"}
                                md={5}
                                onChange={onChange}
                                disabled={true}
                                value={selectedTask.subjectValue ? selectedTask.subjectValue : undefined}
                            />
                            <Input
                                id={"offerNumber"}
                                name={"offerNumber"}
                                label={"Teklif Numarası"}
                                md={5}
                                onChange={onChange}
                                disabled={true}
                                value={selectedTask.offerNumber ? selectedTask.offerNumber : undefined}
                            />
                            <Input
                                id={"oldPolicyNumber"}
                                name={"oldPolicyNumber"}
                                label={"Poliçe Numarası"}
                                md={5}
                                onChange={onChange}
                                disabled={true}
                                value={selectedTask.oldPolicyNumber ? selectedTask.oldPolicyNumber : undefined}
                            />
                        </>
                    )
                    : ""
                }
            </PageContentArea>
            <PageContentArea title="Güncelleme Tarihçesi">
                <SsoTaskDetailDataTableView />
            </PageContentArea>
            <SuccessModal
                show={showSuccessModal}
                setShow={setShowSuccessModal}
            />
        </div>
    )
}
