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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

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

const ModalInvoice = (props) => {
    const [remarks, setRemarks] = useState('')
    const [deliveredDate, setDeliveredDate] = useState(new Date())
    const [isDelivered, setIsDelivered] = useState(false)

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
        props.resetType()
        props.close()
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
                        <h5>Delivered Status</h5>
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
                            <FormControl fullWidth>
                                <FormLabel id="delivered-label">Delivered</FormLabel>
                                <RadioGroup 
                                row 
                                name="delivered-label"
                                aria-labelledby="delivered-label"
                                value={isDelivered}
                                onChange={e => setIsDelivered(e.target.value)}
                                >
                                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={false} control={<Radio />} label="No" />
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
                        }
                    </Box>
                </Grid>
                <Grid item container spacing={2} flexDirection='row-reverse'>
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
                </Grid>
            </Grid>
        </Modal>
    )
}

const InvoicePage = () => {
    const [openModal, setOpenModal] = useState(false)
    const [numPage, setNumPage] = useState(1)
    const [rowsCount, setRowsCount] = useState(5)
    const [totalRows, setTotalRows] = useState(5)
    const [SelectedData, setSelectedData] = useState({});
    const [job, setJob] = useState('');
    const [loading, setLoading] = useState(false)
    const [invoices, setInvoices] = useState([])
    const [invoicesMap, setInvoicesMap] = useState([])
    const [columnData, setColumnData] = useState([])
    const [modalType, setModalType] = useState('')
    const history = useNavigate();

    const ErrorAlert = (string, isError = false) => {
        let icon = 'warning'
        let title = 'Peringatan'
        if(isError === true) {
            icon = 'error'
            title = 'Terjadi Kesalahan'
        }
        Swal.fire({
            icon,
            title,
            text: string,
            customClass: {
                confirmButton: 'btn btn-infoss px-4'
            }
        });
    };

    const succesAlert = (text) => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: text,
            showConfirmButton: false,
            timer: 1500
        })
    }

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
        // axios.post(`https://localhost:7160/Invoice/PostByPageAll?pageNumber=${pageNumber}&pageSize=${pageSize}`, payload)
        axios.post(API_URL + `invoice/invoice/PostByPage?pageNumber=${pageNumber}&pageSize=${pageSize}`, payload)
        .then((response) => {
            console.log('response fetch invoice', response)
            if(response.data.code === 200) {
                setSelectedData({})
                setInvoices(response.data.data.invoices);
                setInvoicesMap(response.data.data.invoices)
                // setColumnData(response.data.data.columns)
                setTotalRows(response.data.totalRowCount)
                setColumnData(
                    [
                        {
                            "column": "rowStatus",
                            "text": "Deleted",
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
                            "column": "siCustomerNo",
                            "text": "SiCustomerNo",
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
                        {
                            column: 'rePrintApproved',
                            text: 'RePrint Approved',
                            format: ''
                        },
                        {
                            column: 'rePrintApprovedBy',
                            text: 'Approved By',
                            format: ''
                        },
                        {
                            column: 'rePrintApprovedOn',
                            text: 'Approved On',
                            format: 'date'
                        },
                    ]
                )
                setLoading(false)
            } 
            // else {
            //     setLoading(false)
            //     ErrorAlert(response.data.message, true)
            // }
            setLoading(false)
        })
        .catch(function (error) {
            setLoading(false)
            console.error('error saat fetch', error)
            ErrorAlert(error.toString(), true)
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
                        fetchInvoices(numPage, rowsCount)
                        succesAlert('Data berhasil di print')
                        setLoading(false)
                    } else {
                        ErrorAlert(response.data.message, true)
                        setLoading(false)
                    }
                }).catch(error => {
                    console.error(error)
                    ErrorAlert(error.toString(), true)
                })
            } else {
                ErrorAlert('Harap minta persetujuan print ulang')
                setLoading(false)
            }
        } else {
            ErrorAlert('Harap pilih data terlebih dahulu')
        }
    }

    const handleEdit = () => {
        if (SelectedData.id === undefined) {
            ErrorAlert("Please Select Data!")
        } else {
          history('/booking/invoice/edit/'+ SelectedData.id)
        }
    }

    const handleRePrint = () => {
        console.log('re print', SelectedData)
        if(SelectedData.id) {
            setLoading(true)
            if(SelectedData.rePrintApproved === true) {
                succesAlert('Print ulang sudah di setujui')
                setLoading(false)
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
                        succesAlert('Print ulang sudah di setujui')
                        setLoading(false)
                    } else {
                        setLoading(false)
                        ErrorAlert(response.data.message, true)
                    }
                })
                .catch(error => {
                    console.error(error)
                    setLoading(false)
                    ErrorAlert(error.toString(), true)
                })
            }
        } else {
            ErrorAlert('Harap pilih data terlebih dahulu')
        }
    }

    const handleDelete = () => {
        if (SelectedData.id === undefined) {
            ErrorAlert("Harap pilih data terlebih dahulu")
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.put(
                        `http://stage-operation.api.infoss.solusisentraldata.com/invoice/invoice/Delete?id=${SelectedData.id}`,
                        {
                            "rowStatus": "ACT",
                            "countryId": 101,
                            "companyId": 32,
                            "branchId": 12,
                            "user": "luna"
                        }
                    ).then(response => {
                        console.log('res delete', response)
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        fetchInvoices(numPage, rowsCount)
                    })
                    .catch(error => {
                        console.error(error)
                        ErrorAlert(error.toString(), true)
                    })
                }
            })
        }
    }

    const handleAdd = () => {
        Swal.fire({
            title: 'Harap print terlebih dahulu invoice berikut',
            text: "InvoiceNo: 000333, ShipmentNo: AMJKT.10.000263-00",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
              history('/booking/invoice/create')
            }
        })
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

    const handleSaveModal = (payload) => {
        if(modalType === 'credit') {
            console.log('save approval credit', payload)
        } else {
            console.log('save delivered', payload)
        }
    }

    const handleOpenModalCredit = () => {
        if(!SelectedData.id) {
            ErrorAlert("Please Select Data!")
        } else {
            setModalType('credit')
            setOpenModal(true)
        }
    }

    const handleOpenModalDelivered = () => {
        if(!SelectedData.id) {
            ErrorAlert("Please Select Data!")
        } else {
            setModalType('delivered')
            setOpenModal(true)
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
                        <Button variant="outline-infoss" className='btn-sm' onClick={() => handleAdd()}>
                            <AddToPhotosIcon /> Add New
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm' onClick={() => handleEdit()}>
                            <ModeEditOutlineIcon /> Edit Data
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm' onClick={() => handleDelete()}>
                            <DeleteForeverIcon /> Delete
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm' onClick={() => handlePrint()}>
                            <PrintIcon /> Print Data
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm' onClick={() => handleRePrint()}>
                            <ApprovalIcon /> RePrint Approval
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm' onClick={() => handleOpenModalDelivered()}>
                            <LocalShippingIcon /> Delivered
                        </Button>
                        <Button variant="outline-infoss" className='btn-sm' onClick={() => handleOpenModalCredit()}>
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
                                <ModalInvoice 
                                open={openModal} 
                                close={() => setOpenModal(false)} 
                                handleSave={e => handleSaveModal(e)} 
                                type={modalType} 
                                resetType={() => setModalType('')}
                                />

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
                                            } else if(el.rowStatus === 'DEL') {
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

                                                            if(headersEl.column === 'rowStatus') {
                                                                if(el.rowStatus === 'DEL') {
                                                                    temp = "Yes"
                                                                } else {
                                                                    temp = 'No'
                                                                }
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
                                    <Dropdown.Item className='dropdown-list' onClick={() => { setRowsCount(5); setNumPage(1); fetchInvoices(1, 5) }}>5 Rows</Dropdown.Item>
                                    <Dropdown.Item className='dropdown-list' onClick={() => { setRowsCount(50); setNumPage(1); fetchInvoices(1, 50) }}>50 Rows</Dropdown.Item>
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
