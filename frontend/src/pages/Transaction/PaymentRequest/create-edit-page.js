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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import SaveIcon from '@mui/icons-material/Save';
import FormLabel from '@mui/material/FormLabel';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import PrintIcon from '@mui/icons-material/Print';
import ReplyIcon from '@mui/icons-material/Reply';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CachedIcon from '@mui/icons-material/Cached';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import ApprovalIcon from '@mui/icons-material/Approval';
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
import NestedModal from '../Invoice/modalInvoiceDetails';
import ModalTableInvoice from '../Invoice/modalTableInvoice';
import ModalInvoiceUtilities from '../Invoice/modalInvoiceUtilities';
import {
  PaymentRequestFormModel,
  PaymentRequestFormTableModel,
  PaymentHeadersDummy,
} from './model';
import {ButtonBase} from '@mui/material';
import AddCustomer from '../../../components/pagePaymentRequest/AddCustomer';
import AddPersonal from '../../../components/pagePaymentRequest/AddPersonal';
import ModalListShipmentOrder from '../../../components/pagePaymentRequest/ModalListShipmentOrder';
import AddbeingForPayment from '../../../components/pagePaymentRequest/AddbeingForPayment';

function Img(props) {
  return null;
}

Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

let templatePaymentRequest = {
  paymentRequest: {
    rowStatus: 'string',
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
    paidUSD: true,
    datePaidUSD: '2022-11-12T09:42:20.162Z',
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

const CrudPaymentRequestPage = () => {
  const {prId} = useParams();
  const history = useNavigate();
  const [isEditDisabled, setIsEditDisabled] = useState(false);

  // Shipment Order Dialog
  const [openMLSO, setOpenMLSO] = useState(false);
  const [LSOHeaders, setLSOHeaders] = useState([]);
  const [LSOData, setLSOData] = useState([]);
  // Payment Trucking Table
  const [openModalPayment, setOpenModalPayment] = useState(false);
  const [IncShipperHeaders, setIncShipperHeaders] =
    useState(PaymentHeadersDummy);
  const [IncShipperData, setIncShipperData] = useState([]);

  const [editInvoice, setEditInvoice] = useState({});
  const [selectedDetail, setSelectedDetail] = useState({});
  const [paymentRequestNo, setPaymentRequestNo] = useState('');
  const [paymentRequestDetails, setPaymentRequestDetail] = useState([]);
  const [IsGeneralPR, setIsGeneralPR] = useState(false);
  const [isCostToCost, setIsCostToCost] = useState(false);
  const [statePRNo, setStatePRNo] = useState(0);
  const [statePRNo2, setStatePRNo2] = useState('');
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
  const [shipmentId, setShipmentId] = useState(0);
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
  const [statePPNUSD, setStatePPNUSD] = useState(0);
  const [statePPNIDR, setStatePPNIDR] = useState(0);
  const [stateStatusPrint, setStatusStatePrint] = useState(0);
  const [statePrint, setStatePrint] = useState(0);

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

  //#region: API handling
  const fetchEditData = (prId) => {
    let body = {
      userCode: 'luna',
      countryId: 101,
      companyId: 32,
      branchId: 12,
    };

    axios
      .post(
        `http://stage-operation.api.infoss.solusisentraldata.com/PaymentRequest/PaymentRequest/PostById?id=${prId}`,
        body
      )
      .then((response) => {
        setPaymentRequestDetail(
          response.data.data.paymentRequest.paymentRequestDetails
        );
        let tempDetail =
          response.data.data.paymentRequest.paymentRequestDetails;
        setDetailMap(tempDetail);

        if (tempDetail.length > 0) {
          setDetailSequence(tempDetail[tempDetail.length - 1].sequence);
        }
        setEditInvoice(response.data.data.paymentRequest);

        let temp = response.data.data.paymentRequest;
        setIsGeneralPR(temp.isGeneralPR);
        setIsCostToCost(temp.isCostToCost);
        setEtd(temp.etd);
        setShipmentNo(temp.shipmentNo);
        setJobOwnerId(temp.jobOwnerId);
        setStatePRNo(temp.prNo);
        setStatePRNo2(temp.prNo2);
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

        return axios.post(
          `http://stage-master.api.infoss.solusisentraldata.com/jobowner/jobowner/PostById?id=${jobOwnerId}`,
          body
        );
      })
      .then((job) => {
        if (job.data.code === 200) {
          setInvHeader(job.data.data.jobOwner.masterCode);
        }
      })
      .catch((error) => console.error(error));
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

  const handleSubmit = () => {
    if (prId) {
      let payload = {
        invoice: IncShipperData,
        invoiceDetails: IncShipperData,
      };
      delete payload.invoice.invoiceDetails;
      payload.invoice.shipmentId = IncShipperData;
      payload.invoice.customerAddress = IncShipperData;
      payload.invoice.invHeader = IncShipperData;
      payload.invoice.packingListNo = IncShipperData;
      payload.invoice.siCustomerNo = IncShipperData;
      payload.invoice.isStampDuty = IncShipperData.toString() === 'true';
      payload.invoice.stampDutyAmount =
        IncShipperData.toString() === 'true' ? IncShipperData : 0;
      payload.invoice['paymentUSD'] = IncShipperData;
      payload.invoice['paymentIDR'] = IncShipperData;
      payload.invoice['totalVatUSD'] = IncShipperData;
      payload.invoice['totalVatIDR'] = IncShipperData;
      payload.invoice.invoicesAgent = IncShipperData;
      axios
        .put(
          // 'http://stage-operation.api.infoss.solusisentraldata.com/invoice/invoice/Update',
          'http://stage-operation.api.infoss.solusisentraldata.com/PaymentRequest/PaymentRequest/Update',
          payload
        )
        .then((response) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Update Data Success',
            showConfirmButton: false,
            timer: 1500,
          });

          history('/booking/payment-request');
        })
        .catch((error) => console.error(error));
    } else {
      if (!shipmentData.shipmentNo) {
        Swal.fire(
          'Information',
          "Shipment Order Number can't be empty...!!",
          'info'
        );
      } else {
        let payload = templatePaymentRequest;
        payload.paymentRequest['shipmentId'] = shipmentData.shipmentId;
        payload.paymentRequest.shipmentNo = shipmentData.shipmentNo;
        payload.paymentRequest.etd = etd;
        payload.paymentRequest.eta = eta;
        payload.paymentRequest.reference = 'string';
        payload.paymentRequest['prStatus'] = 0;
        payload.paymentRequest['isGeneralPR'] = true;
        payload.paymentRequest['customerId'] = 0;
        payload.paymentRequest['customerTypeId'] = 0;
        payload.paymentRequest.personalId = 0;
        payload.paymentRequest['paymentUSD'] = statePaymentUSD;
        payload.paymentRequest['paymentIDR'] = statePaymentIDR;
        payload.paymentRequest['prContraStatus'] = 'string';
        payload.paymentRequest['prContraNo'] = 0;
        payload.paymentRequest['paidUSD'] = statePaidUSD;
        payload.paymentRequest['datePaidUSD'] = '2022-11-12T09:42:20.162Z';
        payload.paymentRequest['paidIDR'] = statePaidIDR;
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
        payload.paymentRequest['user'] = 'string';
        payload.paymentRequestDetails = [];
        axios
          .post(
            'http://stage-operation.api.infoss.solusisentraldata.com/PaymentRequest/PaymentRequest/Create',
            payload
          )
          .then((response) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Create Data Success',
              showConfirmButton: false,
              timer: 1500,
            });
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

    setShipmentId(value.shipmentId);
    setEta(value.eta);
    setEtd(value.etd);
    setShipmentData(value);
    // setInvHeader(value.invHeader)
    // setShipmentNo(value.shipmentNo)
    // setShipmentId(value.id)
    // setEtd(value.etd)
    // setEta(value.eta)
    // setShipmentData(value)
  };

  const handleSetPaymentTo = (value) => {
    const f = {...formPayment};
    f.PaymentTo = value;
    setFormPayment(f);
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
  const saveTruckingDetail = (payload) => {
    let sumUsd = 0;
    let sumIdr = 0;
    let vatUsd = 0;
    let vatIdr = 0;

    if (IncShipperData === true) {
      const newArr = IncShipperData.slice();
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

      // setPaymentIDR(Number(sumIdr.toFixed(2)))
      // setPaymentUSD(Number(sumUsd.toFixed(2)))
      // setTotalVATIDR(Number(vatIdr.toFixed(2)))
      // setTotalVATUSD(Number(vatUsd.toFixed(2)))

      // setDetailMap(newArr)

      // setDetailEdit(false)
      // setSelectedDetail({})
    } else {
      // setDetailSequence(payload.sequence)

      let arrDetail = [...IncShipperData, payload];
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
      // setPaymentIDR(Number(sumIdr.toFixed(2)))
      // setPaymentUSD(Number(sumUsd.toFixed(2)))
      // setTotalVATIDR(Number(vatIdr.toFixed(2)))
      // setTotalVATUSD(Number(vatUsd.toFixed(2)))

      // setDetailMap(arrDetail)
    }
  };

  const addTruckingDetail = () => {
    if (!shipmentData.shipmentNo) {
      Swal.fire(
        'Information',
        "Shipment Order Number can't be empty...!!",
        'info'
      );
    } else {
      // setOpenModalTable(true)
    }
  };

  const editTruckingDetail = () => {
    if (!IncShipperData.sequence) {
      Swal.fire('Information', 'Please select detail data...!!', 'info');
    } else {
      if (IncShipperData.rowStatus !== 'DEL') {
        // setDetailEdit(true)
        // setOpenModalTable(true)
      }
    }
  };

  const deleteTruckingDetail = () => {
    if (!IncShipperData.sequence) {
      Swal.fire('Information', 'Please select detail data...!!', 'info');
    } else {
      let sumUsd = 0;
      let sumIdr = 0;
      let vatUsd = 0;
      let vatIdr = 0;

      let tempSequence = IncShipperData.sequence;

      // let fromEpl = false

      // invoiceDetails.forEach(el =>  {
      //     if(el.sequence === tempSequence) {
      //         fromEpl = true
      //     }
      // })
      if (IncShipperData && IncShipperData.eplDetailId !== 0) {
        sumUsd = IncShipperData;
        sumIdr = IncShipperData;
        vatUsd = IncShipperData;
        vatIdr = IncShipperData;

        IncShipperData.forEach((el) => {
          if (el.sequence === tempSequence) {
            el.rowStatus = 'DEL';

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
        const result = IncShipperData.filter(deleteFunction);
        if (result.length > 0) {
          tempSequence = 0;
          result.forEach((el) => {
            if (el.rowStatus !== 'DEL') {
              if (el.amountCrr === 1) {
                sumIdr += el.amount;
                vatIdr += el.amountVat;
              } else {
                sumUsd += el.amount;
                vatUsd += el.amountVat;
              }
            }

            if (el.eplDetailId !== 0) {
              tempSequence = el.sequence;
            } else {
              tempSequence += 1;
              el.sequence = tempSequence;
            }
          });

          // setDetailSequence(tempSequence)
        } else {
          // setDetailSequence(0)
        }

        // setDetailMap(result)
      }

      // setPaymentIDR(Number(sumIdr.toFixed(2)))
      // setPaymentUSD(Number(sumUsd.toFixed(2)))
      // setTotalVATIDR(Number(vatIdr.toFixed(2)))
      // setTotalVATUSD(Number(vatUsd.toFixed(2)))

      // setSelectedDetail({})
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
          />

          {/*<ModalListShipmentOrder*/}
          {/*    show={showMLSO}*/}
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

          {/*<AddbeingForPayment*/}
          {/*    show={showAddbeingForPayment}*/}
          {/*    onHide={() => {*/}
          {/*        setShowAddbeingForPayment(false)*/}
          {/*    }}*/}
          {/*    NotifAlert={(e, d) => NotifAlert(e, d)}*/}
          {/*    staticId={staticId}*/}
          {/*    AccountName={AccountName}*/}
          {/*    IsAdd={IsAdd}*/}
          {/*    data={IsAdd ? '' : SelectedShipperList}*/}
          {/*    IncShipperList={IncShipperList}*/}
          {/*    setIncShipperList={(e) => setIncShipperList(e)}*/}
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
                  onClick={() =>
                    !isEditDisabled ? setOpenMLSO(true) : setOpenMLSO(false)
                  }
                  onChange={(e) => setInvHeader(e.target.value)}
                  value={invHeader || '-'}
                  disabled={isEditDisabled}
                />
              </div>
              <div className="row mt-3 mx-3">
                <TextField
                  id="etd-eta-number"
                  label="ETD/ETA"
                  variant="filled"
                  name={'etd/eta'}
                  onClick={() =>
                    !isEditDisabled ? setOpenMLSO(true) : setOpenMLSO(false)
                  }
                  value={etd.length > 0 ? dateFormat(etd) : ''}
                  onChange={(e) => setEtd(e.target.value)}
                  disabled={isEditDisabled}
                />
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="row">
                <div className="col-8">
                  <TextField
                    id="shipment-order-number"
                    label="Shipment Order"
                    name={'ShipmentId'}
                    value={shipmentNo || '-'}
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
                  onClick={() =>
                    !isEditDisabled ? setOpenMLSO(true) : setOpenMLSO(false)
                  }
                  value={statePRNo || 0}
                  onChange={(e) => setPaymentRequestNo(e.target.value)}
                  disabled={isEditDisabled}
                />
              </div>
              <div>
                <TextField
                  className="block"
                  id="principle"
                  label="Reference"
                  variant="filled"
                  name={'ReferenceId'}
                  onClick={() =>
                    !isEditDisabled ? setOpenMLSO(true) : setOpenMLSO(false)
                  }
                  value={statePRRef || '-'}
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
                    value={formPayment.PaymentTo}
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

              <div className="col-12 mt-3">
                <TextField
                  className="block"
                  id="principle"
                  label="DN Vendor"
                  variant="standard"
                  name={'DNVendor'}
                  onClick={(e) => setStateDN(e.target.value)}
                  value={stateDN || '-'}
                  disabled={isEditDisabled}
                />
              </div>
            </Grid>
            <Grid item xs={8}>
              <div className="row">
                <div className="col-4">
                  <TextField
                    id="filled-basic"
                    label="Customer"
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
                    onClick={() => handleApprove(true)}
                  />
                </div>
                <div className="col-7">
                  <TextField
                    id="filled-basic"
                    label="Customer Name"
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
              <div className="row mt-3">
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
                {/*<Grid item>*/}
                {/*    <RadioGroup*/}
                {/*        row*/}
                {/*        name={"taxPercent"}*/}
                {/*        value={formPayment.taxPercent}*/}
                {/*        onChange={change}*/}
                {/*    >*/}
                {/*        <FormControlLabel value={11} control={<Radio />} label="ALL - VAT 11%" />*/}
                {/*        <FormControlLabel value={1.1} control={<Radio />} label="ALL - VAT 1,1%" />*/}
                {/*    </RadioGroup>*/}
                {/*</Grid>*/}
              </Grid>
              <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Code</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Amount USD</TableCell>
                      <TableCell>Amount IDR</TableCell>
                      <TableCell>VAT</TableCell>
                      <TableCell />
                      <TableCell>CostToCost</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {IncShipperData.length > 0 ? (
                      IncShipperData.map((el) => {
                        return (
                          <TableRow
                            key={el.sequence}
                            onClick={() => setSelectedDetail(el)}
                            sx={
                              selectedDetail.sequence === el.sequence
                                ? selectedStyle
                                : el.rowStatus === 'DEL'
                                ? deletedDetailStyle
                                : {}
                            }
                          >
                            <TableCell>{el.sequence}</TableCell>
                            <TableCell>{el.description}</TableCell>
                            <TableCell>
                              {el.amountCrr === 0
                                ? new Intl.NumberFormat().format(el.amount)
                                : 0}
                            </TableCell>
                            <TableCell>
                              {el.amountCrr === 1
                                ? new Intl.NumberFormat().format(el.amount)
                                : 0}
                            </TableCell>
                            <TableCell>
                              {el.percentVat ? el.percentVat : 0}%
                            </TableCell>
                            <TableCell>
                              {el.sign === true ? '+' : '-'}
                            </TableCell>
                            <TableCell>
                              {el.isCostToCost === true ? 'Yes' : 'No'}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} sx={{textAlign: 'center'}}>
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
                      onClick={() => addTruckingDetail()}
                    >
                      ADD
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      startIcon={<ModeEditIcon />}
                      color="secondary"
                      onClick={() => editTruckingDetail()}
                    >
                      EDIT
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="secondary"
                      onClick={() => deleteTruckingDetail()}
                    >
                      DELETE
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
                      onClick={() => console.log('setOpenStorage(true)')}
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
                          onClick={() => console.log('setOpenPs(true)')}
                        >
                          add ps
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          startIcon={<AddToPhotosIcon />}
                          color="secondary"
                          onClick={() => console.log('setOpenHf(true)')}
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
