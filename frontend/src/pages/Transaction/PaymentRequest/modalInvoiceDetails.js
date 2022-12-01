import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {NumericFormat} from 'react-number-format';
import axios from 'axios';
import {Dropdown, Pagination} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';

const invoiceDetailTemp = [
  {
    rowStatus: 'ACT',
    countryId: 101,
    companyId: 32,
    branchId: 12,
    paymentRequestId: 0,
    sequence: 0,
    debetCredit: 'D',
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
    shipmentId: 'string',
    shipmentNo: 0,
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
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 1300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 1,
  pb: 3,
  borderRadius: 1,
  maxHeight: 600,
  overflow: 'hidden',
  overflowY: 'scroll',
};

const selectedStyle = {bgcolor: (theme) => theme.palette.primary.main};

function ChildModal(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [rowsCount, setRowsCount] = useState(50);
  const [numPage, setNumPage] = useState(1);

  const handleOpen = () => {
    if (props.isEdit === false) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setSelectedData({});
    setRowsCount(50);
    setNumPage(1);
    props.fetchData(1, 50);
    setOpen(false);
  };

  const handleSelected = () => {
    props.handleSelected(selectedData);
    handleClose();
  };

  const renderPagination = () => {
    const MaxPage = props.totalPage;

    if (numPage === 1 && numPage !== MaxPage) {
      return (
        <div style={{display: 'inline-block'}}>
          <Pagination>
            <Pagination.Item active>{numPage}</Pagination.Item>
            <Pagination.Next
              onClick={() => {
                props.fetchData(numPage + 1, rowsCount);
                setNumPage(numPage + 1);
              }}
            />
          </Pagination>
        </div>
      );
    } else if (numPage === 1 && numPage === MaxPage) {
      return (
        <div style={{display: 'inline-block'}}>
          <Pagination>
            <Pagination.Item active>{numPage}</Pagination.Item>
          </Pagination>
        </div>
      );
    } else if (numPage === MaxPage) {
      return (
        <div style={{display: 'inline-block'}}>
          <Pagination>
            <Pagination.Prev
              onClick={() => {
                props.fetchData(numPage - 1, rowsCount);
                setNumPage(numPage - 1);
              }}
            />
            <Pagination.Item active>{numPage}</Pagination.Item>
          </Pagination>
        </div>
      );
    } else {
      return (
        <div style={{display: 'inline-block'}}>
          <Pagination>
            <Pagination.Prev
              onClick={() => {
                props.fetchData(numPage - 1, rowsCount);
                setNumPage(numPage - 1);
              }}
            />
            <Pagination.Item active>{numPage}</Pagination.Item>
            <Pagination.Next
              onClick={() => {
                props.fetchData(numPage + 1, rowsCount);
                setNumPage(numPage + 1);
              }}
            />
          </Pagination>
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      <TextField
        onClick={handleOpen}
        value={props.accountCode}
        onChange={(e) => props.setAccountCode(e.target.value)}
        id="account-code"
        label="Code"
        variant="filled"
        aria-labelledby="account-label"
        disabled
      />
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{...style, width: 1200}}>
          <Grid
            container
            flexDirection={'column'}
            spacing={2}
            alignItems="center"
          >
            <Grid item container spacing={2} flexDirection="row">
              <Grid item>
                <Button variant="contained" onClick={handleSelected}>
                  Select Data
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={handleClose} variant="outlined">
                  Close Window
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Box
                sx={{
                  border: 1,
                  borderRadius: 1,
                  overflow: 'hidden',
                  maxHeight: 450,
                  maxWidth: 1150,
                }}
              >
                <TableContainer component={Paper} sx={{maxHeight: 390}}>
                  <Table
                    sx={{minWidth: 600}}
                    aria-label="sticky table"
                    stickyHeader
                  >
                    <TableHead>
                      <TableRow>
                        {props.accountHeaders.length > 0 ? (
                          props.accountHeaders.map((el, index) => {
                            return <TableCell key={index}>{el.text}</TableCell>;
                          })
                        ) : (
                          <>
                            <TableCell>Code</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Crr</TableCell>
                            <TableCell>Payment</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Ctc</TableCell>
                          </>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {props.accountHeaders.length > 0 ? (
                          props.accountHeaders.map((el, index) => {
                            return (
                              <TableCell key={index}>
                                <input className="form-control col-search-form border-infoss" />
                              </TableCell>
                            );
                          })
                        ) : (
                          <>
                            <TableCell>
                              <input className="form-control col-search-form border-infoss" />
                            </TableCell>
                            <TableCell>
                              <input className="form-control col-search-form border-infoss" />
                            </TableCell>
                            <TableCell>
                              <input className="form-control col-search-form border-infoss" />
                            </TableCell>
                            <TableCell>
                              <input className="form-control col-search-form border-infoss" />
                            </TableCell>
                            <TableCell>
                              <input className="form-control col-search-form border-infoss" />
                            </TableCell>
                            <TableCell>
                              <input className="form-control col-search-form border-infoss" />
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                      {props.accountList.length > 0 &&
                      props.accountHeaders.length > 0 ? (
                        props.accountList.map((data, index) => {
                          return (
                            <TableRow
                              key={index}
                              onClick={() => setSelectedData(data)}
                              sx={
                                selectedData.id === data.id ? selectedStyle : {}
                              }
                            >
                              {props.accountHeaders.map((el, index) => {
                                return (
                                  <TableCell key={index}>
                                    {data[el.column]}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} sx={{textAlign: 'center'}}>
                            Data Empty
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="row mt-2">
                  <div>
                    <div>
                      <div className="mx-4" style={{display: 'inline-block'}}>
                        {renderPagination()}
                      </div>

                      <Dropdown
                        style={{display: 'inline-block'}}
                        className="mx-2"
                      >
                        <Dropdown.Toggle
                          variant="outline-infoss sm"
                          id="dropdown-basic"
                        >
                          {rowsCount} Rows
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            className="dropdown-list"
                            onClick={() => {
                              setRowsCount(50);
                              setNumPage(1);
                              props.fetchData(1, 50);
                            }}
                          >
                            50 Rows
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-list"
                            onClick={() => {
                              setRowsCount(100);
                              setNumPage(1);
                              props.fetchData(1, 100);
                            }}
                          >
                            100 Rows
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dropdown-list"
                            onClick={() => {
                              setRowsCount(150);
                              setNumPage(1);
                              props.fetchData(1, 150);
                            }}
                          >
                            150 Rows
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal(props) {
  const {prId} = useParams();
  const [shipperNo, setShipperNo] = useState(props.shipmentNo);
  const [shipperName, setShipperName] = useState('');
  const [accountRadio, setAccountRadio] = useState(0);
  const [accountId, setAccountId] = useState(0);
  const [accountName, setAccountName] = useState('');
  const [description, setDescription] = useState('');
  const [currencyRadio, setCurrencyRadio] = useState(1);
  const [paidStatusRadio, setPaidStatusRadio] = useState(1);
  const [checked, setChecked] = useState(false);
  const [checkedTruck, setCheckedTruck] = useState(false);
  const [signRadio, setSignRadio] = useState(true);
  const [vat, setVat] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);
  const [rate, setRate] = useState(0);
  const [amount, setAmount] = useState(0);
  const [originalUsd, setOriginalUsd] = useState(0);
  const [masterCode, setMasterCode] = useState('');
  const [codingQuantity, setCodingQuantity] = useState(false);
  const [eplDetailId, setEplDetailId] = useState(0);
  const [accountList, setAccountList] = useState([]);
  const [accountHeaders, setAccountHeaders] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    fetchAccount(1, 50);

    setShipperNo(props.shipperNo);
    setShipperName(props.shipperName);

    if (props.edit === true) {
      let temp = props.selected;
      setAccountId(temp.accountId);
      setDescription(temp.description);
      setAccountRadio(temp.type);
      setCurrencyRadio(temp.amountCrr);
      setPaidStatusRadio(temp.paid === false ? 0 : 1);
      setChecked(temp.isCostToCost);
      setCheckedTruck(temp.isCostTrucking);
      setSignRadio(temp.sign);
      setVat(temp.isPpn === undefined ? false : true);
      setQuantity(temp.quantity);
      setCost(temp.perQty);
      setRate(temp.originalRate);
      setAmount(temp.amount);
      setOriginalUsd(temp.originalUsd);
      setEplDetailId(temp.eplDetailId);
      setCodingQuantity(temp.codingQuantity);

      axios
        .post(
          `http://stage-master.api.infoss.solusisentraldata.com/account/account/PostById?id=${temp.accountId}`,
          {
            userCode: 'luna',
            countryId: 101,
            companyId: 32,
            branchId: 12,
          }
        )
        .then((res) => {
          if (res.data.code === 200) {
            setMasterCode(res.data.data.account.masterCode);
            setAccountName(res.data.data.account.name);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [props.shipperNo, props.shipperName, props.selected, props.edit]);

  const fetchAccount = (page = 1, row = 50) => {
    axios
      .post(
        `http://stage-master.api.infoss.solusisentraldata.com/account/account/PostByPage?pageNumber=${page}&pageSize=${row}`,
        {
          userCode: 'luna',
          countryId: 101,
          companyId: 32,
          branchId: 12,
        }
      )
      .then((res) => {
        if (res.data.code === 200) {
          setAccountList(res.data.data.account);
          setAccountHeaders(res.data.data.columns);
          setTotalPage(res.data.totalPage);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleClose = () => {
    setAccountRadio(0);
    setAccountId(0);
    setAccountName('');
    setDescription('');
    setCurrencyRadio(1);
    setPaidStatusRadio(1);
    setChecked(false);
    setCheckedTruck(false);
    setSignRadio(true);
    setVat(false);
    setQuantity(0);
    setCost(0);
    setRate(0);
    setAmount(0);
    setOriginalUsd(0);
    setMasterCode('');
    setEplDetailId(0);
    setCodingQuantity(false);

    props.resetEdit();
    props.close();
  };

  const handleSave = () => {
    let payload = {...invoiceDetailTemp[0]};
    // let tempVat = 0;
    // if (vat === 11 || vat === 1.1) tempVat = vat;

    let sequence = 1;
    if (props.edit === true) {
      sequence = props.selected.sequence;
    } else {
      if (props.sequence > 0) sequence = props.sequence + 1;
    }
    payload.rowStatus = 'ACT';
    payload.countryId = 101;
    payload.companyId = 32;
    payload.branchId = 12;
    payload.paymentRequestId = Number(prId) || 0;
    payload.sequence = sequence;
    payload.debetCredit = props.dcStatus;
    payload.accountId = accountId;
    payload.accountName = accountName || '';
    payload.description = description;
    payload.type = accountRadio;
    payload.codingQuantity = codingQuantity;
    payload.quantity = quantity;
    payload.perQty = cost;
    payload.amount = amount;
    payload.paid =
      typeof paidStatusRadio === 'number' || typeof paidStatusRadio === 'string'
        ? Number(paidStatusRadio) === 0
          ? false
          : true
        : paidStatusRadio;
    payload.paidOn = new Date();
    payload.eplDetailId = eplDetailId;
    payload.statusMemo = true;
    payload.memoNo = 0;
    payload.idLama = 0;
    payload.isCostToCost = checked;
    payload.isPpn = vat;
    payload.persenPpn = 0;
    payload.fakturNo = 'string';
    payload.fakturDate = new Date() || '';
    payload.isCostTrucking = checkedTruck;
    payload.kendaraanId = 0;
    payload.kendaraanNopol = 'string';
    payload.employeeId = 0;
    payload.employeeName = 'string';
    payload.mrgId = 0;
    payload.deliveryDate = new Date() || '';
    payload.originalUsd = originalUsd;
    payload.originalRate = rate;
    payload.user = 'luna';
    payload.createdOn = new Date();
    payload.createdBy = 'luna';
    payload.modifiedOn = new Date();
    payload.modifiedBy = 'string';
    payload.shipmentNo = props.shipmentNo;
    // payload.shipmentId = props.shipmentId;
    payload.shipperNo = props.shipperNo;
    // payload.shipperId = props.shipperId;

    // payload.paymentRequestId = prId;
    // payload.amountCrr = Number(currencyRadio);
    // payload.sign = signRadio;
    // payload.percentVat = tempVat;
    // payload.amountVat = (tempVat / 100) * amount;
    // payload.invoiceDetailProfitShares = [];
    // payload.invoiceDetailStorages = [];
    //
    //
    //
    //

    props.saveDetail(payload);
    handleClose();
  };

  const handleSelectedAccount = (data) => {
    setAccountId(data.id);
    setAccountName(data.name);
    setDescription(data.remarks);
    setCodingQuantity(data.quantity);
    setMasterCode(data.masterCode);
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{...style, width: 850}}>
          <Grid container spacing={2} flexDirection="column">
            <Grid item>
              <h5>Invoice to Shipper</h5>
            </Grid>
            <Grid item container spacing={2} flexDirection="row">
              <Grid item>
                <Button variant="contained" onClick={() => handleSave()}>
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={() => handleClose()}>
                  Close
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              item
              spacing={2}
              flexDirection="row"
              alignItems="center"
              xs={12}
            >
              <Grid item xs={2}>
                <FormLabel id="shipper-label">Shipper :</FormLabel>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  value={shipperNo}
                  onChange={(e) => setShipperNo(e.target.value)}
                  id="shipper-number"
                  label="Number"
                  variant="filled"
                  aria-labelledby="shipper-label"
                  disabled
                />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  value={shipperName}
                  onChange={(e) => setShipperName(e.target.value)}
                  id="shipper-name"
                  label="Shipper Name"
                  variant="filled"
                  aria-labelledby="shipper-label"
                  disabled
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              spacing={2}
              flexDirection="row"
              alignItems="center"
              xs={12}
            >
              <Grid item xs={2}>
                <FormLabel id="account-label">Account :</FormLabel>
              </Grid>
              <Grid item xs={3}>
                <ChildModal
                  setAccountCode={(e) => setMasterCode(e)}
                  accountCode={masterCode}
                  isEdit={props.edit}
                  accountList={accountList}
                  accountHeaders={accountHeaders}
                  handleSelected={(e) => handleSelectedAccount(e)}
                  fetchData={(page, row) => fetchAccount(page, row)}
                  totalPage={totalPage}
                />
              </Grid>
              <Grid item xs={7}>
                <Box sx={{border: 1, borderRadius: 1, p: 1}}>
                  <RadioGroup
                    row
                    name="account-radio"
                    value={accountRadio}
                    onChange={(e) => setAccountRadio(e.target.value)}
                  >
                    <FormControlLabel
                      value={20}
                      control={<Radio />}
                      label="20"
                      disabled
                    />
                    <FormControlLabel
                      value={40}
                      control={<Radio />}
                      label="40"
                      disabled
                    />
                    <FormControlLabel
                      value={45}
                      control={<Radio />}
                      label="45"
                      disabled
                    />
                    <FormControlLabel
                      value={50}
                      control={<Radio />}
                      label="M3"
                      disabled
                    />
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label="ALL"
                      disabled
                    />
                  </RadioGroup>
                </Box>
              </Grid>
            </Grid>
            <Grid
              item
              container
              spacing={2}
              flexDirection="row"
              alignItems="center"
              xs={12}
            >
              <Grid item xs={2}>
                <FormLabel id="account-label">Account Name :</FormLabel>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="account-name"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  variant="filled"
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <Box sx={{border: 1, borderRadius: 1, p: 1}}>
                  <RadioGroup
                    row
                    name="paid-radio"
                    value={paidStatusRadio}
                    onChange={(e) => {
                      setPaidStatusRadio(e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label="Paid"
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Not Paid"
                    />
                  </RadioGroup>
                </Box>
              </Grid>
            </Grid>
            <Grid
              item
              container
              spacing={2}
              flexDirection="row"
              alignItems="center"
              xs={12}
            >
              <Grid item xs={2}>
                <FormLabel id="description-label">Description :</FormLabel>
              </Grid>
              <Grid item xs={10}>
                <TextareaAutosize
                  maxRows={5}
                  minRows={4}
                  style={{width: 400}}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="filled"
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              flexDirection="row"
              justifyContent="space-between"
            >
              <Grid item columns={6}>
                <Box sx={{border: 1, borderRadius: 1, p: 1}}>
                  <RadioGroup
                    row
                    name="currency-radio"
                    value={currencyRadio}
                    onChange={(e) => setCurrencyRadio(e.target.value)}
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label="USD"
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="IDR"
                    />
                  </RadioGroup>
                </Box>
              </Grid>
              <Grid item column={3}>
                <Box sx={{border: 1, borderRadius: 1, p: 1}}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(e) => setChecked(e.target.checked)}
                        />
                      }
                      label="Cost To Cost"
                    />
                  </FormGroup>
                </Box>
              </Grid>
              <Grid item columns={3}>
                <Box sx={{border: 1, borderRadius: 1, p: 1}}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedTruck}
                          onChange={(e) => setCheckedTruck(e.target.checked)}
                        />
                      }
                      label="Cost To Truck"
                    />
                  </FormGroup>
                </Box>
              </Grid>
            </Grid>
            <Grid
              item
              container
              flexDirection={'row'}
              justifyContent="center"
              spacing={2}
              xs={12}
            >
              <Grid item xs={2}>
                <FormLabel id="quantity-label">Quantity Unit :</FormLabel>
              </Grid>
              <Grid item xs={10}>
                <NumericFormat
                  customInput={TextField}
                  thousandSeparator=","
                  onValueChange={(values, sourceInfo) => {
                    setQuantity(values.floatValue);
                  }}
                  value={quantity}
                  id="quantity"
                  variant="standard"
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              flexDirection={'row'}
              justifyContent="center"
              spacing={2}
              xs={12}
            >
              <Grid item xs={2}>
                <FormLabel id="quantity-label">Per Unit Cost :</FormLabel>
              </Grid>
              <Grid item xs={4}>
                <NumericFormat
                  customInput={TextField}
                  thousandSeparator=","
                  onValueChange={(values, sourceInfo) => {
                    if (values.floatValue === 0) {
                      setCost(values.floatValue);
                      setAmount(quantity);
                    }
                    if (values.floatValue >= 1) {
                      setCost(values.floatValue);
                      setRate(0);
                      setOriginalUsd(0);
                      setAmount(values.floatValue * quantity);
                    }
                  }}
                  disabled={originalUsd !== 0 || rate !== 0}
                  value={cost}
                  id="unit-cost"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={2}>
                <FormLabel id="rate-label">Original Rate :</FormLabel>
              </Grid>
              <Grid item xs={4}>
                <NumericFormat
                  customInput={TextField}
                  thousandSeparator=","
                  onValueChange={(values, sourceInfo) => {
                    if (values.floatValue !== 0) {
                      setRate(values.floatValue);
                      if (quantity !== 0) {
                        if (originalUsd !== 0) {
                          setAmount(quantity * values.floatValue * originalUsd);
                        } else {
                          setAmount(quantity * values.floatValue);
                        }
                      } else {
                        setAmount(values.floatValue);
                      }
                    } else {
                      if (originalUsd !== 0) {
                        if (quantity !== 0) {
                          setAmount(quantity * originalUsd);
                        } else {
                          setAmount(originalUsd);
                        }
                      } else {
                        setAmount(0);
                      }
                      setAmount(0);
                    }
                  }}
                  value={rate}
                  id="original-rate"
                  variant="standard"
                  disabled={cost !== 0}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              flexDirection={'row'}
              justifyContent="center"
              spacing={2}
              xs={12}
            >
              <Grid item xs={2}>
                <FormLabel id="amount-label">Amount :</FormLabel>
              </Grid>
              <Grid item xs={2}>
                <NumericFormat
                  customInput={TextField}
                  thousandSeparator=","
                  onValueChange={(values, sourceInfo) => {
                    if (cost >= 1) {
                      const qty = quantity;
                      const total = cost * qty;
                      setAmount(total);
                    }
                    if (originalUsd >= 0 && cost === 0) {
                      const qty = quantity;
                      const total = originalUsd * qty;
                      setAmount(total);
                    }
                    if (rate >= 0 && cost === 0) {
                      const qty = quantity;
                      const total = rate * qty;
                      setAmount(total);
                    }

                    if (rate >= 0 && originalUsd >= 0 && cost === 0) {
                      const qty = quantity;
                      const total = rate * qty * originalUsd;
                      setAmount(total);
                    }
                  }}
                  value={amount}
                  id="amount"
                  disabled
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3}>
                <RadioGroup
                  row
                  name="sign-radio"
                  value={signRadio}
                  onChange={(e) => setSignRadio(e.target.value)}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="+"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="-"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={2}>
                <FormLabel id="usd-label">Original USD :</FormLabel>
              </Grid>
              <Grid item xs={3}>
                <NumericFormat
                  customInput={TextField}
                  thousandSeparator=","
                  onValueChange={(values, sourceInfo) => {
                    if (values.floatValue !== 0) {
                      setOriginalUsd(values.floatValue);
                      if (quantity !== 0) {
                        if (rate !== 0) {
                          setAmount(quantity * values.floatValue * rate);
                        } else {
                          setAmount(quantity * values.floatValue);
                        }
                      } else {
                        setAmount(values.floatValue);
                      }
                    } else {
                      if (rate !== 0) {
                        if (quantity !== 0) {
                          setAmount(quantity * rate);
                        } else {
                          setAmount(rate);
                        }
                      } else {
                        setAmount(0);
                      }
                      setAmount(0);
                    }
                  }}
                  value={originalUsd}
                  id="original-usd"
                  disabled={cost >= 1}
                  variant="standard"
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              flexDirection={'row'}
              justifyContent="center"
              spacing={2}
              xs={12}
            >
              <Grid item xs={2}>
                <FormLabel id="amount-label">Subject Vat 10%</FormLabel>
              </Grid>
              <Grid item xs={2}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={vat}
                        onChange={(e) => setVat(e.target.checked)}
                      />
                    }
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={8} />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
