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
import ModalInvoiceUtilities from './modalInvoiceUtilities';

const InvoicePage = () => {
    const [openModal, setOpenModal] = useState(false)
    const [numPage, setNumPage] = useState(1)
    const [rowsCount, setRowsCount] = useState(50)
    const [totalRows, setTotalRows] = useState(5)
    const [SelectedData, setSelectedData] = useState({});
    const [job, setJob] = useState(1);
    const [loading, setLoading] = useState(false)
    const [invoices, setInvoices] = useState([])
    const [invoicesMap, setInvoicesMap] = useState([])
    const [columnData, setColumnData] = useState([])
    const [modalType, setModalType] = useState('')
    const [filterJson, setFilterJson] = useState({})
    const [filterArr, setFilterArr] = useState([])
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

    const fetchInvoices = (pageNumber = 1, pageSize = 10, filter = []) => {
        setLoading(true)
        const payload = {
            "userCode": "luna",
            "countryId": 101,
            "companyId": 32,
            "branchId": 12,
            filter: filter
        }
        // axios.post(`https://localhost:7160/Invoice/PostByPageAll?pageNumber=${pageNumber}&pageSize=${pageSize}`, payload)
        // axios.post(`https://localhost:7160/Invoice/PostByPage?pageNumber=${pageNumber}&pageSize=${pageSize}`, payload) //FILTER READY
        axios.post(API_URL + `invoice/invoice/PostByPage?pageNumber=${pageNumber}&pageSize=${pageSize}`, payload)
        .then((response) => {
            console.log('response fetch invoice', response)
            if(response.data.code === 200) {
                setSelectedData({})
                setInvoices(response.data.data.invoices);

                let temp = response.data.data.invoices
                let indexed = temp.map((el, index) => {
                    let indexedTemp = {
                        ...el,
                        index
                    }
                    return indexedTemp
                })

                setInvoicesMap(indexed)
                setColumnData(response.data.data.columns.headerColumns)
                setTotalRows(response.data.totalRowCount)
                setLoading(false)
            }
            setLoading(false)
        })
        .catch(function (error) {
            setLoading(false)
            console.error('error saat fetch', error)
            ErrorAlert(error.toString(), true)
        })
    }

    const printFunction = () => {
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
            ErrorAlert('Please select data')
        }
    }

    const handlePrint = () => {
        if(SelectedData.id) {
            setModalType('printing')
            setOpenModal(true)
        } else {
            ErrorAlert('Please select data') 
        }
    }

    const handleEdit = () => {
        if (SelectedData.id === undefined) {
            ErrorAlert("Please Select Data!")
        } else {
            if(SelectedData.rowStatus === 'DEL') {
                ErrorAlert('Record Has Been Deleted')
            } else if(SelectedData.paid === true) {
                ErrorAlert('Invoice Has Been Paid')
            } else if(SelectedData.printing > 0) {
                setModalType('edit')
                setOpenModal(true)
            } else if(SelectedData.sfpReference !== null || SelectedData.sfpReference.length > 0) {
                //JIKA INVOICE SUDAH DAPAT FAKTUR PAJAK
                setModalType('edit-taxed')
                setOpenModal(true)
            } else {
                history('/booking/invoice/edit/'+ SelectedData.id)
            }
        }
    }

    const handleRePrint = () => {
        if(SelectedData.id) {
            if(SelectedData.rePrintApproved === true) {
                succesAlert('Print ulang sudah di setujui')
            } else {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "Once approved, this data can be printed repeatedly",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setLoading(true)
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
                })
            }
        } else {
            ErrorAlert('Please select data')
        }
    }

    const handleDelete = () => {
        if (SelectedData.id === undefined) {
            ErrorAlert("Please select data")
        } else {
            if(SelectedData.rowStatus === 'DEL') {
                ErrorAlert("Record Has Been Deleted")
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
                        setLoading(true)
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
                            setLoading(false)
                        })
                        .catch(error => {
                            setLoading(false)
                            console.error(error)
                            ErrorAlert(error.toString(), true)
                        })
                    }
                })
            }
        }
    }

    const handleAdd = () => {
        //TAMBAHKAN API YG NGECEK APAKAH ADA DATA BELUM DI PRINT?
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
        setLoading(true)
        if(modalType === 'credit') {
            setLoading(false)
            console.log('save approval credit', payload)
        } else {
            console.log('save delivered', payload)
            let body = {
                "rowStatus": "ACT",
                "countryId": 101,
                "companyId": 32,
                "branchId": 12,
                "user": "luna",
                "id": SelectedData.id,
                "invoiceNo": SelectedData.invoiceNo,
                "isDelivered": Number(payload.isDelivered),
                deliveredOn: new Date(payload.deliveredDate).toISOString(),
                "deliveredRemarks": payload.remarks
            }
            axios.put(
                'https://localhost:7160/Invoice/UpdateStatusDelivered', 
                body
            ).then((response) => {
                setLoading(false)
                if(response.data.code === 200) {
                    fetchInvoices(numPage, rowsCount)
                } else {
                    ErrorAlert(response.data.message, true)
                }
                console.log('res deliv', response)
            }).catch(error => {
                setLoading(false)
                console.error(error)
                ErrorAlert(error.toString(), true)
            })
        }
    }

    const handleOpenModalCredit = () => {
        if(!SelectedData.id) {
            ErrorAlert("Please Select Data!")
        } else {
            console.log(SelectedData)
            setModalType('credit')
            setOpenModal(true)
        }
    }

    const handleOpenModalDelivered = () => {
        if(!SelectedData.id) {
            ErrorAlert("Please Select Data!")
        } else {
            if(SelectedData.isDelivered === true) {
                ErrorAlert('Has been delivered')
            } else {
                setModalType('delivered')
                setOpenModal(true)
            }
        }
    }

    const handleJournal = () => {
        setModalType('journal')
        setOpenModal(true)
    }

    const filterTable = (key, val) => {
        let filter = filterJson
        let temp = {
            field: key,
            data: val
        }
        let arr = []

        if(!filter[key]) {
            filter[key] = temp
            setFilterJson(filter)
        } else {
            filter[key].data = val
            setFilterJson(filter)
        }

        if(filter[key].data.length === 0) {
            delete filter[key]
            setFilterJson(filter)
        }

        for(const key in filter) {
            arr.push(filter[key])
        }
        
        setFilterArr(arr)
    }

    document.onkeydown = checkKey;
    function checkKey(e) {
        let currIndex = 0
        if(e.keyCode === 38 && SelectedData.index > 0) {
            //UP ARROW
            currIndex = SelectedData.index
            currIndex -= 1
        } else if(e.keyCode === 40 && SelectedData.index < rowsCount - 1) {
            //DOWN ARROW
            currIndex = SelectedData.index
            currIndex += 1
        } else if(e.keyCode === 13 && filterArr.length > 0) {
            //PRESS ENTER
            //THEN DO FILTER
            setNumPage(1)
            setRowsCount(50)
            fetchInvoices(1, rowsCount, filterArr)
            setFilterArr([])
            setFilterJson({})
        }

        const copyArr = [...invoicesMap]
        const changeSelectedData = (data) => {
            return data.index === currIndex
        }
        const result = copyArr.filter(changeSelectedData)
        setSelectedData(...result)
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
                        <Button variant="outline-infoss" className='btn-sm' onClick={() => handleJournal()}>
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
                <div className='mt-3 border rounded-10 p-2 table-responsive' style={{ 'maxHeight': '500px' }}>
                    {
                        loading ? 
                        <LoadingSpinner /> 
                        :
                        <>
                            <Table hover className='table table-sm'>
                                <ModalInvoiceUtilities 
                                open={openModal} 
                                close={() => setOpenModal(false)} 
                                handleSave={e => handleSaveModal(e)} 
                                type={modalType} 
                                resetType={() => setModalType('')}
                                selectedData={SelectedData}
                                doPrint={() => printFunction()}
                                />

                                <thead className='text-center text-infoss' style={{ position: 'sticky', top: '-8px', 'backgroundColor': '#fff', 'boxShadow': '0 1px #dee2e6, 0 -1px #dee2e6' }}>
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
                                                if(el.text === 'RowStatus') {
                                                    return (
                                                        <td key={index}> 
                                                            <select 
                                                            className='form-control col-search-form border-infoss' 
                                                            onChange={(e) => filterTable(el.column, e.target.value)}
                                                            >
                                                                <option value="ALL">All</option>
                                                                <option value="DEL">Yes</option>
                                                                <option value="ACT">No</option>
                                                            </select>
                                                        </td>
                                                    )
                                                } else {
                                                    if(el.dataType === 'boolean') {
                                                        return (
                                                            <td key={index}> 
                                                                <select 
                                                                className='form-control col-search-form border-infoss' 
                                                                onChange={(e) => filterTable(el.column, e.target.value)}
                                                                style={{ 'minWidth': '50px' }}
                                                                >
                                                                    <option value="ALL">All</option>
                                                                    <option value="true">Yes</option>
                                                                    <option value="false">No</option>
                                                                </select>
                                                            </td>
                                                        )
                                                    } else if(el.dataType === 'bit') {
                                                        return(
                                                            <td key={index}> 
                                                                <select 
                                                                className='form-control col-search-form border-infoss' 
                                                                onChange={(e) => filterTable(el.column, e.target.value)}
                                                                style={{ 'minWidth': '50px' }}
                                                                >
                                                                    <option value="ALL">All</option>
                                                                    <option value="true">Yes</option>
                                                                    <option value="false">No</option>
                                                                </select>
                                                            </td>
                                                        )
                                                    } else {
                                                        return (
                                                            <td key={index}>
                                                                <input 
                                                                className="form-control col-search-form border-infoss" 
                                                                onChange={(e) => filterTable(el.column, e.target.value)} 
                                                                style={{ 'minWidth': '100px' }}
                                                                />
                                                            </td> 
                                                        )
                                                    }
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
                                                onClick={() => setSelectedData(el)}
                                                className={tempStyle}>
                                                    {
                                                       columnData.map((headersEl, indexHeaders) => {
                                                            let temp = el[headersEl.column]
                                                            if(headersEl.dataType === 'datetime') {
                                                                if(el[headersEl.column] !== "0001-01-01T00:00:00" && temp !== undefined) {
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
