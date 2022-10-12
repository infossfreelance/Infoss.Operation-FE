import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const invoiceDetailTemp = [
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
]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 1300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 1,
  pb: 3,
  borderRadius: 1,
  maxHeight: 600,
  overflow: "hidden",
  overflowY: "scroll",
};

function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const [accountCode, setAccountCode] = useState('')
    let accountData = []

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <TextField
            onClick={handleOpen}
            value={accountCode}
            onChange={e => setAccountCode(e.target.value)} 
            id="account-code" 
            label="Code" 
            variant="filled" 
            aria-labelledby="account-label" 
            disabled
            />
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 1200 }}>
                    <Grid container flexDirection={'column'} spacing={2} alignItems='center'>
                        <Grid item container spacing={2} flexDirection='row'>
                            <Grid item>
                                <Button variant='contained'>Select Data</Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={handleClose} variant='outlined'>Close Window</Button>
                            </Grid> 
                        </Grid>
                        <Grid item>
                            <Box sx={{ border: 1, borderRadius: 1, overflow: 'hidden', maxHeight: 450 }}>
                                <TableContainer component={Paper} sx={{ maxHeight: 390 }}>
                                    <Table sx={{ minWidth: 600 }} aria-label="sticky table" stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Code</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Crr</TableCell>
                                                <TableCell>Payment</TableCell>
                                                <TableCell>Type</TableCell>
                                                <TableCell>Ctc</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <input className="form-control col-search-form border-infoss" />
                                                </TableCell>
                                                <TableCell>
                                                    <input className="form-control col-search-form border-infoss" />
                                                </TableCell>
                                                <TableCell>
                                                    <input className="form-control col-search-form border-infoss" />
                                                </TableCell>
                                                <TableCell>
                                                    <input className="form-control col-search-form border-infoss" />
                                                </TableCell>
                                                <TableCell>
                                                    <input className="form-control col-search-form border-infoss" />
                                                </TableCell>
                                                <TableCell>
                                                    <input className="form-control col-search-form border-infoss" />
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                accountData.length > 0
                                                ?
                                                accountData.map(el => {
                                                    return (
                                                        <TableRow key={el.id}>
                                                            <TableCell>{el.code}</TableCell>
                                                            <TableCell>{el.name}</TableCell>
                                                            <TableCell>{el.crr}</TableCell>
                                                            <TableCell>{el.payment}</TableCell>
                                                            <TableCell>{el.type}</TableCell>
                                                            <TableCell>{el.ctc}</TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                                :
                                                <TableRow>
                                                    <TableCell colSpan={6} sx={{ textAlign: 'center' }}>Data Empty</TableCell>
                                                </TableRow>
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default function NestedModal(props) {
    const [shipperNo, setShipperNo] = useState('')
    const [shipperName, setShipperName] = useState('')
    const [accountRadio, setAccountRadio] = useState('ALL')
    const [accountId, setAccountId] = useState('')
    const [accountName, setAccountName] = useState('')
    const [description, setDescription] = useState('')
    const [currencyRadio, setCurrencyRadio] = useState(1)
    const [checked, setChecked] = useState(false)
    const [signRadio, setSignRadio] = useState(true)
    const [vat, setVat] = useState('')
    const [quantity, setQuantity] = useState('')
    const [cost, setCost] = useState('')
    const [rate, setRate] = useState('')
    const [amount, setAmount] = useState('')
    const [originalUsd, setOriginalUsd] = useState('')

    useEffect(() => {
        setShipperNo(props.shipperNo)
        setShipperName(props.shipperName)
    }, [props.shipperNo, props.shipperName])

    const handleClose = () => {
        setShipperNo('')
        setShipperName('')
        setAccountRadio('ALL')
        setAccountId('')
        setAccountName('')
        setDescription('')
        setCurrencyRadio(1)
        setChecked(false)
        setSignRadio(true)
        setVat('')
        setQuantity('')
        setCost('')
        setRate('')
        setAmount('')
        setOriginalUsd('')
        
        props.close()
    };

    const handleSave = () => {
        let payload = {...invoiceDetailTemp[0]}
        
        let tempVat = 0
        if(vat === 11 || vat === 1.1) tempVat = vat

        let sequence = 1
        if(props.sequence > 0) sequence = props.sequence + 1

        payload.accountId = accountId
        payload.accountName = accountName
        payload.description = description
        payload.type = currencyRadio
        payload.isCostToCost = checked
        payload.sign = signRadio
        payload.percentVat = tempVat
        payload.quantity = quantity.length > 0 ? Number(quantity) : 0
        payload.perQty = cost.length > 0 ? Number(cost) : 0
        payload.originalRate = rate.length > 0 ? Number(rate) : 0
        payload.amount = amount.length > 0 ? Number(amount) : 0
        payload.originalUsd = originalUsd.length > 0 ? Number(originalUsd) : 0
        payload.invoiceDetailProfitShares = []
        payload.invoiceDetailStorages = []
        payload.user = 'luna'
        payload.sequence = sequence
        
        props.saveDetail(payload)
        handleClose()
    }

    return (
        <div>
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 850 }}>
            <Grid container spacing={2} flexDirection='column'>
                <Grid item>
                    <h5>Invoice to Shipper</h5>
                </Grid>
                <Grid item container spacing={2} flexDirection='row'>
                    <Grid item>
                        <Button variant='contained' onClick={() => handleSave()}>
                            Save
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant='outlined' onClick={() => handleClose()}>
                            Close
                        </Button>
                    </Grid>
                </Grid>
                <Grid container item spacing={2} flexDirection="row" alignItems="center" xs={12}>
                    <Grid item xs={2}>
                        <FormLabel id="shipper-label">Shipper :</FormLabel>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField 
                        value={shipperNo}
                        onChange={e => setShipperNo(e.target.value)} 
                        id="shipper-number" 
                        label="Number" 
                        variant="filled" 
                        aria-labelledby="shipper-label" 
                        disabled 
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                        value={shipperName}
                        onChange={e => setShipperName(e.target.value)}
                        id="shipper-name" 
                        label="Shipper Name" 
                        variant="filled" 
                        aria-labelledby="shipper-label" 
                        disabled 
                        />
                    </Grid>
                </Grid>
                <Grid item container spacing={2} flexDirection='row' alignItems="center" xs={12}>
                    <Grid item xs={2}>
                        <FormLabel id="account-label">Account :</FormLabel>
                    </Grid>
                    <Grid item xs={3}>
                        <ChildModal setAccountCode={(e) => setAccountId(e)}/>
                    </Grid>
                    <Grid item xs={7}>
                        <Box sx={{ border: 1, borderRadius: 1, p: 1 }}>
                            <RadioGroup row name="account-radio" value={accountRadio} onChange={e => setAccountRadio(e.target.value)}>
                                <FormControlLabel value={'20'} control={<Radio />} label="20" disabled />
                                <FormControlLabel value={'40'} control={<Radio />} label="40" disabled />
                                <FormControlLabel value={'45'} control={<Radio />} label="45" disabled />
                                <FormControlLabel value={'M3'} control={<Radio />} label="M3" disabled />
                                <FormControlLabel value={'ALL'} control={<Radio />} label="ALL" disabled />
                            </RadioGroup>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container spacing={2} flexDirection='row' alignItems="center" xs={12}>
                    <Grid item xs={2}>
                        <FormLabel id="account-label">Account Name :</FormLabel>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField 
                        id='account-name'
                        value={accountName}
                        onChange={e => setAccountName(e.target.value)}
                        variant='filled'
                        disabled
                        />
                    </Grid>
                </Grid>
                <Grid item container spacing={2} flexDirection='row' alignItems="center" xs={12}>
                    <Grid item xs={2}>
                        <FormLabel id="description-label">Description :</FormLabel>
                    </Grid>
                    <Grid item xs={10}>
                        <TextareaAutosize
                        maxRows={5}
                        minRows={4}
                        style={{ width: 400 }}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        variant='filled'
                        />
                    </Grid>
                </Grid>
                <Grid item container flexDirection='row' justifyContent="space-between">
                    <Grid item>
                        <Box sx={{ border: 1, borderRadius: 1, p: 1 }}>
                            <RadioGroup row name="currency-radio" value={currencyRadio} onChange={e => setCurrencyRadio(e.target.value)}>
                                <FormControlLabel value={0} control={<Radio />} label="USD" disabled />
                                <FormControlLabel value={1} control={<Radio />} label="IDR" disabled />
                            </RadioGroup>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box sx={{ border: 1, borderRadius: 1, p: 1 }}>
                            <FormGroup>
                                <FormControlLabel disabled control={<Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} />} label="Cost To Cost" />
                            </FormGroup>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container flexDirection={'row'} justifyContent='center' spacing={2} xs={12}>
                    <Grid item xs={2}>
                        <FormLabel id="quantity-label">Quantity Unit :</FormLabel>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                        id='quantity'
                        variant='standard'
                        placeholder='0.0000'
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid item container flexDirection={'row'} justifyContent='center' spacing={2} xs={12}>
                    <Grid item xs={2}>
                        <FormLabel id="quantity-label">Per Unit Cost :</FormLabel>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id='unit-cost' placeholder='0.00' variant='standard' value={cost} onChange={e => setCost(e.target.value)} />
                    </Grid>
                    <Grid item xs={2}>
                        <FormLabel id="rate-label">Original Rate :</FormLabel>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id='original-rate' placeholder='0.00' variant='standard' value={rate} onChange={e => setRate(e.target.value)} />
                    </Grid>
                </Grid>
                <Grid item container flexDirection={'row'} justifyContent='center' spacing={2} xs={12}>
                    <Grid item xs={2}>
                        <FormLabel id="amount-label">Amount :</FormLabel>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField id='amount' placeholder='0.00' variant='standard' value={amount} onChange={e => setAmount(e.target.value)} />
                    </Grid>
                    <Grid item xs={3}>
                        <RadioGroup row name="sign-radio" value={signRadio} onChange={e => setSignRadio(e.target.value)}>
                            <FormControlLabel value={true} control={<Radio />} label="+" disabled />
                            <FormControlLabel value={false} control={<Radio />} label="-" disabled />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={2}>
                        <FormLabel id="usd-label">Original USD :</FormLabel>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id='original-usd' placeholder='0.00' variant='standard' value={originalUsd} onChange={e => setOriginalUsd(e.target.value)}/>
                    </Grid>
                </Grid>
                <Grid item container flexDirection={'row'} justifyContent='center' spacing={2} xs={12}>
                    <Grid item xs={2}>
                        <FormLabel id="amount-label">Vat :</FormLabel>
                    </Grid>
                    <Grid item xs={10}>
                        <FormControl sx={{ minWidth: 110 }}>
                            <Select
                            id="vat-select"
                            value={vat}
                            onChange={e => setVat(e.target.value)}
                            displayEmpty
                            >
                                <MenuItem value={11.00}>11.00%</MenuItem>
                                <MenuItem value={1.10}>1.10%</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            </Box>
        </Modal>
        </div>
    );
}
