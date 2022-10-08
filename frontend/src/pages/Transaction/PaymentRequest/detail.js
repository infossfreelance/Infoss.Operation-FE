import React, {useEffect, useRef, useState} from 'react';
import {Button, Tab, Table, Tabs} from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import LoadingSpinner from '../../../components/LoadingSpinner';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import Swal from 'sweetalert2';
import {API_URL, API_URL_MASTER, dateFormat} from '../../../helpers/constant';
import axios from 'axios';
import ReplyIcon from '@mui/icons-material/Reply';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {useNavigate} from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import ModalListShipmentOrder from '../../../components/pagePaymentRequest/ModalListShipmentOrder';
import AddbeingForPayment from '../../../components/pagePaymentRequest/AddbeingForPayment';
import AddCustomer from '../../../components/pagePaymentRequest/AddCustomer';
import AddPersonal from '../../../components/pagePaymentRequest/AddPersonal';
import ListTab1 from "../../../components/pagePaymentRequest/ListTab1"

const PaymentRequestAddPage = () => {
    const [LSOData, setLSOData] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);
    const [key, setKey] = useState('inc-shipper');
    const [showMLSO, setShowMLSO] = useState(false)
    const [showAddbeingForPayment, setShowAddbeingForPayment] = useState(false);
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [showAddPersonal, setShowAddPersonal] = useState(false);
    const [SelectedData, setSelectedData] = useState({});
    const [AccountName, setAccountName] = useState('');
    const ref = useRef();
    const [defShipNo, setdefShipNo] = useState('');
    const [SORate, setSORate] = useState('');
    const [SOExRate, setSOExRate] = useState('2001-08-01');
    const [SOEntryDate, setSOEntryDate] = useState(new Date());
    const history = useNavigate();
    const staticId = localStorage.getItem("id");
    const [IsAdd, setIsAdd] = useState(true);

    const [NumPage, setNumPage] = useState(1);
    const [RowsCount, setRowsCount] = useState(10);
    
    const [OpenAlert, setOpenAlert] = useState(false);
    const [TextAlert, setTextAlert] = useState("");
    const [ColorAlert, setColorAlert] = useState("");
    const vertical = 'top'
    const horizontal = 'right'

    let [GetIDRTotIncShipper, setSOIDRTotIncShipper] = useState(0);
    let [GetUSDTotIncShipper, setUSDTotIncShipper] = useState(0);
    let [GetIDRTotIncAgent, SetIDRTotIncAgent] = useState(0);
    let [GetUSDTotIncAgent, SetUSDTotIncAgent] = useState(0);
    let [GetIDRTotCostSSLINE, SetIDRTotCostSSLINE] = useState(0);
    let [GetUSDTotCostSSLINE, SetUSDTotCostSSLINE] = useState(0);
    let [GetIDRTotCostEMKL, SetIDRTotCostEMKL] = useState(0);
    let [GetUSDTotCostEMKL, SetUSDTotCostEMKL] = useState(0);
    let [GetIDRTotCostReBate, SetIDRTotCostReBate] = useState(0);
    let [GetUSDTotCostReBate, SetUSDTotCostReBate] = useState(0);
    let [GetIDRTotCostAgent, SetIDRTotCostAgent] = useState(0);
    let [GetUSDTotCostAgent, SetUSDTotCostAgent] = useState(0);
    let [GetIDRTotCostDepo, SetIDRTotCostDepo] = useState(0);
    let [GetUSDTotCostDepo, SetUSDTotCostDepo] = useState(0);

    let [GetTotalCostCTCIDR, SetTotalCostCTCIDR] = useState(0);
    let [GetTotalCostCTCUSD, SetTotalCostCTCUSD] = useState(0);
    let [GetTotalIncomeCTCIDR, SetTotalIncomeCTCIDR] = useState(0);
    let [GetTotalIncomeCTCUSD, SetTotalIncomeCTCUSD] = useState(0);

    let [GetTotalIDR, SetTotalIDR] = useState(0);
    let [GetTotalUSD, SetTotalUSD] = useState(0);

    const [SecondEP, setSecondEP] = useState(false);

    const [IncShipperList, setIncShipperList] = useState([]);
    const [IncAgentList, setIncAgentList] = useState([]);  
    
    const [SelectedShipperList, setSelectedShipperList] = useState({})

    const [TabType, setTabType] = useState('')

    useEffect(() => {
        getShipmentOrder(10, 1)        
    }, []);

    const getShipmentOrder = (rowsCount = 10, NumPage = 1) => {        
        axios.get(API_URL + `shipmentorder/shipmentorder/${NumPage}/${rowsCount}`)
        .then((response) => {
            setIsLoading(false);
            setLSOData(response.data)
        })
        .catch(function (error) {
          setIsLoading(false);
          NotifAlert('Something Went Wrong!', 'error')
        })
    }

    const handleAddNew = () => {
      history('/booking/payment-request/detail')
    }

    const handlePrintSO = () => {
        alert("Print")
    }
    
    const handleApproveAccMgr = () => {
      // if (SelectedData.id === undefined) {
      //   NotifAlert("Please Select Data!", "warning")
      //   return false
      // }    

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
              // setSelectedData({})
              // NotifAlert('Data Un-Deleted!', 'success')
          })
          .catch(function (error) {
            // setIsLoading(false);
            // NotifAlert('Something Went Wrong!', 'error')
          })
        }
      })
    }  

    const handleApproveGeneralPR = () => {
        alert("Approve General PR")
    }

    const handleApproveMKT = () => {
        alert("Approve MKT")
    }

    const handleAdd = (type) => {
        if (localStorage.getItem("id") === '') {
            NotifAlert("Shipment Order Number Can't Be Empty!", "error");
            return false;
        }
        setIsAdd(true)
        setTabType(type)
        setShowAddbeingForPayment(true)
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert(false);
    };

    const NotifAlert = (text, color) => {
        setTextAlert(text)
        setColorAlert(color)
        setOpenAlert(true)
    };


    return (    
    <>
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

            <div className='mt-3 border shadow rounded-10 p-5'>

                <section>
                    <div className='row'>
                        <div className='col-5 pe-5 row'>
                            <div className='col-3 py-3 fw-bolder text-danger'>
                                Payment Form
                            </div>
                            <div className='col-9 border border-secondary rounded p-3'>
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                              >
                                <FormControlLabel value="Payment Request"
                                defaultChecked={true}
                                control={
                                    <Radio
                                        // onChange={(e) => setCurrency("USD")}
                                    />
                                }
                                label="Payment Request"
                                />
                                <FormControlLabel value="General Payment Request"
                                defaultChecked={false}
                                control={
                                    <Radio
                                    // onChange={(e) => setCurrency("IDR")}
                                    />
                                }
                                label="General Payment Request"
                                />          

                              </RadioGroup>
                            </div>
                        </div>
                        <div className='col-4 pe-3 row'>
                            <div className="col-8">
                                <TextField id="filled-basic" label="Shipment Order" className='block' variant="standard" size='small' />
                            </div>
                            <div className="col-2 text-center pt-3">
                                <FindInPageIcon className='text-infoss' onClick={() => setShowMLSO(true)} />                                
                            </div>
                        </div>
                        <div className='col-3 pe-3'>
                            <TextField id="filled-basic" label="Principle By" className='block' variant="standard" size='small' />
                        </div>
                    </div>

                    <div className='row mt-2 py-3'>
                        <div className='col-5 pe-5 row'>
                            <div className='col-3 fw-bolder py-3'>
                                Type
                            </div>
                            <div className='col-9 border border-secondary rounded p-3'>                              
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                              >
                                <FormControlLabel value="Non - Cost To Cost"
                                defaultChecked={true}
                                control={
                                  <Radio
                                      // onChange={(e) => setCurrency("USD")}
                                  />
                                }
                                label="Non - Cost To Cost"
                                />
                                <FormControlLabel value="Cost To Cost"
                                defaultChecked={false}
                                control={
                                  <Radio
                                  // onChange={(e) => setCurrency("IDR")}
                                  />
                                }
                                label="Cost To Cost"
                                />          

                              </RadioGroup>
                            </div>
                        </div>
                        <div className='col-3 pe-3'>
                            <TextField id="filled-basic" label="ETD/ETA" className='block' variant="standard" size='small' />
                        </div>
                    </div>

                    <div className='row mt-4'>
                        <div className='col-3 pe-5 py-3'>
                            <div className='row'>
                                <div className='col'>
                                    <TextField id="filled-basic" label="Payment Request Number" className='block' variant="standard" size='small' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col'>
                                    <TextField id="filled-basic" label="Reference" className='block' variant="standard" size='small' />
                                </div>
                            </div>
                        </div>
                        <div className='col-5 pe-3 border border-secondary rounded py-3'>
                            <span>Payment To</span>
                            <hr />
                            <div className='row mt-4'>                              
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                              >   
                                <div className='col-3'>
                                  <FormControlLabel value="SSLine"
                                    defaultChecked={true}
                                    control={
                                      <Radio
                                          // onChange={(e) => setCurrency("USD")}
                                      />
                                    }
                                    label="SSLine"
                                  />  
                                </div>
                                <div className='col-3'>
                                  <FormControlLabel value="EMKL"
                                    defaultChecked={false}
                                    control={
                                      <Radio
                                      // onChange={(e) => setCurrency("IDR")}
                                      />
                                    }
                                    label="EMKL"
                                  />     
                                </div>
                                <div className='col-3'>  
                                  <FormControlLabel value="Rebate"
                                    defaultChecked={false}
                                    control={
                                      <Radio
                                      // onChange={(e) => setCurrency("IDR")}
                                      />
                                    }
                                    label="Rebate"
                                  />     
                                </div>
                                <div className='col-3'> 
                                  <FormControlLabel value="Depo"
                                    defaultChecked={false}
                                    control={
                                      <Radio
                                      // onChange={(e) => setCurrency("IDR")}
                                      />
                                    }
                                    label="Depo"
                                  />  
                                </div>
                              </RadioGroup>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='ms-4 p-3 border border-secondary rounded'>
                                <span>Rate</span>
                                <hr />
                                <div className='row'>
                                    <div className='col-6'>
                                        <TextField id="filled-basic" label="Rate" className='block' variant="standard" size='small' />
                                    </div>
                                    <div className='col-6'>
                                        <TextField id="filled-basic" label="-" className='block' variant="standard" size='small' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row mt-3'>
                        <div className='col-3 pe-4 row'>
                            <div className='col-5'>
                                <TextField id="filled-basic" label="Printing" className='block' variant="standard" size='small' />
                            </div>
                            <div className='col-7'>
                                <TextField id="filled-basic" label="-" className='block' variant="standard" size='small' />
                            </div>
                        </div>
                        <div className='col-7 pe-5 row ms-2'>
                            <div className="col-4">
                                <TextField id="filled-basic" label="Customer" className='block' variant="standard" size='small' />
                            </div>
                            <div className="col-1 text-center pt-3">
                                <FindInPageIcon className='text-infoss' onClick={() => setShowAddCustomer(true)} />                                
                            </div>
                            <div className="col-7">
                                <TextField id="filled-basic" label="-" className='block' variant="standard" size='small' />
                            </div>
                        </div>
                    </div>

                    <div className='row mt-3'>
                        <div className='col-3 pe-5'>
                            <TextField id="filled-basic" label="DN Vendor" className='block' variant="standard" size='small' />
                        </div>
                        <div className='col-7 pe-5 row'>
                            <div className="col-4">
                                <TextField id="filled-basic" label="Personal" className='block' variant="standard" size='small' />
                            </div>
                            <div className="col-1 text-center pt-3">
                                <FindInPageIcon className='text-infoss'  onClick={() => setShowAddPersonal(true)} />                                
                            </div>
                            <div className="col-7">
                                <TextField id="filled-basic" label="-" className='block' variant="standard" size='small' />
                            </div>
                        </div>
                    </div>
                                        
                    <div className='row mt-5'>
                        <div className='col'>
                            <Button variant='outline-infoss me-3' onClick={() => history('/booking/payment-request')}>
                                <ReplyIcon /> Back
                            </Button>
                            <Button variant='outline-infoss me-3' disabled={SecondEP}>
                                <SaveIcon /> Save
                            </Button>
                            <Button variant='outline-infoss me-3' onClick={() => handlePrintSO()}>
                                <PrintIcon /> Print PR
                            </Button>
                            <Button variant='outline-infoss me-3' onClick={() => handleAddNew()}>
                                <AddToPhotosIcon /> Add New
                            </Button>
                            <Button variant='outline-infoss me-3' onClick={() => handleApproveAccMgr()}>
                                <AssignmentTurnedInIcon /> Approve By Acc Manager
                            </Button>
                            <Button variant='outline-infoss me-3' onClick={() => handleApproveAccMgr()}>
                                <CheckCircleIcon /> Approve General PR
                            </Button>
                            <Button variant='outline-infoss me-3' onClick={() => handleApproveAccMgr()}>
                                <LibraryAddCheckIcon /> Approve MKT
                            </Button>
                        </div>
                    </div>

                </section>

                {
                    IsLoading ?
                        <LoadingSpinner />
                        :
                        <section className='mt-5'>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => { setKey(k); setSelectedShipperList({}) }}
                                className="mb-3"
                            >
                                <Tab eventKey="inc-shipper" title="Being For Payment"> 
                                    <div className='border border-secondary rounded-10 p-3'>
                                        <Table className="table-borderless">
                                            <thead className='text-infoss'>
                                                <tr>
                                                    <td>Code</td>
                                                    <td>Paid</td>
                                                    <td>Description</td>
                                                    <td>Amount USD</td>
                                                    <td>Amount IDR</td>
                                                    <td>Cost To Cost</td>
                                                    <td>PPn 10%</td>
                                                    <td>Faktur No.</td>
                                                    <td>NoPol Truck</td>
                                                    <td>Driver</td>
                                                </tr>
                                            </thead>
                                            <tbody className="text-muted">
                                                {
                                                    IncShipperList.length ?
                                                        IncShipperList.map((v, k) => {
                                                            return (
                                                                <ListTab1
                                                                    key={k}
                                                                    k={k}
                                                                    v={v}
                                                                    SelectedShipperList={SelectedShipperList.id === v.id ? true : false}
                                                                    setSelectedShipperList={(e) => setSelectedShipperList(e)}
                                                                />
                                                            )
                                                        })
                                                        :
                                                        <tr>
                                                            <td colSpan={10} className="text-center py-3 text-muted">Data Empty</td>
                                                        </tr>
                                                }

                                            </tbody>
                                        </Table>
                                        
                                        <div className='row px-2 py-3'>
                                            <div className='col-8'>
                                                <Button variant='outline-infoss me-3' onClick={() => handleAdd()}>
                                                    <AddToPhotosIcon />
                                                </Button>
                                                <Button variant='outline-infoss me-3'>
                                                    <ModeEditOutlineIcon />
                                                </Button>
                                                <Button variant='outline-infoss me-3'>
                                                    <DeleteForeverIcon />
                                                </Button>
                                            </div>
                                            <div className='col-4 text-end'>
                                                <Button variant='outline-infoss'>
                                                    <AddToPhotosIcon /> Add Trucking
                                                </Button>
                                            </div>
                                        </div>
                                    </div> 
                                </Tab>
                            </Tabs>
                        </section>
                }
                
                <div className='row my-4 px-2'>
                    <div className='col-2 p-1'>
                        <div className='border shadow rounded-10 p-4'>
                            <span className='fw-bolder'>Total USD</span>
                            <hr />
                            <div className='row pb-2'>                          
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                              >    
                                <div className='col-5'>
                                  <FormControlLabel value="Paid"
                                    defaultChecked={true}
                                    control={
                                      <Radio
                                          // onChange={(e) => setCurrency("USD")}
                                      />
                                    }
                                    label="Paid"
                                  />  
                                </div>
                                <div className='col-7'>
                                  <FormControlLabel value="Not Paid"
                                    defaultChecked={false}
                                    control={
                                      <Radio
                                      // onChange={(e) => setCurrency("IDR")}
                                      />
                                    }
                                    label="Not Paid"
                                  />    
                                </div>
                              </RadioGroup>
                            </div>
                        </div>
                    </div>
                    <div className='col-2 p-1'>
                        <div className='border shadow rounded-10 p-4'>
                            <span className='fw-bolder'>Total IDR</span>
                            <hr />
                            <div className='row pb-2'>                     
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                              >    
                                <div className='col-5'>
                                  <FormControlLabel value="Paid"
                                    defaultChecked={true}
                                    control={
                                      <Radio
                                          // onChange={(e) => setCurrency("USD")}
                                      />
                                    }
                                    label="Paid"
                                  />  
                                </div>
                                <div className='col-7'>
                                  <FormControlLabel value="Not Paid"
                                    defaultChecked={false}
                                    control={
                                      <Radio
                                      // onChange={(e) => setCurrency("IDR")}
                                      />
                                    }
                                    label="Not Paid"
                                  />    
                                </div>
                              </RadioGroup>
                            </div>
                        </div>
                    </div>
                    <div className='col-2 p-1'>
                        <div className='border shadow rounded-10 p-4'>
                            <span className='fw-bolder'>Total USD</span>
                            <hr />
                            <div className='row px-3'>
                                <TextField id="filled-basic" label="USD" className='block' variant="standard" InputProps={{ readOnly: false }} />
                            </div>
                        </div>
                    </div>
                    <div className='col-2 p-1'>
                        <div className='border shadow rounded-10 p-4'>
                            <span className='fw-bolder'>PPN USD</span>
                            <hr />
                            <div className='row px-3'>
                                <TextField id="filled-basic" label="USD" className='block' variant="standard" InputProps={{ readOnly: false }} />
                            </div>
                        </div>
                    </div>
                    <div className='col-2 p-1'>
                        <div className='border shadow rounded-10 p-4'>
                            <span className='fw-bolder'>Total IDR</span>
                            <hr />
                            <div className='row px-3'>
                                <TextField id="filled-basic" label="IDR" className='block' variant="standard" InputProps={{ readOnly: false }} />
                            </div>
                        </div>
                    </div>
                    <div className='col-2 p-1'>
                        <div className='border shadow rounded-10 p-4'>
                            <span className='fw-bolder'>PPN IDR</span>
                            <hr />
                            <div className='row px-3'>
                                <TextField id="filled-basic" label="IDR" className='block' variant="standard" InputProps={{ readOnly: false }} />
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </section>

        <ModalListShipmentOrder
            show={showMLSO}
            onHide={() => setShowMLSO(false)}
            LSOData={LSOData}
            setSelectedData={(e) => {setSelectedData(e)}}
            setdefShipNo={(e) => setdefShipNo(e)}
            MaxPage={1}
            NumPage={NumPage}
            RowsCount={RowsCount}
            setNumPage={(e) => setNumPage(e)}
            setRowsCount={(e) => setRowsCount(e)}
        />

        <AddbeingForPayment
            show={showAddbeingForPayment}
            onHide={() => { setShowAddbeingForPayment(false) }}
            NotifAlert={(e, d) => NotifAlert(e, d)}
            staticId={staticId}
            AccountName={AccountName}
            IsAdd={IsAdd}
            TabType={TabType}  
            data={IsAdd ? '' : SelectedShipperList}          
        />

        <AddCustomer
            show={showAddCustomer}
            onHide={() => { setShowAddCustomer(false) }}
            NotifAlert={(e, d) => NotifAlert(e, d)}
            staticId={staticId}
            AccountName={AccountName}
            IsAdd={IsAdd}
            TabType={TabType}  
            data={IsAdd ? '' : SelectedShipperList}          
        />

        <AddPersonal
            show={showAddPersonal}
            onHide={() => { setShowAddPersonal(false) }}
            NotifAlert={(e, d) => NotifAlert(e, d)}
            staticId={staticId}
            AccountName={AccountName}
            IsAdd={IsAdd}
            TabType={TabType}  
            data={IsAdd ? '' : SelectedShipperList}          
        />
    </>  
    )
}

export default PaymentRequestAddPage