import React, {useEffect, useState, Dispatch} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button as RButton} from 'react-bootstrap';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import SaveIcon from '@mui/icons-material/Save';
import FormLabel from '@mui/material/FormLabel';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import PrintIcon from '@mui/icons-material/Print';
import ReplyIcon from '@mui/icons-material/Reply';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import ApprovalIcon from "@mui/icons-material/Approval";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TableContainer from '@mui/material/TableContainer';
import FindInPageIcon from "@mui/icons-material/FindInPage";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
import Radio from '@mui/material/Radio';

import "jspdf-autotable";
import axios from 'axios';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import {NumericFormat} from 'react-number-format';
import {dateFormat} from '../../../helpers/constant';
import NestedModal from "../Invoice/modalInvoiceDetails";
import ModalTableInvoice from "../Invoice/modalTableInvoice";
import ModalInvoiceUtilities from "../Invoice/modalInvoiceUtilities";
import {
    PaymentRequestFormModel,
    PaymentRequestFormTableModel,
    PaymentHeadersDummy
} from "./model";
import {ButtonBase} from "@mui/material";


function Img(props) {
    return null;
}

Img.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string
};
const CrudPaymentRequestPage = () => {
    const {prId} = useParams()
    const history = useNavigate()
    const [isEditDisabled, setIsEditDisabled] = useState(false)

    // Shipment Order Dialog
    const [openMLSO, setOpenMLSO] = useState(false)
    const [LSOHeaders, setLSOHeaders] = useState([])
    const [LSOData, setLSOData] = useState([])
    // Payment Trucking Table
    const [openModalPayment, setOpenModalPayment] = useState(false)
    const [IncShipperHeaders, setIncShipperHeaders] = useState(PaymentHeadersDummy)
    const [IncShipperData, setIncShipperData] = useState([])
    const [selectedDetail, setSelectedDetail] = useState({})

    const selectedStyle = {bgcolor: (theme) => theme.palette.primary.main}
    const deletedDetailStyle = {bgcolor: (theme) => theme.palette.text.disabled}

    const [formPayment, setFormPayment] = useState(new PaymentRequestFormModel())

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        if (prId) {
            setIsEditDisabled(true)
            fetchEditData(prId)

            getContact(50, 1)
            getRateCurrency(50, 1)
            getShipmentOrder(50, 1)
        } else {
            getContact(50, 1)
            getRateCurrency(50, 1)
            getShipmentOrder(50, 1)
        }

        return () => controller.abort()
    }, [prId]);

    //#region: API handling
    const fetchEditData = (prId) => {
        let body = {
            "userCode": "luna", "countryId": 101, "companyId": 32, "branchId": 12
        }

        axios.post(`http://stage-operation.api.infoss.solusisentraldata.com/invoice/invoice/PostById?id=${prId}`, body).then(response => {
            // setInvoiceDetails(response.data.data.invoice.invoiceDetails)

            let tempDetail = response.data.data.invoice.invoiceDetails

            // setDetailMap(tempDetail)

            if (tempDetail.length > 0) {
                // setDetailSequence(tempDetail[tempDetail.length - 1].sequence)
            }

            // setEditInvoice(response.data.data.invoice)

            let temp = response.data.data.invoice
            // setIsCTC(temp.isCostToCost)
            // setInvoiceNo(temp.invoiceNo)
            // setPrinting(temp.printing)
            // setPrintedOn(temp.printedOn)
            // setPackingListNo(temp.packingListNo)
            // setSiCustomerNo(temp.siCustomerNo)
            // setCustomerTypeId(temp.customerTypeId)
            // setCustomerId(temp.customerId)
            // setCustomerName(temp.customerName)
            // setCustomerAddress(temp.customerAddress)
            // setDebetCredit(temp.debetCredit === '' ? 'D' : temp.debetCredit)
            // setIsStampDuty(temp.isStampDuty)
            // setStampDutyAmount(temp.stampDutyAmount)
            // setPaymentUSD(temp.paymentUSD)
            // setPaymentIDR(temp.paymentIDR)
            // setTotalVATIDR(temp.totalVatIDR)
            // setTotalVATUSD(temp.totalVatUSD)
            // setPaid(temp.paid)
            // setPaidOn(temp.paidOn)
            // setRate(temp.rate)
            // setKursKMK(temp.kursKMK)
            // setEFaktur(temp.sfpReference)
            // setJobOwnerId(temp.invHeader)
            // setShipmentNo(temp.shipmentNo)
            // setEtd(temp.etd)
            // setEta(temp.eta)
            // setJenisInvoices(temp.jenisInvoices)

            return axios.post(`http://stage-master.api.infoss.solusisentraldata.com/jobowner/jobowner/PostById?id=${temp.invHeader}`, body)
        }).then(job => {
            if (job.data.code === 200) {
                // setInvHeader(job.data.data.jobOwner.masterCode)
            }
        }).catch(error => console.error(error))
    }

    const fetchJobOwners = () => {
        const body = {
            "userCode": "luna", "countryId": 101, "companyId": 32, "branchId": 12
        }
        axios.post('http://stage-master.api.infoss.solusisentraldata.com/jobowner/jobowner/PostByPage?pageNumber=1&pageSize=5', body).then(res => {
            if (res && res.data && res.data.data) {
                // setJobOwners(res.data.data.jobOwner)
            }
        }).catch(error => {
            console.error(error);
        })
    }

    const getContact = (rows = 50, page = 1) => {
        axios.post(`http://stage-master.api.infoss.solusisentraldata.com/regcontact/regcontact/PostByPage?contactTypeId=1&pageNumber=${page}&pageSize=${rows}`, {
            "userCode": "luna", "countryId": 101, "companyId": 32, "branchId": 12
        }).then(response => {
            if (response.data.code === 200) {
                // setDataContacts(response.data.data.contact)
                // setHeaderContacts(response.data.data.columns)
                // setMaxPageContacts(response.data.totalPage)
            }
        }).catch(error => console.error(error))
    }

    const getRateCurrency = (rowsCount = 50, NumPage = 1) => {
        const body = {
            "userCode": "luna", "countryId": 101, "companyId": 32, "branchId": 12
        }
        axios.post('http://stage-master.api.infoss.solusisentraldata.com/jobowner/jobowner/PostByPage?pageNumber=1&pageSize=5', body).then(res => {
            if (res && res.data && res.data.data) {
                // setJobOwners(res.data.data.jobOwner)
            }
        }).catch(error => {
            console.error(error);
        })
    }

    const getShipmentOrder = (rowsCount = 50, NumPage = 1) => {
        axios.post(`http://stage-operation.api.infoss.solusisentraldata.com/shipmentorder/shipmentorder/PostByPage?columnCode=PAGE&pageNumber=${NumPage}&pageSize=${rowsCount}`, {
            "userCode": "luna", "countryId": 101, "companyId": 32, "branchId": 12
        })
            .then((response) => {
                if (response && response.data && response.data.data && response.data.data.columns) {
                    setLSOHeaders(response.data.data.columns.headerColumns)
                    setLSOData(response.data.data.shipmentOrder)
                }
            })
            .catch(function (error) {
                console.error(error)
            })
    }
    //#endregion: API handling

    //#region: Form handling
    const successAlert = (text) => {
        Swal.fire({
            position: 'center', icon: 'success', title: text, showConfirmButton: false, timer: 1500
        })
    }

    const handleSubmit = () => {
        if (prId) {
            let payload = {
                invoice: IncShipperData, invoiceDetails: IncShipperData
            }

            delete payload.invoice.invoiceDetails

            payload.invoice.shipmentId = IncShipperData
            payload.invoice.customerAddress = IncShipperData
            payload.invoice.invHeader = IncShipperData
            payload.invoice.packingListNo = IncShipperData
            payload.invoice.siCustomerNo = IncShipperData
            payload.invoice.isStampDuty = IncShipperData.toString() === 'true'
            payload.invoice.stampDutyAmount = IncShipperData.toString() === 'true' ? IncShipperData : 0
            payload.invoice["paymentUSD"] = IncShipperData
            payload.invoice["paymentIDR"] = IncShipperData
            payload.invoice["totalVatUSD"] = IncShipperData
            payload.invoice["totalVatIDR"] = IncShipperData
            payload.invoice.invoicesAgent = IncShipperData

            axios.put('http://stage-operation.api.infoss.solusisentraldata.com/invoice/invoice/Update', payload).then(response => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Update Data Success',
                    showConfirmButton: false,
                    timer: 1500
                })

                history('/booking/invoice')
            }).catch(error => console.error(error))
        } else {
            if (!IncShipperData.shipmentNo) {
                Swal.fire('Information', "Shipment Order Number can't be empty...!!", 'info')
            } else {
                axios.post('https://localhost:7160/Invoice/PostAutoNoInvoice', {
                    "userCode": "luna", "countryId": 101, "companyId": 32, "branchId": 12
                }).then(res => {
                    if (res.data.code === 200) {
                        let payload = IncShipperData

                        payload.invoice.invoiceNo = res.data.data.invoiceNo
                        payload.invoice.invoiceNo2 = res.data.data.invoiceNo2
                        payload.invoice.sfpId = res.data.data.sfpId
                        payload.invoice["sfpNoFormat"] = res.data.data.sfpNoFormat
                        payload.invoice["sfpDetailId"] = res.data.data.sfpDetailId
                        payload.invoice["uniqueKeySFP"] = res.data.data.uniqueKeySFP
                        payload.invoice["uniqueKeyInvoice"] = res.data.data.uniqueKeyInvoice
                        payload.invoice.sfpReference = IncShipperData
                        payload.invoice["debetCredit"] = IncShipperData
                        payload.invoice["shipmentId"] = IncShipperData
                        payload.invoice["contactTypeId"] = IncShipperData
                        payload.invoice["customerId"] = IncShipperData
                        payload.invoice["customerName"] = IncShipperData
                        payload.invoice["customerAddress"] = IncShipperData
                        payload.invoice["customerTypeId"] = IncShipperData
                        payload.invoice["paymentUSD"] = IncShipperData
                        payload.invoice["paymentIDR"] = IncShipperData
                        payload.invoice["totalVatUSD"] = IncShipperData
                        payload.invoice["totalVatIDR"] = IncShipperData
                        payload.invoice["rate"] = IncShipperData
                        payload.invoice["paid"] = IncShipperData
                        payload.invoice["paidOn"] = IncShipperData === '' ? new Date('1753-01-01') : IncShipperData
                        payload.invoice["invHeader"] = IncShipperData
                        payload.invoice["isCostToCost"] = IncShipperData
                        payload.invoice["kursKMK"] = IncShipperData
                        payload.invoice["packingListNo"] = IncShipperData
                        payload.invoice["siCustomerNo"] = IncShipperData
                        payload.invoice["isStampDuty"] = IncShipperData.toString() === 'true'
                        payload.invoice["stampDutyAmount"] = IncShipperData.toString() === 'true' ? IncShipperData : 0
                        payload.invoice.shipmentNo = IncShipperData
                        payload.invoice.eta = IncShipperData
                        payload.invoice.etd = IncShipperData
                        payload.invoice.jenisInvoices = IncShipperData
                        // payload.invoice["transactionDate"]= new Date().toISOString()
                        payload.invoiceDetails = IncShipperData

                        return axios.post('http://stage-operation.api.infoss.solusisentraldata.com/invoice/invoice/Create', payload)
                    }
                }).then(response => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Create Data Success',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    history('/booking/invoice')
                })
                    .catch(error => console.error(error))
            }
        }
    }

    const handleNewForm = () => {
        Swal.fire({
            title: 'Confirm',
            text: "Are you sure you want to create NEW Invoice?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                history('/booking/invoice/create')
                window.location.reload();
            }
        })
    }

    const handleAllVat = (value) => {
        let cast = Number(value)
        // setAllVat(cast)
        if (IncShipperData.length > 0) {
            let tempIdr = 0
            let tempUsd = 0
            IncShipperData.forEach(el => {
                if (el.rowStatus !== 'DEL') {
                    let calculation = Number(el.amount) * (cast / 100)
                    el.percentVat = cast
                    el.amountVat = calculation

                    if (el.amountCrr === 0) {
                        tempUsd += calculation
                    } else {
                        tempIdr += calculation
                    }
                }
            })
            // setTotalVATIDR(Number(tempIdr.toFixed(2)))
            // setTotalVATUSD(Number(tempUsd.toFixed(2)))
        }
    }

    const handleSelectContact = (value, type) => {
        if (type === 'shipper-customer') {
            if (IncShipperData === 2) {
                // setCustomerId(value.contactId)
                // setCustomerName(value.pic)
                // setCustomerAddress(value.contactAddress)
                // setSelectedContact(value)
            } else {
                // setAgentId(value.contactId)
                // setAgentName(value.pic)
                // setAgentAddress(value.contactAddress)
                // setSelectedContact(value)
            }
        } else if (type === 'shipper-bill') {
            if (IncShipperData === 2) {
                // setBillId(value.contactId)
                // setBillName(value.pic)
                // setBillAddress(value.contactAddress)
                // setSelectedContact(value)
            } else {
                // setBillIdAgent(value.contactId)
                // setBillNameAgent(value.pic)
                // setBillAddressAgent(value.contactAddress)
                // setSelectedContact(value)
            }
        }


    }

    const handleSelectedShipment = (value) => {
        const f = {...formPayment};
        f.idPaymentRequest = value['paymentrequestId'];
        f.shipmentId = value['shipperId'];
        f.etd = value.etd;
        f.eta = value.eta;
        f.principleBy = value.agentName;
        setFormPayment(f);

        console.log('valueShipment', value)
        // setInvHeader(value.invHeader)
        // setShipmentNo(value.shipmentNo)
        // setShipmentId(value.id)
        // setEtd(value.etd)
        // setEta(value.eta)
        // setShipmentData(value)
    }

    const handleSetPaymentTo = (value) => {
        const f = {...formPayment};
        f.paymentTo = value;
        setFormPayment(f);

        console.log('paymentTo', value)
    }

    const handlePrint = () => {
        let printCount = IncShipperData.printing
        let canPrint = false
        if (IncShipperData.printing === 0) {
            printCount += 1
            canPrint = true
        } else {
            if (IncShipperData.rePrintApproved === true) {
                printCount += 1
                canPrint = true
            }
        }
        if (canPrint === true) {
            const payload = {
                "rowStatus": IncShipperData.rowStatus,
                "countryId": 101,
                "companyId": 32,
                "branchId": 12,
                "id": IncShipperData.id,
                "invoiceNo": IncShipperData.invoiceNo,
                "printing": printCount,
                "user": "luna"
            }
            axios.put('https://localhost:7160/Invoice/UpdateStatusPrint', payload)
                .then(response => {
                    if (response.data.code === 200) {
                        fetchEditData(prId)
                        successAlert('Data berhasil di print')
                    } else {
                        Swal.fire('Print Failed', `${response.data.message}`, 'error')
                    }
                }).catch(error => {
                console.error(error)
                Swal.fire('Error', `${error.toString()}`, 'error')
            })
        } else {
            Swal.fire('Information', "Data Has Been Printed", 'info')
        }
    }

    const handleRePrint = () => {
        if (prId) {
            if (IncShipperData.rePrintApproved === true) {
                successAlert('Print ulang sudah di setujui')
            } else {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "Once approved, this data can be printed repeatedly",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK'
                }).then((res) => {
                    if (res.isConfirmed) {
                        const payload = {
                            "rowStatus": IncShipperData.rowStatus,
                            "countryId": 101,
                            "companyId": 32,
                            "branchId": 12,
                            "id": IncShipperData.id,
                            "invoiceNo": IncShipperData.invoiceNo,
                            "rePrintApproved": 1,
                            "rePrintApprovedBy": "luna",
                            "user": "luna"
                        }
                        axios.put('https://localhost:7160/Invoice/UpdateStatusRePrint', payload)
                            .then(response => {
                                if (response.data.code === 200) {
                                    successAlert('Print ulang sudah di setujui')
                                } else {
                                    Swal.fire('Approval Error', `${response.data.message}`, 'error')
                                }
                            })
                            .catch(error => {
                                console.error(error)
                                Swal.fire('Print Failed', `${error.toString()}`, 'error')
                            })
                    }
                })
            }
        }
    }

    const handleApprove = (approveCode) => {

    }
    //#endregion: Form handling

    //#region: Data Table
    const saveTruckingDetail = (payload) => {
        let sumUsd = 0
        let sumIdr = 0
        let vatUsd = 0
        let vatIdr = 0

        if (IncShipperData === true) {
            const newArr = IncShipperData.slice()
            newArr.forEach(el => {
                if (el.sequence === payload.sequence) {
                    if (el.rowStatus !== 'DEL') {
                        if (payload.amountCrr === 1) {
                            sumIdr += payload.amount
                            vatIdr += payload.amountVat
                        } else {
                            sumUsd += payload.amount
                            vatUsd += payload.amountVat
                        }
                    }

                    el.accountId = payload.accountId
                    el.accountName = payload.accountName
                    el.description = payload.description
                    el.type = payload.type
                    el.isCostToCost = payload.isCostToCost
                    el.sign = payload.sign
                    el.percentVat = payload.percentVat
                    el.amountVat = payload.amountVat
                    el.quantity = payload.quantity
                    el.perQty = payload.perQty
                    el.originalRate = payload.originalRate
                    el.amount = payload.amount
                    el.originalUsd = payload.originalUsd
                    el.codingQuantity = payload.codingQuantity
                    el.amountCrr = payload.amountCrr
                } else {
                    if (el.rowStatus !== 'DEL') {
                        if (el.amountCrr === 1) {
                            sumIdr += el.amount
                            vatIdr += el.amountVat
                        } else {
                            sumUsd += el.amount
                            vatUsd += el.amountVat
                        }
                    }
                }
            })

            // setPaymentIDR(Number(sumIdr.toFixed(2)))
            // setPaymentUSD(Number(sumUsd.toFixed(2)))
            // setTotalVATIDR(Number(vatIdr.toFixed(2)))
            // setTotalVATUSD(Number(vatUsd.toFixed(2)))

            // setDetailMap(newArr)

            // setDetailEdit(false)
            // setSelectedDetail({})
        } else {
            // setDetailSequence(payload.sequence)

            let arrDetail = [...IncShipperData, payload]
            arrDetail.forEach(el => {
                if (el.rowStatus !== 'DEL') {
                    if (el.amountCrr === 1) {
                        sumIdr += el.amount
                        vatIdr += el.amountVat
                    } else {
                        sumUsd += el.amount
                        vatUsd += el.amountVat
                    }
                }
            })
            // setPaymentIDR(Number(sumIdr.toFixed(2)))
            // setPaymentUSD(Number(sumUsd.toFixed(2)))
            // setTotalVATIDR(Number(vatIdr.toFixed(2)))
            // setTotalVATUSD(Number(vatUsd.toFixed(2)))

            // setDetailMap(arrDetail)
        }
    }

    const addTruckingDetail = () => {
        if (!IncShipperData) {
            Swal.fire('Information', "Shipment Order Number can't be empty...!!", 'info')
        } else {
            // setOpenModalTable(true)
        }
    }

    const editTruckingDetail = () => {
        if (!IncShipperData.sequence) {
            Swal.fire('Information', "Please select detail data...!!", 'info')
        } else {
            if (IncShipperData.rowStatus !== 'DEL') {
                // setDetailEdit(true)
                // setOpenModalTable(true)
            }
        }
    }

    const deleteTruckingDetail = () => {
        if (!IncShipperData.sequence) {
            Swal.fire('Information', "Please select detail data...!!", 'info')
        } else {
            let sumUsd = 0
            let sumIdr = 0
            let vatUsd = 0
            let vatIdr = 0

            let tempSequence = IncShipperData.sequence

            // let fromEpl = false

            // invoiceDetails.forEach(el =>  {
            //     if(el.sequence === tempSequence) {
            //         fromEpl = true
            //     }
            // })
            if (IncShipperData && IncShipperData.eplDetailId !== 0) {
                sumUsd = IncShipperData
                sumIdr = IncShipperData
                vatUsd = IncShipperData
                vatIdr = IncShipperData

                IncShipperData.forEach(el => {
                    if (el.sequence === tempSequence) {
                        el.rowStatus = 'DEL'

                        if (el.amountCrr === 1) {
                            sumIdr -= el.amount
                            vatIdr -= el.amountVat
                        } else {
                            sumUsd -= el.amount
                            vatUsd -= el.amountVat
                        }
                    }
                })
            } else {
                const deleteFunction = (invoices) => {
                    return invoices.sequence !== tempSequence
                }
                const result = IncShipperData.filter(deleteFunction)
                if (result.length > 0) {
                    tempSequence = 0
                    result.forEach((el) => {
                        if (el.rowStatus !== 'DEL') {
                            if (el.amountCrr === 1) {
                                sumIdr += el.amount
                                vatIdr += el.amountVat
                            } else {
                                sumUsd += el.amount
                                vatUsd += el.amountVat
                            }
                        }

                        if (el.eplDetailId !== 0) {
                            tempSequence = el.sequence
                        } else {
                            tempSequence += 1
                            el.sequence = tempSequence
                        }
                    })

                    // setDetailSequence(tempSequence)
                } else {
                    // setDetailSequence(0)
                }

                // setDetailMap(result)
            }

            // setPaymentIDR(Number(sumIdr.toFixed(2)))
            // setPaymentUSD(Number(sumUsd.toFixed(2)))
            // setTotalVATIDR(Number(vatIdr.toFixed(2)))
            // setTotalVATUSD(Number(vatUsd.toFixed(2)))

            // setSelectedDetail({})
        }
    }
    //#endregion: Data Table

    const change = ((e) => setFormPayment({...formPayment, [e.target.name]: e.target.value}))
    return (<>
        <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
                {
                    prId
                        ?
                        <h4>Edit Payment Request</h4>
                        :
                        <h4>Create New Payment Request</h4>
                }
            </Grid>
            <Grid item xs={12}>
                <Stack direction='row' spacing={1}>
                    <RButton variant='outline-infoss me-3'
                             onClick={() => history('/booking/payment-request')}>
                        <ReplyIcon/> Back
                    </RButton>
                    <RButton variant='outline-infoss me-3' onClick={() => handleSubmit()}>
                        <SaveIcon/> Save
                    </RButton>
                    <RButton variant='outline-infoss me-3' onClick={() => handlePrint()}>
                        <PrintIcon/> Print PR
                    </RButton>
                    <RButton variant='outline-infoss me-3' onClick={() => handleNewForm()}>
                        <AddToPhotosIcon/> Add New
                    </RButton>
                    <RButton variant='outline-infoss me-3' onClick={() => handleApprove('Acc Manager')}>
                        <AssignmentTurnedInIcon/> Approve By Acc Manager
                    </RButton>
                    <RButton variant='outline-infoss me-3' onClick={() => handleApprove('General PR')}>
                        <CheckCircleIcon/> Approve General PR with Acc Manager
                    </RButton>
                    <RButton variant='outline-infoss me-3' onClick={() => handleApprove('MKT')}>
                        <LibraryAddCheckIcon/> Approve MKT without Acc Manager
                    </RButton>
                </Stack>
            </Grid>
            <Paper variant="outlined" sx={{m: 2, p: 2}}>
                <ModalTableInvoice
                    open={openMLSO}
                    onClose={() => setOpenMLSO(false)}
                    setSelectedData={(e) => handleSelectedShipment(e)}
                    headersData={LSOHeaders}
                    bodyData={LSOData}
                    fetchData={(r, p) => getShipmentOrder(r, p)}
                    maxPage={1}
                    type={'revised'}
                />

                <Grid container spacing={3} direction="row">
                    <Grid item xs={5}>
                        <div className='border border-secondary rounded p-3'>
                            <FormLabel id="payment-form-label">Payment Form</FormLabel>
                            <RadioGroup
                                row
                                name="IsGeneralPayment"
                                aria-labelledby="payment-form-label"
                                value={formPayment.IsGeneralPayment}
                                onChange={change}
                            >
                                <FormControlLabel value="P" control={<Radio/>} label="Payment Request"
                                                  disabled={isEditDisabled}/>
                                <FormControlLabel value="G" control={<Radio/>} label="General Payment Request"
                                                  disabled={isEditDisabled}/>
                            </RadioGroup>

                            <FormLabel id="payment-type-label">Type</FormLabel>
                            <RadioGroup
                                row
                                name="CTCType"
                                aria-labelledby="payment-type-label"
                                value={formPayment.CTCType}
                                onChange={change}
                            >
                                <FormControlLabel value={false} control={<Radio/>} label="Non Cost To Cost"
                                                  disabled={isEditDisabled}/>
                                <FormControlLabel value={true} control={<Radio/>} label="Cost To Cost"
                                                  disabled={isEditDisabled}/>
                            </RadioGroup>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className='row mt-3 mx-3'>
                            <TextField
                                id="principle"
                                label="Principle By"
                                variant="filled"
                                onClick={() => !isEditDisabled ? setOpenMLSO(true) : setOpenMLSO(false)}
                                value={formPayment.principleBy}
                                disabled={isEditDisabled}
                            />
                        </div>
                        <div className='row mt-3 mx-3'>
                            <TextField
                                id="etd-eta-number"
                                label="ETD/ETA"
                                variant="filled"
                                onClick={() => !isEditDisabled ? setOpenMLSO(true) : setOpenMLSO(false)}
                                value={formPayment.shipmentId ? `${dateFormat(formPayment.etd)} - ${dateFormat(formPayment.eta)}` : ""}
                                disabled={isEditDisabled}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='col mt-3'>
                            <TextField
                                id="shipment-order-number"
                                label="Shipment Order Number"
                                variant="filled"
                                onClick={() => !isEditDisabled ? setOpenMLSO(true) : setOpenMLSO(false)}
                                value={formPayment.shipmentId}
                                disabled={isEditDisabled}
                            />
                            <FindInPageIcon className='text-infoss m-3' onClick={() => setOpenMLSO(true)}/>
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={3} sx={{ marginTop: 0 }} direction="row">
                    <Grid item xs={4} className='row'>
                        <TextField
                            id="principle"
                            label="Payment Request Number"
                            variant="filled"
                            onClick={() => !isEditDisabled ? setOpenMLSO(true) : setOpenMLSO(false)}
                            value={formPayment.principleBy}
                            disabled={isEditDisabled}
                        />
                        <TextField
                            id="principle"
                            label="Reference"
                            variant="filled"
                            onClick={() => !isEditDisabled ? setOpenMLSO(true) : setOpenMLSO(false)}
                            value={formPayment.principleBy}
                            disabled={isEditDisabled}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <div className='border border-secondary rounded p-3'>
                            <span>Payment To</span>
                            <hr/>
                            <div className='row mt-4'>
                                <RadioGroup
                                    row
                                    name="row-radio-buttons-group"
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    value={formPayment.paymentTo}
                                    onChange={(e) => handleSetPaymentTo(e.target.value)}
                                >
                                    <FormControlLabel value="SSLine" control={<Radio/>} label="SSLine"
                                                      disabled={isEditDisabled}/>
                                    <FormControlLabel value="EMKL" control={<Radio/>} label="EMKL"
                                                      disabled={isEditDisabled}/>
                                    <FormControlLabel value="Rebate" control={<Radio/>} label="Rebate"
                                                      disabled={isEditDisabled}/>
                                    <FormControlLabel value="Depo" control={<Radio/>} label="Depo"
                                                      disabled={isEditDisabled}/>
                                </RadioGroup>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className='border border-secondary rounded p-3'>
                            <span>Rate</span>
                            <hr/>
                            <div className='row'>
                                <div className='col-6'>
                                    <TextField id="filled-basic" label="Rate" name="rate" value={formPayment.rate}
                                               onChange={change} className='block'
                                               variant="standard" size='small' disabled/>
                                </div>
                                <div className='col-6'>
                                    <TextField id="filled-basic" label="-" name="rate" value={formPayment.rate}
                                               onChange={change} className='block'
                                               variant="standard" size='small' disabled/>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={3} sx={{ marginTop: 0 }} direction="row">
                    <Grid item xs={4} className='row'>
                        <div className='col-5'>
                            <TextField id="filled-basic" label="Printing"
                                       onChange={(e) => handleApprove(e.target.value)} className='block'
                                       variant="standard" size='small' disabled/>
                        </div>
                        <div className='col-7'>
                            <TextField id="filled-basic" label="-"
                                       onChange={(e) => handleApprove(e.target.value)} className='block'
                                       variant="standard" size='small' disabled/>
                        </div>

                        <TextField className='mt-3'
                            id="principle"
                            label="DN Vendor"
                            variant="filled"
                            onClick={() => !isEditDisabled ? setOpenMLSO(true) : setOpenMLSO(false)}
                            value={formPayment.principleBy}
                            disabled={isEditDisabled}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <div className='row'>
                            <div className="col-4">
                                <TextField id="filled-basic" label="Customer"
                                           onChange={(e) => handleApprove(e.target.value)} className='block'
                                           variant="standard" size='small' disabled/>
                            </div>
                            <div className="col-1 text-center pt-3">
                                <FindInPageIcon className='text-infoss' onClick={() => handleApprove(true)}/>
                            </div>
                            <div className="col-7">
                                <TextField id="filled-basic" label="Customer Name"
                                           onChange={(e) => handleApprove(e.target.value)} className='block'
                                           variant="standard" size='small' disabled/>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className="col-4">
                                <TextField id="filled-basic" label="Personal"
                                           onChange={(e) => handleApprove(e.target.value)} className='block'
                                           variant="standard" size='small' disabled/>
                            </div>
                            <div className="col-1 text-center pt-3">
                                <FindInPageIcon className='text-infoss' onClick={() => handleApprove(true)}/>
                            </div>
                            <div className="col-7">
                                <TextField id="filled-basic" label="Personal Name"
                                           onChange={(e) => handleApprove(e.target.value)} className='block'
                                           variant="standard" size='small' disabled/>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Grid item>
                    <Box sx={{ border: 1, borderRadius: 1, p: 1, mt: 3 }}>
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            flex-direction="row"
                        >
                            <Grid item>
                                <Typography variant="overline" display="block" gutterBottom>
                                    Being For Payment
                                </Typography>
                            </Grid>
                            <Grid item>
                                <RadioGroup
                                    row
                                    name="vat-radio"
                                    value={formPayment.vat}
                                    onChange={change}
                                >
                                    <FormControlLabel value={11} control={<Radio />} label="ALL - VAT 11%" />
                                    <FormControlLabel value={1.1} control={<Radio />} label="ALL - VAT 1,1%" />
                                </RadioGroup>
                            </Grid>
                        </Grid>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Code</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Amount USD</TableCell>
                                        <TableCell>Amount IDR</TableCell>
                                        <TableCell>VAT</TableCell>
                                        <TableCell/>
                                        <TableCell>CostToCost</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        IncShipperData.length > 0
                                            ?
                                            IncShipperData.map((el) => {
                                                return (
                                                    <TableRow
                                                        key={el.sequence}
                                                        onClick={() => setSelectedDetail(el)}
                                                        sx={selectedDetail.sequence === el.sequence ? selectedStyle : el.rowStatus === 'DEL' ? deletedDetailStyle : {}}
                                                    >
                                                        <TableCell>{el.sequence}</TableCell>
                                                        <TableCell>{el.description}</TableCell>
                                                        <TableCell>
                                                            {el.amountCrr === 0 ? new Intl.NumberFormat().format(el.amount) : 0}
                                                        </TableCell>
                                                        <TableCell>
                                                            {el.amountCrr === 1 ? new Intl.NumberFormat().format(el.amount) : 0}
                                                        </TableCell>
                                                        <TableCell>{el.percentVat ? el.percentVat : 0}%</TableCell>
                                                        <TableCell>{el.sign === true ? '+' : '-'}</TableCell>
                                                        <TableCell>{el.isCostToCost === true ? 'Yes' : 'No'}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                            :
                                            <TableRow>
                                                <TableCell colSpan={7} sx={{ textAlign: 'center' }}>Data Empty</TableCell>
                                            </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            flexDirection="row"
                            sx={{ mt: 2 }}
                        >
                            <Grid item container spacing={2} flexDirection="row" xs={6}>
                                <Grid item>
                                    <Button variant="outlined" startIcon={<AddBoxIcon />} color="secondary" onClick={() => addTruckingDetail()}>
                                        ADD
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" startIcon={<ModeEditIcon />} color="secondary" onClick={() => editTruckingDetail()}>
                                        EDIT
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" startIcon={<DeleteIcon />} color="secondary" onClick={() => deleteTruckingDetail()}>
                                        DELETE
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid item container flexDirection="row-reverse" xs={6} spacing={2}>
                                <Grid item>
                                    <Button variant="outlined" startIcon={<AddToPhotosIcon />} color="secondary" onClick={() => console.log('setOpenStorage(true)')}>
                                        Add Trucking
                                    </Button>
                                </Grid>
                                {
                                    formPayment.ContactTypeId === 5
                                        ?
                                        <>
                                            <Grid item>
                                                <Button variant="outlined" startIcon={<AddToPhotosIcon />} color="secondary" onClick={() => console.log('setOpenPs(true)')}>
                                                    add ps
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="outlined" startIcon={<AddToPhotosIcon />} color="secondary" onClick={() => console.log('setOpenHf(true)')}>
                                                    add hf
                                                </Button>
                                            </Grid>
                                        </>
                                        :
                                        <></>
                                }
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid container spacing={2} flexDirection="row" alignItems="center">
                    <Grid item>
                        <Box sx={{ border: 1, borderRadius: 1, p: 1, mt: 1 }}>
                            <RadioGroup id="paid-radio" name="paid" value={formPayment.paid} onChange={change}>
                                <FormControlLabel value={true} control={<Radio />} label="Paid" disabled/>
                                <FormControlLabel value={false} control={<Radio />} label="Not Paid" disabled/>
                            </RadioGroup>
                        </Box>
                    </Grid>
                    <Grid item>
                        <NumericFormat
                            customInput={TextField}
                            thousandSeparator=","
                            label='Payment USD'
                            onValueChange={change}
                            value={formPayment.paymentUSD}
                            name="paymentUSD"
                            id="payment-usd"
                            variant="filled"
                            disabled
                        />
                    </Grid>
                    <Grid item>
                        <NumericFormat
                            customInput={TextField}
                            thousandSeparator=","
                            label='Payment IDR'
                            onValueChange={change}
                            value={formPayment.paymentIDR}
                            name="paymentIDR"
                            id="payment-idr"
                            variant="filled"
                            disabled
                        />
                    </Grid>
                    <Grid item>
                        <NumericFormat
                            customInput={TextField}
                            thousandSeparator=","
                            label='Total Vat USD'
                            onValueChange={change}
                            value={formPayment.totalVATUSD}
                            name="totalVATUSD"
                            id="vat-usd"
                            variant="filled"
                            disabled
                        />
                    </Grid>
                    <Grid item>
                        <NumericFormat
                            customInput={TextField}
                            thousandSeparator=","
                            label='Total Vat IDR'
                            onValueChange={change}
                            value={formPayment.totalVATIDR}
                            name="totalVATIDR"
                            id="vat-idr"
                            variant="filled"
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} flexDirection="row" alignItems="center">
                    <Grid item>
                        <Box sx={{ border: 1, borderRadius: 1, p: 1, mt: 1 }}>
                            <FormLabel id="invoice-rate-label">Rate</FormLabel>
                            <Grid container item spacing={2} direction="row">
                                <Grid item>
                                    <TextField value={formPayment.rate} onChange={change} name="rate" id="rate-amount" label="Amount" variant="filled" aria-labelledby="invoice-rate-label" disabled />
                                </Grid>
                                <Grid item>
                                    <TextField value={formPayment.paidOn !== '' ? dateFormat(formPayment.paidOn) : formPayment.paidOn} onChange={change} name="paidOn" id="rate-date" label="Date" variant="filled" aria-labelledby="invoice-rate-label" disabled />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item>
                        <FormControl sx={{ minWidth: 110 }}>
                            <InputLabel id="invoice-currency-label">Currency</InputLabel>
                            <Select
                                labelId="invoice-currency-label"
                                id="invoice-currency-select"
                                name="currency"
                                value={formPayment.currency}
                                label="Invoice Currency"
                                onChange={change}
                                disabled={isEditDisabled}
                            >
                                <MenuItem value={1}>ALL</MenuItem>
                                <MenuItem value={2}>IDR</MenuItem>
                                <MenuItem value={3}>USD</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField value={formPayment.kursKMK} onChange={change} name="kursKMK" id="kurs-kmk" label="Kurs KMK" variant="filled" disabled />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </>)
}

export default CrudPaymentRequestPage
