import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
import CachedIcon from '@mui/icons-material/Cached';
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import PrintIcon from '@mui/icons-material/Print';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ApprovalIcon from '@mui/icons-material/Approval';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalTableInvoice from './modalTableInvoice'
import axios from 'axios'
import {API_URL, dateFormat} from '../../../helpers/constant';
import Swal from 'sweetalert2';
import NestedModal from "./modalInvoiceDetails";

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { 
        children, 
        value, 
        index, 
        customerId, 
        setCustomerId, 
        customerName, 
        setCustomerName,
        customerAddress,
        setCustomerAddress,
        setOpenContacts,
        isDisabled
    } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <FormLabel id="invoice-tabs">{children}</FormLabel>
                    </Grid>
                    <Grid container item spacing={2} direction="row" xs={12}>
                        <Grid item xs={4}>
                            <TextField 
                            id="tab-number" 
                            label="Number" 
                            variant="filled" 
                            aria-labelledby="invoice-tabs" 
                            disabled
                            value={customerId}
                            onChange={e => setCustomerId(e.target.value)}
                            fullWidth
                            onClick={() => isDisabled === false ? setOpenContacts(true) : setOpenContacts(false)} 
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                            id="tab-name" 
                            label="Name" 
                            variant="filled" 
                            aria-labelledby="invoice-tabs" 
                            disabled 
                            value={customerName}
                            onChange={e => setCustomerName(e.target.value)}
                            fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <TextareaAutosize
                        maxRows={3}
                        aria-label="maximum height"
                        placeholder="Address"
                        minRows={2}
                        style={{ width: 400 }}
                        value={customerAddress}
                        onChange={e => setCustomerAddress(e.target.value)}
                        variant='filled'
                        disabled
                        />
                    </Grid>
                </Grid>
            </Box>
        )}
        </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

let templateInvoice = {
    "invoice": {
      "rowStatus": "ACT",
      "countryId": 101,
      "companyId": 32,
      "branchId": 12,
      "id": 0,
      "ticketId": 0,
      "invoiceNo": 123,
      "debetCredit": "D",
      "shipmentId": 123,
      "customerTypeId": 0,
      "customerId": 0,
      "customerName": "s",
      "customerAddress": "s",
      "billId": 0,
      "billName": "s",
      "billAddress": "s",
      "invoicesTo": "s",
      "invoiceStatus": 0,
      "paymentUSD": 0,
      "paymentIDR": 0,
      "totalVatUSD": 0,
      "totalVatIDR": 0,
      "rate": 0,
      "exRateDate": "2022-09-26T04:48:42.216Z",
      "period": 0,
      "yearPeriod": 0,
      "invoicesAgent": "s",
      "invoicesEdit": "s",
      "jenisInvoices": "s",
      "linkTo": "s",
      "dueDate": 0,
      "paid": true,
      "paidOn": "2022-09-26T04:48:42.216Z",
      "saveOR": true,
      "badDebt": true,
      "badDebtOn": "2022-09-26T04:48:42.216Z",
      "reBadDebt": true,
      "dateReBadDebt": "2022-09-26T04:48:42.216Z",
      "printing": 0,
      "printedOn": "2022-09-26T04:48:42.216Z",
      "deleted": true,
      "deletedOn": "2022-09-26T04:48:42.216Z",
      "invoiceNo2": "s",
      "invHeader": 0,
      "exRateId": 0,
      "rePrintApproved": true,
      "rePrintApprovedOn": "2022-09-26T04:48:42.216Z",
      "rePrintApprovedBy": "s",
      "deletedRemarks": "s",
      "idLama": 0,
      "isCostToCost": true,
      "sfpId": 0,
      "sfpNoFormat": "s",
      "sfpDetailId": 0,
      "uniqueKeySFP": "s",
      "uniqueKeyInvoice": "s",
      "deleteType": 0,
      "deleteTypeRefInvId": 0,
      "kursKMK": 0,
      "kursKMKId": 0,
      "isDelivered": true,
      "deliveredOn": "2022-09-26T04:48:42.216Z",
      "deliveredRemarks": "s",
      "sfpReference": "s",
      "approvedCredit": true,
      "approvedCreditBy": 0,
      "approvedCreditOn": "2022-09-26T04:48:42.216Z",
      "approvedCreditRemarks": "s",
      "packingListNo": "s",
      "siCustomerNo": "s",
      "reference": "s",
      "isStampDuty": true,
      "stampDutyAmount": 0,
      "pejkpNumber": 0,
      "pejkpReference": "s",
      "user": "luna"
    },
    "invoiceDetails": [
      {
        "rowStatus": "ACT",
        "countryId": 101,
        "companyId": 32,
        "branchId": 12,
        "invoiceId": 0,
        "sequence": 0,
        "debetCredit": "D",
        "accountId": 0,
        "description": "s",
        "type": 0,
        "codingQuantity": true,
        "quantity": 0,
        "perQty": 0,
        "sign": true,
        "amountCrr": 0,
        "amount": 0,
        "percentVat": 0,
        "amountVat": 0,
        "eplDetailId": 0,
        "vatId": 0,
        "idLama": 0,
        "isCostToCost": true,
        "originalUsd": 0,
        "originalRate": 0,
        "user": "s",
        "invoiceDetailProfitShares": [
          {
            "rowStatus": "s",
            "countryId": 0,
            "companyId": 0,
            "branchId": 0,
            "invoiceDetilId": 0,
            "sequence": 0,
            "sFeet20": 0,
            "sFeet40": 0,
            "sFeetHQ": 0,
            "sFeetM3": 0,
            "sRate20": 0,
            "sRate40": 0,
            "sRateHQ": 0,
            "sRateM3": 0,
            "bFeet20": 0,
            "bFeet40": 0,
            "bFeetHQ": 0,
            "bFeetM3": 0,
            "bRate20": 0,
            "bRate40": 0,
            "bRateHQ": 0,
            "bRateM3": 0,
            "percentage": 0,
            "idLama": 0,
            "user": "s"
          }
        ],
        "invoiceDetailStorages": [
          {
            "rowStatus": "s",
            "countryId": 0,
            "companyId": 0,
            "branchId": 0,
            "invoiceDetailId": 0,
            "sequence": 0,
            "fromDate": "2022-09-26T04:48:42.216Z",
            "toDate": "2022-09-26T04:48:42.216Z",
            "totalDays": 0,
            "storageDetailId": 0,
            "amountIDR": 0,
            "amountUSD": 0,
            "storageId": 0,
            "user": "s"
          }
        ]
      }
    ],
    "invoiceReqDels": [
      {
        "rowStatus": "s",
        "countryId": 0,
        "companyId": 0,
        "branchId": 0,
        "id": 0,
        "reference": "s",
        "isNonJob": true,
        "invoiceId": 0,
        "deleteType": 0,
        "remarks": "s",
        "approvedStatus": 0,
        "approvedRemarks": "s",
        "approvedBy": "s",
        "approvedOn": "2022-09-26T04:48:42.217Z",
        "deleted": true,
        "deletedOn": "2022-09-26T04:48:42.217Z",
        "modifiedBy": "s",
        "modifiedOn": "2022-09-26T04:48:42.217Z",
        "createdBy": "s",
        "createdOn": "2022-09-26T04:48:42.217Z"
      }
    ],
    "invoiceExportEJKPs": [
      {
        "rowStatus": "s",
        "countryId": 0,
        "companyId": 0,
        "branchId": 0,
        "invoiceId": 0,
        "sequence": 0,
        "pejkpNumber": 0,
        "isExported": true,
        "exportedOn": "2022-09-26T04:48:42.217Z",
        "exportedBy": "s",
        "isUploaded": true,
        "uploadedOn": "2022-09-26T04:48:42.217Z",
        "uploadedBy": "s",
        "modifiedBy": "s",
        "modifiedOn": "2022-09-26T04:48:42.217Z",
        "createdBy": "s",
        "createdOn": "2022-09-26T04:48:42.217Z"
      }
    ],
    "invoiceExportFakturs": [
      {
        "rowStatus": "s",
        "countryId": 0,
        "companyId": 0,
        "branchId": 0,
        "invoiceId": 0,
        "sequence": 0,
        "isInvoiceNonJob": true,
        "isExported": true,
        "exportedOn": "2022-09-26T04:48:42.217Z",
        "exportedBy": "s",
        "isUploaded": true,
        "uploadedOn": "2022-09-26T04:48:42.217Z",
        "uploadedBy": "s",
        "modifiedBy": "s",
        "modifiedOn": "2022-09-26T04:48:42.217Z",
        "createdBy": "s",
        "createdOn": "2022-09-26T04:48:42.217Z"
      }
    ]
}

let revisedHeadersDummy = [
    {
        "column": "invoiceNo",
        "text": "Invoice Number",
        "format": ""
    },
    {
        "column": "printedOn",
        "text": "Printed On",
        "format": ""
    },
]

let storageHeadersDummy = [
    {
        "column": "code",
        "text": "Code",
        "format": ""
    },
    {
        "column": "name",
        "text": "Name",
        "format": ""
    },
    {
        "column": "crr",
        "text": "Crr",
        "format": ""
    },
    {
        "column": "payment",
        "text": "Payment",
        "format": ""
    },
    {
        "column": "type",
        "text": "Type",
        "format": ""
    },
]

const CreateInvoicePage = () => {
    const { invId } = useParams()
    const history = useNavigate()
    const [tabValue, setTabValue] = useState(0);
    const [shipmentData, setShipmentData] = useState({})
    const [openMLSO, setOpenMLSO] = useState(false)
    const [LSOHeaders, setLSOHeaders] = useState([])
    const [LSOData, setLSOData] = useState([])
    const [isInvoice, setIsInvoice] = useState(true)
    const [isCTC, setIsCTC] = useState(false)
    const [invoiceNo, setInvoiceNo] = useState('')
    const [printing, setPrinting] = useState(0)
    const [printedOn, setPrintedOn] = useState('')
    const [invHeader, setInvHeader] = useState(0)
    const [packingListNo, setPackingListNo] = useState('')
    const [siCustomerNo, setSiCustomerNo] = useState('')
    const [debetCredit, setDebetCredit] = useState('D')
    const [customerTypeId, setCustomerTypeId] = useState(0)
    const [customerId, setCustomerId] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [customerAddress, setCustomerAddress] = useState('')
    const [eFaktur, setEFaktur] = useState('')
    const [revisedInvNo, setRevisedInvNo] = useState('')
    const [isStampDuty, setIsStampDuty] = useState(false)
    const [stampDutyAmount, setStampDutyAmount] = useState(0)
    const [invoiceDetails, setInvoiceDetails] = useState([])
    const [paymentUSD, setPaymentUSD] = useState(0)
    const [paymentIDR, setPaymentIDR] = useState(0)
    const [totalVATUSD, setTotalVATUSD] = useState(0)
    const [totalVATIDR, setTotalVATIDR] = useState(0)
    const [paid, setPaid] = useState(false)
    const [paidOn, setPaidOn] = useState('')
    const [rate, setRate] = useState(0)
    const [currency, setCurrency] = useState(1)
    const [kursKMK, setKursKMK] = useState(0)
    const [editInvoice, setEditInvoice] = useState({})
    const [isDisabled, setIsDisabled] = useState(false)
    const [dataContacts, setDataContacts] = useState([])
    const [headerContacts, setHeaderContacts] = useState([])
    const [maxPageContacts, setMaxPageContacts] = useState(0)
    const [openContacts, setOpenContacts] = useState(false)
    const [selectedContact, setSelectedContact] = useState({})
    const [openRevised, setOpenRevised] = useState(false)
    const [handleSelectRevised, setHandleSelectRevised] = useState({})
    const [headerRevised, setHeaderRevised] = useState(revisedHeadersDummy)
    const [dataRevised, setDataRevised] = useState({})
    const [openStorage, setOpenStorage] = useState(false)
    const [selectedStorage, setSelectedStorage] = useState({})
    const [headerStorage, setHeaderStorage] = useState(storageHeadersDummy)
    const [dataStorage, setDataStorage] = useState([])
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [detailSequence, setDetailSequence] = useState(0)

    useEffect(() => {
        getShipmentOrder(50, 1)
        fetchContact(50, 1)
        if(invId) {
            console.log('mode edit', invId)
            setIsDisabled(true)
            fetchEditData(invId)
            fetchRevised(50, 1)
        } else {
            console.log('mode create')
            // setInvoiceDetails(templateInvoice.invoiceDetails)
        }
    }, [invId]);

    const fetchStorage = (rowsCount = 50, NumPage = 1) => {
        console.log('fetch invoice details storage')
    }

    const fetchRevised = (rowsCount = 50, NumPage = 1) => {
        console.log('fetch revised invoice tax number')
    }

    const fetchEditData = (invId) => {
        console.log('invoice id', invId)
        axios.post(
            `http://stage-operation.api.infoss.solusisentraldata.com/invoice/invoice/PostById?id=${invId}`,
            {
                "userCode": "luna",
                "countryId": 101,
                "companyId": 32,
                "branchId": 12
            }
        ).then(response => {
            console.log('data edit', response)
            setInvoiceDetails(response.data.data.invoiceDetails)
            let tempDetail = response.data.data.invoiceDetails
            if(tempDetail.length > 0) {
                setDetailSequence(tempDetail[tempDetail.length-1].sequence)
            }

            setEditInvoice(response.data.data.invoice)

            let temp = response.data.data.invoice
            setIsCTC(temp.isCostToCost)
            setInvoiceNo(temp.invoiceNo)
            setPrinting(temp.printing)
            setPrintedOn(temp.printedOn)
            setInvHeader(temp.invHeader)
            setPackingListNo(temp.packingListNo)
            setSiCustomerNo(temp.siCustomerNo)
            setCustomerTypeId(temp.customerTypeId)
            setCustomerId(temp.customerId)
            setCustomerName(temp.customerName)
            setCustomerAddress(temp.customerAddress)
            setDebetCredit(temp.debetCredit === '' ? 'D' : temp.debetCredit)
            setIsStampDuty(temp.isStampDuty)
            setStampDutyAmount(temp.stampDutyAmount)
            setPaymentUSD(temp.paymentUSD)
            setPaymentIDR(temp.paymentIDR)
            setTotalVATIDR(temp.totalVatIDR)
            setTotalVATUSD(temp.totalVatUSD)
            setPaid(temp.paid)
            setPaidOn(temp.paidOn)
            setRate(temp.rate)
            setKursKMK(temp.kursKMK)
        }).catch(error => console.error(error))
    }

    const getShipmentOrder = (rowsCount = 50, NumPage = 1) => {
        // axios.get(API_URL + `shipmentorder/shipmentorder/${NumPage}/${rowsCount}`)
        axios.post(
            // `http://stage-operation.api.infoss.solusisentraldata.com/shipmentorder/shipmentorder/PostByPage?columnCode=COMBO&pageNumber=${NumPage}&pageSize=${rowsCount}`,
            `http://stage-operation.api.infoss.solusisentraldata.com/shipmentorder/shipmentorder/PostByPage?columnCode=PAGE&pageNumber=${NumPage}&pageSize=${rowsCount}`,
            {
                "userCode": "luna",
                "countryId": 101,
                "companyId": 32,
                "branchId": 12
            }
        )
        .then((response) => {
            setLSOHeaders(response.data.data.columns)
            setLSOData(response.data.data.shipmentOrders)
            console.log('data ship list', response)
        })
        .catch(function (error) {
          console.error(error)
        })
    }

    const fetchContact = (rows = 50, page = 1) => {
        axios.post(`http://stage-master.api.infoss.solusisentraldata.com/regcontact/regcontact/PostByPage?contactTypeId=1&pageNumber=${page}&pageSize=${rows}`,
        {
            "userCode": "luna",
            "countryId": 101,
            "companyId": 32,
            "branchId": 12
        }).then(response => {
            console.log('response contact', response)
            setDataContacts(response.data.data.contact)
            setHeaderContacts(response.data.data.columns)
            setMaxPageContacts(response.data.totalPage)
        }).catch(error => console.error(error))
    }

    const handleTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSubmit = () => {
        if(invId) {
            let payload = {
                invoice : editInvoice,
                invoiceDetails
            }
            payload.invoice.shipmentId = shipmentData.id
            payload.invoice.customerAddress = customerAddress
            payload.invoice.invHeader = invHeader
            payload.invoice.packingListNo = packingListNo
            payload.invoice.siCustomerNo = siCustomerNo
            payload.invoice.isStampDuty = isStampDuty
            payload.invoice.stampDutyAmount = stampDutyAmount
            console.log('payload', payload)
            axios.put(
                'http://stage-operation.api.infoss.solusisentraldata.com/invoice/invoice/Update',
                payload
            ).then(response => {
                console.log('res update', response)
                history('/booking/invoice')
            }).catch(error => console.error(error))
        } else {
            let payload = {
                invoice: {
                    "rowStatus": "ACT",
                    "countryId": 101,
                    "companyId": 32,
                    "branchId": 12,
                    "debetCredit": debetCredit,
                    "shipmentId": shipmentData.id,
                    "customerTypeId": 0,
                    "customerId": customerId,
                    "customerName": customerName,
                    "customerAddress": customerAddress,
                    "paymentUSD": paymentUSD,
                    "paymentIDR": paymentIDR,
                    "totalVatUSD": totalVATUSD,
                    "totalVatIDR": totalVATIDR,
                    "rate": rate,
                    "paid": paid,
                    "paidOn": paidOn,
                    "printing": printing,
                    "printedOn": printedOn,
                    "deleted": false,
                    "deletedOn": "",
                    "invHeader": invHeader,
                    "rePrintApproved": false,
                    "rePrintApprovedOn": "",
                    "rePrintApprovedBy": "",
                    "isCostToCost": isCTC,
                    "kursKMK": kursKMK,
                    "packingListNo": packingListNo,
                    "siCustomerNo": siCustomerNo,
                    "isStampDuty": isStampDuty,
                    "stampDutyAmount": stampDutyAmount,
                    "user": "luna"
                },
                invoiceDetails: []
            }

            axios.post(
                'http://stage-operation.api.infoss.solusisentraldata.com/invoice/invoice/Create',
                payload
            ).then(response => {
                console.log('res create', response)
                history('/booking/invoice')
            })
            .catch(error => console.error(error))
        }
    }

    const handleSelectContact = (value) => {
        console.log('select contact', value)
        setCustomerId(value.contactId)
        setCustomerName(value.pic)
        setCustomerAddress(value.contactAddress)
        setSelectedContact(value)
    }

    const renderStamp = () => {
        if(isStampDuty === 'true') {
            return (
                <TextField 
                value={stampDutyAmount}
                onChange={e => setStampDutyAmount(e.target.value)}
                variant="standard" 
                label="Amount" 
                id="invoice-stamp-duty"
                />
            )
        } else {
            return (
                <TextField 
                value={stampDutyAmount}
                onChange={e => setStampDutyAmount(e.target.value)}
                variant="filled" 
                disabled
                label="Amount" 
                id="invoice-stamp-duty"
                />
            )
        }
    }

    const handleDetailsAdd = () => {
        // if(!shipmentData.shipmentNo) {
        //     Swal.fire(
        //         'Information',
        //         "Shipment Order Number can't be empty...!!",
        //         'info'
        //     )
        // } else {
        // }
        setOpenModalDetail(true)
    }

    const saveDetail = (payload) => {
        setDetailSequence(payload.sequence)
        setInvoiceDetails(arr => [...arr, payload])
    }

    const handleDetailsEdit = () => {
        let no = detailSequence +1
        setDetailSequence(no)
        let tempObj = {
            no: no,
            name: 'aaa'
        }
        setInvoiceDetails(arr => [...arr, tempObj])
        console.log('lololo', invoiceDetails)
    }

    return (
        <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
                {
                    invId 
                    ?
                    <h4>Edit Invoice</h4>
                    :
                    <h4>Create New Invoice</h4>
                }
            </Grid>
            <Grid item xs={12}>
                <Stack direction='row' spacing={1}>
                    <Button variant="outlined" startIcon={<SaveIcon />} onClick={() => handleSubmit()}>
                        save
                    </Button>
                    <Button variant="outlined" startIcon={<ReplyIcon />} onClick={() => history('/booking/invoice')}>
                        back
                    </Button>
                    <Button variant="outlined" startIcon={<PrintIcon />}>
                        print
                    </Button>
                    <Button variant="outlined" startIcon={<AddToPhotosIcon />}>
                        add new
                    </Button>
                    <Button variant="outlined" startIcon={<ApprovalIcon />}>
                        reprint approval
                    </Button>
                    <Button variant="outlined" startIcon={<CachedIcon />}>
                        change invoice header
                    </Button>
                </Stack>
            </Grid>
            <Paper variant="outlined" sx={{ m: 2, p: 2 }}>
                <ModalTableInvoice 
                open={openMLSO} 
                onClose={() => setOpenMLSO(false)} 
                setSelectedData={(e) => setShipmentData(e)}
                headersData={LSOHeaders}
                bodyData={LSOData}
                fetchData={() => getShipmentOrder()}
                maxPage={1}
                type={'shipment'}
                setName={e => setCustomerName(e)}
                setId={e => setCustomerId(e)}
                setAddress={e => setCustomerAddress(e)}
                />

                <ModalTableInvoice 
                open={openContacts} 
                onClose={() => setOpenContacts(false)} 
                setSelectedData={(e) => handleSelectContact(e)}
                headersData={headerContacts}
                bodyData={dataContacts}
                fetchData={(r, p) => fetchContact(r, p)}
                type={'contact'}
                maxPage={maxPageContacts}
                />

                <ModalTableInvoice 
                open={openRevised} 
                onClose={() => setOpenRevised(false)} 
                setSelectedData={(e) => setHandleSelectRevised(e)}
                headersData={headerRevised}
                bodyData={dataRevised}
                fetchData={(r, p) => fetchRevised(r, p)}
                maxPage={1}
                type={'revised'}
                />

                <ModalTableInvoice 
                open={openStorage} 
                onClose={() => setOpenStorage(false)} 
                setSelectedData={(e) => setSelectedStorage(e)}
                headersData={headerStorage}
                bodyData={dataStorage}
                fetchData={(r, p) => fetchStorage(r, p)}
                maxPage={1}
                />

                <NestedModal 
                open={openModalDetail} 
                close={() => setOpenModalDetail(false)} 
                shipperNo={customerId} 
                shipperName={customerName}
                sequence={detailSequence}
                saveDetail={(e) => saveDetail(e)}
                detail={invoiceDetails}
                />

                <Grid container item spacing={3} direction="row">
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <FormLabel id="payment-from-label">Payment From</FormLabel>
                            <RadioGroup 
                            row 
                            name="payment-from-label"
                            aria-labelledby="payment-from-label"
                            value={isInvoice}
                            onChange={e => setIsInvoice(e.target.value)}
                            >
                                <FormControlLabel value={true} control={<Radio />} label="Invoices" disabled={isDisabled} />
                                <FormControlLabel value={false} control={<Radio />} label="General Invoices" disabled={isDisabled} />
                            </RadioGroup>

                            <FormLabel id="invoice-type-label">Type</FormLabel>
                            <RadioGroup 
                            row 
                            name="invoice-type-radio"
                            aria-labelledby="invoice-type-label"
                            // defaultValue={false}
                            value={isCTC}
                            onChange={e => setIsCTC(e.target.value)}
                            >
                                <FormControlLabel value={false} control={<Radio />} label="Non Cost To Cost" disabled={isDisabled} />
                                <FormControlLabel value={true} control={<Radio />} label="Cost To Cost" disabled={isDisabled} />
                            </RadioGroup>

                            <TextField value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} id="invoice-number" label="Invoice Number" variant="filled" disabled />

                            <Box mt={1}>
                                <FormLabel id="invoice-print-label">Printing</FormLabel>
                                <Grid container item spacing={2} direction="row">
                                    <Grid item>
                                        <TextField 
                                        value={printing}
                                        onChange={e => setPrinting(e.target.value)} 
                                        id="invoice-number" 
                                        label="Counter" 
                                        variant="filled" 
                                        aria-labelledby="invoice-print-label" 
                                        disabled 
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                        value={printedOn !== '' ? dateFormat(printedOn) : printedOn}
                                        onChange={e => setPrintedOn(e.target.value)} id="invoice-date" label="Date" variant="filled" aria-labelledby="invoice-print-label" disabled />
                                    </Grid>
                                </Grid>
                            </Box>

                            <TextField 
                            id="etd-invoice" 
                            label="ETD / ETA" 
                            variant="filled" 
                            margin="normal" 
                            value={ shipmentData.etd ? dateFormat(shipmentData.etd) : '' }
                            disabled
                            />
                            <TextField 
                            id="principle-invoice" 
                            label="Principle By" 
                            variant="filled" 
                            margin="normal" 
                            value={ shipmentData.jobOwnerId ? shipmentData.jobOwnerId : '' } 
                            disabled 
                            />
                            
                            <FormControl sx={{ mt: 2 }}>
                                <InputLabel id="invoice-header-label">Invoice Header</InputLabel>
                                <Select
                                labelId="invoice-header-label"
                                id="invoice-header-select"
                                value={invHeader}
                                label="Invoice Header"
                                onChange={e => setInvHeader(e.target.value)}
                                >
                                    <MenuItem value={0}>1 - AR</MenuItem>
                                    <MenuItem value={1}>2 - AR</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField 
                            value={packingListNo}
                            onChange={e => setPackingListNo(e.target.value)}
                            id="invoice-packing-list" 
                            label="Packing List" 
                            variant="standard" 
                            />
                            <TextField
                            value={siCustomerNo}
                            onChange={e => setSiCustomerNo(e.target.value)} id="invoice-si-customer" label="SI Customer" variant="standard" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField 
                            id="shipment-order-number" 
                            label="Shipment Order Number" 
                            variant="filled" 
                            onClick={() => isDisabled === false ? setOpenMLSO(true) : setOpenMLSO(false)} 
                            value={ shipmentData.shipmentNo ? shipmentData.shipmentNo : '' }
                            disabled={isDisabled}
                            />

                            <Box m={1}>
                                <FormLabel id="invoice-dc-label">Debet / Credit</FormLabel>
                                <RadioGroup 
                                row 
                                name="invoice-dc-radio"
                                aria-labelledby="invoice-dc-label"
                                value={debetCredit}
                                onChange={e => setDebetCredit(e.target.value)}
                                >
                                    <FormControlLabel value="D" control={<Radio />} label="Debit" disabled />
                                    <FormControlLabel value="C" control={<Radio />} label="Credit" disabled />
                                </RadioGroup>
                            </Box>

                            <Box sx={{ border: 1, borderRadius: 1, p: 1, width: '100%' }}>
                                <RadioGroup 
                                row 
                                name="shiper-or-agent-radio"
                                value={customerTypeId}
                                onChange={e => setCustomerTypeId(e.target.value)}
                                >
                                    <FormControlLabel value={0} control={<Radio />} label="Shipper" disabled={isDisabled} />
                                    <FormControlLabel value={1} control={<Radio />} label="Agent" disabled={isDisabled} />
                                </RadioGroup>

                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={tabValue} onChange={handleTab} aria-label="basic tabs example">
                                        <Tab label="Customer" {...a11yProps(0)} />
                                        <Tab label="Bill To" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel 
                                value={tabValue} 
                                index={0}
                                customerId={customerId}
                                setCustomerId={e => setCustomerId(e)}
                                customerName={customerName}
                                setCustomerName={e => setCustomerName(e)}
                                customerAddress={customerAddress}
                                setCustomerAddress={e => setCustomerAddress(e)}
                                setOpenContacts={e => setOpenContacts(e)}
                                isDisabled={isDisabled}
                                >
                                    Shipper
                                </TabPanel>
                                <TabPanel value={tabValue} index={1}>
                                    Bill To
                                </TabPanel>
                            </Box>
                        </FormControl>
                        <Grid item container spacing={2} direction="row">
                            <Grid item xs={6}>
                                <TextField 
                                value={eFaktur}
                                onChange={e => setEFaktur(e.target.value)}
                                variant="standard" 
                                label="Ref. E-Faktur" 
                                id="invoice-faktur" 
                                margin="normal" 
                                />
                                <TextField
                                value={revisedInvNo}
                                onChange={e => setRevisedInvNo(e.target.value)}
                                variant="filled" 
                                label="Revised Tax Inv. No" 
                                id="invoice-tax" 
                                margin="normal"
                                onClick={() => isDisabled === false ? setOpenRevised(true) : setOpenRevised(false)}
                                disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{ border: 1, borderRadius: 1, p: 1, mt: 2 }}>
                                    <Typography variant="overline" display="block" gutterBottom>
                                        stamp duty
                                    </Typography>

                                    <RadioGroup 
                                    row 
                                    name="stamp-duty-radio"
                                    value={isStampDuty}
                                    onChange={e => setIsStampDuty(e.target.value)}
                                    >
                                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                        <FormControlLabel value={false} control={<Radio />} label="No" />
                                    </RadioGroup>
                                    {renderStamp()}
                                </Box>
                            </Grid>
                        </Grid>
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
                                name="vat-radio">
                                    <FormControlLabel value="11" control={<Radio />} label="ALL - VAT 11%" />
                                    <FormControlLabel value="1,1" control={<Radio />} label="ALL - VAT 1,1%" />
                                </RadioGroup>
                            </Grid>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Code</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Amount USD</TableCell>
                                        <TableCell>Amount IDR</TableCell>
                                        <TableCell>VAT</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>CostToCost</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        invoiceDetails.length > 0 
                                        ?
                                        invoiceDetails.map((el, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>{el.sequence}</TableCell>
                                                    <TableCell>{el.description}</TableCell>
                                                    <TableCell>{el.amount}</TableCell>
                                                    <TableCell>{el.amount}</TableCell>
                                                    <TableCell>{el.percentVat}%</TableCell>
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
                            <Grid item container spacing={2} flexDirection="row" xs={10}>
                                <Grid item>
                                    <Button variant="outlined" startIcon={<AddBoxIcon />} color="secondary" onClick={() => handleDetailsAdd()}>
                                        add
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" startIcon={<ModeEditIcon />} color="secondary" onClick={() => handleDetailsEdit()}>
                                        edit
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" startIcon={<DeleteIcon />} color="secondary">
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid item container flexDirection="row-reverse" xs={2}>
                                <Button variant="outlined" startIcon={<AddToPhotosIcon />} color="secondary" onClick={() => setOpenStorage(true)}>
                                    add storage
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid container spacing={2} flexDirection="row" alignItems="center">
                    <Grid item>
                        <Box sx={{ border: 1, borderRadius: 1, p: 1, mt: 1 }}>
                            <RadioGroup name="paid-radio" value={paid} onChange={e => setPaid(e.target.value)}>
                                <FormControlLabel value={true} control={<Radio />} label="Paid" disabled />
                                <FormControlLabel value={false} control={<Radio />} label="Not Paid" disabled />
                            </RadioGroup>
                        </Box>
                    </Grid>
                    <Grid item>
                        <TextField value={paymentUSD} onChange={e => setPaymentUSD(e.target.value)} id="payment-usd" label="Payment USD" variant="filled" disabled />
                    </Grid>
                    <Grid item>
                        <TextField value={paymentIDR} onChange={e => setPaymentIDR(e.target.value)} id="payment-idr" label="Payment IDR" variant="filled" disabled />
                    </Grid>
                    <Grid item>
                        <TextField value={totalVATUSD} onChange={e => setTotalVATUSD(e.target.value)} id="vat-usd" label="Total Vat USD" variant="filled" disabled />
                    </Grid>
                    <Grid item>
                        <TextField value={totalVATIDR} onChange={e => setTotalVATIDR(e.target.value)} id="vat-idr" label="Total Vat IDR" variant="filled" disabled />
                    </Grid>
                </Grid>
                <Grid container spacing={2} flexDirection="row" alignItems="center">
                    <Grid item>
                        <Box sx={{ border: 1, borderRadius: 1, p: 1, mt: 1 }}>
                            <FormLabel id="invoice-rate-label">Rate</FormLabel>
                            <Grid container item spacing={2} direction="row">
                                <Grid item>
                                    <TextField value={rate} onChange={e => setRate(e.target.value)} id="rate-amount" label="Amount" variant="filled" aria-labelledby="invoice-rate-label" disabled />
                                </Grid>
                                <Grid item>
                                    <TextField value={paidOn !== '' ? dateFormat(paidOn) : paidOn} onChange={e => setPaidOn(e.target.value)} id="rate-date" label="Date" variant="filled" aria-labelledby="invoice-rate-label" disabled />
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
                            value={currency}
                            label="Invoice Currency"
                            onChange={e => setCurrency(e.target.value)}
                            disabled={isDisabled}
                            >
                                <MenuItem value={1}>ALL</MenuItem>
                                <MenuItem value={2}>IDR</MenuItem>
                                <MenuItem value={3}>USD</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField value={kursKMK} onChange={e => setKursKMK(e.target.value)} id="kurs-kmk" label="Kurs KMK" variant="filled" disabled />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default CreateInvoicePage
