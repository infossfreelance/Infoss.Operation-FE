import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import { Button } from 'react-bootstrap'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const modalStyle = {
    position: 'absolute',
    top: '20%',
    left: '35%',
    bgcolor: 'background.paper', 
    p: 1,
    maxWidth: 400,
    maxHeight: 600,
    boxShadow: 24,
    borderRadius: 1,
}

const ModalInvoiceUtilities = (props) => {
    const [remarks, setRemarks] = useState('')
    const [deliveredDate, setDeliveredDate] = useState(new Date())
    const [isDelivered, setIsDelivered] = useState(0)
    const [isTaxed, setIsTaxed] = useState(1)
    const changePage = useNavigate();

    const handleSave = () => {
        if(props.type === 'credit') {
            props.handleSave(remarks)
        } else {
            let payload = {
                remarks,
                deliveredDate,
                isDelivered
            }
            props.handleSave(payload)
        }
        setRemarks('')
        props.close()
    }

    const handleClose = () => {
        setRemarks('')
        setDeliveredDate(new Date())
        setIsDelivered(0)
        props.resetType()
        props.close()
    }

    const editContra = () => {
        //PROSES MEMBUAT CONTRA INVOICE DAHULU LALU MASUK KE PAGE EDIT
        changePage('/booking/invoice/edit/' + props.selectedData.id)
        handleClose()
    }

    const clickPrint = (type) => {
        if(type === 'fixed') {
            //FIXED PRINT
            props.doPrint()
            handleClose()
        } else {
            //DRAFT PRINT
            props.doPrint()
            handleClose()
        }
    }

    return (
        <Modal open={props.open} onClose={handleClose}>
            <Grid container spacing={1} flexDirection='column' sx={ modalStyle }>
                <Grid item>
                    {
                        props.type === 'credit'
                        ?
                        <h5>Approval Credit</h5>
                        : 
                        props.type === 'edit' || props.type === 'edit-taxed'
                        ?
                        <h5>Edit Data</h5>
                        :
                        props.type === 'delivered'
                        ?
                        <h5>Delivered Status</h5>
                        :
                        props.type === 'journal'
                        ?
                        <h5>Invoice Journal</h5>
                        :
                        <h5>Print Data</h5>
                    }
                </Grid>
                <Grid item>
                    <Box sx={{ border: 1, borderRadius: 1, p: 1, maxHeight: 400, 'borderStyle': 'groove' }}>
                        {
                            props.type === 'credit' 
                            ?
                            <FormControl fullWidth margin='normal'> 
                                <TextareaAutosize
                                maxRows={5}
                                aria-label="maximum height"
                                placeholder="Remarks"
                                minRows={4}
                                value={remarks}
                                onChange={e => setRemarks(e.target.value)}
                                />
                            </FormControl>
                            : 
                            props.type === 'edit'
                            ?
                            <>
                                <h6>Type : General</h6>
                                <p>Invoice has been Printed</p>
                                <p>Edit will make Contra Invoices and New Invoices Automatically</p>
                            </>
                            :
                            props.type === 'delivered'
                            ?
                            <FormControl fullWidth>
                                <FormLabel id="delivered-label">Delivered</FormLabel>
                                <RadioGroup 
                                row 
                                name="delivered-label"
                                aria-labelledby="delivered-label"
                                value={isDelivered}
                                onChange={e => setIsDelivered(e.target.value)}
                                >
                                    <FormControlLabel value={1} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                </RadioGroup>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>      
                                    <DesktopDatePicker
                                        label="Date Delivered"
                                        minDate={new Date('2017-01-01')}
                                        inputFormat="dd-MM-yyyy"
                                        disabled={false}
                                        value={deliveredDate}
                                        onChange={e => setDeliveredDate(e)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>

                                <TextareaAutosize
                                style={{ marginTop: 10 }}
                                maxRows={5}
                                aria-label="maximum height"
                                placeholder="Remarks"
                                minRows={4}
                                value={remarks}
                                onChange={e => setRemarks(e.target.value)}
                                />
                            </FormControl>
                            :
                            props.type === 'edit-taxed'
                            ?
                            <>
                                <FormControl sx={{ border: 1, borderRadius: 1 }}>
                                    <FormLabel id="edit-from-label">Type</FormLabel>
                                    <RadioGroup 
                                    name="edit-from-label"
                                    aria-labelledby="edit-from-label"
                                    value={isTaxed}
                                    onChange={e => setIsTaxed(e.target.value)}
                                    >
                                        <FormControlLabel value={1} control={<Radio />} label={<><strong>Hard</strong> = No Faktur tidak bisa dipakai lagi</>} />
                                        <FormControlLabel value={0} control={<Radio />} label={<><strong>Soft</strong> = No Faktur masih bisa dipakai lagi</>} />
                                    </RadioGroup>
                                </FormControl>
                                <p>Invoice has been Printed</p>
                                <p>Edit will make Contra Invoices and New Invoices Automatically</p>
                            </>
                            :
                            props.type === 'journal'
                            ?
                            <FormControl fullWidth>
                                <FormLabel id="delivered-label">Invoice Date Print As Per Date</FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>      
                                    <DesktopDatePicker
                                        label="Journal Until"
                                        minDate={new Date('2017-01-01')}
                                        inputFormat="dd-MM-yyyy"
                                        disabled={false}
                                        value={deliveredDate}
                                        onChange={e => setDeliveredDate(e)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                            :
                            <>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="View Shipper Info" />
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="View Container Info" />
                                </FormGroup>
                                <p>Fixed (Yes) or Draft (No) Invoices ?</p>
                            </>
                        }
                    </Box>
                </Grid>
                <Grid item container spacing={2} flexDirection='row-reverse'>
                    {
                        props.type === 'edit' || props.type === 'edit-taxed'
                        ?
                        <>
                            <Grid item>
                                <Button variant="info" className='btn-sm' onClick={() => changePage('/booking/invoice/view/' + props.selectedData.id)}>
                                    View Only
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="danger" className='btn-sm' onClick={() => handleClose()}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="primary" className='btn-sm' onClick={() => editContra()}>
                                    OK
                                </Button>
                            </Grid>
                        </>
                        :
                        props.type === 'printing'
                        ?
                        <>
                            <Grid item>
                                <Button variant="danger" className='btn-sm' onClick={() => handleClose()}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="info" className='btn-sm' onClick={() => clickPrint('draft')}>
                                    No
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="primary" className='btn-sm' onClick={() => clickPrint('fixed')}>
                                    Yes
                                </Button>
                            </Grid>
                        </>
                        :
                        props.type === 'journal'
                        ?
                        <>
                            <Grid item>
                                <Button variant="danger" className='btn-sm' onClick={() => handleClose()}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="primary" className='btn-sm'>
                                    Process
                                </Button>
                            </Grid>
                        </>
                        :
                        <>
                            <Grid item>
                                <Button variant="danger" className='btn-sm' onClick={() => handleClose()}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="primary" className='btn-sm' onClick={() => handleSave()}>
                                    Save
                                </Button>
                            </Grid>
                        </> 
                    }
                </Grid>
            </Grid>
        </Modal>
    )
}

export default ModalInvoiceUtilities