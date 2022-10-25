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
import axios from 'axios'
import {API_URL, dateFormat} from '../../../helpers/constant';
import { NumericFormat } from 'react-number-format';
import Swal from 'sweetalert2';

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

const selectedStyle = { bgcolor: (theme) => theme.palette.primary.main }

const ViewInvoicePage = () => {
    const { invId } = useParams()
    const history = useNavigate()
    const [tabValue, setTabValue] = useState(0);
    const [shipmentData, setShipmentData] = useState({})
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
    const [openContacts, setOpenContacts] = useState(false)
    const [detailSequence, setDetailSequence] = useState(0)
    const [selectedDetail, setSelectedDetail] = useState({})

    useEffect(() => {
        fetchEditData(invId)
    }, [invId]);

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
            setInvoiceDetails(response.data.data.invoice.invoiceDetails)
            let tempDetail = response.data.data.invoice.invoiceDetails
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
            }
        })
    }

    const handleTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const renderStamp = () => {
        if(isStampDuty === 'true') {
            return (
                <NumericFormat 
                customInput={TextField} 
                thousandSeparator="," 
                suffix={'.00'} 
                label='Amount'
                value={stampDutyAmount}
                id="invoice-stamp-duty"
                />
            )
        } else {
            return (
                <TextField 
                value={'0.00'}
                variant="filled"
                disabled
                label="Amount" 
                id="invoice-stamp-duty"
                />
            )
        }
    }

    return (
        <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
                <h4>View Invoice</h4>
            </Grid>
            <Grid item xs={12}>
                <Stack direction='row' spacing={1}>
                    <Button variant="outlined" startIcon={<SaveIcon />}>
                        save
                    </Button>
                    <Button variant="outlined" startIcon={<ReplyIcon />} onClick={() => history('/booking/invoice')}>
                        back
                    </Button>
                    <Button variant="outlined" startIcon={<PrintIcon />}>
                        print
                    </Button>
                    <Button variant="outlined" startIcon={<AddToPhotosIcon />} onClick={() => handleNewForm()}>
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
                                <FormControlLabel value={true} control={<Radio />} label="Invoices" disabled />
                                <FormControlLabel value={false} control={<Radio />} label="General Invoices" disabled />
                            </RadioGroup>

                            <FormLabel id="invoice-type-label">Type</FormLabel>
                            <RadioGroup 
                            row 
                            name="invoice-type-radio"
                            aria-labelledby="invoice-type-label"
                            value={isCTC}
                            onChange={e => setIsCTC(e.target.value)}
                            >
                                <FormControlLabel value={false} control={<Radio />} label="Non Cost To Cost" disabled />
                                <FormControlLabel value={true} control={<Radio />} label="Cost To Cost" disabled />
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
                                disabled
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
                            variant="filled"
                            disabled
                            />
                            <TextField
                            value={siCustomerNo}
                            onChange={e => setSiCustomerNo(e.target.value)} id="invoice-si-customer" label="SI Customer" variant="filled" disabled />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField 
                            id="shipment-order-number" 
                            label="Shipment Order Number" 
                            variant="filled" 
                            value={ shipmentData.shipmentNo ? shipmentData.shipmentNo : '' }
                            disabled
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
                                    <FormControlLabel value={0} control={<Radio />} label="Shipper" disabled />
                                    <FormControlLabel value={1} control={<Radio />} label="Agent" disabled />
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
                                variant="filled" 
                                label="Ref. E-Faktur" 
                                id="invoice-faktur" 
                                margin="normal"
                                disabled
                                />
                                <TextField
                                value={revisedInvNo}
                                onChange={e => setRevisedInvNo(e.target.value)}
                                variant="filled" 
                                label="Revised Tax Inv. No" 
                                id="invoice-tax" 
                                margin="normal"
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
                                        <FormControlLabel value={true} control={<Radio />} label="Yes" disabled />
                                        <FormControlLabel value={false} control={<Radio />} label="No" disabled />
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
                                    <FormControlLabel value="11" control={<Radio />} label="ALL - VAT 11%" disabled />
                                    <FormControlLabel value="1,1" control={<Radio />} label="ALL - VAT 1,1%" disabled />
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
                                                <TableRow 
                                                key={el.sequence} 
                                                sx={selectedDetail.sequence === el.sequence ? selectedStyle : {}}>
                                                    <TableCell>{el.sequence}</TableCell>
                                                    <TableCell>{el.description}</TableCell>
                                                    <TableCell>
                                                        {new Intl.NumberFormat().format(el.amount)}.00
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Intl.NumberFormat().format(el.amount)}.00
                                                    </TableCell>
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
                                    <Button variant="outlined" startIcon={<AddBoxIcon />} color="secondary" disabled>
                                        add
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" startIcon={<ModeEditIcon />} color="secondary" disabled>
                                        edit
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" startIcon={<DeleteIcon />} color="secondary" disabled>
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid item container flexDirection="row-reverse" xs={2}>
                                <Button variant="outlined" startIcon={<AddToPhotosIcon />} color="secondary" disabled>
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
                        <NumericFormat 
                        customInput={TextField} 
                        thousandSeparator="," 
                        suffix={'.00'} 
                        label='Payment USD'
                        value={paymentUSD}
                        id="payment-usd"
                        variant="filled"
                        disabled
                        />
                    </Grid>
                    <Grid item>
                        <NumericFormat 
                        customInput={TextField} 
                        thousandSeparator="," 
                        suffix={'.00'} 
                        label='Payment IDR'
                        value={paymentIDR}
                        id="payment-idr"
                        variant="filled"
                        disabled
                        />
                    </Grid>
                    <Grid item>
                        <NumericFormat 
                        customInput={TextField} 
                        thousandSeparator="," 
                        suffix={'.00'} 
                        label='Total Vat USD'
                        value={totalVATUSD}
                        id="vat-usd"
                        variant="filled"
                        disabled
                        />
                    </Grid>
                    <Grid item>
                        <NumericFormat 
                        customInput={TextField} 
                        thousandSeparator="," 
                        suffix={'.00'} 
                        label='Total Vat IDR'
                        value={totalVATIDR}
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
                            disabled
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

export default ViewInvoicePage
