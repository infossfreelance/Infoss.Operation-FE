import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CachedIcon from '@mui/icons-material/Cached';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PrintIcon from '@mui/icons-material/Print';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ApprovalIcon from '@mui/icons-material/Approval';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
// import axios from 'axios';
import { Table, Dropdown, Pagination, Button } from 'react-bootstrap'
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useNavigate } from "react-router-dom";

const InvoicePage = () => {
    // const invoices2 = {
    //     headers: [ 'delete', 'type', 'ctc', 'inv. No.', 'paid' ],
    //     data: [
    //         {
    //             id: 1,
    //             delete: '1',
    //             type: 'Invoice',
    //             ctc: 1,
    //             invNo: '000262',
    //             paid: 1,          
    //         },
    //         {
    //             id: 2,
    //             delete: 0,
    //             type: 'Invoice',
    //             ctc: 0,
    //             invNo: '000263',
    //             paid: 0,
    //         },
    //         {
    //             id: 3,
    //             delete: 0,
    //             type: 'Invoice',
    //             ctc: 0,
    //             invNo: '000264',
    //             paid: 0,
    //         },
    //         {
    //             id: 4,
    //             delete: 1,
    //             type: 'Invoice',
    //             ctc: 0,
    //             invNo: '000265',
    //             paid: 0,
    //         },
    //         {
    //             id: 5,
    //             delete: 0,
    //             type: 'Bond',
    //             ctc: 0,
    //             invNo: '000266',
    //             paid: 0,
    //         }
    //     ]
    // }

    const invoices3 = {
        headers: [ 
            'delete',
            'type', 
            'ctc', 
            'inv. no.', 
            'paid', 
            'shipment no.', 
            'principle', 
            'sts', 
            'd/c', 
            'cancel d/c number', 
            'print date', 
            'customer',
            'amount Idr',
            'vat Idr',
            'total Idr',
            'amount Usd',
            'vat Usd',
            'total Usd',
            'due Date',
            'rate',
            'date Rate',
            'entry Date',
            'prepared By',
            'print',
            'dateDeleted',
            'date Paid',
            'no. Sfp',
            'date Delivered',
            'approval Credit',
            'bc Reference',
            'stamp Duty'
        ],
        data: [
            {
                id: 1,
                delete: 1,
                type: 'Invoice',
                ctc: 1,
                invNo: '000262',
                paid: 1,
                shipmentNo: 'AMJKT.10.000262-00',
                principle: '1 - AR',
                sts: 1,
                dc: 'D',
                cancelDcNumber: 'Cancel DN No. 000425',
                printDate: 'Jan 01, 2022',
                customer: 'PT. MULIAGLASS',
                amountIdr: '525,000.00',
                vatIdr: '52,500.00',
                totalIdr: '577,500.00',
                amountUsd: '0.00',
                vatUsd: '0.00',
                totalUsd: '0.00',
                dueDate: 'Feb 01, 2022',
                rate: '14,278.00',
                dateRate: 'Jan 30, 2022',
                entryDate: 'Jan 01, 2022',
                preparedBy: 'REZA',
                print: 1,
                dateDeleted: '',
                datePaid: '',
                noSfp: '',
                dateDelivered: '',
                approvalCredit: '',
                bcReference: '',
                stampDuty: 0
            },
            {
                id: 2,
                delete: 0,
                type: 'Invoice',
                ctc: 0,
                invNo: '000263',
                paid: 0,
                shipmentNo: 'AMJKT.10.000263-00',
                principle: '1 - AR',
                sts: 1,
                dc: 'D',
                cancelDcNumber: 'Cancel DN No. 000426',
                printDate: 'Jan 02, 2022',
                customer: 'PT. MULIAGLASS',
                amountIdr: '525,000.00',
                vatIdr: '52,500.00',
                totalIdr: '577,500.00',
                amountUsd: '0.00',
                vatUsd: '0.00',
                totalUsd: '0.00',
                dueDate: 'Feb 01, 2022',
                rate: '14,278.00',
                dateRate: 'Jan 30, 2022',
                entryDate: 'Jan 01, 2022',
                preparedBy: 'REZA',
                print: 1,
                dateDeleted: '',
                datePaid: '',
                noSfp: '',
                dateDelivered: '',
                approvalCredit: '',
                bcReference: '',
                stampDuty: 0
            },
            {
                id: 3,
                delete: 0,
                type: 'Invoice',
                ctc: 0,
                invNo: '000264',
                paid: 0,
                shipmentNo: 'AMJKT.10.000264-00',
                principle: '1 - AR',
                sts: 1,
                dc: 'C',
                cancelDcNumber: 'Cancel DN No. 000427',
                printDate: 'Jan 03, 2022',
                customer: 'PT. MULIAGLASS',
                amountIdr: '528,000.00',
                vatIdr: '52,800.00',
                totalIdr: '578,500.00',
                amountUsd: '0.00',
                vatUsd: '0.00',
                totalUsd: '0.00',
                dueDate: 'Feb 01, 2022',
                rate: '14,278.00',
                dateRate: 'Jan 30, 2022',
                entryDate: 'Jan 01, 2022',
                preparedBy: 'BETI',
                print: 1,
                dateDeleted: '',
                datePaid: '',
                noSfp: '',
                dateDelivered: '',
                approvalCredit: '',
                bcReference: '',
                stampDuty: 6000
            }
        ]
    }

    const [numPage, setNumPage] = useState(1)
    const [rowsCount, setRowsCount] = useState(50)
    const [SelectedData, setSelectedData] = useState({});
    const [job, setJob] = useState('');
    const [loading, setLoading] = useState(false)
    const [invoices, setInvoices] = useState(invoices3)
    const [invoicesMap, setInvoicesMap] = useState(invoices3)
    const history = useNavigate();

    useEffect(() => {
    //     setInvoices(invoices2)
    //     setInvoicesMap(invoices2)
    //     console.log(invoicesMap)
    }, [invoicesMap])

    // setInvoices(invoices2)
    // setInvoicesMap(invoices2)

    const handleChange = (event) => {
        setJob(event.target.value);
    };

    const filterTable = (key, val) => {
        console.log(key)
        console.log(val)

        // if (val === '') {
        //     setInvoicesMap(invoices)
        //     return false
        // } 
        
        // let temp = invoices
        // let arr = [];
    
        // if(key === 'delete') {
        //     invoices.data.forEach((v, k) => {
        //         console.log(v)
        //         v.delete.includes(val) && arr.push(v)
        //     })
        //     setInvoicesMap(arr)
        // }

        // if(key === 'type') {
        //     invoices.data.forEach((v, k) => {
        //         // console.log(v)
        //         v.type.includes(val) && arr.push(v)
        //     })
        //     temp.data = arr
        //     setInvoicesMap(temp)
        // }

        // if(key === 'inv. no.') {
        //     invoices.data.forEach((v, k) => {
        //         v.invNo.includes(val) && arr.push(v)
        //     })
        //     setInvoicesMap(arr)
        // }

        // console.log(invoicesMap)
    }

    return (
        <Grid container spacing={0} direction="column">
            <Grid item xs={12}>
                <h3>Invoice</h3>
            </Grid>
            <Grid container item spacing={2} direction="row" style={{'maxWidth': '100vw'}}>
                <Grid item xs={10}>
                    <Stack direction='row' spacing={1}>
                        <Button variant="outline-infoss" className='btn-sm'>
                            <CachedIcon /> Reload Data
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm' onClick={() => history('/booking/invoice/create')}>
                            <AddToPhotosIcon /> Add New
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm'>
                            <ModeEditOutlineIcon /> Edit Data
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm'>
                            <DeleteForeverIcon /> Delete
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm'>
                            <PrintIcon /> Print Data
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm'>
                            <ApprovalIcon /> RePrint Approval
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm'>
                            <LocalShippingIcon /> Delivered
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm'>
                            <DoneOutlineIcon /> Approval Credit
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm'>
                            <SummarizeIcon /> Journal
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="job-label">Job</InputLabel>
                        <Select
                        labelId="job-label"
                        id="job-select"
                        value={job}
                        label="Job"
                        onChange={handleChange}
                        sx={{ height: 40 }}
                        >
                            <MenuItem value={1}>Sea Export</MenuItem>
                            <MenuItem value={2}>Sea Import</MenuItem>
                            <MenuItem value={3}>Air Export</MenuItem>
                            <MenuItem value={4}>Air Import</MenuItem>
                            <MenuItem value={5}>PPJK Sea Export</MenuItem>
                            <MenuItem value={6}>PPJK Sea Import</MenuItem>
                            <MenuItem value={7}>PPJK Air Export</MenuItem>
                            <MenuItem value={8}>PPJK Air Import</MenuItem>
                            <MenuItem value={9}>Domestic</MenuItem>
                            <MenuItem value={10}>Trucking</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{'maxWidth': '97vw'}}>
                <div className='mt-3 border rounded-10 p-2 table-responsive'>
                    {
                        loading ? 
                        <LoadingSpinner /> 
                        :
                        <>
                            <Table hover className='table table-sm'>
                                <thead className='text-center text-infoss'>
                                    <tr>
                                        {
                                            invoices.headers.map((el, index) => {
                                                return (
                                                    <td key={index}>{el}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr>
                                        {
                                            invoices.headers.map((el, index) => {
                                                if(el === 'delete') {
                                                    return (
                                                        <td>
                                                            <select className='form-control col-search-form border-infoss'>
                                                                <option value="all">All</option>
                                                                <option value="yes">Yes</option>
                                                                <option value="no">No</option>
                                                            </select>
                                                        </td>
                                                    )
                                                } else {
                                                    return (
                                                        <td key={index}>
                                                            <input 
                                                            className="form-control col-search-form border-infoss" 
                                                            onChange={(e) => filterTable(el, e.target.value)} 
                                                            style={{ 'min-width': '100px' }}/>
                                                        </td> 
                                                    )
                                                }
                                            })
                                        }
                                    </tr>
                                    {
                                        invoicesMap.data.length > 0 
                                        ?
                                        invoicesMap.data.map((el, index) => {
                                            return (
                                                <tr 
                                                key={index} 
                                                onClick={(e) => setSelectedData(el)}
                                                className={SelectedData.id === el.id ? "bg-infoss text-white" : ( el.delete === 1 && "text-danger")}>
                                                    <td>{el.delete}</td>
                                                    <td>{el.type}</td>
                                                    <td>{el.ctc}</td>
                                                    <td style={{ position: 'sticky' }}>{el.invNo}</td>
                                                    <td>{el.paid}</td>
                                                    <td className='text-nowrap'>{el.shipmentNo}</td>
                                                    <td>{el.principle}</td>
                                                    <td>{el.sts}</td>
                                                    <td>{el.dc}</td>
                                                    <td className='text-nowrap'>{el.cancelDcNumber}</td>
                                                    <td>{el.printDate}</td>
                                                    <td className='text-nowrap'>{el.customer}</td>
                                                    <td>{el.amountIdr}</td>
                                                    <td>{el.vatIdr}</td>
                                                    <td>{el.totalIdr}</td>
                                                    <td>{el.amountUsd}</td>
                                                    <td>{el.vatUsd}</td>
                                                    <td>{el.totalUsd}</td>
                                                    <td>{el.dueDate}</td>
                                                    <td>{el.rate}</td>
                                                    <td>{el.dateRate}</td>
                                                    <td>{el.entryDate}</td>
                                                    <td>{el.preparedBy}</td>
                                                    <td>{el.print}</td>
                                                    <td>{el.dateDeleted}</td>
                                                    <td>{el.datePaid}</td>
                                                    <td>{el.noSfp}</td>
                                                    <td>{el.dateDelivered}</td>
                                                    <td>{el.approvalCredit}</td>
                                                    <td>{el.bcReference}</td>
                                                    <td>{el.stampDuty}</td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan={15} className="text-center py-3 text-muted">Data Empty</td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                            <div className='row mt-2'>
                                <div>
                                    <div>
                                        <div className='mx-4' style={{ display: 'inline-block' }}>
                                            <Pagination>
                                                <Pagination.Prev onClick={() => numPage > 1 ? setNumPage(numPage - 1) : setNumPage(1)} />
                                                <Pagination.Item active>
                                                    {numPage}
                                                </Pagination.Item>
                                                <Pagination.Next onClick={() => setNumPage(numPage + 1)} />
                                            </Pagination>
                                        </div>

                                        <Dropdown style={{ display: 'inline-block' }} className='mx-2'>
                                            <Dropdown.Toggle variant="outline-infoss sm" id="dropdown-basic">
                                                {rowsCount} Rows
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item className='dropdown-list' onClick={() => { setRowsCount(50); setNumPage(1) }}>50 Rows</Dropdown.Item>
                                                <Dropdown.Item className='dropdown-list' onClick={() => { setRowsCount(100); setNumPage(1) }}>100 Rows</Dropdown.Item>
                                                <Dropdown.Item className='dropdown-list' onClick={() => { setRowsCount(150); setNumPage(1) }}>150 Rows</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </Grid>
        </Grid>
    )
}

export default InvoicePage
