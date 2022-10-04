import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
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
import axios from 'axios';
import { Table, Dropdown, Pagination, Button } from 'react-bootstrap'
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useNavigate } from "react-router-dom";
import { API_URL, dateFormat } from '../../../helpers/constant';
import Swal from 'sweetalert2';

const InvoicePage = () => {

    const [numPage, setNumPage] = useState(1)
    const [rowsCount, setRowsCount] = useState(5)
    const [totalRows, setTotalRows] = useState(5)
    const [SelectedData, setSelectedData] = useState({});
    const [job, setJob] = useState('');
    const [loading, setLoading] = useState(false)
    const [invoices, setInvoices] = useState([])
    const [invoicesMap, setInvoicesMap] = useState([])
    const [columnData, setColumnData] = useState([])
    const history = useNavigate();

    const ErrorAlert = (string) => {
        Swal.fire({
            icon: 'warning',
            title: 'Oops',
            text: string,
            customClass: {
                confirmButton: 'btn btn-infoss px-4'
            }
        });
    };

    useEffect(() => {
        fetchInvoices(numPage, rowsCount)
    }, [])

    const fetchInvoices = (pageNumber = 1, pageSize = 10) => {
        setLoading(true)
        const payload = {
            "userCode": "luna",
            "countryId": 101,
            "companyId": 32,
            "branchId": 12
        }
        // axios.post(API_URL + `invoice/invoice/PostByPage?pageNumber=${pageNumber}&pageSize=${pageSize}`, payload)
        axios.post(`https://localhost:7160/Invoice/PostByPageAll?pageNumber=${pageNumber}&pageSize=${pageSize}`, payload)
        .then((response) => {
            console.log('response fetch invoice', response)
            if(response.data.code === 200) {
                setInvoices(response.data.data.invoices);
                setInvoicesMap(response.data.data.invoices)
                // setColumnData(response.data.data.columns)
                setTotalRows(response.data.totalRowCount)
                setColumnData(
                    [
                        {
                            "column": "deleted",
                            "text": "Delete",
                            "format": ""
                        },
                        {
                            "column": "isCostToCost",
                            "text": "Ctc",
                            "format": ""
                        },
                        {
                            "column": "invoiceNo",
                            "text": "InvoiceNo",
                            "format": ""
                        },
                        {
                            "column": "customerName",
                            "text": "CustomerName",
                            "format": ""
                        },
                        {
                            "column": "printing",
                            "text": "Print",
                            "format": ""
                        },
                        {
                            column: 'printedOn',
                            text: 'Print Date',
                            format: 'date'
                        },
                    ]
                )
                setLoading(false)
            } else {
                setLoading(false)
                ErrorAlert(response.data.message)
            }
        })
        .catch(function (error) {
            setLoading(false)
            console.error(error)
            ErrorAlert(error.toString())
        })
    }

    const handlePrint = () => {
        if(SelectedData.id) {
            setLoading(true)
            console.log('print', SelectedData)
            let printCount = SelectedData.printing
            let canPrint = false
            if(SelectedData.printing === 0) {
                printCount += 1
                canPrint = true
            } else {
                if(SelectedData.rePrintApproved === true) {
                    printCount += 1
                    canPrint = true
                }
            }
            if(canPrint === true) {
                console.log('count', printCount)
                const payload = {
                    "rowStatus": SelectedData.rowStatus,
                    "countryId": 101,
                    "companyId": 32,
                    "branchId": 12,
                    "id": SelectedData.id,
                    "invoiceNo": SelectedData.invoiceNo,
                    "printing": printCount,
                    "user": "luna"
                }
                console.log(payload)
                axios.put('https://localhost:7160/Invoice/UpdateStatusPrint', payload)
                .then(response => {
                    console.log('hasil api print', response)
                    if(response.data.code === 200) {
                        fetchInvoices()
                        ErrorAlert('Data berhasil di print')
                        setLoading(false)
                    } else {
                        ErrorAlert(response.data.message)
                        setLoading(false)
                    }
                }).catch(error => {
                    console.error(error)
                    ErrorAlert(error.toString())
                })
            } else {
                ErrorAlert('Data sudah pernah di print')
                setLoading(false)
            }
        } else {
            ErrorAlert('Harap pilih data terlebih dahulu')
        }
    }

    const handleEdit = () => {
        console.log('edit ', SelectedData)
    }

    const handleRePrint = () => {
        console.log('re print', SelectedData)
        if(SelectedData.id) {
            setLoading(true)
            if(SelectedData.rePrintApproved === true) {
                ErrorAlert('Permintaan print ulang sudah di setujui')
            } else {
                const payload = {
                    "rowStatus": SelectedData.rowStatus,
                    "countryId": 101,
                    "companyId": 32,
                    "branchId": 12,
                    "id": SelectedData.id,
                    "invoiceNo": SelectedData.invoiceNo,
                    "rePrintApproved": 1,
                    "rePrintApprovedBy": "luna",
                    "user": "luna"
                }
                axios.put('https://localhost:7160/Invoice/UpdateStatusRePrint', payload)
                .then(response => {
                    console.log('response re print', response)
                    if(response.data.code === 200) {
                        fetchInvoices(numPage, rowsCount)
                        ErrorAlert('Permintaan print ulang sudah di setujui')
                        setLoading(false)
                    } else {
                        setLoading(false)
                        ErrorAlert(response.data.message)
                    }
                })
                .catch(error => {
                    console.error(error)
                    setLoading(false)
                    ErrorAlert(error.toString())
                })
            }
        } else {
            ErrorAlert('Harap pilih data terlebih dahulu')
        }
    }

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

    const renderPagination = () => {
        let MaxPage = 1
        if(invoices.length > 0) {
            MaxPage = Math.ceil( totalRows / rowsCount )
        }
        if (numPage === 1 && numPage !== MaxPage) {
          return (
            <div style={{ display: 'inline-block' }}>
              <Pagination>
                <Pagination.Item active>
                  {numPage}
                </Pagination.Item>
                <Pagination.Next onClick={() => { fetchInvoices(2, rowsCount); setNumPage(numPage + 1) }} />
              </Pagination>
            </div>
          )
        } else if (numPage === 1 && numPage === MaxPage) {
          return (
            <div style={{ display: 'inline-block' }}>
              <Pagination>
                <Pagination.Item active>
                  {numPage}
                </Pagination.Item>
              </Pagination>
            </div>
          )
        } else if (numPage === MaxPage) {
          return (
            <div style={{ display: 'inline-block' }}>
              <Pagination>
                <Pagination.Prev onClick={() => { fetchInvoices(numPage - 1, rowsCount); setNumPage(numPage - 1) }} />
                <Pagination.Item active>
                  {numPage}
                </Pagination.Item>
              </Pagination>
            </div>
          )
        } else {
          return (
            <div style={{ display: 'inline-block' }}>
              <Pagination>
                <Pagination.Prev onClick={() => { fetchInvoices(numPage - 1, rowsCount); setNumPage(numPage - 1) }} />
                <Pagination.Item active>
                  {numPage}
                </Pagination.Item>
                <Pagination.Next onClick={() => { fetchInvoices(numPage + 1, rowsCount); setNumPage(numPage + 1) }} />
              </Pagination>
            </div>
          )
        }
      }

    return (
        <Grid container spacing={0} direction="column">
            <Grid item xs={12}>
                <h3>Invoice</h3>
            </Grid>
            <Grid container item spacing={2} direction="row" style={{'maxWidth': '100vw'}}>
                <Grid item xs={10}>
                    <Stack direction='row' spacing={1}>
                        <Button variant="outline-infoss" className='btn-sm' onClick={() => fetchInvoices(numPage, rowsCount)}>
                            <CachedIcon /> Reload Data
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm' onClick={() => history('/booking/invoice/create')}>
                            <AddToPhotosIcon /> Add New
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm' onClick={() => handleEdit()}>
                            <ModeEditOutlineIcon /> Edit Data
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm'>
                            <DeleteForeverIcon /> Delete
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm' onClick={() => handlePrint()}>
                            <PrintIcon /> Print Data
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm' onClick={() => handleRePrint()}>
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
            <Grid item xs={12} style={{ 'maxWidth': '97vw', 'borderStyle': 'groove', 'borderRadius': '5px', 'marginTop': '10px' }}>
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
                                            columnData.map((el, index) => {
                                                return (
                                                    <td key={index}>{el.text}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr>
                                        {
                                            columnData.map((el, index) => {
                                                if(el.text === 'Delete') {
                                                    return (
                                                        <td key={index}>
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
                                                            onChange={(e) => filterTable(el.column, e.target.value)} 
                                                            style={{ 'minWidth': '100px' }}/>
                                                        </td> 
                                                    )
                                                }
                                            })
                                        }
                                    </tr>
                                    {
                                        invoicesMap.length > 0 
                                        ?
                                        invoicesMap.map((el, index) => {
                                            let tempStyle = 'text-dark'
                                            if(SelectedData.id === el.id) {
                                                tempStyle = "bg-infoss text-white"
                                            } else if(el.deleted === true) {
                                                tempStyle = "text-danger"
                                            } else if(el.printing > 0) {
                                                tempStyle = "text-secondary"
                                            }

                                            return (
                                                <tr 
                                                key={index} 
                                                onClick={(e) => setSelectedData(el)}
                                                className={tempStyle}>
                                                    {
                                                       columnData.map((headersEl, indexHeaders) => {
                                                            let temp = el[headersEl.column]
                                                            if(headersEl.format === 'date') {
                                                                if(el[headersEl.column] !== "0001-01-01T00:00:00") {
                                                                    temp = dateFormat(el[headersEl.column])
                                                                } else {
                                                                    temp = ''
                                                                }
                                                            }

                                                            if(el[headersEl.column] === true) {
                                                                temp = 'Yes'
                                                            } else if(el[headersEl.column] === false) {
                                                                temp = 'No'
                                                            }
                                                            return (
                                                                <td key={indexHeaders}>{temp}</td> 
                                                            )
                                                       }) 
                                                    }
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
                            
                        </>
                    }
                </div>
                <div className='row mt-2'>
                    <div>
                        <div>
                            <div className='mx-4' style={{ display: 'inline-block' }}>
                                {renderPagination()}
                            </div>

                            <Dropdown style={{ display: 'inline-block' }} className='mx-2'>
                                <Dropdown.Toggle variant="outline-infoss sm" id="dropdown-basic">
                                    {rowsCount} Rows
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item className='dropdown-list' onClick={() => { setRowsCount(2); setNumPage(1); fetchInvoices(1, 2) }}>2 Rows</Dropdown.Item>
                                    <Dropdown.Item className='dropdown-list' onClick={() => { setRowsCount(5); setNumPage(1); fetchInvoices(1, 5) }}>5 Rows</Dropdown.Item>
                                    <Dropdown.Item className='dropdown-list' onClick={() => { setRowsCount(100); setNumPage(1); fetchInvoices(1, 100) }}>100 Rows</Dropdown.Item>
                                    <Dropdown.Item className='dropdown-list' onClick={() => { setRowsCount(150); setNumPage(1); fetchInvoices(1, 150) }}>150 Rows</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default InvoicePage
