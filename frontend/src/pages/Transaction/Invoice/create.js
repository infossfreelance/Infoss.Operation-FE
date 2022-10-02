import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
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
import ModalListSOInvoice from './modalListSOInvoice'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <FormLabel id="invoice-tabs">{children}</FormLabel>
                    </Grid>
                    <Grid container item spacing={2} direction="row">
                        <Grid item>
                            <TextField id="tab-number" label="Number" variant="filled" aria-labelledby="invoice-tabs" disabled />
                        </Grid>
                        <Grid item>
                            <TextField id="tab-name" label="Name" variant="filled" aria-labelledby="invoice-tabs" disabled />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <TextareaAutosize
                        maxRows={3}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        defaultValue="Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt
                        ut labore et 
                        dolore magna aliqua."
                        style={{ width: 600 }}
                        disabled/>
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

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CreateInvoicePage = () => {
    const history = useNavigate()
    const [header, setHeader] = useState('')
    const [tabValue, setTabValue] = useState(0);
    const [shipmentData, setShipmentData] = useState({})
    const [openMLSO, setOpenMLSO] = useState(false)

    const handleTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChange = (event) => {
        setHeader(event.target.value);
    };

    const handleSubmit = (event) => {
        console.log('submited')
        console.log(event)
    }

    console.log('ship = ', shipmentData)

    return (
        <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
                <h4>Create New Invoice</h4>
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
                <ModalListSOInvoice open={openMLSO} onClose={() => setOpenMLSO(false)} setSelectedData={(e) => setShipmentData(e)} />

                <Grid container item spacing={3} direction="row">
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <FormLabel id="payment-from-label">Payment From</FormLabel>
                            <RadioGroup 
                            row 
                            name="payment-from-label"
                            aria-labelledby="payment-from-label"
                            defaultValue="invoices"
                            >
                                <FormControlLabel value="invoices" control={<Radio />} label="Invoices" />
                                <FormControlLabel value="general-invoices" control={<Radio />} label="General Invoices" />
                            </RadioGroup>

                            <FormLabel id="invoice-type-label">Type</FormLabel>
                            <RadioGroup 
                            row 
                            name="invoice-type-radio"
                            aria-labelledby="invoice-type-label"
                            defaultValue="non-ctc"
                            >
                                <FormControlLabel value="non-ctc" control={<Radio />} label="Non Cost To Cost" />
                                <FormControlLabel value="ctc" control={<Radio />} label="Cost To Cost" />
                            </RadioGroup>

                            <TextField id="invoice-number" label="Invoice Number" variant="standard" />

                            <Box mt={1}>
                                <FormLabel id="invoice-print-label">Printing</FormLabel>
                                <Grid container item spacing={2} direction="row">
                                    <Grid item>
                                        <TextField id="invoice-number" label="Counter" variant="filled" aria-labelledby="invoice-print-label" disabled />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="invoice-date" label="Date" variant="filled" aria-labelledby="invoice-print-label" disabled />
                                    </Grid>
                                </Grid>
                            </Box>

                            <TextField 
                            id="etd-invoice" 
                            label="ETD / ETA" 
                            variant="filled" 
                            margin="normal" 
                            value={ shipmentData.etd ? shipmentData.etd : '' }
                            disabled
                            />
                            <TextField id="principle-invoice" label="Principle By" variant="filled" margin="normal" />
                            
                            <FormControl sx={{ mt: 2 }}>
                                <InputLabel id="invoice-header-label">Invoice Header</InputLabel>
                                <Select
                                labelId="invoice-header-label"
                                id="invoice-header-select"
                                value={header}
                                label="Invoice Header"
                                onChange={handleChange}
                                >
                                    <MenuItem value={1}>1 - AR</MenuItem>
                                    <MenuItem value={2}>2 - AR</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField id="invoice-packing-list" label="Packing List" variant="standard" />
                            <TextField id="invoice-si-customer" label="SI Customer" variant="standard" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField 
                            id="shipment-order-number" 
                            label="Shipment Order Number" 
                            variant="filled" 
                            onClick={() => setOpenMLSO(true)} 
                            value={ shipmentData.shipmentOrder ? shipmentData.shipmentOrder : '' }
                            />

                            <Box m={1}>
                                <FormLabel id="invoice-dc-label">Debet / Credit</FormLabel>
                                <RadioGroup 
                                row 
                                name="invoice-dc-radio"
                                aria-labelledby="invoice-dc-label"
                                defaultValue={'debit'}
                                >
                                    <FormControlLabel value="debit" control={<Radio />} label="Debit" />
                                    <FormControlLabel value="credit" control={<Radio />} label="Credit" />
                                </RadioGroup>
                            </Box>

                            <Box sx={{ border: 1, borderRadius: 1, p: 1, width: '100%' }}>
                                <RadioGroup 
                                row 
                                name="shiper-or-agent-radio"
                                defaultValue={'shipper'}
                                >
                                    <FormControlLabel value="shipper" control={<Radio />} label="Shipper" />
                                    <FormControlLabel value="agent" control={<Radio />} label="Agent" />
                                </RadioGroup>

                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={tabValue} onChange={handleTab} aria-label="basic tabs example">
                                        <Tab label="Customer" {...a11yProps(0)} />
                                        <Tab label="Bill To" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={tabValue} index={0}>
                                    Shipper
                                </TabPanel>
                                <TabPanel value={tabValue} index={1}>
                                    Bill To
                                </TabPanel>
                            </Box>
                        </FormControl>
                        <Grid item container spacing={2} direction="row">
                            <Grid item xs={6}>
                                <TextField variant="standard" label="Ref. E-Faktur" id="invoice-faktur" margin="normal" />
                                <TextField variant="standard" label="Revised Tax Inv. No" id="invoice-tax" margin="normal" />
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{ border: 1, borderRadius: 1, p: 1, mt: 2 }}>
                                    <Typography variant="overline" display="block" gutterBottom>
                                        stamp duty
                                    </Typography>

                                    <RadioGroup 
                                    row 
                                    name="stamp-duty-radio"
                                    defaultValue={'no'}
                                    >
                                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio />} label="No" />
                                    </RadioGroup>
                                    
                                    <TextField variant="standard" label="Amount" id="invoice-stamp-duty"/>
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
                                    <FormControlLabel value="1" control={<Radio />} label="ALL - VAT 1,1%" />
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
                                        <TableCell>Amound IDR</TableCell>
                                        <TableCell>VAT</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>CostToCost</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>049</TableCell>
                                        <TableCell>OCEAN FREIGHT</TableCell>
                                        <TableCell>0.00</TableCell>
                                        <TableCell>15,500,000.00</TableCell>
                                        <TableCell>11.00%</TableCell>
                                        <TableCell> + </TableCell>
                                        <TableCell>NO</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>050</TableCell>
                                        <TableCell>AIR FREIGHT</TableCell>
                                        <TableCell>1.00</TableCell>
                                        <TableCell>16,500,000.00</TableCell>
                                        <TableCell>11.00%</TableCell>
                                        <TableCell> + </TableCell>
                                        <TableCell>NO</TableCell>
                                    </TableRow>
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
                                    <Button variant="outlined" startIcon={<AddBoxIcon />} color="secondary">
                                        add
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" startIcon={<ModeEditIcon />} color="secondary">
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
                                <Button variant="outlined" startIcon={<AddToPhotosIcon />} color="secondary">
                                    add storage
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid container spacing={2} flexDirection="row" alignItems="center">
                    <Grid item>
                        <Box sx={{ border: 1, borderRadius: 1, p: 1, mt: 1 }}>
                            <RadioGroup name="paid-radio">
                                <FormControlLabel value="1" control={<Radio />} label="Paid" />
                                <FormControlLabel value="0" control={<Radio />} label="Not Paid" />
                            </RadioGroup>
                        </Box>
                    </Grid>
                    <Grid item>
                        <TextField id="payment-usd" label="Payment USD" variant="filled" disabled />
                    </Grid>
                    <Grid item>
                        <TextField id="payment-usd" label="Payment IDR" variant="filled" disabled />
                    </Grid>
                    <Grid item>
                        <TextField id="payment-usd" label="Total Vat USD" variant="filled" disabled />
                    </Grid>
                    <Grid item>
                        <TextField id="payment-usd" label="Total Vat IDR" variant="filled" disabled />
                    </Grid>
                </Grid>
                <Grid container spacing={2} flexDirection="row" alignItems="center">
                    <Grid item>
                        <Box sx={{ border: 1, borderRadius: 1, p: 1, mt: 1 }}>
                            <FormLabel id="invoice-rate-label">Rate</FormLabel>
                            <Grid container item spacing={2} direction="row">
                                <Grid item>
                                    <TextField id="rate-number" label="Amount" variant="filled" aria-labelledby="invoice-rate-label" disabled />
                                </Grid>
                                <Grid item>
                                    <TextField id="rate-date" label="Date" variant="filled" aria-labelledby="invoice-rate-label" disabled />
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
                            value={header}
                            label="Invoice Currency"
                            onChange={handleChange}
                            >
                                <MenuItem value={1}>USD</MenuItem>
                                <MenuItem value={2}>IDR</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField id="kurs-kmk" label="Kurs KMK" variant="filled" disabled />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default CreateInvoicePage
