import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import {useNavigate, useParams} from 'react-router-dom';
import CachedIcon from '@mui/icons-material/Cached';
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import PrintIcon from '@mui/icons-material/Print';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ApprovalIcon from '@mui/icons-material/Approval';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalTableInvoice from './modalTableInvoice';
import axios from 'axios';
import {API_URL, dateFormat} from '../../../helpers/constant';
import Swal from 'sweetalert2';
import NestedModal from './modalInvoiceDetails';
import {NumericFormat} from 'react-number-format';
import ModalInvoiceUtilities from './modalInvoiceUtilities';

const succesAlert = (text) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: text,
    showConfirmButton: false,
    timer: 1500,
  });
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const {
    children,
    value,
    index,
    customerId,
    setCustomerId,
    customerName,
    setCustomerName,
    customerAddress,
    setCustomerAddress,
    setOpenContacts,
    isDisabled,
    billId,
    setBillId,
    billName,
    setBillName,
    billAddress,
    setBillAddress,
    setContactType,
  } = props;

  const [addressLock, setAddressLock] = useState(true);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <FormLabel id="invoice-tabs">{children}</FormLabel>
            </Grid>
            {index === 0 ? (
              <>
                <Grid container item spacing={2} direction="row" xs={12}>
                  <Grid item xs={4}>
                    <TextField
                      id="tab-number"
                      label="Number"
                      variant="filled"
                      aria-labelledby="invoice-tabs"
                      disabled
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      fullWidth
                      onClick={() => {
                        if (isDisabled === false) {
                          setOpenContacts(true);
                          setContactType('shipper-customer');
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      id="tab-name"
                      label="Name"
                      variant="filled"
                      aria-labelledby="invoice-tabs"
                      disabled
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <TextareaAutosize
                    maxRows={3}
                    aria-label="maximum height"
                    placeholder="Address"
                    minRows={2}
                    style={{width: 400}}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    variant="filled"
                    disabled={addressLock}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setAddressLock(false)}
                  >
                    change address
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid container item spacing={2} direction="row" xs={12}>
                  <Grid item xs={4}>
                    <TextField
                      id="tab-number-bill"
                      label="Number"
                      variant="filled"
                      aria-labelledby="invoice-tabs"
                      disabled
                      value={billId}
                      onChange={(e) => setBillId(e.target.value)}
                      fullWidth
                      onClick={() => {
                        if (isDisabled === false) {
                          setOpenContacts(true);
                          setContactType('shipper-bill');
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      id="tab-name-bill"
                      label="Name"
                      variant="filled"
                      aria-labelledby="invoice-tabs"
                      disabled
                      value={billName}
                      onChange={(e) => setBillName(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <TextareaAutosize
                    maxRows={3}
                    minRows={2}
                    placeholder="Address"
                    style={{width: 400}}
                    value={billAddress}
                    onChange={(e) => setBillAddress(e.target.value)}
                    variant="filled"
                    disabled={addressLock}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setAddressLock(false)}
                  >
                    change address
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

let templateInvoice = {
  invoice: {
    rowStatus: 'ACT',
    countryId: 101,
    companyId: 32,
    branchId: 12,
    id: 0,
    ticketId: 0,
    invoiceNo: 6666,
    debetCredit: 'string',
    shipmentId: 0,
    shipmentNo: 'string',
    etd: '2022-10-26T08:10:09.848Z',
    eta: '2022-10-26T08:10:09.848Z',
    customerTypeId: 0,
    customerId: 0,
    customerName: 'string',
    customerAddress: 'string',
    billId: 0,
    billName: 'string',
    billAddress: 'string',
    invoicesTo: 'string',
    invoiceStatus: 0,
    paymentUSD: 0,
    paymentIDR: 0,
    totalVatUSD: 0,
    totalVatIDR: 0,
    rate: 0,
    exRateDate: '2022-10-26T08:10:09.848Z',
    period: 0,
    yearPeriod: 0,
    invoicesAgent: 'string',
    invoicesEdit: 'string',
    jenisInvoices: 'string',
    linkTo: 'string',
    dueDate: 0,
    paid: true,
    paidOn: '2022-10-26T08:10:09.848Z',
    saveOR: true,
    badDebt: true,
    badDebtOn: '2022-10-26T08:10:09.848Z',
    reBadDebt: true,
    dateReBadDebt: '2022-10-26T08:10:09.848Z',
    printing: 0,
    printedOn: '2022-10-26T08:10:09.848Z',
    deleted: true,
    deletedOn: '2022-10-26T08:10:09.848Z',
    invoiceNo2: 'string',
    invHeader: 0,
    exRateId: 0,
    rePrintApproved: true,
    rePrintApprovedOn: '2022-10-26T08:10:09.848Z',
    rePrintApprovedBy: 'string',
    deletedRemarks: 'string',
    idLama: 0,
    isCostToCost: true,
    sfpId: 0,
    sfpNoFormat: 'string',
    sfpDetailId: 0,
    uniqueKeySFP: 'string',
    uniqueKeyInvoice: 'string',
    deleteType: 0,
    deleteTypeRefInvId: 0,
    kursKMK: 0,
    kursKMKId: 0,
    isDelivered: true,
    deliveredOn: '2022-10-26T08:10:09.848Z',
    deliveredRemarks: 'string',
    sfpReference: 'string',
    approvedCredit: true,
    approvedCreditBy: 0,
    approvedCreditOn: '2022-10-26T08:10:09.848Z',
    approvedCreditRemarks: 'string',
    packingListNo: 'string',
    siCustomerNo: 'string',
    reference: 'string',
    isStampDuty: true,
    stampDutyAmount: 0,
    pejkpNumber: 0,
    pejkpReference: 'string',
    transactionOn: '2022-10-26T08:10:09.848Z',
    user: 'luna',
  },
  invoiceDetails: [
    {
      rowStatus: 'string',
      countryId: 0,
      companyId: 0,
      branchId: 0,
      id: 0,
      invoiceId: 0,
      sequence: 0,
      debetCredit: 'string',
      accountId: 0,
      description: 'string',
      type: 0,
      codingQuantity: true,
      quantity: 0,
      perQty: 0,
      sign: true,
      amountCrr: 0,
      amount: 0,
      percentVat: 0,
      amountVat: 0,
      eplDetailId: 0,
      vatId: 0,
      idLama: 0,
      isCostToCost: true,
      originalUsd: 0,
      originalRate: 0,
      user: 'string',
      invoiceDetailStorages: [
        {
          rowStatus: 'string',
          countryId: 0,
          companyId: 0,
          branchId: 0,
          invoiceDetailId: 0,
          sequence: 0,
          fromDate: '2022-10-26T08:10:09.849Z',
          toDate: '2022-10-26T08:10:09.849Z',
          totalDays: 0,
          storageDetailId: 0,
          amountIDR: 0,
          amountUSD: 0,
          storageId: 0,
          user: 'string',
        },
      ],
    },
  ],
};

let revisedHeadersDummy = [
  {
    column: 'invoiceNo',
    text: 'Invoice Number',
    format: '',
  },
  {
    column: 'printedOn',
    text: 'Printed On',
    format: '',
  },
];

let storageHeadersDummy = [
  {
    column: 'code',
    text: 'Code',
    format: '',
  },
  {
    column: 'name',
    text: 'Name',
    format: '',
  },
  {
    column: 'crr',
    text: 'Crr',
    format: '',
  },
  {
    column: 'payment',
    text: 'Payment',
    format: '',
  },
  {
    column: 'type',
    text: 'Type',
    format: '',
  },
];

const selectedStyle = {bgcolor: (theme) => theme.palette.primary.main};
const deletedDetailStyle = {bgcolor: (theme) => theme.palette.text.disabled};

const CreateInvoicePage = () => {
  const {invId} = useParams();
  const history = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [shipmentData, setShipmentData] = useState({});
  const [shipmentNo, setShipmentNo] = useState('');
  const [shipmentId, setShipmentId] = useState(0);
  const [etd, setEtd] = useState('');
  const [eta, setEta] = useState('');
  const [openMLSO, setOpenMLSO] = useState(false);
  const [LSOHeaders, setLSOHeaders] = useState([]);
  const [LSOData, setLSOData] = useState([]);
  const [jenisInvoices, setJenisInvoices] = useState('I');
  const [isCTC, setIsCTC] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState('');
  const [printing, setPrinting] = useState(0);
  const [printedOn, setPrintedOn] = useState(null);
  const [invHeader, setInvHeader] = useState('');
  const [headerList, setHeaderList] = useState('');
  const [packingListNo, setPackingListNo] = useState('');
  const [siCustomerNo, setSiCustomerNo] = useState('');
  const [debetCredit, setDebetCredit] = useState('D');
  const [contactTypeId, setContactTypeId] = useState(2);
  const [customerTypeId, setCustomerTypeId] = useState(0);
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [agentId, setAgentId] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentAddress, setAgentAddress] = useState('');
  const [eFaktur, setEFaktur] = useState('');
  const [revisedInvNo, setRevisedInvNo] = useState('');
  const [isStampDuty, setIsStampDuty] = useState(false);
  const [stampDutyAmount, setStampDutyAmount] = useState(0);
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [paymentUSD, setPaymentUSD] = useState(0);
  const [paymentIDR, setPaymentIDR] = useState(0);
  const [totalVATUSD, setTotalVATUSD] = useState(0);
  const [totalVATIDR, setTotalVATIDR] = useState(0);
  const [paid, setPaid] = useState(false);
  const [paidOn, setPaidOn] = useState('');
  const [rate, setRate] = useState(0);
  const [currency, setCurrency] = useState(1);
  const [kursKMK, setKursKMK] = useState(0);
  const [editInvoice, setEditInvoice] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [dataContacts, setDataContacts] = useState([]);
  const [headerContacts, setHeaderContacts] = useState([]);
  const [maxPageContacts, setMaxPageContacts] = useState(0);
  const [openContacts, setOpenContacts] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});
  const [openRevised, setOpenRevised] = useState(false);
  const [handleSelectRevised, setHandleSelectRevised] = useState({});
  const [headerRevised, setHeaderRevised] = useState(revisedHeadersDummy);
  const [dataRevised, setDataRevised] = useState({});
  const [openStorage, setOpenStorage] = useState(false);
  const [openHf, setOpenHf] = useState(false);
  const [openPs, setOpenPs] = useState(false);
  const [selectedStorage, setSelectedStorage] = useState({});
  const [selectedHf, setSelectedHf] = useState({});
  const [selectedPs, setSelectedPs] = useState({});
  const [headerStorage, setHeaderStorage] = useState(storageHeadersDummy);
  const [dataStorage, setDataStorage] = useState([]);
  const [dataHf, setDataHf] = useState([]);
  const [dataPs, setDataPs] = useState([]);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [detailSequence, setDetailSequence] = useState(0);
  const [selectedDetail, setSelectedDetail] = useState({});
  const [detailEdit, setDetailEdit] = useState(false);
  const [invoiceAgent, setInvoiceAgent] = useState('');
  const [billId, setBillId] = useState('');
  const [billName, setBillName] = useState('');
  const [billAddress, setBillAddress] = useState('');
  const [billIdAgent, setBillIdAgent] = useState('');
  const [billNameAgent, setBillNameAgent] = useState('');
  const [billAddressAgent, setBillAddressAgent] = useState('');
  const [detailMap, setDetailMap] = useState([]);
  const [contactType, setContactType] = useState('shipper-customer');
  const [jobOwners, setJobOwners] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [jobOwnerId, setJobOwnerId] = useState(0);
  const [allVat, setAllVat] = useState(0);

  useEffect(() => {
    if (invId) {
      setIsDisabled(true);
      fetchEditData(invId);
    } else {
      fetchRevised(50, 1);
      fetchJobOwners();
      getShipmentOrder(50, 1);
      fetchContact(50, 1);
    }
  }, [invId]);

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
        setJobOwners(res.data.data.jobOwner);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchStorage = (rowsCount = 50, NumPage = 1) => {
    console.log('fetch invoice details storage');
  };

  const fetchHf = (rowsCount = 50, NumPage = 1) => {
    console.log('fetch invoice details HF');
  };

  const fetchPs = (rowsCount = 50, NumPage = 1) => {
    console.log('fetch invoice details PS');
  };

  const fetchRevised = (rowsCount = 50, NumPage = 1) => {
    console.log('fetch revised invoice tax number');
  };

  const fetchEditData = (invId) => {
    let body = {
      userCode: 'luna',
      countryId: 101,
      companyId: 32,
      branchId: 12,
    };

    axios
      .post(
        `http://stage-operation.api.infoss.solusisentraldata.com/invoice/invoice/PostById?id=${invId}`,
        body
      )
      .then((response) => {
        setInvoiceDetails(response.data.data.invoice.invoiceDetails);

        let tempDetail = response.data.data.invoice.invoiceDetails;
        console.log(tempDetail, '<<<tempDetail');
        setDetailMap(tempDetail);

        if (tempDetail.length > 0) {
          setDetailSequence(tempDetail[tempDetail.length - 1].sequence);
        }
        console.log(detailSequence, '<<<detailSequence');
        setEditInvoice(response.data.data.invoice);

        let temp = response.data.data.invoice;
        setIsCTC(temp.isCostToCost);
        setInvoiceNo(temp.invoiceNo);
        setPrinting(temp.printing);
        setPrintedOn(temp.printedOn);
        setPackingListNo(temp.packingListNo);
        setSiCustomerNo(temp.siCustomerNo);
        setCustomerTypeId(temp.customerTypeId);
        setCustomerId(temp.customerId);
        setCustomerName(temp.customerName);
        setCustomerAddress(temp.customerAddress);
        setDebetCredit(temp.debetCredit === '' ? 'D' : temp.debetCredit);
        setIsStampDuty(temp.isStampDuty);
        setStampDutyAmount(temp.stampDutyAmount);
        setPaymentUSD(temp.paymentUSD);
        setPaymentIDR(temp.paymentIDR);
        setTotalVATIDR(temp.totalVatIDR);
        setTotalVATUSD(temp.totalVatUSD);
        setPaid(temp.paid);
        setPaidOn(temp.paidOn);
        setRate(temp.rate);
        setKursKMK(temp.kursKMK);
        setEFaktur(temp.sfpReference);
        setJobOwnerId(temp.invHeader);
        setShipmentNo(temp.shipmentNo);
        setEtd(temp.etd);
        setEta(temp.eta);
        setJenisInvoices(temp.jenisInvoices);

        return axios.post(
          `http://stage-master.api.infoss.solusisentraldata.com/jobowner/jobowner/PostById?id=${temp.invHeader}`,
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
        setLSOHeaders(response.data.data.columns.headerColumns);
        setLSOData(response.data.data.shipmentOrder);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const fetchContact = (rows = 50, page = 1) => {
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
          setDataContacts(response.data.data.contact);
          setHeaderContacts(response.data.data.columns);
          setMaxPageContacts(response.data.totalPage);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAllVat = (value) => {
    let cast = Number(value);
    setAllVat(cast);
    if (detailMap.length > 0) {
      let tempIdr = 0;
      let tempUsd = 0;
      detailMap.forEach((el) => {
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
      setTotalVATIDR(Number(tempIdr.toFixed(2)));
      setTotalVATUSD(Number(tempUsd.toFixed(2)));
    }
  };

  const handleTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = () => {
    if (invId) {
      let payload = {
        invoice: editInvoice,
        invoiceDetails: detailMap,
      };

      delete payload.invoice.invoiceDetails;

      payload.invoice.shipmentId = shipmentId;
      payload.invoice.customerAddress = customerAddress;
      payload.invoice.invHeader = jobOwnerId;
      payload.invoice.packingListNo = packingListNo;
      payload.invoice.siCustomerNo = siCustomerNo;
      payload.invoice.isStampDuty =
        isStampDuty.toString() === 'true' ? true : false;
      payload.invoice.stampDutyAmount =
        isStampDuty.toString() === 'true' ? stampDutyAmount : 0;
      payload.invoice['paymentUSD'] = paymentUSD;
      payload.invoice['paymentIDR'] = paymentIDR;
      payload.invoice['totalVatUSD'] = totalVATUSD;
      payload.invoice['totalVatIDR'] = totalVATIDR;
      payload.invoice.invoicesAgent = invoiceAgent;

      axios
        .put(
          'http://stage-operation.api.infoss.solusisentraldata.com/invoice/invoice/Update',
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

          history('/booking/invoice');
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
        axios
          .post('https://localhost:7160/Invoice/PostAutoNoInvoice', {
            userCode: 'luna',
            countryId: 101,
            companyId: 32,
            branchId: 12,
          })
          .then((res) => {
            if (res.data.code === 200) {
              let payload = templateInvoice;

              payload.invoice.invoiceNo = res.data.data.invoiceNo;
              payload.invoice.invoiceNo2 = res.data.data.invoiceNo2;
              payload.invoice.sfpId = res.data.data.sfpId;
              payload.invoice['sfpNoFormat'] = res.data.data.sfpNoFormat;
              payload.invoice['sfpDetailId'] = res.data.data.sfpDetailId;
              payload.invoice['uniqueKeySFP'] = res.data.data.uniqueKeySFP;
              payload.invoice['uniqueKeyInvoice'] =
                res.data.data.uniqueKeyInvoice;
              payload.invoice.sfpReference = eFaktur;
              payload.invoice['debetCredit'] = debetCredit;
              payload.invoice['shipmentId'] = shipmentData.id;
              payload.invoice['contactTypeId'] = contactTypeId;
              payload.invoice['customerId'] = customerId;
              payload.invoice['customerName'] = customerName;
              payload.invoice['customerAddress'] = customerAddress;
              payload.invoice['customerTypeId'] = customerTypeId;
              payload.invoice['paymentUSD'] = paymentUSD;
              payload.invoice['paymentIDR'] = paymentIDR;
              payload.invoice['totalVatUSD'] = totalVATUSD;
              payload.invoice['totalVatIDR'] = totalVATIDR;
              payload.invoice['rate'] = rate;
              payload.invoice['paid'] = paid;
              payload.invoice['paidOn'] =
                paidOn === '' ? new Date('1753-01-01') : paidOn;
              payload.invoice['invHeader'] = shipmentData.jobOwnerId
                ? shipmentData.jobOwnerId
                : 0;
              payload.invoice['isCostToCost'] = isCTC;
              payload.invoice['kursKMK'] = kursKMK;
              payload.invoice['packingListNo'] = packingListNo;
              payload.invoice['siCustomerNo'] = siCustomerNo;
              payload.invoice['isStampDuty'] =
                isStampDuty.toString() === 'true' ? true : false;
              payload.invoice['stampDutyAmount'] =
                isStampDuty.toString() === 'true' ? stampDutyAmount : 0;
              payload.invoice.shipmentNo = shipmentNo;
              payload.invoice.eta = eta;
              payload.invoice.etd = etd;
              payload.invoice.jenisInvoices = jenisInvoices;
              // payload.invoice["transactionDate"]= new Date().toISOString()
              payload.invoiceDetails = detailMap;

              return axios.post(
                'http://stage-operation.api.infoss.solusisentraldata.com/invoice/invoice/Create',
                payload
              );
            }
          })
          .then((response) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Create Data Success',
              showConfirmButton: false,
              timer: 1500,
            });

            history('/booking/invoice');
          })
          .catch((error) => console.error(error));
      }
    }
  };

  const handleSelectContact = (value, type) => {
    if (type === 'shipper-customer') {
      if (contactTypeId == 2) {
        setCustomerId(value.contactId);
        setCustomerName(value.pic);
        setCustomerAddress(value.contactAddress);
        setSelectedContact(value);
      } else {
        setAgentId(value.contactId);
        setAgentName(value.pic);
        setAgentAddress(value.contactAddress);
        setSelectedContact(value);
      }
    } else if (type === 'shipper-bill') {
      if (contactTypeId == 2) {
        setBillId(value.contactId);
        setBillName(value.pic);
        setBillAddress(value.contactAddress);
        setSelectedContact(value);
      } else {
        setBillIdAgent(value.contactId);
        setBillNameAgent(value.pic);
        setBillAddressAgent(value.contactAddress);
        setSelectedContact(value);
      }
    }
  };

  const renderStamp = () => {
    if (isStampDuty.toString() === 'true') {
      return (
        <NumericFormat
          customInput={TextField}
          thousandSeparator=","
          suffix={'.00'}
          label="Amount"
          onValueChange={(values, sourceInfo) => {
            setStampDutyAmount(values.floatValue);
          }}
          value={stampDutyAmount}
          id="invoice-stamp-duty"
        />
      );
    } else {
      return (
        <TextField
          value={'0.00'}
          variant="filled"
          disabled
          label="Amount"
          id="invoice-stamp-duty"
        />
      );
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

      setPaymentIDR(Number(sumIdr.toFixed(2)));
      setPaymentUSD(Number(sumUsd.toFixed(2)));
      setTotalVATIDR(Number(vatIdr.toFixed(2)));
      setTotalVATUSD(Number(vatUsd.toFixed(2)));

      setDetailMap(newArr);

      setDetailEdit(false);
      setSelectedDetail({});
    } else {
      setDetailSequence(payload.sequence);

      let arrDetail = [...detailMap, payload];
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
      setPaymentIDR(Number(sumIdr.toFixed(2)));
      setPaymentUSD(Number(sumUsd.toFixed(2)));
      setTotalVATIDR(Number(vatIdr.toFixed(2)));
      setTotalVATUSD(Number(vatUsd.toFixed(2)));

      setDetailMap(arrDetail);
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

  const handleDetailDelete = () => {
    if (!selectedDetail.sequence) {
      Swal.fire('Information', 'Please select detail data...!!', 'info');
    } else {
      let sumUsd = 0;
      let sumIdr = 0;
      let vatUsd = 0;
      let vatIdr = 0;

      let tempSequence = selectedDetail.sequence;
      // let fromEpl = false

      // invoiceDetails.forEach(el =>  {
      //     if(el.sequence === tempSequence) {
      //         fromEpl = true
      //     }
      // })
      if (selectedDetail.eplDetailId != 0) {
        sumUsd = paymentUSD;
        sumIdr = paymentIDR;
        vatUsd = totalVATUSD;
        vatIdr = totalVATIDR;

        detailMap.forEach((el) => {
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
        const result = detailMap.filter(deleteFunction);
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

            if (el.eplDetailId != 0) {
              tempSequence = el.sequence;
            } else {
              tempSequence += 1;
              el.sequence = tempSequence;
            }
          });

          setDetailSequence(tempSequence);
        } else {
          setDetailSequence(0);
        }

        setDetailMap(result);
      }

      setPaymentIDR(Number(sumIdr.toFixed(2)));
      setPaymentUSD(Number(sumUsd.toFixed(2)));
      setTotalVATIDR(Number(vatIdr.toFixed(2)));
      setTotalVATUSD(Number(vatUsd.toFixed(2)));

      setSelectedDetail({});
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
        history('/booking/invoice/create');
        window.location.reload();
      }
    });
  };

  const handlePrint = () => {
    if (invId) {
      setModalType('printing');
      setOpenModal(true);
    }
  };

  const printFunction = () => {
    let printCount = editInvoice.printing;
    let canPrint = false;
    if (editInvoice.printing === 0) {
      printCount += 1;
      canPrint = true;
    } else {
      if (editInvoice.rePrintApproved === true) {
        printCount += 1;
        canPrint = true;
      }
    }
    if (canPrint === true) {
      const payload = {
        rowStatus: editInvoice.rowStatus,
        countryId: 101,
        companyId: 32,
        branchId: 12,
        id: editInvoice.id,
        invoiceNo: editInvoice.invoiceNo,
        printing: printCount,
        user: 'luna',
      };
      axios
        .put('https://localhost:7160/Invoice/UpdateStatusPrint', payload)
        .then((response) => {
          if (response.data.code === 200) {
            fetchEditData(invId);
            succesAlert('Data berhasil di print');
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
    if (invId) {
      if (editInvoice.rePrintApproved === true) {
        succesAlert('Print ulang sudah di setujui');
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
              rowStatus: editInvoice.rowStatus,
              countryId: 101,
              companyId: 32,
              branchId: 12,
              id: editInvoice.id,
              invoiceNo: editInvoice.invoiceNo,
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
                  succesAlert('Print ulang sudah di setujui');
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

  const handleContactType = (value) => {
    setContactTypeId(value);
    if (value == 2) setDebetCredit('D');
  };

  const renderDebetCredit = () => {
    if (contactTypeId == 2) {
      return (
        <>
          <FormControlLabel
            value="D"
            control={<Radio />}
            label="Debit"
            disabled
          />
          <FormControlLabel
            value="C"
            control={<Radio />}
            label="Credit"
            disabled
          />
        </>
      );
    } else if (contactTypeId == 5) {
      return (
        <>
          <FormControlLabel value="D" control={<Radio />} label="Debit" />
          <FormControlLabel value="C" control={<Radio />} label="Credit" />
        </>
      );
    } else {
      return (
        <>
          <FormControlLabel
            value="D"
            control={<Radio />}
            label="Debit"
            disabled
          />
          <FormControlLabel
            value="C"
            control={<Radio />}
            label="Credit"
            disabled
          />
        </>
      );
    }
  };

  const handleSelectedShipment = (data) => {
    setInvHeader(data.invHeader);
    setShipmentNo(data.shipmentNo);
    setShipmentId(data.id);
    setEtd(data.etd);
    setEta(data.eta);
    setShipmentData(data);
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        {invId ? <h4>Edit Invoice</h4> : <h4>Create New Invoice</h4>}
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={() => handleSubmit()}
          >
            save
          </Button>
          <Button
            variant="outlined"
            startIcon={<ReplyIcon />}
            onClick={() => history('/booking/invoice')}
          >
            back
          </Button>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={() => handlePrint()}
          >
            print
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddToPhotosIcon />}
            onClick={() => handleNewForm()}
          >
            add new
          </Button>
          <Button
            variant="outlined"
            startIcon={<ApprovalIcon />}
            onClick={() => handleRePrint()}
          >
            reprint approval
          </Button>
          <Button variant="outlined" startIcon={<CachedIcon />}>
            change invoice header
          </Button>
        </Stack>
      </Grid>
      <Paper variant="outlined" sx={{m: 2, p: 2}}>
        <ModalInvoiceUtilities
          open={openModal}
          close={() => setOpenModal(false)}
          type={modalType}
          resetType={() => setModalType('')}
          doPrint={() => printFunction()}
        />

        <ModalTableInvoice
          open={openMLSO}
          onClose={() => setOpenMLSO(false)}
          setSelectedData={(e) => handleSelectedShipment(e)}
          headersData={LSOHeaders}
          bodyData={LSOData}
          fetchData={(r, p) => getShipmentOrder(r, p)}
          maxPage={1}
          type={'shipment'}
          setName={(e) => setCustomerName(e)}
          setId={(e) => setCustomerId(e)}
          setAddress={(e) => setCustomerAddress(e)}
          setAgentName={(e) => setAgentName(e)}
          setAgentId={(e) => setAgentId(e)}
          setAgentAddress={(e) => setAgentAddress(e)}
          setInvoiceDetails={(e) => setInvoiceDetails(e)}
          setDetailMap={(e) => setDetailMap(e)}
          setDetailSequence={(e) => setDetailSequence(e)}
          dcStatus={debetCredit}
          setPaymentIDR={(e) => setPaymentIDR(e)}
          setPaymentUSD={(e) => setPaymentUSD(e)}
          setTotalVATIDR={(e) => setTotalVATIDR(e)}
          setTotalVATUSD={(e) => setTotalVATUSD(e)}
          setAllVat={(e) => setAllVat(e)}
        />

        <ModalTableInvoice
          open={openContacts}
          onClose={() => setOpenContacts(false)}
          setSelectedData={(data, type) => handleSelectContact(data, type)}
          headersData={headerContacts}
          bodyData={dataContacts}
          fetchData={(r, p) => fetchContact(r, p)}
          type={'contact'}
          contactType={contactType}
          maxPage={maxPageContacts}
        />

        <ModalTableInvoice
          open={openRevised}
          onClose={() => setOpenRevised(false)}
          setSelectedData={(e) => setHandleSelectRevised(e)}
          headersData={headerRevised}
          bodyData={dataRevised}
          fetchData={(r, p) => fetchRevised(r, p)}
          maxPage={1}
          type={'revised'}
        />

        <ModalTableInvoice
          open={openStorage}
          onClose={() => setOpenStorage(false)}
          setSelectedData={(e) => setSelectedStorage(e)}
          headersData={headerStorage}
          bodyData={dataStorage}
          fetchData={(r, p) => fetchStorage(r, p)}
          maxPage={1}
          type={'storage'}
        />

        <ModalTableInvoice
          open={openHf}
          onClose={() => setOpenHf(false)}
          setSelectedData={(e) => setSelectedHf(e)}
          headersData={headerStorage}
          bodyData={dataHf}
          fetchData={(r, p) => fetchHf(r, p)}
          maxPage={1}
          type={'hf'}
        />

        <ModalTableInvoice
          open={openPs}
          onClose={() => setOpenPs(false)}
          setSelectedData={(e) => setSelectedPs(e)}
          headersData={headerStorage}
          bodyData={dataPs}
          fetchData={(r, p) => fetchPs(r, p)}
          maxPage={1}
          type={'ps'}
        />

        <NestedModal
          open={openModalDetail}
          close={() => setOpenModalDetail(false)}
          shipperNo={customerId}
          shipperName={customerName}
          sequence={detailSequence}
          saveDetail={(e) => saveDetail(e)}
          edit={detailEdit}
          resetEdit={() => setDetailEdit(false)}
          selected={selectedDetail}
          dcStatus={debetCredit}
        />

        <Grid container item spacing={3} direction="row">
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel id="payment-from-label">Payment From</FormLabel>
              <RadioGroup
                row
                name="payment-from-label"
                aria-labelledby="payment-from-label"
                value={jenisInvoices}
                onChange={(e) => setJenisInvoices(e.target.value)}
              >
                <FormControlLabel
                  value={'I'}
                  control={<Radio />}
                  label="Invoices"
                  disabled={isDisabled}
                />
                <FormControlLabel
                  value={'G'}
                  control={<Radio />}
                  label="General Invoices"
                  disabled={isDisabled}
                />
              </RadioGroup>

              <FormLabel id="invoice-type-label">Type</FormLabel>
              <RadioGroup
                row
                name="invoice-type-radio"
                aria-labelledby="invoice-type-label"
                // defaultValue={false}
                value={isCTC}
                onChange={(e) => setIsCTC(e.target.value)}
              >
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Non Cost To Cost"
                  disabled={isDisabled}
                />
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Cost To Cost"
                  disabled={isDisabled}
                />
              </RadioGroup>

              <TextField
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                id="invoice-number"
                label="Invoice Number"
                variant="filled"
                disabled
              />

              {contactTypeId == 5 ? (
                <TextField
                  value={invoiceAgent}
                  onChange={(e) => setInvoiceAgent(e.target.value)}
                  id="invoice-agent"
                  label="Invoice From Agent Number"
                  variant="standard"
                  margin="normal"
                />
              ) : (
                <></>
              )}

              <Box mt={1}>
                <FormLabel id="invoice-print-label">Printing</FormLabel>
                <Grid container item spacing={2} direction="row">
                  <Grid item>
                    <TextField
                      value={printing}
                      onChange={(e) => setPrinting(e.target.value)}
                      id="invoice-number"
                      label="Counter"
                      variant="filled"
                      aria-labelledby="invoice-print-label"
                      disabled
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      value={
                        printedOn !== '' ? dateFormat(printedOn) : printedOn
                      }
                      onChange={(e) => setPrintedOn(e.target.value)}
                      id="invoice-date"
                      label="Date"
                      variant="filled"
                      aria-labelledby="invoice-print-label"
                      disabled
                    />
                  </Grid>
                </Grid>
              </Box>

              <TextField
                id="etd-invoice"
                label="ETD / ETA"
                variant="filled"
                margin="normal"
                value={etd.length > 0 ? dateFormat(etd) : ''}
                onChange={(e) => setEtd(e.target.value)}
                disabled
              />
              <TextField
                id="principle-invoice"
                label="Principle By"
                variant="filled"
                margin="normal"
                value={invHeader}
                onChange={(e) => setInvHeader(e.target.value)}
                disabled
              />

              <FormControl sx={{mt: 2}}>
                <InputLabel id="invoice-header-label">
                  Invoice Header
                </InputLabel>
                <Select
                  labelId="invoice-header-label"
                  id="invoice-header-select"
                  value={headerList}
                  label="Invoice Header"
                  onChange={(e) => setHeaderList(e.target.value)}
                >
                  {jobOwners.map((el) => {
                    return (
                      <MenuItem key={el.id} value={el.id}>
                        {el.masterCode}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <TextField
                value={packingListNo}
                onChange={(e) => setPackingListNo(e.target.value)}
                id="invoice-packing-list"
                label="Packing List"
                variant="standard"
              />
              <TextField
                value={siCustomerNo}
                onChange={(e) => setSiCustomerNo(e.target.value)}
                id="invoice-si-customer"
                label="SI Customer"
                variant="standard"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                id="shipment-order-number"
                label="Shipment Order Number"
                variant="filled"
                onClick={() =>
                  isDisabled === false ? setOpenMLSO(true) : setOpenMLSO(false)
                }
                value={shipmentNo}
                onChange={(e) => setShipmentNo(e.target.value)}
                disabled={isDisabled}
              />

              <Box m={1}>
                <FormLabel id="invoice-dc-label">Debet / Credit</FormLabel>
                <RadioGroup
                  row
                  name="invoice-dc-radio"
                  aria-labelledby="invoice-dc-label"
                  value={debetCredit}
                  onChange={(e) => setDebetCredit(e.target.value)}
                >
                  {renderDebetCredit()}
                </RadioGroup>
              </Box>

              <Box sx={{border: 1, borderRadius: 1, p: 1, width: '100%'}}>
                <RadioGroup
                  row
                  name="shiper-or-agent-radio"
                  value={contactTypeId}
                  onChange={(e) => handleContactType(e.target.value)}
                >
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label="Shipper"
                    disabled={isDisabled}
                  />
                  <FormControlLabel
                    value={5}
                    control={<Radio />}
                    label="Agent"
                    disabled={isDisabled}
                  />
                </RadioGroup>

                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                  <Tabs
                    value={tabValue}
                    onChange={handleTab}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Customer" {...a11yProps(0)} />
                    <Tab label="Bill To" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                {contactTypeId == 2 ? (
                  <>
                    <TabPanel
                      value={tabValue}
                      index={0}
                      customerId={customerId}
                      setCustomerId={(e) => setCustomerId(e)}
                      customerName={customerName}
                      setCustomerName={(e) => setCustomerName(e)}
                      customerAddress={customerAddress}
                      setCustomerAddress={(e) => setCustomerAddress(e)}
                      setOpenContacts={(e) => setOpenContacts(e)}
                      isDisabled={isDisabled}
                      setContactType={(e) => setContactType(e)}
                    >
                      Shipper
                    </TabPanel>
                    <TabPanel
                      value={tabValue}
                      index={1}
                      billId={billId}
                      setBillId={(e) => setBillId(e)}
                      billName={billName}
                      setBillName={(e) => setBillName(e)}
                      billAddress={billAddress}
                      setBillAddress={(e) => setBillAddress(e)}
                      isDisabled={isDisabled}
                      setOpenContacts={(e) => setOpenContacts(e)}
                      setContactType={(e) => setContactType(e)}
                    >
                      Bill To
                    </TabPanel>
                  </>
                ) : (
                  <>
                    <TabPanel
                      value={tabValue}
                      index={0}
                      customerId={agentId}
                      setCustomerId={(e) => setAgentId(e)}
                      customerName={agentName}
                      setCustomerName={(e) => setAgentName(e)}
                      customerAddress={agentAddress}
                      setCustomerAddress={(e) => setAgentAddress(e)}
                      setOpenContacts={(e) => setOpenContacts(e)}
                      isDisabled={isDisabled}
                      setContactType={(e) => setContactType(e)}
                    >
                      Agent
                    </TabPanel>
                    <TabPanel
                      value={tabValue}
                      index={1}
                      billId={billIdAgent}
                      setBillId={(e) => setBillIdAgent(e)}
                      billName={billNameAgent}
                      setBillName={(e) => setBillNameAgent(e)}
                      billAddress={billAddressAgent}
                      setBillAddress={(e) => setBillAddressAgent(e)}
                      isDisabled={isDisabled}
                      setOpenContacts={(e) => setOpenContacts(e)}
                      setContactType={(e) => setContactType(e)}
                    >
                      Bill To
                    </TabPanel>
                  </>
                )}
              </Box>
            </FormControl>
            <Grid item container spacing={2} direction="row">
              <Grid item xs={6}>
                <TextField
                  value={eFaktur}
                  onChange={(e) => setEFaktur(e.target.value)}
                  variant="standard"
                  label="Ref. E-Faktur"
                  id="invoice-faktur"
                  margin="normal"
                />
                <TextField
                  value={revisedInvNo}
                  onChange={(e) => setRevisedInvNo(e.target.value)}
                  variant="filled"
                  label="Revised Tax Inv. No"
                  id="invoice-tax"
                  margin="normal"
                  onClick={() =>
                    isDisabled === false
                      ? setOpenRevised(true)
                      : setOpenRevised(false)
                  }
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Box sx={{border: 1, borderRadius: 1, p: 1, mt: 2}}>
                  <Typography variant="overline" display="block" gutterBottom>
                    stamp duty
                  </Typography>

                  <RadioGroup
                    row
                    name="stamp-duty-radio"
                    value={isStampDuty}
                    onChange={(e) => setIsStampDuty(e.target.value)}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                  {renderStamp()}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
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
              <Grid item>
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
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount USD</TableCell>
                    <TableCell>Amount IDR</TableCell>
                    <TableCell>VAT</TableCell>
                    <TableCell></TableCell>
                    <TableCell>CostToCost</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detailMap.length > 0 ? (
                    detailMap.map((el) => {
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
                          <TableCell>{el.sign === true ? '+' : '-'}</TableCell>
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
                    onClick={() => handleDetailAdd()}
                  >
                    add
                  </Button>
                </Grid>
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
                    add storage
                  </Button>
                </Grid>
                {contactTypeId == 5 ? (
                  <>
                    <Grid item>
                      <Button
                        variant="outlined"
                        startIcon={<AddToPhotosIcon />}
                        color="secondary"
                        onClick={() => setOpenPs(true)}
                      >
                        add ps
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        startIcon={<AddToPhotosIcon />}
                        color="secondary"
                        onClick={() => setOpenHf(true)}
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
        <Grid container spacing={2} flexDirection="row" alignItems="center">
          <Grid item>
            <Box sx={{border: 1, borderRadius: 1, p: 1, mt: 1}}>
              <RadioGroup
                name="paid-radio"
                value={paid}
                onChange={(e) => setPaid(e.target.value)}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Paid"
                  disabled
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Not Paid"
                  disabled
                />
              </RadioGroup>
            </Box>
          </Grid>
          <Grid item>
            <NumericFormat
              customInput={TextField}
              thousandSeparator=","
              label="Payment USD"
              onValueChange={(values, sourceInfo) => {
                setPaymentUSD(values.floatValue);
              }}
              value={paymentUSD}
              id="payment-usd"
              variant="filled"
              disabled
            />
          </Grid>
          <Grid item>
            <NumericFormat
              customInput={TextField}
              thousandSeparator=","
              label="Payment IDR"
              onValueChange={(values, sourceInfo) => {
                setPaymentIDR(values.floatValue);
              }}
              value={paymentIDR}
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
              onValueChange={(values, sourceInfo) => {
                setTotalVATUSD(values.floatValue);
              }}
              value={totalVATUSD}
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
              onValueChange={(values, sourceInfo) => {
                setTotalVATIDR(values.floatValue);
              }}
              value={totalVATIDR}
              id="vat-idr"
              variant="filled"
              disabled
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} flexDirection="row" alignItems="center">
          <Grid item>
            <Box sx={{border: 1, borderRadius: 1, p: 1, mt: 1}}>
              <FormLabel id="invoice-rate-label">Rate</FormLabel>
              <Grid container item spacing={2} direction="row">
                <Grid item>
                  <TextField
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    id="rate-amount"
                    label="Amount"
                    variant="filled"
                    aria-labelledby="invoice-rate-label"
                    disabled
                  />
                </Grid>
                <Grid item>
                  <TextField
                    value={paidOn !== '' ? dateFormat(paidOn) : paidOn}
                    onChange={(e) => setPaidOn(e.target.value)}
                    id="rate-date"
                    label="Date"
                    variant="filled"
                    aria-labelledby="invoice-rate-label"
                    disabled
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item>
            <FormControl sx={{minWidth: 110}}>
              <InputLabel id="invoice-currency-label">Currency</InputLabel>
              <Select
                labelId="invoice-currency-label"
                id="invoice-currency-select"
                value={currency}
                label="Invoice Currency"
                onChange={(e) => setCurrency(e.target.value)}
                disabled={isDisabled}
              >
                <MenuItem value={1}>ALL</MenuItem>
                <MenuItem value={2}>IDR</MenuItem>
                <MenuItem value={3}>USD</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              value={kursKMK}
              onChange={(e) => setKursKMK(e.target.value)}
              id="kurs-kmk"
              label="Kurs KMK"
              variant="filled"
              disabled
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default CreateInvoicePage;
