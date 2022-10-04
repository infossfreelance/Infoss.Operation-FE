import React, { useState, useEffect, useRef } from 'react';
 import {
     Button,
     Table,
     Tabs,
     Tab
 } from 'react-bootstrap'
 import TextField from '@mui/material/TextField';
 import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
 import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import LoadingSpinner from '../../../components/LoadingSpinner';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2';
import ModalListShipmentOrder from '../../../components/pageEPL/ModalListShipmentOrder';
import AddIncShipper from '../../../components/pageEPL/AddIncShipper';
import { API_URL, API_URL_MASTER, SHIPMENT_ORDER, numFormat, dateFormat } from '../../../helpers/constant';
import axios from 'axios';
import ReplyIcon from '@mui/icons-material/Reply';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNavigate, useParams } from "react-router-dom";
import ListTab1 from "../../../components/pageEPL/ListTab1"
import ListTab2 from "../../../components/pageEPL/ListTab2"
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { Alert, AlertTitle } from '@mui/material';

const EstimateProfitLossEditPage = () => {

    const { SOId } = useParams()
    const [DetailData, setDetailData] = useState({});
    const [AccountName, setAccountName] = useState('')

    const [LSOData, setLSOData] = useState([]);
    const [IsLoading, setIsLoading] = useState(false)
    const [key, setKey] = useState('inc-shipper');
    const [showMLSO, setShowMLSO] = useState(false)
    const [showAddIncShipper, setShowAddIncShipper] = useState(false)
    const [SelectedData, setSelectedData] = useState({})
    const ref = useRef();
    const [defShipNo, setdefShipNo] = useState('');
    const [SORate, setSORate] = useState('');
    const [SOExRate, setSOExRate] = React.useState(new Date());
    const [SOEntryDate, setSOEntryDate] = React.useState(new Date());
    const history = useNavigate();
    // const staticId = localStorage.getItem("id")
    const [IsAdd, setIsAdd] = useState(true)

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

    const [SecondEP, setSecondEP] = useState(false)
    let IDRTotIncShipper = 0;
    let USDTotIncShipper = 0;
    let IDRTotIncAgent = 0;
    let USDTotIncAgent = 0;
    let IDRTotCostSSLINE = 0;
    let USDTotCostSSLINE = 0;
    let IDRTotCostEMKL = 0;
    let USDTotCostEMKL = 0;
    let IDRTotCostReBate = 0;
    let USDTotCostReBate = 0;
    let IDRTotCostAgent = 0;
    let USDTotCostAgent = 0;
    let IDRTotCostDepo = 0;
    let USDTotCostDepo = 0;
    let dataSequance = [];

    const MappingListByTab = (data) => {
        let incShip = []
        let incAgent = []
        let costSSLine = []
        let costEMKL = []
        let costRebate = []
        let costAgent = []
        let costDepo = []
        dataSequance = [];
        data.map((v, k) => {
            dataSequance.push(v.sequence);
            if (v.isIncome === true && v.customerTypeId === 2) {
                IDRTotIncShipper += v.amountIDR;
                USDTotIncShipper += v.amountUSD;
                incShip.push(v)
            } else if (v.isIncome === true && v.customerTypeId === 5) {
                IDRTotIncAgent += v.amountIDR;
                USDTotIncAgent += v.amountUSD;
                incAgent.push(v)
            } else if (v.isIncome === false && v.customerTypeId === 11) {
                IDRTotCostSSLINE += v.amountIDR;
                USDTotCostSSLINE += v.amountUSD;
                costSSLine.push(v)
            } else if (v.isIncome === false && v.customerTypeId === 6) {
                IDRTotCostEMKL += v.amountIDR;
                USDTotCostEMKL += v.amountUSD;
                costEMKL.push(v)
            } else if (v.isIncome === false && v.customerTypeId === 2) {
                IDRTotCostReBate += v.amountIDR;
                USDTotCostReBate += v.amountUSD;
                costRebate.push(v)
            } else if (v.isIncome === false && v.customerTypeId === 5) {
                IDRTotCostAgent += v.amountIDR;
                USDTotCostAgent += v.amountUSD;
                costAgent.push(v)
            } else {
                IDRTotCostDepo += v.amountIDR;
                USDTotCostDepo += v.amountUSD;
                costDepo.push(v)
            }
        })
        let TotalIDR = IDRTotIncShipper + IDRTotIncAgent + IDRTotCostSSLINE + IDRTotCostEMKL + IDRTotCostReBate + IDRTotCostAgent + IDRTotCostDepo;
        let TotalUSD = USDTotIncShipper + USDTotIncAgent + USDTotCostSSLINE + USDTotCostEMKL + USDTotCostReBate + USDTotCostAgent + USDTotCostDepo;
        let TotalIncomeCTCIDR = IDRTotIncShipper + IDRTotIncAgent;
        let TotalIncomeCTCUSD = USDTotIncShipper + USDTotIncAgent;
        let TotalCostCTCIDR = IDRTotCostSSLINE + IDRTotCostEMKL + IDRTotCostReBate + IDRTotCostAgent + IDRTotCostDepo;;
        let TotalCostCTCUSD = USDTotCostSSLINE + USDTotCostEMKL + USDTotCostReBate + USDTotCostAgent + USDTotCostDepo;

        setSOIDRTotIncShipper(IDRTotIncShipper);
        setUSDTotIncShipper(USDTotIncShipper);
        SetIDRTotIncAgent(IDRTotIncAgent);
        SetUSDTotIncAgent(USDTotIncAgent);
        SetIDRTotCostSSLINE(IDRTotCostSSLINE);
        SetUSDTotCostSSLINE(USDTotCostSSLINE);
        SetIDRTotCostEMKL(IDRTotCostEMKL);
        SetUSDTotCostEMKL(USDTotCostEMKL);
        SetIDRTotCostReBate(IDRTotCostReBate);
        SetUSDTotCostReBate(USDTotCostReBate);
        SetIDRTotCostAgent(IDRTotCostAgent);
        SetUSDTotCostAgent(USDTotCostAgent);
        SetIDRTotCostDepo(IDRTotCostDepo);
        SetUSDTotCostDepo(USDTotCostDepo);

        SetTotalIDR(TotalIDR)
        SetTotalUSD(TotalUSD);

        SetTotalCostCTCIDR(TotalCostCTCIDR);
        SetTotalCostCTCUSD(TotalCostCTCUSD);
        SetTotalIncomeCTCIDR(TotalIncomeCTCIDR);
        SetTotalIncomeCTCUSD(TotalIncomeCTCUSD);

        setIncShipperList(incShip)
        setIncAgentList(incAgent)
        setCostSSLineList(costSSLine)
        setCostEMKLList(costEMKL)
        setCostRebateList(costRebate)
        setCostAgentList(costAgent)
        setCostDepoList(costDepo)
        
    }

    const [IncShipperList, setIncShipperList] = useState([]);
    const [IncAgentList, setIncAgentList] = useState([]);  
    const [CostSSLineList, setCostSSLineList] = useState([]);
    const [CostEMKLList, setCostEMKLList] = useState([]);
    const [CostRebateList, setCostRebateList] = useState([]);
    const [CostAgentList, setCostAgentList] = useState([]);
    const [CostDepoList, setCostDepoList] = useState([]);
    
    const [SelectedShipperList, setSelectedShipperList] = useState({})
    const [ShipmentData, setShipmentData] = useState({})

    const [TabType, setTabType] = useState('')

    useEffect(() => {
        getDetail()
        
    }, []);

    const getDetail = () => {
        // axios.get('https://localhost:7148/Estimateprofitloss/ApiV1/Detail/'+ SOId)
        axios.get(API_URL + 'estimateProfitLoss/Estimateprofitloss/ApiV1/Detail/'+ SOId)
        .then((response) => {
            // console.log("res", response.data.data)
            getShipmentOrder(response.data.data.shipmentId)
            setDetailData(response.data.data)
            // setdefShipNo(response.data.data.shipmentId)
            setSORate(response.data.data.rate)
            MappingListByTab(response.data.data.estimateProfitLossDetails);
        })
        .catch(function (error) {
          setIsLoading(false);
          NotifAlert('Something Went Wrong!', 'error')
        //   Swal.fire({
        //       icon: 'error',
        //       title: 'Something Went Wrong!',
        //       text: error,
        //       customClass: {
        //           confirmButton: 'btn-infoss px-4'
        //       }
        //   });
        })
    }

    const getShipmentOrder = (id) => {
        axios.get(API_URL + `shipmentorder/shipmentorder/${id}`)
        .then((response) => {
            setShipmentData(response.data)
            setdefShipNo(response.data.shipmentNo)
        })
        .catch(function (error) {
          setIsLoading(false);
          NotifAlert('Something Went Wrong!', 'error')
        //   Swal.fire({
        //       icon: 'error',
        //       title: 'Something Went Wrong!',
        //       text: error,
        //       customClass: {
        //           confirmButton: 'btn-infoss px-4'
        //       }
        //   });
        })
    }

    const getDataById = () => {
        // axios.get(API_URL + 'estimateprofitloss/Estimateprofitloss/ApiV1/Detail/' + staticId)
        // axios.get(API_URL + 'estimateprofitloss/Estimateprofitloss/ApiV1/Detail/' + localStorage.getItem("id"))
        axios.get(API_URL + 'estimateprofitloss/Estimateprofitloss/ApiV1/Detail/' + SOId)
        .then((response) => {
            let datas = response.data.data.estimateProfitLossDetails;
            MappingListByTab(datas);

            let sequenceNumberDesc = dataSequance;
            sequenceNumberDesc.sort(function(a, b){return b-a})
            let valueSequance = dataSequance ? parseInt(sequenceNumberDesc[0]) + 1 : 1;
            localStorage.setItem("totalSquance", valueSequance)


        })
        .catch(function (error) {
            NotifAlert('Something Went Wrong!', 'error')
        //   Swal.fire({
        //       icon: 'error',
        //       title: 'Something Went Wrong!',
        //       text: error,
        //       customClass: {
        //           confirmButton: 'btn-infoss px-4'
        //       }
        //   });
        })
    }

    const handleSaveSO = () => {
        if (SelectedData.id === undefined && defShipNo === '') {
            NotifAlert("Shipment Order Number Can't Be Empty!", "warning")
            return false
        }
        if (SOExRate === '') {
            NotifAlert("Date Exchange Rate Can't Be Empty!", "warning")
            return false
        }
        if (SORate === '') {
            NotifAlert("Exchange Rate Can't Be Empty!", "warning")
            return false
        }

        const payload = {
            id: SOId,
            shipmentId: SelectedData.id,
            countryId: 101,
            companyId: 32,
            branchId: 12,
            exRateDate: SOExRate,
            rate: parseFloat(SORate)
        }
        axios.put(API_URL + 'estimateProfitLoss/Estimateprofitloss/ApiV1/Header', payload)
        .then((response) => {
            NotifAlert('Data Updated!', 'success')
            setSecondEP(true)
            setIsLoading(false);
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Data Updated!',
            //     timer: 1000,
            //     showConfirmButton: false
            // })
            // .then(() => {
            //     setSecondEP(true)
            //     setIsLoading(false);
            //     // localStorage.setItem("id", response.data.data.id)
            //     // setStaticId(response.data.data.id)
            // });
        })
        .catch(function (error) {
            setIsLoading(false);
            NotifAlert('Something Went Wrong!', 'error')
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Something Went Wrong!',
            //     text: error,
            //     customClass: {
            //         confirmButton: 'btn-infoss px-4'
            //     }
            // });
        })
        
    }

    const handlePrintSO = () => {
        alert("Print")
    }

    const handleAdd = (type) => {
        // if (localStorage.getItem("id") === '') {
        if (SOId === '') {
            NotifAlert("Shipment Order Number Can't Be Empty!", "warning");
            return false;
        }
        setIsAdd(true)
        getDataById()
        setTabType(type)
        setShowAddIncShipper(true)
    }

    const handleEdit = () => {
        if (SelectedShipperList.eplId === undefined) {
            NotifAlert('Please Select Data!', "warning")
            return false
        }
        // console.log("sel", SelectedShipperList)
        getAccountById(SelectedShipperList.accountId)
        setIsAdd(false)
        setShowAddIncShipper(true)
    }

    const getAccountById = (id) => {
        axios.get(API_URL_MASTER + `CostSea/costsea/${id}`)
        .then((response) => {
            setAccountName(response.data.name)
        })
        .catch(function (error) {
            NotifAlert('Something Went Wrong!', 'error')
        })
    }

    const handleDelete = () => {
        if (SelectedShipperList.eplId === undefined) {
            NotifAlert('Please Select Data!', "warning")
            return false
        }

        Swal.fire({
            icon: 'question',
            title: 'Are you sure you want to delete the selected record?',
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
                    EplId: SelectedShipperList.eplId,
                    Sequence: SelectedShipperList.sequence,
                    User: "Testing"
                }

                axios.delete(API_URL + 'estimateprofitloss/Estimateprofitloss/ApiV1/Detail', { data: payload })
                .then((response) => {
                    setSelectedShipperList({})
                    NotifAlert('Data Deleted!', 'success')
                    getDataById()
                    //     Swal.fire({
                    //     icon: 'success',
                    //     title: 'Data Deleted!',
                    //     timer: 1000,
                    //     showConfirmButton: false
                    // })
                    // .then(() => {
                    //     getShipmentOrder()
                    //     getDataById()
                    // });
                })
                .catch(function (error) {
                setIsLoading(false);
                NotifAlert('Something Went Wrong!', 'error')
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Something Went Wrong!',
                //     text: error,
                //     customClass: {
                //         confirmButton: 'btn-infoss px-4'
                //     }
                // });
                })
            }
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
                anchorOrigin={{ vertical, horizontal }}
                key={ vertical + horizontal }
            >
                <Alert onClose={handleClose} severity={ColorAlert} sx={{ width: '100%' }} className='p-3'>
                { TextAlert }
                </Alert>
            </Snackbar>

            <div className='mt-3 border shadow rounded-10 p-5'>

                <section>
                    <div className='row mt-3'>
                        <div className='col-4 pe-5'>
                            <TextField id="filled-basic" label="Shipment Order Number" className='block' variant="standard" size='small' value={defShipNo} disabled />
                        </div>
                        <div className='col-4 pe-5'>
                            <TextField id="filled-basic" label="Shipment" className='block' variant="standard" size='small' value={ ShipmentData ? ShipmentData.shipperId : "" } disabled />
                        </div>
                        <div className='col-4 pe-5'>
                             <LocalizationProvider dateAdapter={AdapterDateFns}>      
                                <DesktopDatePicker
                                    label="Date Exchange Rate"
                                    value={SOExRate}
                                    minDate={new Date('2017-01-01')}
                                    onChange={(newValue) => {
                                        setSOExRate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    disabled
                                />
                            </LocalizationProvider>
                        </div>
                    </div>

                    <div className='row mt-3'>
                        <div className='col-4 pe-5'>
                            <TextField id="filled-basic" label="ETD / ETA" className='block' variant="standard" size='small' disabled value={ ShipmentData.etd ? dateFormat(ShipmentData.etd) : ShipmentData.eta ? dateFormat(ShipmentData.eta) : "" } />
                        </div>
                        <div className='col-4 pe-5'>
                            <TextField id="filled-basic" label="Agent" className='block' variant="standard" size='small' disabled value={ ShipmentData.agentId ? ShipmentData.agentId : "" } />
                        </div>
                        <div className='col-4 pe-5'>   
                            <TextField id="filled-basic" label="Exchange Rate" type="number" className='block' variant="standard" size='small' value={SORate} onChange={(e) => setSORate(e.target.value)} disabled />
                        </div>
                    </div>

                    <div className='row mt-3'>
                        <div className='col-4 pe-5'>
                            <TextField id="filled-basic" label="Principle By" className='block' variant="standard" size='small' disabled value={ ShipmentData.jobOwnerId ? ShipmentData.jobOwnerId : "" } />
                        </div>
                        <div className='col-4 pe-5'>
                            <div className='row'>
                                <div className='col-6'>
                                    <TextField id="filled-basic" label="Close EPL" className='block' variant="standard" size='small' value={DetailData.closeEPL === true ? "closed" : "opened"} disabled />
                                </div>
                                <div className='col-6'>
                                    <TextField id="filled-basic" label="Shipment Status" className='block' variant="standard" size='small' disabled value={""} />
                                </div>
                            </div>
                        </div>
                        <div className='col-4 pe-5'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>      
                                <DesktopDatePicker
                                    label="Job Entry Date"
                                    value={SOEntryDate}
                                    minDate={new Date('2017-01-01')}
                                    onChange={(newValue) => {
                                        setSOEntryDate(newValue);
                                    }}
                                    disabled
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                                        
                    <div className='row mt-5'>
                        <div className='col'>
                            <Button variant='outline-infoss me-3' onClick={() => history('/booking/epl')}>
                                <ReplyIcon /> Back
                            </Button>
                            {/* <Button variant='outline-infoss me-3' onClick={() => handleSaveSO()}>
                                <SaveIcon /> Update
                            </Button> */}
                            <Button variant='outline-infoss me-3' onClick={() => handlePrintSO()}>
                                <PrintIcon /> Print EPL
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
                                <Tab eventKey="inc-shipper" title="Inc Shipper"> 
                                    <div className='border rounded-10 p-3'>
                                        <Table className="table-borderless">
                                            <thead className='text-infoss'>
                                                <tr>
                                                    <td>Shipper</td>
                                                    <td>Description</td>
                                                    <td>Amount USD</td>
                                                    <td>Amount IDR</td>
                                                    <td>Cost To Cost</td>
                                                    <td>Additional</td>
                                                    <td>Ignored</td>
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
                                                            <td colSpan={7} className="text-center py-3 text-muted">Data Empty</td>
                                                        </tr>
                                                }

                                            </tbody>
                                        </Table>
                                        
                                        <div className='row px-2 py-3'>
                                            <div className='col-8'>
                                                <Button variant='outline-infoss me-3' onClick={() => handleAdd("Inc Shipper")}>
                                                    <AddToPhotosIcon />
                                                </Button>
                                                <Button variant='outline-infoss me-3' onClick={() => handleEdit()}>
                                                    <ModeEditOutlineIcon />
                                                </Button>
                                                <Button variant='outline-infoss me-3' onClick={() => handleDelete()}>
                                                    <DeleteForeverIcon />
                                                </Button>
                                            </div>
                                            <div className='col-4 text-end'>
                                                <Button variant='outline-infoss'>
                                                    <AddToPhotosIcon /> Add Storage
                                                </Button>
                                            </div>
                                        </div>
                                    </div> 
                                </Tab>
                                <Tab eventKey="inc-agent" title="Inc Agent">  
                                    <div className='border rounded-10 p-3'>
                                        <Table className="table-borderless">
                                            <thead className='text-infoss'>
                                                <tr>
                                                    <td>Agent</td>
                                                    <td>Description</td>
                                                    <td>Amount USD</td>
                                                    <td>Amount IDR</td>
                                                    <td>Cost To Cost</td>
                                                    <td>Additional</td>
                                                    <td>Ignored</td>
                                                </tr>
                                            </thead>
                                            <tbody className="text-muted">
                                                {
                                                    IncAgentList.length ?
                                                        IncAgentList.map((v, k) => {
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
                                                            <td colSpan={7} className="text-center py-3 text-muted">Data Empty</td>
                                                        </tr>
                                                }

                                            </tbody>
                                        </Table>
                                        
                                        <div className='row px-2 py-3'>
                                            <div className='col-8'>
                                                <Button variant='outline-infoss me-3' onClick={() => handleAdd("Inc Agent")}>
                                                    <AddToPhotosIcon />
                                                </Button>
                                                <Button variant='outline-infoss me-3' onClick={() => handleEdit()}>
                                                    <ModeEditOutlineIcon />
                                                </Button>
                                                <Button variant='outline-infoss me-3' onClick={() => handleDelete()}>
                                                    <DeleteForeverIcon />
                                                </Button>
                                            </div>
                                            <div className='col-4 text-end'>
                                                <Button variant='outline-infoss me-3'>
                                                    <AddToPhotosIcon /> Add HF
                                                </Button>
                                                <Button variant='outline-infoss'>
                                                    <AddToPhotosIcon /> Add PS
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="cost-ssline" title="Cost SSLine"> 
                                    <div className='border rounded-10 p-3'>
                                        <Table className="table-borderless">
                                            <thead className='text-infoss'>
                                                <tr>
                                                    <td>SSLine</td>
                                                    <td>Description</td>
                                                    <td>Amount USD</td>
                                                    <td>Amount IDR</td>
                                                    <td>Cost To Cost</td>
                                                    <td>Cost Trucking</td>
                                                    <td>Additional</td>
                                                    <td>Ignored</td>
                                                </tr>
                                            </thead>
                                            <tbody className="text-muted">
                                                {
                                                    CostSSLineList.length ?
                                                        CostSSLineList.map((v, k) => {
                                                            return (
                                                                <ListTab2
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
                                                            <td colSpan={7} className="text-center py-3 text-muted">Data Empty</td>
                                                        </tr>
                                                }

                                            </tbody>
                                        </Table>
                                        
                                        <div className='row px-2 py-3'>
                                            <div className='col'>
                                                <Button variant='outline-infoss me-3' onClick={() => handleAdd("Cost SSLine")}>
                                                    <AddToPhotosIcon />
                                                </Button>
                                                <Button variant='outline-infoss me-3' onClick={() => handleEdit()}>
                                                    <ModeEditOutlineIcon />
                                                </Button>
                                                <Button variant='outline-infoss me-3' onClick={() => handleDelete()}>
                                                    <DeleteForeverIcon />
                                                </Button>
                                            </div>
                                        </div>
                                    </div> 
                                </Tab>
                                <Tab eventKey="cost-emkl" title="Cost EMKL">  
                                    <div className='border rounded-10 p-3'>
                                        <Table className="table-borderless">
                                            <thead className='text-infoss'>
                                                <tr>
                                                    <td>EMKL</td>
                                                    <td>Description</td>
                                                    <td>Amount USD</td>
                                                    <td>Amount IDR</td>
                                                    <td>Cost To Cost</td>
                                                    <td>Cost Trucking</td>
                                                    <td>Additional</td>
                                                    <td>Ignored</td>
                                                </tr>
                                            </thead>
                                            <tbody className="text-muted">
                                                {
                                                    CostEMKLList.length ?
                                                        CostEMKLList.map((v, k) => {
                                                            return (
                                                                <ListTab2
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
                                                            <td colSpan={7} className="text-center py-3 text-muted">Data Empty</td>
                                                        </tr>
                                                }

                                            </tbody>
                                        </Table>
                                        
                                        <div className='row px-2 py-3'>
                                            <div className='col-8'>
                                                <Button variant='outline-infoss me-3' onClick={() => handleAdd("Cost EMKL")}>
                                                    <AddToPhotosIcon />
                                                </Button>
                                                <Button variant='outline-infoss me-3' onClick={() => handleEdit()}>
                                                    <ModeEditOutlineIcon />
                                                </Button>
                                                <Button variant='outline-infoss me-3' onClick={() => handleDelete()}>
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
                                <Tab eventKey="cost-rebate" title="Cost Rebate">  
                                    <div className='border rounded-10 p-3'>
                                        <Table className="table-borderless">
                                            <thead className='text-infoss'>
                                                <tr>
                                                    <td>Shipper</td>
                                                    <td>Description</td>
                                                    <td>Amount USD</td>
                                                    <td>Amount IDR</td>
                                                    <td>Cost To Cost</td>
                                                    <td>Cost Trucking</td>
                                                    <td>Additional</td>
                                                    <td>Ignored</td>
                                                </tr>
                                            </thead>
                                            <tbody className="text-muted">
                                                {
                                                    CostRebateList.length ?
                                                        CostRebateList.map((v, k) => {
                                                            return (
                                                                <ListTab2
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
                                                            <td colSpan={7} className="text-center py-3 text-muted">Data Empty</td>
                                                        </tr>
                                                }

                                            </tbody>
                                        </Table>
                                        
                                        <div className='row px-2 py-3'>
                                            <div className='col'>
                                                <Button variant='outline-infoss me-3' onClick={() => handleAdd("Cost Rebate")}>
                                                    <AddToPhotosIcon />
                                                </Button>
                                                <Button variant='outline-infoss me-3' onClick={() => handleEdit()}>
                                                    <ModeEditOutlineIcon />
                                                </Button>
                                                <Button variant='outline-infoss me-3' onClick={() => handleDelete()}>
                                                    <DeleteForeverIcon />
                                                </Button>
                                            </div>
                                        </div>
                                    </div> 
                                </Tab>
                                <Tab eventKey="cost-agent" title="Cost Agent">  
                                    <div className='border rounded-10 p-3'>
                                        <Table className="table-borderless">
                                            <thead className='text-infoss'>
                                                <tr>
                                                    <td>Agent</td>
                                                    <td>Description</td>
                                                    <td>Amount USD</td>
                                                    <td>Amount IDR</td>
                                                    <td>Cost To Cost</td>
                                                    <td>Cost Trucking</td>
                                                    <td>Additional</td>
                                                    <td>Ignored</td>
                                                </tr>
                                            </thead>
                                            <tbody className="text-muted">
                                                {
                                                    CostAgentList.length ?
                                                        CostAgentList.map((v, k) => {
                                                            return (
                                                                <ListTab2
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
                                                            <td colSpan={7} className="text-center py-3 text-muted">Data Empty</td>
                                                        </tr>
                                                }

                                            </tbody>
                                        </Table>
                                        
                                        <div className='row px-2 py-3'>
                                            <div className='col-8'>
                                                <Button variant='outline-infoss me-3' onClick={() => handleAdd("Cost Agent")}>
                                                    <AddToPhotosIcon />
                                                </Button>
                                                <Button variant='outline-infoss me-3' onClick={() => handleEdit()}>
                                                    <ModeEditOutlineIcon />
                                                </Button>
                                                <Button variant='outline-infoss me-3' onClick={() => handleDelete()}>
                                                    <DeleteForeverIcon />
                                                </Button>
                                            </div>
                                            <div className='col-4 text-end'>
                                                <Button variant='outline-infoss me-3'>
                                                    <AddToPhotosIcon /> Add HF
                                                </Button>
                                                <Button variant='outline-infoss'>
                                                    <AddToPhotosIcon /> Add PS
                                                </Button>
                                            </div>
                                        </div>
                                    </div> 
                                </Tab>
                                <Tab eventKey="cost-depo" title="Cost Depo">  
                                    <div className='border rounded-10 p-3'>
                                        <Table className="table-borderless">
                                            <thead className='text-infoss'>
                                                <tr>
                                                    <td>Depo</td>
                                                    <td>Description</td>
                                                    <td>Amount USD</td>
                                                    <td>Amount IDR</td>
                                                    <td>Cost To Cost</td>
                                                    <td>Cost Trucking</td>
                                                    <td>Additional</td>
                                                    <td>Ignored</td>
                                                </tr>
                                            </thead>
                                            <tbody className="text-muted">
                                                {
                                                    CostDepoList.length ?
                                                        CostDepoList.map((v, k) => {
                                                            return (
                                                                <ListTab2
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
                                                            <td colSpan={7} className="text-center py-3 text-muted">Data Empty</td>
                                                        </tr>
                                                }

                                            </tbody>
                                        </Table>
                                        
                                        <div className='row px-2 py-3'>
                                            <div className='col'>
                                                <Button variant='outline-infoss me-3' onClick={() => handleAdd("Cost Depo")}>
                                                    <AddToPhotosIcon />
                                                </Button>
                                                <Button variant='outline-infoss me-3' onClick={() => handleEdit()}>
                                                    <ModeEditOutlineIcon />
                                                </Button>
                                                <Button variant='outline-infoss me-3' onClick={() => handleDelete()}>
                                                    <DeleteForeverIcon />
                                                </Button>
                                            </div>
                                        </div>
                                    </div> 
                                </Tab>
                            </Tabs>
                        </section>
                }
                
                <div className='row mt-5 mb-3'>
                    <div className='col-4 border shadow rounded-10 p-4 mx-3'>
                        <span className='fw-bolder'>Total Income CTC</span>
                        <hr />
                        <div className='row mt-4'>
                            <div className='col-6'>
                                <TextField id="filled-basic" label="USD" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetTotalIncomeCTCUSD} defaultValue={0} disabled/>
                            </div>
                            <div className='col-6'>
                                <TextField id="filled-basic" label="IDR" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetTotalIncomeCTCIDR} defaultValue={0} disabled/>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 border shadow rounded-10 p-4 mx-3'>
                        <span className='fw-bolder'>Total Cost CTC</span>
                        <hr />
                        <div className='row mt-4'>
                            <div className='col-6'>
                                <TextField id="filled-basic" label="USD" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetTotalCostCTCUSD} defaultValue={0} disabled/>
                            </div>
                            <div className='col-6'>
                                <TextField id="filled-basic" label="IDR" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetTotalCostCTCIDR} defaultValue={0} disabled/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='my-5'>
                    <div className='border shadow rounded-10 p-4 mx-1'>
                        <span className='fw-bolder'>Total Estimated</span>
                        <hr />
                        <div className='row mt-4'>
                            <div className='col-1 d-flex align-items-center justify-content-end'>
                                <div>USD</div>
                            </div>
                            <div className='col-11'>
                                <div className='row'>
                                    <div className='col-6 row'>
                                        <div className='col-3'>
                                            <TextField id="filled-basic" label="Inc Shipper" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetUSDTotIncShipper} defaultValue={0} disabled/>
                                        </div>
                                        <div className='col-3'>
                                            <TextField id="filled-basic" label="Inc Agent" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetUSDTotIncAgent} defaultValue={0} disabled/>
                                        </div>
                                        <div className='col-3'>
                                            <TextField id="filled-basic" label="Cost SSLine" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetUSDTotCostSSLINE} defaultValue={0} disabled/>
                                        </div>
                                        <div className='col-3'>
                                            <TextField id="filled-basic" label="Cost EMKL" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetUSDTotCostEMKL} defaultValue={0} disabled/>
                                        </div>
                                    </div>
                                    <div className='col-6 row'>
                                        <div className='col-3'>
                                            <TextField id="filled-basic" label="Cost Rebate" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetUSDTotCostReBate} defaultValue={0} disabled/>
                                        </div>
                                        <div className='col-3'>
                                            <TextField id="filled-basic" label="Cost Agent" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetUSDTotCostAgent} defaultValue={0} disabled/>
                                        </div>
                                        <div className='col-3'>
                                            <TextField id="filled-basic" label="Cost Depo" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetUSDTotCostDepo} defaultValue={0} disabled/>
                                        </div>
                                        <div className='col-3'>
                                            <TextField id="filled-basic" label="Total" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetTotalUSD} defaultValue={0} disabled/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-1 d-flex align-items-center justify-content-end'>
                                <div>IDR</div>
                            </div>

                            <div className='col-11'>
                                <div className='row'>
                                    <div className='col-6 row'>
                                        <div className='col-3'>
                                            <TextField id="filled-basic" label="Inc Shipper" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetIDRTotIncShipper} defaultValue={0} disabled/>
                                        </div>
                                        <div className='col-3'>
                                            <TextField id="filled-basic" label="Inc Agent" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetIDRTotIncAgent} defaultValue={0} disabled/>
                                        </div>
                                        <div className='col-3'>
                                            <TextField id="filled-basic" label="Cost SSLine" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetIDRTotCostSSLINE} defaultValue={0} disabled/>
                                        </div>
                                        <div className='col-3'>
                                            <TextField id="filled-basic" label="Cost EMKL" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetIDRTotCostEMKL} defaultValue={0} disabled/>
                                        </div>
                                    </div>
                                    <div className='col-6 row'>
                                        <div className='col-3'>
                                            <TextField id="filled-basic" label="Cost Rebate" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetIDRTotCostReBate} defaultValue={0} disabled/>
                                        </div>
                                        <div className='col-3'>
                                            <TextField id="filled-basic" label="Cost Agent" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetIDRTotCostAgent} defaultValue={0} disabled/>
                                        </div>
                                        <div className='col-3'>
                                            <TextField id="filled-basic" label="Cost Depo" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetIDRTotCostDepo} defaultValue={0} disabled/>
                                        </div>
                                        <div className='col-3'>
                                            <TextField id="filled-basic" label="Total" className='block' variant="standard" InputProps={{ readOnly: true }} value={GetTotalIDR} defaultValue={0} disabled/>
                                        </div>
                                    </div>
                                </div>
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
            setSelectedData={(e) => setSelectedData(e)}
            setdefShipNo={(e) => setdefShipNo(e)}
            MaxPage={1}
            NumPage={NumPage}
            RowsCount={RowsCount}
            setNumPage={(e) => setNumPage(e)}
            setRowsCount={(e) => setRowsCount(e)}
            getShipmentOrder={(e, d) => getShipmentOrder(e, d)}
        />

        <AddIncShipper
            show={showAddIncShipper}
            onHide={() => { getDataById(); setShowAddIncShipper(false) }}
            NotifAlert={(e, d) => NotifAlert(e, d)}
            staticId={SOId}
            IsAdd={IsAdd}
            AccountName={AccountName}
            TabType={TabType}  
            data={IsAdd ? '' : SelectedShipperList}          
        />
    </>  
    )
}

export default EstimateProfitLossEditPage