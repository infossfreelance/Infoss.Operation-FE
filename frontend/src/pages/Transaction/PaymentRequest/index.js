import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Pagination, Table} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

import axios from 'axios';
import "jspdf-autotable";
import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';
import CachedIcon from '@mui/icons-material/Cached';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import {API_URL, dateFormat} from '../../../helpers/constant';
import LoadingSpinner from '../../../components/LoadingSpinner';


const EstimateProfitLossPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();
    const [EPLData, setEPLData] = useState([]);
    const [EPLDataMap, setEPLDataMap] = useState([]);
    const [MaxPage, setMaxPage] = useState('');
    const [NumPage, setNumPage] = useState(1);
    const [rowsCount, setRowsCount] = useState(50);
    const [SelectedData, setSelectedData] = useState({});
    const [noJob, setNoJob] = useState(true)
    const [Column, setColumn] = useState([])

    console.log("EPLData", EPLData[0])
    // console.log("COLUMNS", Column)

    useEffect(() => {
        getData();
    }, []);

    const getData = (param = "", value = "") => {
        setIsLoading(true);
        const payload = {
            userCode: "luna",
            countryId: 101,
            companyId: 32,
            branchId: 12,
            filterType: '',
            filter: [
                // {field: param, data: value}
            ]
        }
        axios.post(`http://stage-operation.api.infoss.solusisentraldata.com/paymentRequest/paymentRequest/PostByPage?pageNumber=${NumPage}&pageSize=${rowsCount}`, payload)
            // axios.post(API_URL + `PaymentRequest/PostByPage?pageNumber=${NumPage}&pageSize=${rowsCount}`, payload)
            .then((response) => {
                setIsLoading(false);
                // console.log("RESPONSE", response.data)
                setMaxPage(response.data.totalPage)
                response.data.data.paymentRequestHeader.length > 0 &&
                setEPLDataMap(response.data.data.paymentRequestHeader)
                setEPLData(response.data.data.paymentRequestHeader);
                setColumn(response.data.data.columns.headerColumns)
            })
            .catch(function (error) {
                setIsLoading(false);
                NotifAlert("Something Went Wrong!", "error")
            })
    }

    const getDataFilter = (param, value) => {
        // console.log("PARAM", param)
        // console.log("VALUE", value)
        const payload = {
            userCode: "string",
            countryId: 101,
            companyId: 32,
            branchId: 12,
            filter: [{
                field: param,
                data: value
            }]
        }
        axios.post(API_URL + `PaymentRequest/PostByPage?pageNumber=${NumPage}&pageSize=${rowsCount}`, payload)
            .then((response) => {
                setMaxPage(response.data.totalPage)
                response.data.data.length > 0 &&
                setEPLDataMap(response.data.data)
                setEPLData(response.data.data);
            })
            .catch(function (error) {
                setIsLoading(false);
                NotifAlert("Something Went Wrong!", "error")
            })
    }

    const handleReload = () => {
        getData()
        NotifAlert('Reload Success!', 'success')
    }

    const handleAddPage = () => {
        if (noJob === false) {
            NotifAlert("Please Complete Other Payment First!", "warning")
        } else {
            history('/booking/payment-request/create')
        }
    }

    const handleEdit = () => {
        if (SelectedData.id === undefined) {
            NotifAlert("Please Select Data!", "warning")
        }

        if (SelectedData.printing === 0) {
            history('/booking/payment-request/edit/' + SelectedData.id)
        } else {
            Swal.fire({
                icon: 'question',
                title: 'Payment Request has been printed!',
                text: 'Edit will make contra and new Payment Request automatically!',
                showCancelButton: true,
                showDenyButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Ok',
                denyButtonText: `View Only`,
                customClass: {
                    confirmButton: 'btn btn-infoss px-4',
                    cancelButton: 'btn btn-outline-infoss px-4',
                    denyButton: 'btn btn-infoss px-4'
                }
            })
                .then((result) => {
                    if (result.isConfirmed === true) {
                        history('/booking/payment-request/create')
                    } else if (result.isDenied === true) {
                        history('/booking/payment-request/view/' + SelectedData.id)
                    }
                })
        }

    }

    const handleDelete = () => {
        if (SelectedData.id === undefined) {
            NotifAlert("Please Select Data!", "warning")
            return false
        }

        if (SelectedData.deleted === 1) {
            NotifAlert("Data Already Deleted!", "error")
            return false
        }

        Swal.fire({
            icon: 'question',
            title: 'Are you sure you want to delete the selected data?',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'btn btn-infoss px-4',
                cancelButton: 'btn btn-outline-infoss px-4'
            }
        })
            .then((result) => {
                if (result.value) {
                    const payload = {
                        userCode: "string",
                        countryId: 101,
                        companyId: 32,
                        branchId: 12
                    }
                    axios.put(API_URL + `PaymentRequest/Delete?id=${SelectedData.id}`, payload)
                        .then((response) => {
                            setSelectedData({})
                            NotifAlert('Data Deleted!', 'success')
                            getData()
                        })
                        .catch(function (error) {
                            setIsLoading(false);
                            NotifAlert('Something Went Wrong!', 'error')
                        })
                }
            })

    }

    const handleApprove = (appv_id) => {
        if (SelectedData.id === undefined) {
            NotifAlert("Please Select Data!", "warning")
            return false
        }

        if (SelectedData.deleted === 0) {
            NotifAlert("Data Already Approved!", "error")
            return false
        }

        Swal.fire({
            icon: 'question',
            title: 'Are you sure you want to Multi Approval - Payment Request?',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'btn btn-infoss px-4',
                cancelButton: 'btn btn-outline-infoss px-4'
            }
        })
            .then((result) => {
                if (result.value) {
                    const payload = {
                        id: SelectedData.id
                    }
                    axios.put(API_URL + 'estimateProfitLoss/Estimateprofitloss/ApiV1/Header/UnDelete', payload)
                        .then((response) => {
                            setSelectedData({})
                            NotifAlert('Data Un-Deleted!', 'success')
                            getData()
                        })
                        .catch(function (error) {
                            setIsLoading(false);
                            NotifAlert('Something Went Wrong!', 'error')
                        })
                }
            })
    }

    const renderPagination = () => {
        if (NumPage === 1 && NumPage !== MaxPage) {
            return (
                <div style={{display: 'inline-block'}}>
                    <Pagination>
                        <Pagination.Item active>
                            {NumPage}
                        </Pagination.Item>
                        <Pagination.Next onClick={() => {
                            getData(rowsCount, 2);
                            setNumPage(NumPage + 1)
                        }}/>
                    </Pagination>
                </div>
            )
        } else if (NumPage === 1 && NumPage === MaxPage) {
            return (
                <div style={{display: 'inline-block'}}>
                    <Pagination>
                        <Pagination.Item active>
                            {NumPage}
                        </Pagination.Item>
                    </Pagination>
                </div>
            )
        } else if (NumPage === MaxPage) {
            return (
                <div style={{display: 'inline-block'}}>
                    <Pagination>
                        <Pagination.Prev onClick={() => {
                            getData(rowsCount, NumPage - 1);
                            setNumPage(NumPage - 1)
                        }}/>
                        <Pagination.Item active>
                            {NumPage}
                        </Pagination.Item>
                    </Pagination>
                </div>
            )
        } else {
            return (
                <div style={{display: 'inline-block'}}>
                    <Pagination>
                        <Pagination.Prev onClick={() => {
                            getData(rowsCount, NumPage - 1);
                            setNumPage(NumPage - 1)
                        }}/>
                        <Pagination.Item active>
                            {NumPage}
                        </Pagination.Item>
                        <Pagination.Next onClick={() => {
                            getData(rowsCount, NumPage + 1);
                            setNumPage(NumPage + 1)
                        }}/>
                    </Pagination>
                </div>
            )
        }

    }

    const NotifAlert = (text, color) => {
        setTextAlert(text)
        setColorAlert(color)
        setOpenAlert(true)
    };

    const PrintData = () => {
        var content = document.getElementById("tabel");
        var pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    const [OpenAlert, setOpenAlert] = useState(false);
    const [TextAlert, setTextAlert] = useState("");
    const [ColorAlert, setColorAlert] = useState("");
    const vertical = 'top'
    const horizontal = 'right'

    return (
        <section>

            <Snackbar
                open={OpenAlert}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{vertical, horizontal}}
                key={vertical + horizontal}
            >
                <Alert onClose={handleClose} severity={ColorAlert} sx={{width: '100%'}} className='p-3'>
                    {TextAlert}
                </Alert>
            </Snackbar>

            <div className="mt-2">
                <h3>Payment Request</h3>
            </div>

            <div className="row mt-3">
                <div className='col-9'>
                    <Button variant="outline-infoss" className='me-2 mb-2' onClick={() => handleReload()}>
                        <CachedIcon/> Reload Data
                    </Button>
                    <Button variant="outline-infoss" className='me-2 mb-2' onClick={() => handleAddPage()}>
                        <AddToPhotosIcon/> Add New
                    </Button>
                    <Button variant="outline-infoss" className='me-2 mb-2' onClick={() => handleEdit()}>
                        <ModeEditOutlineIcon/> Edit Data
                    </Button>
                    <Button variant="outline-infoss" className='me-2 mb-2' onClick={() => handleDelete()}>
                        <DeleteForeverIcon/> Delete
                    </Button>
                    <Button variant="outline-infoss" className='me-2 mb-2'>
                        <PrintIcon/> Print EPL
                    </Button>
                    <Button variant="outline-infoss" className='me-2 mb-2' onClick={() => handleApprove(1)}>
                        <CheckCircleIcon/> Approve By Acc Mgr
                    </Button>
                    <Button variant="outline-infoss" className='me-2 mb-2' onClick={() => handleApprove(2)}>
                        <CheckCircleIcon/> Open Approve By Acc Mgr
                    </Button>
                    <Button variant="outline-infoss" className='me-2 mb-2' onClick={() => handleApprove(3)}>
                        <CheckCircleIcon/> Approve General PR
                    </Button>
                    <Button variant="outline-infoss" className='me-2 mb-2' onClick={() => handleApprove(4)}>
                        <CheckCircleIcon/> Approve MKT
                    </Button>
                </div>
                <div className='col-3 row'>
                    <div className='col-5 fw-bolder mt-1 text-right'>
                        <span>Job:</span>
                    </div>
                    <div className='col-7 text-right'>
                        <select className='form-control border-infoss'>
                            <option value='1'>Sea Export</option>
                            <option value='2'>Sea Import</option>
                            <option value='3'>Air Export</option>
                            <option value='4'>Air Import</option>
                            <option value='5'>PPJK Sea Export</option>
                            <option value='6'>PPJK Sea Import</option>
                            <option value='7'>PPJK Air Export</option>
                            <option value='8'>PPJK Air Import</option>
                            <option value='9'>Domestic</option>
                            <option value='10'>Trucking</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='mt-3 border rounded-10 p-2'>
                {isLoading ?
                    <LoadingSpinner/> :
                    <>
                        <Table className="table-borderless">
                            <thead className='text-center text-infoss'>
                            {/* <tr>
                                  <td>Delete</td>
                                  <td>Type</td>
                                  <td>Ctc</td>
                                  <td>PR No</td>
                                  <td>Reference</td>
                                  <td>Shipment No</td>
                                  <td>Principle</td>
                                  <td>Sts</td>
                                  <td>Aprr By ACC</td>
                                  <td>Desc Cancel/Edit</td>
                                  <td>Payment To</td>
                                  <td>Payment USD</td>
                                  <td>Payment IDR</td>
                                  <td>Date Print</td>
                                  <td>Customer</td>
                                  <td>Rate</td>
                                  <td>Date Rate</td>
                                  <td>Entry Date</td>
                                  <td>Prepared By</td>
                                  <td>Printing</td>
                                  <td>PPn USD</td>
                                  <td>PPn IDR</td>
                                  <td>DN Vendor</td>
                                  <td>Appr Gen PR</td>
                                  <td>Approval MKT</td>
                                  <td>BC Reference</td>
                              </tr> */}

                            <tr>
                                {
                                    Column.length > 0 &&
                                    Column.map((v, k) => {
                                        return (
                                            <th>
                                                {v.text}
                                            </th>
                                        )
                                    })
                                }
                            </tr>

                            </thead>
                            {/* <tbody className="text-muted"> */}
                            {/* <tr>
                                  <td>
                                      <select className='form-control col-search-form border-infoss' onChange={(e) => getDataFilter("deleted", e.target.value)}>
                                          <option value="">All</option>
                                          <option value="true">Yes</option>
                                          <option value="false">No</option>
                                      </select>
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("shipmentId", e.target.value)} />
                                  </td>
                                  <td>
                                      <select className='form-control col-search-form border-infoss' onChange={(e) => getDataFilter("isCostToCost", e.target.value)}>
                                          <option value="">All</option>
                                          <option value="true">Yes</option>
                                          <option value="false">No</option>
                                      </select>
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("prContraNo", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("reference", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("shipmentId", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("prStatus", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("approveAcc", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("paymentUSD", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("paymentIDR", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("printedOn", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("customerId", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("rate", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("exRateDate", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("createdOn", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("printing", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("totalPpnUSD", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("totalPpnIDR", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("vendorDN", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("", e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => getDataFilter("", e.target.value)} />
                                  </td>
                              </tr> */}
                            {/* {
                                EPLDataMap.length ?
                                  EPLDataMap.map((v, k) => {
                                    return (
                                      <PRRow
                                        key={k}
                                        k={k + 1}
                                        v={v}
                                        rowsCount={rowsCount}
                                        NumPage={NumPage}
                                        SelectedId={SelectedData.id === v.id ? true : false}
                                        setSelectedData={(e) => setSelectedData(e)}
                                      />
                                    )
                                  })
                                :
                                <tr>
                                    <td colSpan={26} className="text-center py-3 text-muted">Data Empty</td>
                                </tr>
                              } */}

                            {/* </tbody> */}

                            <tbody className="text-muted">
                            {
                                EPLData.length > 0
                                    ?
                                    EPLData.map((el, index) => {
                                        let tempStyle = 'text-dark'
                                        if (SelectedData.id === el.id) {
                                            tempStyle = "bg-infoss text-white"
                                        } else if (el.rowStatus === 'DEL') {
                                            tempStyle = "text-danger"
                                        } else if (el.printing > 0) {
                                            tempStyle = "text-secondary"
                                        }

                                        return (
                                            <tr
                                                key={index}
                                                onClick={() => setSelectedData(el)}
                                                className={tempStyle}>
                                                {
                                                    Column.map((headersEl, indexHeaders) => {
                                                        let temp = el[headersEl.column]
                                                        if (headersEl.format === 'date') {
                                                            if (el[headersEl.column] !== "0001-01-01T00:00:00") {
                                                                temp = dateFormat(el[headersEl.column])
                                                            } else {
                                                                temp = ''
                                                            }
                                                        }

                                                        if (el[headersEl.column] === true) {
                                                            temp = 'Yes'
                                                        } else if (el[headersEl.column] === false) {
                                                            temp = 'No'
                                                        }

                                                        if (headersEl.column === 'rowStatus') {
                                                            if (el.rowStatus === 'DEL') {
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
                        <div className='row mt-2'>
                            <div className='col text-right'>
                                <div className='mx-4' style={{display: 'inline-block'}}>
                                    {renderPagination()}
                                </div>

                                <Dropdown style={{display: 'inline-block'}} className='mx-2'>
                                    <Dropdown.Toggle variant="outline-infoss sm" id="dropdown-basic">
                                        {rowsCount} Rows
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className='dropdown-list' onClick={() => {
                                            getData(5, 1);
                                            setRowsCount(5);
                                            setNumPage(1)
                                        }}>5 Rows</Dropdown.Item>
                                        <Dropdown.Item className='dropdown-list' onClick={() => {
                                            getData(50, 1);
                                            setRowsCount(50);
                                            setNumPage(1)
                                        }}>50 Rows</Dropdown.Item>
                                        <Dropdown.Item className='dropdown-list' onClick={() => {
                                            getData(100, 1);
                                            setRowsCount(100);
                                            setNumPage(1)
                                        }}>100 Rows</Dropdown.Item>
                                        <Dropdown.Item className='dropdown-list' onClick={() => {
                                            getData(150, 1);
                                            setRowsCount(150);
                                            setNumPage(1)
                                        }}>150 Rows</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </>
                }
            </div>
        </section>
    )
}

export default EstimateProfitLossPage
