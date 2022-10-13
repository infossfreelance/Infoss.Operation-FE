import React, { useMemo, useState, useEffect } from 'react';
import "jspdf-autotable";
import {
  API_URL,
  numFormat,
  dateFormat
} from '../../../helpers/constant';
import Swal from 'sweetalert2';
import axios from 'axios';
 import {
    Button,
    Table,    
    Dropdown, 
    Pagination
 } from 'react-bootstrap'
 import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../../../components/LoadingSpinner';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { Alert, AlertTitle } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UndoIcon from '@mui/icons-material/Undo';
import PrintIcon from '@mui/icons-material/Print';
import PRRow from '../../../components/pagePaymentRequest/PRRow';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

  console.log("EPLData", EPLData)

  useEffect(() => {
    getData();
  }, []);

  const getData = (rowsCount = 50, NumPage = 1) => {
    setIsLoading(true);
    const payload = {
      userCode: "string",
      countryId: 101,
      companyId: 32,
      branchId: 12
    }
    axios.post(API_URL + `PaymentRequest/PostByPage?pageNumber=${NumPage}&pageSize=${rowsCount}`, payload)
    .then((response) => {
      setIsLoading(false);
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
      history('/booking/payment-request/detail')
    }
  }  

  const handleEdit = () => {
    if (SelectedData.id === undefined) {
      NotifAlert("Please Select Data!", "warning")
    }

    if (SelectedData.printing === 0) {
      history('/booking/payment-request/edit/'+ SelectedData.id)      
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
          history('/booking/payment-request/detail')  
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
    console.log("APPV ID", appv_id)
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
        <div style={{ display: 'inline-block' }}>
          <Pagination>
            <Pagination.Item active>
              {NumPage}
            </Pagination.Item>
            <Pagination.Next onClick={() => { getData(rowsCount, 2); setNumPage(NumPage + 1) }} />
          </Pagination>
        </div>
      )
    } else if (NumPage === 1 && NumPage === MaxPage) {
      return (
        <div style={{ display: 'inline-block' }}>
          <Pagination>
            <Pagination.Item active>
              {NumPage}
            </Pagination.Item>
          </Pagination>
        </div>
      )
    } else if (NumPage === MaxPage) {
      return (
        <div style={{ display: 'inline-block' }}>
          <Pagination>
            <Pagination.Prev onClick={() => { getData(rowsCount, NumPage - 1); setNumPage(NumPage - 1) }} />
            <Pagination.Item active>
              {NumPage}
            </Pagination.Item>
          </Pagination>
        </div>
      )
    } else {
      return (
        <div style={{ display: 'inline-block' }}>
          <Pagination>
            <Pagination.Prev onClick={() => { getData(rowsCount, NumPage - 1); setNumPage(NumPage - 1) }} />
            <Pagination.Item active>
              {NumPage}
            </Pagination.Item>
            <Pagination.Next onClick={() => { getData(rowsCount, NumPage + 1); setNumPage(NumPage + 1) }} />
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
  
  const filterTable = (key, val) => {

    if (val === '') {
      setEPLDataMap(EPLData)
      return false
    } 
    
    let arr = [];

    if(key === 1) {
      EPLData.map((v, k) => {
        v.shipmentId.includes(val) && arr.push(v)
      })
      setEPLDataMap(arr)
    }

    if(key === 2) {
      // EPLData.map((v, k) => {
      //   v.printedOn.includes(val) && arr.push(v)
      // })
      // setEPLDataMap(arr)
    }

    if(key === 3) {
      // EPLData.map((v, k) => {
      //   v.printedOn.includes(val) && arr.push(v)
      // })
      // setEPLDataMap(arr)
    }

    if(key === 4) {
      // EPLData.map((v, k) => {
      //   v.estUSDShipCons.includes(val) && arr.push(v)
      // })
      // setEPLDataMap(arr)
    }

    if(key === 5) {
      // EPLData.map((v, k) => {
      //   v.estIDRShipCons.includes(val) && arr.push(v)
      // })
      // setEPLDataMap(arr)
    }

    if(key === 6) {
      EPLData.map((v, k) => {
        v.estUSDShipCons.includes(val) && arr.push(v)
      })
      setEPLDataMap(arr)
    }

    if(key === 7) {
      EPLData.map((v, k) => {
        v.estIDRShipCons.includes(val) && arr.push(v)
      })
      setEPLDataMap(arr)
    }

    if(key === 8) {
      EPLData.map((v, k) => {
        v.estUSDAgent.includes(val) && arr.push(v)
      })
      setEPLDataMap(arr)
    }

    if(key === 9) {
      EPLData.map((v, k) => {
        v.estIDRAgent.includes(val) && arr.push(v)
      })
      setEPLDataMap(arr)
    }

    if(key === 10) {
      // EPLData.map((v, k) => {
      //   v.printedOn.includes(val) && arr.push(v)
      // })
      // setEPLDataMap(arr)
    }

    if(key === 11) {
      EPLData.map((v, k) => {
        v.printing.includes(val) && arr.push(v)
      })
      setEPLDataMap(arr)
    }

    if(key === 12) {
      EPLData.map((v, k) => {
        v.printedOn.includes(val) && arr.push(v)
      })
      setEPLDataMap(arr)
    }

    if(key === 13) {
      EPLData.map((v, k) => {
        v.createdOn.includes(val) && arr.push(v)
      })
      setEPLDataMap(arr)
    }

    if(key === 14) {
      EPLData.map((v, k) => {
        v.createdBy.includes(val) && arr.push(v)
      })
      setEPLDataMap(arr)
    }

        
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
        <CloseIcon fontSize="small" />
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
        anchorOrigin={{ vertical, horizontal }}
        key={ vertical + horizontal }
      >
        <Alert onClose={handleClose} severity={ColorAlert} sx={{ width: '100%' }} className='p-3'>
          { TextAlert }
        </Alert>
      </Snackbar>

        <div className="mt-2">
            <h3>Payment Request</h3>
        </div>

        <div className="row mt-3">
            <div className='col-9'>
                <Button variant="outline-infoss" className='me-2 mb-2' onClick={() => handleReload()}>
                    <CachedIcon /> Reload Data
                </Button>
                <Button variant="outline-infoss" className='me-2 mb-2' onClick={() => handleAddPage()}>
                    <AddToPhotosIcon /> Add New
                </Button>
                <Button variant="outline-infoss" className='me-2 mb-2' onClick={() => handleEdit()}>
                    <ModeEditOutlineIcon /> Edit Data
                </Button>
                <Button variant="outline-infoss" className='me-2 mb-2' onClick={() => handleDelete()}>
                    <DeleteForeverIcon /> Delete
                </Button>
                <Button variant="outline-infoss" className='me-2 mb-2'>
                    <PrintIcon /> Print EPL
                </Button>
                <Button variant="outline-infoss" className='me-2 mb-2' onClick={() => handleApprove(1)}>
                    <CheckCircleIcon /> Approve By Acc Mgr
                </Button>
                <Button variant="outline-infoss" className='me-2 mb-2' onClick={() => handleApprove(2)}>
                    <CheckCircleIcon /> Open Approve By Acc Mgr
                </Button>
                <Button variant="outline-infoss" className='me-2 mb-2' onClick={() => handleApprove(3)}>
                    <CheckCircleIcon /> Approve General PR
                </Button>
                <Button variant="outline-infoss" className='me-2 mb-2' onClick={() => handleApprove(4)}>
                    <CheckCircleIcon /> Approve MKT
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

            {
                isLoading ?
                    <LoadingSpinner />
                    :
                    <>
                      <Table className="table-borderless">
                          <thead className='text-center text-infoss'>
                              <tr>
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
                              </tr>
                          </thead>
                          <tbody className="text-muted">
                              <tr>
                                  <td>
                                      <select className='form-control col-search-form border-infoss'>
                                          <option value="all">All</option>
                                          <option value="yes">Yes</option>
                                          <option value="no">No</option>
                                      </select>
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(1, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(2, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(3, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(4, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(5, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(6, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(7, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(8, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(9, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(10, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(11, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(12, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(13, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(14, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(14, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(14, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(14, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(14, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(14, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(14, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(14, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(14, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(14, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(14, e.target.value)} />
                                  </td>
                                  <td>
                                      <input className="form-control col-search-form border-infoss" onChange={(e) => filterTable(14, e.target.value)} />
                                  </td>
                              </tr>
                              {
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
                              }

                          </tbody>
                      </Table>
                      <div className='row mt-2'>
                        <div className='col text-right'>
                          <div className='mx-4' style={{ display: 'inline-block' }}>
                            {renderPagination()}
                          </div>

                          <Dropdown style={{ display: 'inline-block' }} className='mx-2'>
                            <Dropdown.Toggle variant="outline-infoss sm" id="dropdown-basic">
                              {rowsCount} Rows
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item className='dropdown-list' onClick={() => { getData(50, 1); setRowsCount(50); setNumPage(1)}}>50 Rows</Dropdown.Item>
                              <Dropdown.Item className='dropdown-list' onClick={() => { getData(100, 1); setRowsCount(100); setNumPage(1)}}>100 Rows</Dropdown.Item>
                              <Dropdown.Item className='dropdown-list' onClick={() => { getData(150, 1); setRowsCount(150); setNumPage(1)}}>150 Rows</Dropdown.Item>
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