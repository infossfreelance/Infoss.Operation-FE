import React, {useEffect, useRef, useState} from 'react';
import {Button, Tab, Table, Tabs} from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom";

import axios from 'axios';
import Swal from 'sweetalert2';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ReplyIcon from '@mui/icons-material/Reply';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Radio from '@mui/material/Radio';
import Alert from '@mui/material/Alert';

import {API_URL} from '../../../helpers/constant';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ListTab1 from "../../../components/pagePaymentRequest/Edit/ListTab1"


const PaymentRequestViewPage = () => {
    const {SOId} = useParams()
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
    const [SecondEP, setSecondEP] = useState(false);
    const [IncShipperList, setIncShipperList] = useState([]);
    const [IncAgentList, setIncAgentList] = useState([]);
    const [SelectedShipperList, setSelectedShipperList] = useState({});
    const [TabType, setTabType] = useState('');

    const [DetailData, setDetailData] = useState({});

    const [Header, setHeader] = useState({})
    const [BFP, setBFP] = useState([])

    // console.log("HEADER", Header)
    // console.log("BFP", BFP[0])

    useEffect(() => {
        getDetail()
    }, []);

    const getDetail = () => {
        const payload = {
            userCode: "string",
            countryId: 101,
            companyId: 32,
            branchId: 12
        }
        axios.post(API_URL + 'PaymentRequest/PostById?id=' + SOId, payload)
            .then((response) => {
                setHeader(response.data.data.paymentRequest)
                setBFP(response.data.data.paymentRequestDetails)
                // setDetailData(response.data.data)
                // setSORate(response.data.data.rate)
            })
            .catch(function (error) {
                setIsLoading(false);
                NotifAlert('Something Went Wrong!', 'error')
                Swal.fire({
                    icon: 'error',
                    title: 'Something Went Wrong!',
                    text: error,
                    customClass: {
                        confirmButton: 'btn-infoss px-4'
                    }
                });
            })
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
                    anchorOrigin={{vertical, horizontal}}
                    key={vertical + horizontal}
                >
                    <Alert onClose={handleClose} severity={ColorAlert} sx={{width: '100%'}} className='p-3'>
                        {TextAlert}
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
                                                          checked={!Header.isGeneralPR}
                                                          control={
                                                              <Radio disabled/>
                                                          }
                                                          label="Payment Request"
                                        />
                                        <FormControlLabel value="General Payment Request"
                                                          checked={Header.isGeneralPR}
                                                          control={
                                                              <Radio disabled/>
                                                          }
                                                          label="General Payment Request"
                                        />

                                    </RadioGroup>
                                </div>
                            </div>
                            <div className='col-4 pe-3 row'>
                                <div className="col-8">
                                    <TextField id="filled-basic" label="Shipment Order" className='block'
                                               variant="standard" size='small' disabled value={Header.prNo}/>
                                </div>
                            </div>
                            <div className='col-3 pe-3'>
                                <TextField id="filled-basic" label="Principle By" className='block' variant="standard"
                                           size='small' disabled value={Header.prNo}/>
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
                                                          checked={!Header.isCostToCost}
                                                          control={
                                                              <Radio disabled/>
                                                          }
                                                          label="Non - Cost To Cost"
                                        />
                                        <FormControlLabel value="Cost To Cost"
                                                          checked={Header.isCostToCost}
                                                          control={
                                                              <Radio disabled/>
                                                          }
                                                          label="Cost To Cost"
                                        />

                                    </RadioGroup>
                                </div>
                            </div>
                            <div className='col-3 pe-3'>
                                <TextField id="filled-basic" label="ETD/ETA" className='block' variant="standard"
                                           size='small' disabled value={Header.prNo}/>
                            </div>
                        </div>

                        <div className='row mt-4'>
                            <div className='col-3 pe-5 py-3'>
                                <div className='row'>
                                    <div className='col'>
                                        <TextField id="filled-basic" label="Payment Request Number" className='block'
                                                   variant="standard" size='small' disabled value={Header.prNo}/>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col'>
                                        <TextField id="filled-basic" label="Reference" className='block'
                                                   variant="standard" size='small' disabled value={Header.reference}/>
                                    </div>
                                </div>
                            </div>
                            <div className='col-5 pe-3 border border-secondary rounded py-3'>
                                <span>Payment To</span>
                                <hr/>
                                <div className='row mt-4'>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <div className='col-3'>
                                            <FormControlLabel value="SSLine"
                                                              checked={true}
                                                              control={
                                                                  <Radio disabled/>
                                                              }
                                                              label="SSLine"
                                            />
                                        </div>
                                        <div className='col-3'>
                                            <FormControlLabel value="EMKL"
                                                              checked={false}
                                                              control={
                                                                  <Radio disabled/>
                                                              }
                                                              label="EMKL"
                                            />
                                        </div>
                                        <div className='col-3'>
                                            <FormControlLabel value="Rebate"
                                                              checked={false}
                                                              control={
                                                                  <Radio disabled/>
                                                              }
                                                              label="Rebate"
                                            />
                                        </div>
                                        <div className='col-3'>
                                            <FormControlLabel value="Depo"
                                                              checked={false}
                                                              control={
                                                                  <Radio disabled/>
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
                                    <hr/>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <TextField id="filled-basic" label="" className='block' variant="standard"
                                                       size='small' disabled value={Header.rate}/>
                                        </div>
                                        <div className='col-6'>
                                            <TextField id="filled-basic" label="" className='block' variant="standard"
                                                       size='small' disabled value={Header.rate}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-3 pe-4 row'>
                                <div className='col-5'>
                                    <TextField id="filled-basic" label="Printing" className='block' variant="standard"
                                               size='small' disabled value={Header.printing}/>
                                </div>
                                <div className='col-7'>
                                    <TextField id="filled-basic" label=" " className='block' variant="standard"
                                               size='small' disabled value={Header.printing}/>
                                </div>
                            </div>
                            <div className='col-7 pe-5 row ms-2'>
                                <div className="col-4">
                                    <TextField id="filled-basic" label="Customer" className='block' variant="standard"
                                               size='small' disabled value={Header.prNo}/>
                                </div>
                                <div className="col-1 text-center pt-3">
                                    <FindInPageIcon className='text-infoss'/>
                                </div>
                                <div className="col-7">
                                    <TextField id="filled-basic" label=" " className='block' variant="standard"
                                               size='small' disabled value={Header.prNo}/>
                                </div>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-3 pe-5'>
                                <TextField id="filled-basic" label="DN Vendor" className='block' variant="standard"
                                           size='small' disabled value={Header.vendorDN}/>
                            </div>
                            <div className='col-7 pe-5 row'>
                                <div className="col-4">
                                    <TextField id="filled-basic" label="Personal" className='block' variant="standard"
                                               size='small' disabled value={Header.personalId}/>
                                </div>
                                <div className="col-1 text-center pt-3">
                                    <FindInPageIcon className='text-infoss'/>
                                </div>
                                <div className="col-7">
                                    <TextField id="filled-basic" label=" " className='block' variant="standard"
                                               size='small' disabled value={Header.personalId}/>
                                </div>
                            </div>
                        </div>

                        <div className='row mt-5'>
                            <div className='col'>
                                <Button disabled variant='outline-infoss me-3'>
                                    <ReplyIcon/> Back
                                </Button>
                                <Button disabled variant='outline-infoss me-3'>
                                    <SaveIcon/> Save
                                </Button>
                                <Button disabled variant='outline-infoss me-3'>
                                    <PrintIcon/> Print PR
                                </Button>
                                <Button disabled variant='outline-infoss me-3'>
                                    <AddToPhotosIcon/> Add New
                                </Button>
                                <Button disabled variant='outline-infoss me-3'>
                                    <AssignmentTurnedInIcon/> Approve By Acc Manager
                                </Button>
                                <Button disabled variant='outline-infoss me-3'>
                                    <CheckCircleIcon/> Approve General PR
                                </Button>
                                <Button disabled variant='outline-infoss me-3'>
                                    <LibraryAddCheckIcon/> Approve MKT
                                </Button>
                            </div>
                        </div>

                    </section>

                    {
                        IsLoading ?
                            <LoadingSpinner/>
                            :
                            <section className='mt-5'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => {
                                        setKey(k);
                                        setSelectedShipperList({})
                                    }}
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
                                                    BFP &&
                                                    BFP.length > 0 ?
                                                        BFP.map((v, k) => {
                                                            return (
                                                                <ListTab1
                                                                    key={k}
                                                                    k={k}
                                                                    v={v}
                                                                />
                                                            )
                                                        })
                                                        :
                                                        <tr>
                                                            <td colSpan={10}
                                                                className="text-center py-3 text-muted">Data Empty
                                                            </td>
                                                        </tr>
                                                }

                                                </tbody>
                                            </Table>

                                            <div className='row px-2 py-3'>
                                                <div className='col-8'>
                                                    <Button variant='outline-infoss me-3'>
                                                        <AddToPhotosIcon/>
                                                    </Button>
                                                    <Button variant='outline-infoss me-3'>
                                                        <ModeEditOutlineIcon/>
                                                    </Button>
                                                    <Button variant='outline-infoss me-3'>
                                                        <DeleteForeverIcon/>
                                                    </Button>
                                                </div>
                                                <div className='col-4 text-end'>
                                                    <Button variant='outline-infoss' disabled>
                                                        <AddToPhotosIcon/> Add Trucking
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
                                <hr/>
                                <div className='row pb-2'>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <div className='col-5'>
                                            <FormControlLabel value="Paid"
                                                              checked={true}
                                                              control={
                                                                  <Radio disabled/>
                                                              }
                                                              label="Paid"
                                            />
                                        </div>
                                        <div className='col-7'>
                                            <FormControlLabel value="Not Paid"
                                                              checked={false}
                                                              control={
                                                                  <Radio disabled/>
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
                                <hr/>
                                <div className='row pb-2'>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <div className='col-5'>
                                            <FormControlLabel value="Paid"
                                                              checked={true}
                                                              control={
                                                                  <Radio disabled/>
                                                              }
                                                              label="Paid"
                                            />
                                        </div>
                                        <div className='col-7'>
                                            <FormControlLabel value="Not Paid"
                                                              checked={false}
                                                              control={
                                                                  <Radio disabled/>
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
                                <hr/>
                                <div className='row px-3'>
                                    <TextField id="filled-basic" label="USD" className='block' variant="standard"
                                               disabled/>
                                </div>
                            </div>
                        </div>
                        <div className='col-2 p-1'>
                            <div className='border shadow rounded-10 p-4'>
                                <span className='fw-bolder'>PPN USD</span>
                                <hr/>
                                <div className='row px-3'>
                                    <TextField id="filled-basic" label="USD" className='block' variant="standard"
                                               disabled/>
                                </div>
                            </div>
                        </div>
                        <div className='col-2 p-1'>
                            <div className='border shadow rounded-10 p-4'>
                                <span className='fw-bolder'>Total IDR</span>
                                <hr/>
                                <div className='row px-3'>
                                    <TextField id="filled-basic" label="IDR" className='block' variant="standard"
                                               disabled/>
                                </div>
                            </div>
                        </div>
                        <div className='col-2 p-1'>
                            <div className='border shadow rounded-10 p-4'>
                                <span className='fw-bolder'>PPN IDR</span>
                                <hr/>
                                <div className='row px-3'>
                                    <TextField id="filled-basic" label="IDR" className='block' variant="standard"
                                               disabled/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}

export default PaymentRequestViewPage
