import React, {useEffect, useState, Dispatch} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button as RButton} from 'react-bootstrap';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import SaveIcon from '@mui/icons-material/Save';
import FormLabel from '@mui/material/FormLabel';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import PrintIcon from '@mui/icons-material/Print';
import ReplyIcon from '@mui/icons-material/Reply';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TableContainer from '@mui/material/TableContainer';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
import Radio from '@mui/material/Radio';

import 'jspdf-autotable';
import axios from 'axios';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import {NumericFormat} from 'react-number-format';
import {dateFormat} from '../../../helpers/constant';
import NestedModal from './modalInvoiceDetails';
import ModalTableTruck from './modalTableTruck';
import ModalTableInvoice from '../Invoice/modalTableInvoice';
import ModalInvoiceUtilities from '../Invoice/modalInvoiceUtilities';
import {PaymentRequestFormModel, PaymentHeadersDummy} from './model';
import {ButtonBase} from '@mui/material';
import AddCustomer from '../../../components/pagePaymentRequest/AddCustomer';
import AddPersonal from '../../../components/pagePaymentRequest/AddPersonal';
import ModalListShipmentOrder from '../../../components/pagePaymentRequest/ModalListShipmentOrder';
import AddbeingForPayment from '../../../components/pagePaymentRequest/AddbeingForPayment';
import PaymentHeaderDummyTruck from './dummy/index';
import ModalCustomer from './modalCustomer';

function Img(props) {
  return null;
}

Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

let templatePaymentRequest = {
  paymentRequest: {
    rowStatus: 'ACT',
    countryId: 101,
    companyId: 32,
    branchId: 12,
    id: 0,
    ticketId: 0,
    prNo: 0,
    debetCredit: 'string',
    shipmentId: 0,
    shipmentNo: 'string',
    etd: '2022-11-12T09:42:20.162Z',
    eta: '2022-11-12T09:42:20.162Z',
    reference: 'string',
    prStatus: 0,
    isGeneralPR: true,
    customerId: 0,
    customerTypeId: 0,
    personalId: 0,
    paymentUSD: 0,
    paymentIDR: 0,
    prContraStatus: 'string',
    prContraNo: 0,
    // paidUSD: true,
    // datePaidUSD: '2022-11-12T09:42:20.162Z',
    paidIDR: true,
    datePaidIDR: '2022-11-12T09:42:20.162Z',
    deleted: true,
    deletedOn: '2022-11-12T09:42:20.162Z',
    approveOpr: true,
    approveOprOn: '2022-11-12T09:42:20.162Z',
    approveAcc: true,
    approveAccOn: '2022-11-12T09:42:20.162Z',
    rate: 0,
    exRateDate: '2022-11-12T09:42:20.162Z',
    printing: 0,
    printedOn: '2022-11-12T09:42:20.162Z',
    prNo2: 'string',
    exRateId: 0,
    deletedRemarks: 'string',
    idLama: 0,
    isCostToCost: true,
    totalPpnUSD: 0,
    totalPpnIDR: 0,
    uniqueKeyPR: 'string',
    packingListNo: 'string',
    siCustomerNo: 'string',
    vendorDN: 'string',
    approved: true,
    approvedOn: '2022-11-12T09:42:20.162Z',
    approvedBy: 'string',
    approvedRemarks: 'string',
    approvedMarketing: true,
    approvedMarketingOn: '2022-11-12T09:42:20.162Z',
    approvedMarketingBy: 'string',
    user: 'string',
  },
  paymentRequestDetails: [
    {
      rowStatus: 'string',
      countryId: 101,
      companyId: 32,
      branchId: 12,
      paymentRequestId: 0,
      sequence: 0,
      debetCredit: 'string',
      accountId: 0,
      description: 'string',
      type: 0,
      codingQuantity: true,
      quantity: 0,
      perQty: 0,
      amount: 0,
      amountCrr: 0,
      paid: true,
      paidOn: '2022-11-12T09:42:20.162Z',
      paidPV: true,
      eplDetailId: 0,
      statusMemo: true,
      memoNo: 0,
      idLama: 0,
      isCostToCost: true,
      isPpn: true,
      persenPpn: 0,
      fakturNo: 'string',
      fakturDate: '2022-11-12T09:42:20.162Z',
      isCostTrucking: true,
      kendaraanId: 0,
      kendaraanNopol: 'string',
      employeeId: 0,
      employeeName: 'string',
      mrgId: 0,
      deliveryDate: '2022-11-12T09:42:20.162Z',
      originalUsd: 0,
      originalRate: 0,
      user: 'string',
    },
  ],
};

const payloadDetail = {
  rowStatus: 'string',
  countryId: 101,
  companyId: 32,
  branchId: 12,
  paymentRequestId: 0,
  sequence: 0,
  debetCredit: 'string',
  accountId: 0,
  description: 'string',
  type: 0,
  codingQuantity: true,
  quantity: 0,
  perQty: 0,
  amount: 0,
  amountCrr: 0,
  paid: true,
  paidOn: '2022-11-12T09:42:20.162Z',
  paidPV: true,
  eplDetailId: 0,
  statusMemo: true,
  memoNo: 0,
  idLama: 0,
  isCostToCost: true,
  isPpn: true,
  persenPpn: 0,
  fakturNo: 'string',
  fakturDate: '2022-11-12T09:42:20.162Z',
  isCostTrucking: true,
  kendaraanId: 0,
  kendaraanNopol: 'string',
  employeeId: 0,
  employeeName: 'string',
  mrgId: 0,
  deliveryDate: '2022-11-12T09:42:20.162Z',
  originalUsd: 0,
  originalRate: 0,
  user: 'string',
};

const CrudPaymentRequestPage = () => {
  const {prId} = useParams();
  const history = useNavigate();
  const [isEditDisabled, setIsEditDisabled] = useState(false);

  // Shipment Order Dialog
  const [openMLSO, setOpenMLSO] = useState(false);
  const [LSOHeaders, setLSOHeaders] = useState([]);
  const [LSOData, setLSOData] = useState([]);
  const [openCustomerBycustomerTypeId, setOpenCustomercustomerTypeId] =
    useState(false);
  const [stateShipment, setStateShipment] = useState(723);
  // Payment Trucking Table
  const [openModalPayment, setOpenModalPayment] = useState(false);
  const [IncShipperHeaders, setIncShipperHeaders] =
    useState(PaymentHeadersDummy);
  const [IncShipperData, setIncShipperData] = useState([]);

  const [editPaymentRequest, setEditPaymentRequest] = useState({});
  const [selectedDetail, setSelectedDetail] = useState({});
  const [paymentRequestNo, setPaymentRequestNo] = useState('');
  const [paymentRequestDetails, setPaymentRequestDetail] = useState([]);
  const [IsGeneralPR, setIsGeneralPR] = useState(false);
  const [isCostToCost, setIsCostToCost] = useState(false);
  const [statePRNo, setStatePRNo] = useState(0);
  const [statePRNo2, setStatePRNo2] = useState('');
  const [stateDebitCredit, setStateDebitCredit] = useState('');
  const [stateShipmentID, setStateShipmenID] = useState(0);
  const [stateShipmentNo, setStateShipmentNo] = useState('');
  const [statePRRef, setStatePRRef] = useState('');
  const selectedStyle = {bgcolor: (theme) => theme.palette.primary.main};
  const deletedDetailStyle = {bgcolor: (theme) => theme.palette.text.disabled};
  const [invHeader, setInvHeader] = useState('');
  const [detailMap, setDetailMap] = useState([]);
  const [detailSequence, setDetailSequence] = useState(0);
  const [jobOwnerId, setJobOwnerId] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [statePersonalName, setStatePersonalName] = useState('');
  const [shipmentNo, setShipmentNo] = useState('');
  const [stateDetail, setStateDetail] = useState({});
  const [paidOn, setPaidOn] = useState('');
  const [shipmentId, setShipmentId] = useState(0);
  const [shipperId, setShipperId] = useState(0);
  const [shipperName, setShipperName] = useState('');
  const [shipmentData, setShipmentData] = useState({});
  const [stateRate, setStateRate] = useState(0);
  const [etd, setEtd] = useState('');
  const [eta, setEta] = useState('');
  const [stateDN, setStateDN] = useState('');
  const [formPayment, setFormPayment] = useState(new PaymentRequestFormModel());
  const [statePaidIDR, setStatePaidIDR] = useState(false);
  const [statePaidUSD, setStatePaidUSD] = useState(false);
  const [statePaymentUSD, setStatePaymentUSD] = useState(0);
  const [statePaymentIDR, setStatePaymentIDR] = useState(0);
  const [totalVATUSD, setTotalVATUSD] = useState(0);
  const [totalVATIDR, setTotalVATIDR] = useState(0);
  const [statePPNUSD, setStatePPNUSD] = useState(0);
  const [statePPNIDR, setStatePPNIDR] = useState(0);
  const [stateStatusPrint, setStatusStatePrint] = useState(0);
  const [statePrint, setStatePrint] = useState(0);
  const [stateID, setStateID] = useState(0);
  const [stateTicketId, setStateTicketId] = useState(0);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [stateCustomerId, setStateCustomerId] = useState(0);
  const [detailEdit, setDetailEdit] = useState(false);
  const [debetCredit, setDebetCredit] = useState('D');
  const [stateCustomerType, setStateCustomerType] = useState(11);
  const [stateCustomerTypeName, setStateCustomerTypeName] = useState('SSLine');
  const [stateShipmentOrderList, setStateShipmentOrderList] = useState([]);
  const [customerAddress, setCustomerAddress] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentId, setAgentId] = useState('');
  const [agentAddress, setAgentAddress] = useState('');
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [allVat, setAllVat] = useState(0);
  const [stateDataArr, setStateDataArr] = useState([]);
  const [statePaymentRequest, setStatePaymentRequest] = useState({});
  const [stateOpenTruck, setStateOpenTruck] = useState(false);
  const [openStorage, setOpenStorage] = useState(false);
  const [stateSelectedTruck, setStateSelectedTruck] = useState({});
  const [selectedStorage, setSelectedStorage] = useState({});
  const [headerStorage, setHeaderStorage] = useState(PaymentHeaderDummyTruck);
  const [dataStorage, setDataStorage] = useState([]);
  const [stateOpenApproveMng, setStateOpenApproveMng] = useState(false);
  const [stateGetDataCustomer, setStateGetDataCustomer] = useState({});

  const [stateCustomersByCustomerTypeId, setStaseCustomersByCustomerTypeId] =
    useState([]);
  const [
    stateCustomersHeaderByCustomerTypeId,
    setStateCustomersHeaderByCustomerTypeId,
  ] = useState([]);
  //#region: API handling
  const fetchEditData = (prId) => {
    let body = {
      userCode: 'luna',
      countryId: 101,
      companyId: 32,
      branchId: 12,
    };

    if (prId) {
      axios
        .post(
          `http://stage-operation.api.infoss.solusisentraldata.com/paymentRequest/paymentRequest/PostById?Id=${prId}`,
          body
        )
        .then((response) => {
          setPaymentRequestDetail(
            response.data.data.paymentRequest.paymentRequestDetails
          );
          setStatePaymentRequest(response.data.data.paymentRequest);
          let tempDetail =
            response.data.data.paymentRequest.paymentRequestDetails;
          setDetailMap(tempDetail);
          if (tempDetail.length > 0) {
            setDetailSequence(tempDetail[tempDetail.length - 1].sequence);
          }
          setEditPaymentRequest(response.data.data.paymentRequest);
          let temp = response.data.data.paymentRequest;
          setStateID(temp.id);
          setStateTicketId(temp.ticketId);
          setStatePRNo(temp.prNo);
          setStatePRNo2(temp.prNo2);
          setStateDebitCredit(temp.debetCredit);
          setStateShipmenID(temp.shipmentId);
          setStateShipmentNo(temp.shipmentNo);
          setIsGeneralPR(temp.isGeneralPR);
          setIsCostToCost(temp.isCostToCost);
          setEtd(temp.etd);
          setShipmentNo(temp.shipmentNo);
          setJobOwnerId(temp.jobOwnerId);
          setStatePRRef(temp.reference);
          setCustomerId(temp.customerId);
          setCustomerName(temp.customerName);
          setStateRate(temp.rate);
          setStateDN(temp.vendorDN);
          setStatePersonalName(temp.PersonalName);
          setStatePaidIDR(temp.paidIDR);
          setStatePaidUSD(temp.paidUSD);
          setStatePaymentUSD(temp.paymentUSD);
          setStatePaymentIDR(temp.paymentIDR);
          setStatePPNIDR(temp.totalPpnIDR);
          setStatePPNUSD(temp.totalPpnUSD);
          setStatusStatePrint(temp.prStatus);
          setStatePrint(temp.printing);
          setStateCustomerId(temp.customerId);
          setDebetCredit(temp.debetCredit === '' ? 'D' : temp.debetCredit);
          setTotalVATIDR(temp.totalVATIDR);
          setTotalVATUSD(temp.totalVATUSD);
          setPaymentRequestNo(temp.prNo2);
          setStateCustomerType(temp.customerTypeId);
          setStateShipmentOrderList(temp.paymentRequestDetails);
          // setIsCTC(temp.isCostToCost)
          // setInvoiceNo(temp.invoiceNo)
          // setPrinting(temp.printing)
          // setPrintedOn(temp.printedOn)
          // setPackingListNo(temp.packingListNo)
          // setSiCustomerNo(temp.siCustomerNo)
          // setCustomerTypeId(temp.customerTypeId)
          // setCustomerName(temp.customerName)
          // setCustomerAddress(temp.customerAddress)
          // setDebetCredit(temp.debetCredit === '' ? 'D' : temp.debetCredit)
          // setIsStampDuty(temp.isStampDuty)
          // setStampDutyAmount(temp.stampDutyAmount)
          // setPaymentUSD(temp.paymentUSD)
          // setPaymentIDR(temp.paymentIDR)
          // setTotalVATIDR(temp.totalVatIDR)
          // setTotalVATUSD(temp.totalVatUSD)
          // setPaid(temp.paid)
          // setPaidOn(temp.paidOn)
          // setRate(temp.rate)
          // setKursKMK(temp.kursKMK)
          // setEFaktur(temp.sfpReference)
          // setJobOwnerId(temp.invHeader)
          // setEtd(temp.etd)
          // setEta(temp.eta)
          // setJenisInvoices(temp.jenisInvoices)
          if (jobOwnerId) {
            return axios.post(
              `http://stage-master.api.infoss.solusisentraldata.com/jobowner/jobowner/PostById?id=${jobOwnerId}`,
              body
            );
          }
        })
        .then((job) => {
          if (job.data.code === 200) {
            setInvHeader(job.data.data.jobOwner.masterCode);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const fetchJobOwners = () => {
    const body = {
      userCode: 'luna',
      countryId: 101,
      companyId: 32,
      branchId: 12,
    };
    axios
      .post(
        'http://stage-master.api.infoss.solusisentraldata.com/jobowner/jobowner/PostByPage?pageNumber=1&pageSize=5',
        body
      )
      .then((res) => {
        if (res && res.data && res.data.data) {
          // setJobOwners(res.data.data.jobOwner)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getContact = (rows = 50, page = 1) => {
    axios
      .post(
        `http://stage-master.api.infoss.solusisentraldata.com/regcontact/regcontact/PostByPage?contactTypeId=1&pageNumber=${page}&pageSize=${rows}`,
        {
          userCode: 'luna',
          countryId: 101,
          companyId: 32,
          branchId: 12,
        }
      )
      .then((response) => {
        if (response.data.code === 200) {
          // setDataContacts(response.data.data.contact)
          // setHeaderContacts(response.data.data.columns)
          // setMaxPageContacts(response.data.totalPage)
        }
      })
      .catch((error) => console.error(error));
  };

  const getRateCurrency = (rowsCount = 50, NumPage = 1) => {
    const body = {
      userCode: 'luna',
      countryId: 101,
      companyId: 32,
      branchId: 12,
    };
    axios
      .post(
        'http://stage-master.api.infoss.solusisentraldata.com/jobowner/jobowner/PostByPage?pageNumber=1&pageSize=5',
        body
      )
      .then((res) => {
        if (res && res.data && res.data.data) {
          // setJobOwners(res.data.data.jobOwner)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getShipmentOrder = (rowsCount = 50, NumPage = 1) => {
    axios
      .post(
        `http://stage-operation.api.infoss.solusisentraldata.com/shipmentorder/shipmentorder/PostByPage?columnCode=PAGE&pageNumber=${NumPage}&pageSize=${rowsCount}`,
        {
          userCode: 'luna',
          countryId: 101,
          companyId: 32,
          branchId: 12,
        }
      )
      .then((response) => {
        if (
          response &&
          response.data &&
          response.data.data &&
          response.data.data.columns
        ) {
          setLSOHeaders(response.data.data.columns.headerColumns);
          setLSOData(response.data.data.shipmentOrder);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  //#endregion: API handling

  const getCustomerListByEplId = (
    rowsCount = 50,
    NumPage = 1,
    customerId = 0,
    eplId = 2,
    customerTypeId = 6,
    isIncome = false
  ) => {
    axios
      .post(
        `http://stage-operation.api.infoss.solusisentraldata.com/estimateProfitLossV1/estimateProfitLoss/PostBySearchCustomerEPL?pageNumber=${NumPage}&pageSize=${rowsCount}&eplId=${eplId}&customerId=${customerId}&customerTypeId=${customerTypeId}&isIncome=${isIncome}`,
        {
          userCode: 'string',
          countryId: 101,
          companyId: 32,
          branchId: 12,
        }
      )
      .then((response) => {
        setStaseCustomersByCustomerTypeId(
          response?.data?.data?.estimateProfitLossDetail
        );
        setStateCustomersHeaderByCustomerTypeId(response?.data?.data?.columns);
        console.log(response, '<<<response');
      })
      .catch((error) => {});
  };

  //#region: Form handling
  const successAlert = (text) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const ErrorAlert = (text) => {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Error',
      message: text,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const fetchStorage = (rowsCount = 50, NumPage = 1) => {};

  const handleSubmit = () => {
    if (prId) {
      let payload = templatePaymentRequest;
      payload.paymentRequest['rowStatus'] = 'ACT';
      payload.paymentRequest['countryId'] = 101;
      payload.paymentRequest['companyId'] = 32;
      payload.paymentRequest['branchId'] = 12;
      payload.paymentRequest.id = Number(prId) || Number(stateID);
      payload.paymentRequest.ticketId = stateTicketId || 0;
      payload.paymentRequest.prNo = statePRNo || 0;
      payload.paymentRequest.debetCredit = debetCredit;
      payload.paymentRequest['shipmentId'] = shipmentData.shipmentId || 1;
      payload.paymentRequest.shipmentNo =
        shipmentData.shipmentNo || stateShipmentNo || 'AMJKT.10.000001-00';
      payload.paymentRequest.etd = etd || shipmentData.etd || new Date();
      payload.paymentRequest.eta = eta || shipmentData.eta || new Date();
      payload.paymentRequest.reference = statePRRef;
      payload.paymentRequest.prStatus = 0;
      payload.paymentRequest.isGeneralPR = true;
      payload.paymentRequest.customerId = 0;
      payload.paymentRequest.customerTypeId = stateCustomerType || 0;
      payload.paymentRequest.personalId = 0;
      payload.paymentRequest['paymentUSD'] = statePaymentUSD || 0;
      payload.paymentRequest['paymentIDR'] = statePaymentIDR || 0;
      payload.paymentRequest.prContraStatus = 'string';
      payload.paymentRequest.prContraNo = 0;
      payload.paymentRequest.datePaidUSD = '2022-11-12T09:42:20.162Z';
      payload.paymentRequest.paidIDR = statePaidIDR === 'false' ? false : true;
      payload.paymentRequest.datePaidIDR = '2022-11-12T09:42:20.162Z';
      payload.paymentRequest.deleted = true;
      payload.paymentRequest.deletedOn = '2022-11-12T09:42:20.162Z';
      payload.paymentRequest.approveOpr = true;
      payload.paymentRequest.approveOprOn = '2022-11-12T09:42:20.162Z';
      payload.paymentRequest.approveAcc = true;
      payload.paymentRequest.approveAccOn = '2022-11-12T09:42:20.162Z';
      payload.paymentRequest.rate = 0;
      payload.paymentRequest.exRateDate = '2022-11-12T09:42:20.162Z';
      payload.paymentRequest.printing = 0;
      payload.paymentRequest.printedOn = '2022-11-12T09:42:20.162Z';
      payload.paymentRequest.prNo2 = 'string';
      payload.paymentRequest.exRateId = 0;
      payload.paymentRequest.deletedRemarks = 'string';
      payload.paymentRequest.idLama = 0;
      payload.paymentRequest.isCostToCost = true;
      payload.paymentRequest.totalPpnUSD = statePPNUSD || 0;
      payload.paymentRequest.totalPpnIDR = statePPNIDR || 0;
      payload.paymentRequest.uniqueKeyPR = 'string';
      payload.paymentRequest.packingListNo = 'string';
      payload.paymentRequest.siCustomerNo = 'string';
      payload.paymentRequest.vendorDN = 'string';
      payload.paymentRequest.approved = true;
      payload.paymentRequest.approvedOn = '2022-11-12T09:42:20.162Z';
      payload.paymentRequest.approvedBy = 'string';
      payload.paymentRequest.approvedRemarks = 'string';
      payload.paymentRequest.approvedMarketing = true;
      payload.paymentRequest.approvedMarketingOn = '2022-11-12T09:42:20.162Z';
      payload.paymentRequest.approvedMarketingBy = 'string';
      payload.paymentRequest.paidUSD = statePaidUSD === 'false' ? false : true;
      payload.paymentRequest.user = 'string';
      payload.paymentRequestDetails = stateShipmentOrderList;
      axios
        .put(
          'http://stage-operation.api.infoss.solusisentraldata.com/PaymentRequest/PaymentRequest/Update',
          payload
        )
        .then((response) => {
          Swal.fire('Success', 'Data has been success to edit', 'success');

          history('/booking/payment-request');
        })
        .catch((error) => {
          const titleError =
            `${error.response.data.title}` || 'Something went wrong!';
          Swal.fire(`Error`, `${titleError}`, 'error');
        });
    } else {
      if (!shipmentNo) {
        Swal.fire(
          'Information',
          "Shipment Order Number can't be empty...!!",
          'info'
        );
      } else {
        let payloadData = {
          rowStatus: 'string',
          countryId: 101,
          companyId: 32,
          branchId: 12,
        };
        let payload = templatePaymentRequest;
        payload.paymentRequest['rowStatus'] = 'ACT';
        payload.paymentRequest['countryId'] = 101;
        payload.paymentRequest['companyId'] = 32;
        payload.paymentRequest['branchId'] = 12;
        payload.paymentRequest['ticketId'] = 0;
        payload.paymentRequest['prNo'] = statePRNo || 0;
        payload.paymentRequest['debetCredit'] = debetCredit;
        // payload.paymentRequest.shipmentId = shipperId || 1;
        payload.paymentRequest.shipmentNo = shipmentNo;
        payload.paymentRequest['shipmentId'] = shipmentData.shipmentId;
        payload.paymentRequest.shipmentNo =
          shipmentData.shipmentNo || 'AMJKT.10.000001-00';
        payload.paymentRequest.etd = etd || shipmentData.etd || new Date();
        payload.paymentRequest.eta = eta || shipmentData.eta || new Date();
        payload.paymentRequest.reference = statePRRef;
        payload.paymentRequest['prStatus'] = 0;
        payload.paymentRequest['isGeneralPR'] = true;
        payload.paymentRequest['customerId'] = 0;
        payload.paymentRequest['customerTypeId'] = stateCustomerType;
        payload.paymentRequest.personalId = 0;
        payload.paymentRequest['paymentUSD'] = statePaymentUSD;
        payload.paymentRequest['paymentIDR'] = statePaymentIDR;
        payload.paymentRequest['prContraStatus'] = 'string';
        payload.paymentRequest.paymentRequestId = 0;
        payload.paymentRequest['prContraNo'] = 0;
        payload.paymentRequest['datePaidUSD'] = '2022-11-12T09:42:20.162Z';
        payload.paymentRequest.paidIDR =
          statePaidIDR === 'false' ? false : true;
        payload.paymentRequest['datePaidIDR'] = '2022-11-12T09:42:20.162Z';
        payload.paymentRequest['deleted'] = true;
        payload.paymentRequest['deletedOn'] = '2022-11-12T09:42:20.162Z';
        payload.paymentRequest['approveOpr'] = true;
        payload.paymentRequest['approveOprOn'] = '2022-11-12T09:42:20.162Z';
        payload.paymentRequest['approveAcc'] = true;
        payload.paymentRequest['approveAccOn'] = '2022-11-12T09:42:20.162Z';
        payload.paymentRequest['rate'] = 0;
        payload.paymentRequest['exRateDate'] = '2022-11-12T09:42:20.162Z';
        payload.paymentRequest['printing'] = 0;
        payload.paymentRequest['printedOn'] = '2022-11-12T09:42:20.162Z';
        payload.paymentRequest['prNo2'] = 'string';
        payload.paymentRequest['exRateId'] = 0;
        payload.paymentRequest.deletedRemarks = 'string';
        payload.paymentRequest['idLama'] = 0;
        payload.paymentRequest['isCostToCost'] = true;
        payload.paymentRequest['totalPpnUSD'] = statePPNUSD;
        payload.paymentRequest['totalPpnIDR'] = statePPNIDR;
        payload.paymentRequest['uniqueKeyPR'] = 'string';
        payload.paymentRequest['packingListNo'] = 'string';
        payload.paymentRequest['siCustomerNo'] = 'string';
        payload.paymentRequest['vendorDN'] = 'string';
        payload.paymentRequest['approved'] = true;
        payload.paymentRequest['approvedOn'] = '2022-11-12T09:42:20.162Z';
        payload.paymentRequest['approvedBy'] = 'string';
        payload.paymentRequest['approvedRemarks'] = 'string';
        payload.paymentRequest['approvedMarketing'] = true;
        payload.paymentRequest['approvedMarketingOn'] =
          '2022-11-12T09:42:20.162Z';
        payload.paymentRequest['approvedMarketingBy'] = 'string';
        payload.paymentRequest.paidUSD =
          statePaidUSD === 'false' ? false : true;
        payload.paymentRequest['user'] = 'string';
        payload.paymentRequestDetails = stateShipmentOrderList;
        axios
          .post(
            'http://stage-operation.api.infoss.solusisentraldata.com/PaymentRequest/PaymentRequest/Create',
            payload
          )
          .then((response) => {
            Swal.fire('Success', 'Data has been success to add', 'success');
            history('/booking/payment-request');
          })
          .catch((error) => {
            const titleError =
              `${error.response.data.title}` || 'Something went wrong!';
            Swal.fire(`Error`, `${titleError}`, 'error');
          });
      }
    }
  };

  const handleNewForm = () => {
    Swal.fire({
      title: 'Confirm',
      text: 'Are you sure you want to create NEW Invoice?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        history('/booking/payment-request/create');
        window.location.reload();
      }
    });
  };

  const handleAllVat = (value) => {
    let cast = Number(value);
    // setAllVat(cast)
    if (IncShipperData.length > 0) {
      let tempIdr = 0;
      let tempUsd = 0;
      IncShipperData.forEach((el) => {
        if (el.rowStatus !== 'DEL') {
          let calculation = Number(el.amount) * (cast / 100);
          el.percentVat = cast;
          el.amountVat = calculation;

          if (el.amountCrr === 0) {
            tempUsd += calculation;
          } else {
            tempIdr += calculation;
          }
        }
      });
      // setTotalVATIDR(Number(tempIdr.toFixed(2)))
      // setTotalVATUSD(Number(tempUsd.toFixed(2)))
    }
  };

  const handleSelectContact = (value, type) => {
    if (type === 'shipper-customer') {
      if (IncShipperData === 2) {
        // setCustomerId(value.contactId)
        // setCustomerName(value.pic)
        // setCustomerAddress(value.contactAddress)
        // setSelectedContact(value)
      } else {
        // setAgentId(value.contactId)
        // setAgentName(value.pic)
        // setAgentAddress(value.contactAddress)
        // setSelectedContact(value)
      }
    } else if (type === 'shipper-bill') {
      if (IncShipperData === 2) {
        // setBillId(value.contactId)
        // setBillName(value.pic)
        // setBillAddress(value.contactAddress)
        // setSelectedContact(value)
      } else {
        // setBillIdAgent(value.contactId)
        // setBillNameAgent(value.pic)
        // setBillAddressAgent(value.contactAddress)
        // setSelectedContact(value)
      }
    }
  };

  const handleSelectedShipment = (value) => {
    const f = {...formPayment};
    f.Id = value['paymentrequestId'];
    f.ShipmentId = value['shipperId'];
    f.etd = value.etd;
    f.eta = value.eta;
    f.PrincipleBy = value.agentName;
    setFormPayment(f);
    setInvHeader(value.invHeader);
    setShipmentNo(value.shipmentNo);
    stateDetail(value);
    // setPaidOn(value.paidOn);
    setEta(value.eta);
    setEtd(value.etd);
    setShipmentId(value.shipmentId);
    // setShipperId(value.shipperId);
    setShipperName(value.shipperName);
    // setInvHeader(value.invHeader)
    // setShipmentNo(value.shipmentNo)
    setShipmentId(value.id);
    // setEtd(value.etd)
    // setEta(value.eta)
    // setShipmentData(value)
  };

  const handleSelectedCustomerByCustomerTypeId = (value) => {};

  const handleSetPaymentTo = (value) => {
    setStateCustomerTypeName(value);
    if (value.toLowerCase() === 'ssline') {
      setStateCustomerType(11);
    }
    if (value.toLowerCase() === 'emkl') {
      setStateCustomerType(6);
    }
    if (value.toLowerCase() === 'rebate') {
      setStateCustomerType(2);
    }
    if (value.toLowerCase() === 'depo') {
      setStateCustomerType(3);
    }
  };

  useEffect(() => {
    if (statePaymentRequest) {
      if (statePaymentRequest.customerTypeId === 11) {
        setStateCustomerTypeName('SSLine');
      }
      if (statePaymentRequest.customerTypeId === 6) {
        setStateCustomerTypeName('EMKL');
      }
      if (statePaymentRequest.customerTypeId === 2) {
        setStateCustomerTypeName('Rebate');
      }
      if (statePaymentRequest.customerTypeId === 3) {
        setStateCustomerTypeName('Depo');
      }
    }
  }, [statePaymentRequest]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (prId) {
      setIsEditDisabled(true);
      fetchEditData(prId);
      getContact(50, 1);
      getRateCurrency(50, 1);
      getShipmentOrder(50, 1);
    } else {
      getContact(50, 1);
      getRateCurrency(50, 1);
      getShipmentOrder(50, 1);
    }
    return () => controller.abort();
  }, [prId]);

  useEffect(() => {
    if (stateCustomerType) {
      fetchEPL(stateCustomerType);
    }
  }, [stateCustomerType, stateCustomerTypeName]);

  useEffect(() => {
    if (stateCustomerType) {
      getCustomerListByEplId(50, 1, 0, 2, stateCustomerType, false);
    }
  }, [stateCustomerType]);

  const fetchEPL = (stateCustomerType) => {
    let body = {
      flag: 1,
      shipmentId: 1,
      countryId: 101,
      CustomerTypeId: stateCustomerType,
      branchId: 12,
      companyId: 32,
    };
    axios
      .post(
        `http://stage-operation.api.infoss.solusisentraldata.com/estimateProfitLoss/estimateProfitLoss/API/ShipmentOrderListById`,
        body
      )
      .then((resp) => {
        const {data} = resp;
        // setStateShipmentOrderList(data.data);
      })
      .catch((err) => {});
  };

  const handlePrint = () => {
    let printCount = IncShipperData.printing;
    let canPrint = false;
    if (IncShipperData.printing === 0) {
      printCount += 1;
      canPrint = true;
    } else {
      if (IncShipperData.rePrintApproved === true) {
        printCount += 1;
        canPrint = true;
      }
    }
    if (canPrint === true) {
      const payload = {
        rowStatus: IncShipperData.rowStatus,
        countryId: 101,
        companyId: 32,
        branchId: 12,
        id: IncShipperData.id,
        invoiceNo: IncShipperData.invoiceNo,
        printing: printCount,
        user: 'luna',
      };
      axios
        .put('https://localhost:7160/Invoice/UpdateStatusPrint', payload)
        .then((response) => {
          if (response.data.code === 200) {
            fetchEditData(prId);
            successAlert('Data berhasil di print');
          } else {
            Swal.fire('Print Failed', `${response.data.message}`, 'error');
          }
        })
        .catch((error) => {
          console.error(error);
          Swal.fire('Error', `${error.toString()}`, 'error');
        });
    } else {
      Swal.fire('Information', 'Data Has Been Printed', 'info');
    }
  };

  const handleRePrint = () => {
    if (prId) {
      if (IncShipperData.rePrintApproved === true) {
        successAlert('Print ulang sudah di setujui');
      } else {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Once approved, this data can be printed repeatedly',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK',
        }).then((res) => {
          if (res.isConfirmed) {
            const payload = {
              rowStatus: IncShipperData.rowStatus,
              countryId: 101,
              companyId: 32,
              branchId: 12,
              id: IncShipperData.id,
              invoiceNo: IncShipperData.invoiceNo,
              rePrintApproved: 1,
              rePrintApprovedBy: 'luna',
              user: 'luna',
            };
            axios
              .put(
                'https://localhost:7160/Invoice/UpdateStatusRePrint',
                payload
              )
              .then((response) => {
                if (response.data.code === 200) {
                  successAlert('Print ulang sudah di setujui');
                } else {
                  Swal.fire(
                    'Approval Error',
                    `${response.data.message}`,
                    'error'
                  );
                }
              })
              .catch((error) => {
                console.error(error);
                Swal.fire('Print Failed', `${error.toString()}`, 'error');
              });
          }
        });
      }
    }
  };

  const handleApprove = (approveCode) => {};
  //#endregion: Form handling

  //#region: Data Table
  const saveDetail = (payload) => {
    let sumUsd = 0;
    let sumIdr = 0;
    let vatUsd = 0;
    let vatIdr = 0;

    if (detailEdit === true) {
      const newArr = detailMap.slice();
      newArr.forEach((el) => {
        if (el.sequence === payload.sequence) {
          if (el.rowStatus !== 'DEL') {
            if (payload.amountCrr === 1) {
              sumIdr += payload.amount;
              vatIdr += payload.amountVat;
            } else {
              sumUsd += payload.amount;
              vatUsd += payload.amountVat;
            }
          }

          el.accountId = payload.accountId;
          el.accountName = payload.accountName;
          el.description = payload.description;
          el.type = payload.type;
          el.isCostToCost = payload.isCostToCost;
          el.sign = payload.sign;
          el.percentVat = payload.percentVat;
          el.amountVat = payload.amountVat;
          el.quantity = payload.quantity;
          el.perQty = payload.perQty;
          el.originalRate = payload.originalRate;
          el.amount = payload.amount;
          el.originalUsd = payload.originalUsd;
          el.codingQuantity = payload.codingQuantity;
          el.amountCrr = payload.amountCrr;
          el.paid = payload.paid;
          el.isPpn = payload.isPpn === undefined ? false : true;
        } else {
          if (el.rowStatus !== 'DEL') {
            if (el.amountCrr === 1) {
              sumIdr += el.amount;
              vatIdr += el.amountVat;
            } else {
              sumUsd += el.amount;
              vatUsd += el.amountVat;
            }
          }
        }
      });

      setStatePaymentIDR(Number(sumIdr.toFixed(2)));
      setStatePaymentUSD(Number(sumUsd.toFixed(2)));
      setTotalVATIDR(Number(vatIdr.toFixed(2)));
      setTotalVATUSD(Number(vatUsd.toFixed(2)));

      setDetailMap(newArr);

      setDetailEdit(false);
      setSelectedDetail({});
    } else {
      setDetailSequence(payload.sequence);
      let arrDetail = [...IncShipperData, payload];
      stateShipmentOrderList.push(...arrDetail);
      arrDetail.forEach((el) => {
        if (el.rowStatus !== 'DEL') {
          if (el.amountCrr === 1) {
            sumIdr += el.amount;
            vatIdr += el.amountVat;
          } else {
            sumUsd += el.amount;
            vatUsd += el.amountVat;
          }
        }
      });
      setStatePaymentIDR(Number(sumIdr.toFixed(2)));
      setStatePaymentUSD(Number(sumUsd.toFixed(2)));
      setTotalVATIDR(Number(vatIdr.toFixed(2)));
      setTotalVATUSD(Number(vatUsd.toFixed(2)));
      setDetailMap(arrDetail);
    }
  };

  const handleDetailAdd = () => {
    if (!shipmentNo) {
      Swal.fire(
        'Information',
        "Shipment Order Number can't be empty...!!",
        'info'
      );
    } else {
      setOpenModalDetail(true);
    }
  };

  const handleCustomer = () => {
    if (!shipmentNo) {
      Swal.fire(
        'Information',
        "Shipment Order Number can't be empty...!!",
        'info'
      );
    } else {
      setOpenCustomercustomerTypeId(true);
    }
  };

  const handleDetailEdit = () => {
    if (!selectedDetail.sequence) {
      Swal.fire('Information', 'Please select detail data...!!', 'info');
    } else {
      if (selectedDetail.rowStatus !== 'DEL') {
        setDetailEdit(true);
        setOpenModalDetail(true);
      }
    }
  };

  const getDataCustomer = () => {
    if (shipmentId) {
      const payload = {
        shipmentId: shipmentId,
        countryId: 101,
        branchId: 12,
        companyId: 32,
      };
      axios
        .get(
          'http://stage-operation.api.infoss.solusisentraldata.com/estimateProfitLoss/EstimateProfitLoss/Api/CustomerListByShipmentId',
          payload
        )
        .then((response) => {
          if (response.data.code === 200) {
            setStateGetDataCustomer(response.data);
          }
        })
        .catch((e) => {});
    }
  };

  const handleDetailDelete = () => {
    if (!selectedDetail.sequence) {
      Swal.fire('Information', 'Please select detail data...!!', 'info');
    } else {
      let sumUsd = 0;
      let sumIdr = 0;
      let vatUsd = 0;
      let vatIdr = 0;

      let tempSequence = selectedDetail.sequence;
      if (selectedDetail.eplDetailId != 0) {
        sumUsd = statePaymentUSD;
        sumIdr = statePaymentIDR;
        vatUsd = totalVATUSD;
        vatIdr = totalVATIDR;
        detailMap.forEach((el) => {
          if (el.sequence === tempSequence) {
            el.rowStatus = 'ACT';

            if (el.amountCrr === 1) {
              sumIdr -= el.amount;
              vatIdr -= el.amountVat;
            } else {
              sumUsd -= el.amount;
              vatUsd -= el.amountVat;
            }
          }
        });
      } else {
        const deleteFunction = (invoices) => {
          return invoices.sequence !== tempSequence;
        };
        const result = detailMap.filter(deleteFunction);
        if (result.length > 0) {
          tempSequence = 0;
          result.forEach((el) => {
            if (el.rowStatus !== 'ACT') {
              if (el.amountCrr === 1) {
                sumIdr += el.amount;
                vatIdr += el.amountVat;
              } else {
                sumUsd += el.amount;
                vatUsd += el.amountVat;
              }
            }

            if (el.eplDetailId != 0) {
              tempSequence = el.sequence;
            } else {
              tempSequence += 1;
              el.sequence = tempSequence;
            }
          });

          setDetailSequence(tempSequence);
          setStateShipmentOrderList(tempSequence);
        } else {
          setDetailSequence(0);
          setStateShipmentOrderList(0);
        }

        setDetailMap(result);
        setStateShipmentOrderList(result);
      }

      setStatePaymentIDR(Number(sumIdr.toFixed(2)));
      setStatePaymentUSD(Number(sumUsd.toFixed(2)));
      setTotalVATIDR(Number(vatIdr.toFixed(2)));
      setTotalVATUSD(Number(vatUsd.toFixed(2)));

      setSelectedDetail({});
    }
  };

  const editTruckingDetail = () => {
    if (!IncShipperData.sequence) {
      Swal.fire('Information', 'Please select detail data...!!', 'info');
    } else {
      if (IncShipperData.rowStatus !== 'DEL') {
        setDetailEdit(true);
        // setOpenModalTable(true);
      }
    }
  };

  //#endregion: Data Table

  const change = (e) =>
    setFormPayment({...formPayment, [e.target.name]: e.target.value});
  return (
    <>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          {prId ? (
            <h4>Edit Payment Request</h4>
          ) : (
            <h4>Create New Payment Request</h4>
          )}
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={1}>
            <RButton
              variant="outline-infoss me-3"
              onClick={() => history('/booking/payment-request')}
            >
              <ReplyIcon /> Back
            </RButton>
            <RButton
              variant="outline-infoss me-3"
              onClick={() => handleSubmit()}
            >
              <SaveIcon /> Save
            </RButton>
            <RButton
              variant="outline-infoss me-3"
              onClick={() => handlePrint()}
            >
              <PrintIcon /> Print PR
            </RButton>
            <RButton
              variant="outline-infoss me-3"
              onClick={() => handleNewForm()}
            >
              <AddToPhotosIcon /> Add New
            </RButton>
            <RButton
              variant="outline-infoss me-3"
              onClick={() => handleApprove('Acc Manager')}
            >
              <AssignmentTurnedInIcon /> Approve By Acc Manager
            </RButton>
            <RButton
              variant="outline-infoss me-3"
              onClick={() => handleApprove('General PR')}
            >
              <CheckCircleIcon /> Approve General PR with Acc Manager
            </RButton>
            <RButton
              variant="outline-infoss me-3"
              onClick={() => handleApprove('MKT')}
            >
              <LibraryAddCheckIcon /> Approve MKT without Acc Manager
            </RButton>
          </Stack>
        </Grid>
        <Paper variant="outlined" sx={{m: 2, p: 2}}>
          <ModalTableInvoice
            open={openMLSO}
            onClose={() => setOpenMLSO(false)}
            setSelectedData={(e) => handleSelectedShipment(e)}
            headersData={LSOHeaders}
            bodyData={LSOData}
            fetchData={(r, p) => getShipmentOrder(r, p)}
            maxPage={1}
            type={'revised'}
            setId={(e) => setCustomerId(e)}
            setName={(e) => setCustomerName(e)}
            setAddress={(e) => setCustomerAddress(e)}
            setAgentName={(e) => setAgentName(e)}
            setAgentId={(e) => setAgentId(e)}
            setAgentAddress={(e) => setAgentAddress(e)}
            setInvoiceDetails={(e) => setInvoiceDetails(e)}
            setDetailMap={(e) => setDetailMap(e)}
            setDetailSequence={(e) => setDetailSequence(e)}
            dcStatus={debetCredit}
            setPaymentIDR={(e) => setStatePaymentIDR(e)}
            setPaymentUSD={(e) => setStatePaymentUSD(e)}
            setTotalVATIDR={(e) => setTotalVATIDR(e)}
            setTotalVATUSD={(e) => setTotalVATUSD(e)}
            setAllVat={(e) => setAllVat(e)}
            setShipmentId={(e) => setShipmentId(e)}
          />
          <ModalTableTruck
            open={openStorage}
            onClose={() => setOpenStorage(false)}
            setSelectedData={(e) => setSelectedStorage(e)}
            headersData={headerStorage}
            bodyData={dataStorage}
            fetchData={(r, p) => fetchStorage(r, p)}
            maxPage={1}
            type={'truck'}
          />
          <NestedModal
            open={openModalDetail}
            close={() => setOpenModalDetail(false)}
            shipperNo={shipmentNo}
            detail={stateDetail}
            shipperName={shipperName}
            sequence={detailSequence}
            shipmentId={shipmentId}
            shipperId={shipperId}
            shipmentNo={shipmentNo}
            saveDetail={(e) => saveDetail(e)}
            edit={detailEdit}
            resetEdit={() => setDetailEdit(false)}
            selected={selectedDetail}
            dcStatus={debetCredit}
            shipmentData={shipmentData}
          />

          <ModalCustomer
            open={openCustomerBycustomerTypeId}
            onClose={() => setOpenCustomercustomerTypeId(false)}
            headersData={stateCustomersHeaderByCustomerTypeId}
            bodyData={stateCustomersByCustomerTypeId}
            state={shipmentNo}
            setSelectedData={(e) => handleSelectedCustomerByCustomerTypeId(e)}
          />
          {/*<ModalListShipmentOrder
          {/*    show={showMLSO}
          {/*    onHide={() => setShowMLSO(false)}*/}
          {/*    LSOData={LSOData}*/}
          {/*    setSelectedData={(e) => {*/}
          {/*        setSelectedData(e)*/}
          {/*    }}*/}
          {/*    setdefShipNo={(e) => setdefShipNo(e)}*/}
          {/*    MaxPage={1}*/}
          {/*    NumPage={NumPage}*/}
          {/*    RowsCount={RowsCount}*/}
          {/*    setNumPage={(e) => setNumPage(e)}*/}
          {/*    setRowsCount={(e) => setRowsCount(e)}*/}
          {/*/>*/}
          {/*<AddCustomer*/}
          {/*    show={showAddCustomer}*/}
          {/*    onHide={() => {*/}
          {/*        setShowAddCustomer(false)*/}
          {/*    }}*/}
          {/*    NotifAlert={(e, d) => NotifAlert(e, d)}*/}
          {/*    staticId={staticId}*/}
          {/*    AccountName={AccountName}*/}
          {/*    data={IsAdd ? '' : SelectedShipperList}*/}
          {/*/>*/}
          {/*<AddPersonal*/}
          {/*    show={showAddPersonal}*/}
          {/*    onHide={() => {*/}
          {/*        setShowAddPersonal(false)*/}
          {/*    }}*/}
          {/*    NotifAlert={(e, d) => NotifAlert(e, d)}*/}
          {/*    staticId={staticId}*/}
          {/*    AccountName={AccountName}*/}
          {/*    IsAdd={IsAdd}*/}
          {/*    data={IsAdd ? '' : SelectedShipperList}*/}
          {/*/>*/}
          <Grid container spacing={3} direction="row">
            <Grid item xs={5}>
              <div className="border border-secondary rounded p-3">
                <FormLabel id="payment-form-label">Payment Form</FormLabel>
                <RadioGroup
                  row
                  name={'IsGeneralPayment'}
                  aria-labelledby="payment-form-label"
                  value={IsGeneralPR}
                  onChange={(e) => setIsGeneralPR(e.target.value)}
                >
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Payment Request"
                    disabled={isEditDisabled}
                  />
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="General Payment Request"
                    disabled={isEditDisabled}
                  />
                </RadioGroup>

                <FormLabel id="payment-type-label">Type</FormLabel>
                <RadioGroup
                  row
                  name={'isCostToCost'}
                  aria-labelledby="payment-type-label"
                  value={isCostToCost}
                  onChange={(e) => setIsCostToCost(e.target.value)}
                >
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Non Cost To Cost"
                    disabled={isEditDisabled}
                  />
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Cost To Cost"
                    disabled={isEditDisabled}
                  />
                </RadioGroup>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="row mt-3 mx-3">
                <TextField
                  id="principle"
                  label="Principle By"
                  variant="filled"
                  name={'PrincipleBy'}
                  onChange={(e) => setInvHeader(e.target.value)}
                  value={invHeader || '-'}
                  disabled
                />
              </div>
              <div className="row mt-3 mx-3">
                <TextField
                  id="etd-eta-number"
                  label="ETD/ETA"
                  variant="filled"
                  name={'etd/eta'}
                  value={etd.length > 0 ? dateFormat(etd) : ''}
                  onChange={(e) => setEtd(e.target.value)}
                  disabled
                />
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="row">
                <div className="col-8">
                  <TextField
                    id="shipment-order-number"
                    label="Shipment Order Number"
                    value={shipmentNo}
                    onClick={() =>
                      !isEditDisabled ? setOpenMLSO(true) : setOpenMLSO(false)
                    }
                    className="block"
                    variant="standard"
                    size="small"
                    onChange={(e) => setShipmentNo(e.target.value)}
                    disabled={isEditDisabled}
                  />
                </div>
                <div className="col-4 pt-3">
                  <FindInPageIcon
                    className="text-infoss"
                    onClick={() => setOpenMLSO(true)}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{marginTop: 5}} direction="row">
            <Grid item xs={4} className="row">
              <div>
                <TextField
                  className="block"
                  id="principle"
                  label="Payment Request No"
                  variant="filled"
                  name={'PaymentRequestNo'}
                  value={paymentRequestNo}
                  onChange={(e) => setPaymentRequestNo(e.target.value)}
                  disabled={!isEditDisabled}
                />
              </div>
              <div>
                <TextField
                  className="block"
                  id="principle"
                  label="Reference"
                  variant="filled"
                  name={'ReferenceId'}
                  value={statePRRef}
                  onChange={(e) => setStatePRRef(e.target.value)}
                  disabled={isEditDisabled}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="border border-secondary rounded p-3">
                <span>Payment To</span>
                <hr />
                <div className="row mt-4">
                  <RadioGroup
                    row
                    name={'PaymentTo'}
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    value={stateCustomerTypeName}
                    onChange={(e) => handleSetPaymentTo(e.target.value)}
                  >
                    <FormControlLabel
                      value="SSLine"
                      control={<Radio />}
                      label="SSLine"
                      disabled={isEditDisabled}
                    />
                    <FormControlLabel
                      value="EMKL"
                      control={<Radio />}
                      label="EMKL"
                      disabled={isEditDisabled}
                    />
                    <FormControlLabel
                      value="Rebate"
                      control={<Radio />}
                      label="Rebate"
                      disabled={isEditDisabled}
                    />
                    <FormControlLabel
                      value="Depo"
                      control={<Radio />}
                      label="Depo"
                      disabled={isEditDisabled}
                    />
                  </RadioGroup>
                </div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="border border-secondary rounded p-3">
                <span>Rate</span>
                <hr />
                <div className="row">
                  <div className="col-5">
                    <TextField
                      id="filled-basic"
                      name={'KursKMK'}
                      value={stateRate || 0}
                      onChange={(e) => setStateRate(e.target.value)}
                      className="block"
                      variant="filled"
                      size="small"
                      disabled
                    />
                  </div>
                  <div className="col-7">
                    <TextField
                      id="filled-basic"
                      name={'Currency'}
                      value={formPayment.Currency}
                      onChange={change}
                      className="block"
                      variant="filled"
                      size="small"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{marginTop: 2}} direction="row">
            <Grid item xs={4} className="row">
              <div className="col-5">
                <TextField
                  id="principle"
                  label="Printing"
                  name={'PrintingL'}
                  value={stateStatusPrint}
                  onClick={() =>
                    !isEditDisabled ? setOpenMLSO(true) : setOpenMLSO(false)
                  }
                  onChange={(e) => setStatusStatePrint(e.target.value)}
                  className="block"
                  variant="filled"
                  disabled={isEditDisabled}
                />
              </div>
              <div className="col-7">
                <TextField
                  id="filled-basic"
                  label="-"
                  name={'PrintingR'}
                  value={statePrint}
                  onClick={() =>
                    !isEditDisabled ? setOpenMLSO(true) : setOpenMLSO(false)
                  }
                  className="block"
                  variant="filled"
                  disabled={isEditDisabled}
                  onChange={(e) => setStatePrint(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={8}>
              <div className="row mt-2">
                <div className="col-4">
                  <TextField
                    id="filled-basic"
                    label="Vendor"
                    name={'CustomerId'}
                    value={formPayment.CustomerId}
                    onChange={(e) => handleApprove(e.target.value)}
                    className="block"
                    variant="standard"
                    size="small"
                    disabled
                  />
                </div>
                <div className="col-1 text-center pt-3">
                  <FindInPageIcon
                    className="text-infoss"
                    onClick={() => handleCustomer()}
                  />
                </div>
                <div className="col-7">
                  <TextField
                    id="filled-basic"
                    label="Vendor Name"
                    name={'CustomerName'}
                    value={customerName || '-'}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="block"
                    variant="filled"
                    size="small"
                    disabled
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={4} className="row">
              <div className="col-12 mt-3">
                <TextField
                  className="block"
                  id="principle"
                  label="DN Vendor"
                  variant="filled"
                  name={'DNVendor'}
                  value={stateDN}
                  onChange={(e) => setStateDN(e.target.value)}
                  disabled={isEditDisabled}
                />
              </div>
            </Grid>
            <Grid item xs={8}>
              <div className="row mt-2">
                <div className="col-4">
                  <TextField
                    id="filled-basic"
                    label="Personal"
                    name={'PersonalId'}
                    value={formPayment.PersonalId}
                    onChange={(e) => handleApprove(e.target.value)}
                    className="block"
                    variant="standard"
                    size="small"
                    disabled
                  />
                </div>
                <div className="col-1 text-center pt-3">
                  <FindInPageIcon
                    className="text-infoss"
                    onClick={() => handleApprove(true)}
                  />
                </div>
                <div className="col-7">
                  <TextField
                    id="filled-basic"
                    label="Personal Name"
                    name={'PersonalName'}
                    value={statePersonalName || '-'}
                    onChange={(e) => setStatePersonalName(e.target.value)}
                    className="block"
                    variant="filled"
                    size="small"
                    disabled
                  />
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item sx={{marginTop: 10}}>
            <Box sx={{border: 1, borderRadius: 1, p: 1, mt: 3}}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                flex-direction="row"
              >
                <Grid item>
                  <Typography variant="overline" display="block" gutterBottom>
                    Being For Payment
                  </Typography>
                </Grid>
                {/* <Grid item>
                  <RadioGroup
                    row
                    name="vat-radio"
                    value={allVat}
                    onChange={(e) => handleAllVat(e.target.value)}
                  >
                    <FormControlLabel
                      value={11}
                      control={<Radio />}
                      label="ALL - VAT 11%"
                    />
                    <FormControlLabel
                      value={1.1}
                      control={<Radio />}
                      label="ALL - VAT 1,1%"
                    />
                  </RadioGroup>
                </Grid> */}
              </Grid>
              <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Code</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Amount USD</TableCell>
                      <TableCell>Amount IDR</TableCell>
                      <TableCell>CTC</TableCell>
                      <TableCell>Ppn 10%</TableCell>
                      <TableCell>Faktur No.</TableCell>
                      <TableCell>NoPol Tuck.</TableCell>
                      <TableCell>Driver</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stateShipmentOrderList.length > 0 ? (
                      stateShipmentOrderList.map((el, index) => {
                        return (
                          <TableRow
                            key={`${el.sequence} ${index}`}
                            onClick={() => setSelectedDetail(el)}
                            sx={
                              selectedDetail.sequence === el.sequence
                                ? selectedStyle
                                : el.rowStatus === 'DEL'
                                ? deletedDetailStyle
                                : {}
                            }
                          >
                            <TableCell>{el.rowStatus || 'ACT'}</TableCell>
                            <TableCell>
                              {Number(el.paid) === 0 ? 'Yes' : 'No'}
                            </TableCell>
                            <TableCell>{el.description || '-'}</TableCell>
                            <TableCell>
                              {el.amountUSD === 0
                                ? new Intl.NumberFormat().format(el.amountUSD)
                                : 0}
                            </TableCell>
                            <TableCell>
                              {el.amountIDR === 0
                                ? new Intl.NumberFormat().format(el.amountIDR)
                                : 0}
                            </TableCell>
                            <TableCell>
                              {el.isCostToCost === true ? 'Yes' : 'No'}
                            </TableCell>
                            <TableCell>
                              {el.isPpn === true ? 'Yes' : 'No'}
                            </TableCell>
                            <TableCell>{el.factorNo || 0}</TableCell>
                            <TableCell>{el.kendaraanNopol || 0}</TableCell>
                            <TableCell>{el.driver || 0}</TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={10} sx={{textAlign: 'center'}}>
                          Data Empty
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
                sx={{mt: 2}}
              >
                <Grid item container spacing={2} flexDirection="row" xs={6}>
                  <Grid item>
                    <Button
                      variant="outlined"
                      startIcon={<AddBoxIcon />}
                      color="secondary"
                      onClick={() => handleDetailAdd()}
                    >
                      ADD
                    </Button>
                  </Grid>

                  {/* <Grid item>
                    <Button
                      variant="outlined"
                      startIcon={<ModeEditIcon />}
                      color="secondary"
                      onClick={() => handleDetailEdit()}
                    >
                      edit
                    </Button>
                  </Grid> */}
                  {/* <Grid item>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="secondary"
                      onClick={() => handleDetailDelete()}
                    >
                      Delete
                    </Button>
                  </Grid> */}

                  <Grid item>
                    <Button
                      variant="outlined"
                      startIcon={<ModeEditIcon />}
                      color="secondary"
                      onClick={() => handleDetailEdit()}
                    >
                      edit
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="secondary"
                      onClick={() => handleDetailDelete()}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>

                <Grid
                  item
                  container
                  flexDirection="row-reverse"
                  xs={6}
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      variant="outlined"
                      startIcon={<AddToPhotosIcon />}
                      color="secondary"
                      onClick={() => setOpenStorage(true)}
                    >
                      Add Trucking
                    </Button>
                  </Grid>
                  {formPayment.ContactTypeId === 5 ? (
                    <>
                      <Grid item>
                        <Button
                          variant="outlined"
                          startIcon={<AddToPhotosIcon />}
                          color="secondary"
                          onClick={() => console.log()}
                        >
                          add ps
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          startIcon={<AddToPhotosIcon />}
                          color="secondary"
                          onClick={() => console.log()}
                        >
                          add hf
                        </Button>
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{marginTop: 2}}
            flexDirection="row"
            alignItems="center"
          >
            <Grid item>
              <Box sx={{border: 1, borderRadius: 1, p: 1, mt: 1}}>
                <FormLabel id="paid-usd-radio">Payment USD</FormLabel>
                <RadioGroup
                  aria-labelledby="paid-usd-radio"
                  name={'paidUSD'}
                  value={statePaidUSD}
                  onChange={(e) => setStatePaidUSD(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Paid"
                    disabled={isEditDisabled}
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Not Paid"
                    disabled={isEditDisabled}
                  />
                </RadioGroup>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{border: 1, borderRadius: 1, p: 1, mt: 1}}>
                <FormLabel id="paid-idr-radio">Payment IDR</FormLabel>
                <RadioGroup
                  aria-labelledby="paid-idr-radio"
                  name={'paidIDR'}
                  value={statePaidIDR}
                  onChange={(e) => setStatePaidIDR(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Paid"
                    disabled={isEditDisabled}
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Not Paid"
                    disabled={isEditDisabled}
                  />
                </RadioGroup>
              </Box>
            </Grid>
            <Grid item>
              <NumericFormat
                customInput={TextField}
                thousandSeparator=","
                label="Total USD"
                onValueChange={(e) => setStatePaymentUSD(e.target.value)}
                value={statePaymentUSD}
                name={'totalUSD'}
                id="payment-usd"
                variant="filled"
                disabled
              />
            </Grid>
            <Grid item>
              <NumericFormat
                customInput={TextField}
                thousandSeparator=","
                label="Total IDR"
                onValueChange={(e) => setStatePaymentIDR(e.target.value)}
                value={statePaymentIDR}
                name={'totalIDR'}
                id="payment-idr"
                variant="filled"
                disabled
              />
            </Grid>
            <Grid item>
              <NumericFormat
                customInput={TextField}
                thousandSeparator=","
                label="Total Vat USD"
                onValueChange={(e) => setStatePPNUSD(e.target.value)}
                value={statePPNUSD}
                name={'taxUSD'}
                id="vat-usd"
                variant="filled"
                disabled
              />
            </Grid>
            <Grid item>
              <NumericFormat
                customInput={TextField}
                thousandSeparator=","
                label="Total Vat IDR"
                onValueChange={(e) => setStatePPNIDR(e.target.value)}
                value={statePPNIDR}
                name={'taxIDR'}
                id="vat-idr"
                variant="filled"
                disabled
              />
            </Grid>
          </Grid>
          {/*<Grid container spacing={2} flexDirection="row" alignItems="center">
                    <Grid item>
                        <Box sx={{ border: 1, borderRadius: 1, p: 1, mt: 1 }}>
                            <FormLabel id="invoice-rate-label">Rate</FormLabel>
                            <Grid container item spacing={2} direction="row">
                                <Grid item>
                                    <TextField value={formPayment.KursKMK} onChange={change} name={"KursKMK"} id="rate-amount" label="Amount" variant="filled" aria-labelledby="invoice-rate-label" disabled />
                                </Grid>
                                <Grid item>
                                    <TextField value={formPayment.KursDate !== '' ? dateFormat(formPayment.KursDate) : formPayment.KursDate} onChange={change} name={"KursDate"} id="rate-date" label="Date" variant="filled" aria-labelledby="invoice-rate-label" disabled />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item>
                        <FormControl sx={{ minWidth: 110 }}>
                            <InputLabel id="invoice-currency-label">Currency</InputLabel>
                            <Select
                                labelId="invoice-currency-label"
                                id="invoice-currency-select"
                                name={"Currency"}
                                value={formPayment.Currency}
                                label="Invoice Currency"
                                onChange={change}
                                disabled={isEditDisabled}
                            >
                                <MenuItem value={1}>ALL</MenuItem>
                                <MenuItem value={2}>IDR</MenuItem>
                                <MenuItem value={3}>USD</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField value={formPayment.KursKMK} onChange={change} name={"KursKMK"} id="kurs-kmk" label="Kurs KMK" variant="filled" disabled />
                    </Grid>
                </Grid>*/}
        </Paper>
      </Grid>
    </>
  );
};

export default CrudPaymentRequestPage;
