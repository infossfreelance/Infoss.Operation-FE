import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import Button from '@mui/material/Button';
import ReplyIcon from '@mui/icons-material/Reply';
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const JournalInvoicePage = () => {
    const history = useNavigate()
    const [list, setList] = useState([])
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    return (
        <Grid container flexDirection={'column'} spacing={2}>
            <Grid item>
                <h4>Invoice Journal</h4>
            </Grid>
            <Grid item>
                <Button variant="outlined" startIcon={<ReplyIcon />} onClick={() => history('/booking/invoice')}>
                    back
                </Button>
            </Grid>
            <Grid item container flexDirection={'row'} spacing={2}>
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>      
                        <DesktopDatePicker
                            label="Start Date"
                            minDate={new Date('2017-01-01')}
                            inputFormat="dd-MM-yyyy"
                            disabled={false}
                            value={startDate}
                            onChange={e => setStartDate(e)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>      
                        <DesktopDatePicker
                            label="End Date"
                            minDate={new Date('2017-01-01')}
                            inputFormat="dd-MM-yyyy"
                            disabled={false}
                            value={endDate}
                            onChange={e => setEndDate(e)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Grid item>
                <TableContainer component={Paper}>
                    <Table aria-label="sticky table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ctc</TableCell>
                                <TableCell>Invoice No</TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>SiCustomerNo</TableCell>
                                <TableCell>IsDelivered</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                list.length > 0
                                ?
                                list.map((el, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{el.ctc}</TableCell>
                                            <TableCell>{el.inveoiceNo}</TableCell>
                                            <TableCell>{el.customerName}</TableCell>
                                            <TableCell>{el.siCustomerNo}</TableCell>
                                            <TableCell>{el.isDelivered}</TableCell>
                                        </TableRow>
                                    )
                                })
                                :
                                <TableRow>
                                    <TableCell colSpan={5} sx={{ textAlign: 'center' }}>Data Empty</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default JournalInvoicePage