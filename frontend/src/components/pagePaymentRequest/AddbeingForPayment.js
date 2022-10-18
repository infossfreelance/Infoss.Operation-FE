import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import Swal from 'sweetalert2';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AddAccountList from './AddAccountList';
import MarginRateList from './MarginRateList';
import SOCRateList from './SOCRateList';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import {API_URL} from '../../helpers/constant';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { Alert, AlertTitle } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function AddbeingForPayment(props) {

  useEffect(() => {
    
  }, []);

  const [showAddAccountList, setShowAddAccountList] = useState(false)
  const [showMarginRateList, setShowMarginRateList] = useState(false)
  const [showSOCRateList, setShowSOCRateList] = useState(false)
  const [SelectedAccount, setSelectedAccount] = useState({})

  const [OpenAlert, setOpenAlert] = useState(false);
  const [TextAlert, setTextAlert] = useState("");
  const [ColorAlert, setColorAlert] = useState("");
  const vertical = 'top'
  const horizontal = 'right'

  const [Account, setAccount] = useState('')
  const [IsPaid, setIsPaid] = useState(false)
  const [Desc, setDesc] = useState('')
  const [Amount, setAmount] = useState('')
  const [IsCostToCost, setIsCostToCost] = useState(false)
  const [IsCostTrucking, setIsCostTrucking] = useState(false)
  const [CTCType, setCTCType] = useState('')
  const [Currency, setCurrency] = useState('')
  const [DefShipNo, setDefShipNo] = useState('')
  const [QtyUnit, setQtyUnit] = useState('')
  const [DifferentCost, setDifferentCost] = useState('')
  const [OriginalRate, setOriginalRate] = useState('')
  const [PerUnitCost, setPerUnitCost] = useState('')
  const [OriginalUSD, setOriginalUSD] = useState('')
  const [SubjectVAT, setSubjectVAT] = useState(false)
  const [FakturNo, setFakturNo] = useState('')
  const [NoPolTruck, setNoPolTruck] = useState('')
  const [Driver, setDriver] = useState('')

  const clearForm = () => {
    setSelectedAccount({})

    setAccount('')
    setIsPaid(false)
    setDesc('')
    setAmount('')
    setIsCostToCost(false)
    setIsCostTrucking(false)
    setCTCType('')
    setCurrency('')
    setDefShipNo('')
    setQtyUnit('')
    setDifferentCost('')
    setOriginalRate('')
    setPerUnitCost('')
    setOriginalUSD('')
    setSubjectVAT(false)
    setFakturNo('')
    setNoPolTruck('')
    setDriver('')
  }

  const saveData = () => {

    const amountIDR = Currency === "IDR" ? Amount : 0;
    const amountUSD = Currency === "USD" ? Amount : 0;

    const data = {    
      
      idRow: props.IncShipperList.length + 1,

      paid: IsPaid,
      description: Desc,
      amount: Amount,
      type: 0,
      isCostToCost: IsCostToCost,
      isCostTrucking: IsCostTrucking,
      originalUsd: OriginalUSD,
      originalRate: OriginalRate,
      quantity: QtyUnit,
      perQty: PerUnitCost,
      fakturNo: FakturNo,
      kendaraanNopol: NoPolTruck,
      employeeName: Driver,
      countryId: 101,
      companyId: 32,
      branchId: 12,
      
      // accountId: Account,
      // persenPpn: SubjectVAT,
      
      accountId: 1,
      persenPpn: 10,


      rowStatus: "string",
      paymentRequestId: 0,
      sequence: 0,
      debetCredit: "string",
      codingQuantity: true,
      amountCrr: 0,
      paidOn: "2022-10-09T01:25:44.400Z",
      paidPV: true,
      eplDetailId: 0,
      statusMemo: true,
      memoNo: 0,
      idLama: 0,
      isPpn: true,
      fakturDate: "2022-10-09T01:25:44.401Z",
      kendaraanId: 0,
      employeeId: 0,
      mrgId: 0,
      deliveryDate: "2022-10-09T01:25:44.401Z",
      user: "string"
    }

   
    props.IncShipperList.push(data);
    clearForm();
    props.onHide();

  }


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
    clearForm();
  };

  const NotifAlert = (text, color) => {
    setTextAlert(text)
    setColorAlert(color)
    setOpenAlert(true)
  };

  return (
    <Modal show={props.show} className="show-modal" size="lg">
      <Modal.Header>
        <h5>{ props.TabType }</h5>
      </Modal.Header>

      <Modal.Body>

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

        <div className='row'>
          <div className='col-2'>
            Account
          </div>
          <div className='col-10 row'>
            <div className='col-2'>
              <input className='form-control' disabled
                value={ SelectedAccount.id }
              />
            </div>
            <div className='col-1'>
              <FindInPageIcon className='text-infoss' onClick={() => setShowAddAccountList(true)} />
            </div>
            <div className='col-4 row'>              
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="Paid"
                  control={
                    <Radio
                      onChange={(e) => setIsPaid(true)}
                    />
                  }
                  label="Paid"
                />
                <FormControlLabel value="Not Paid"
                  defaultChecked={true}
                  control={
                    <Radio
                      onChange={(e) => setIsPaid(false)}
                    />
                  }
                  label="Not Paid"
                />
              </RadioGroup>
            </div>
            <div className='col-5'>
              <input type='checkbox' disabled /> 20
              <input type='checkbox' disabled className='ms-2' /> 40
              <input type='checkbox' disabled className='ms-2' /> 45
              <input type='checkbox' disabled className='ms-2' /> M3
              <input type='checkbox' disabled className='ms-2' /> All
            </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Account Name
          </div>
          <div className='col-7'>
            <input
              className='form-control' disabled
              value={ SelectedAccount.name ? SelectedAccount.name : '' }
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Description
          </div>
          <div className='col-7'>
            <textarea className='form-control'
              defaultValue={ SelectedAccount.name ? SelectedAccount.name : '' }
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-3 offset-2'>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >

              {
                props.IsAdd ?
                <>
                  <FormControlLabel value="USD"
                    defaultChecked={props.IsAdd ? false : (props.data.amountUSD !== 0 ? true : false)}
                    control={
                      <Radio
                        onChange={(e) => setCurrency("USD")}
                      />
                    }
                    label="USD"
                  />
                  <FormControlLabel value="IDR"
                    defaultChecked={props.IsAdd ? false : (props.data.amountIDR !== 0 ? true : false)}
                    control={
                      <Radio
                        onChange={(e) => setCurrency("IDR")}
                      />
                    }
                    label="IDR"
                  />
                </>
                :
                <>
                  <FormControlLabel value="USD"
                    control={
                      <Radio
                        onChange={(e) => setCurrency("USD")}
                      />
                    }
                    label="USD"
                  />
                  <FormControlLabel value="IDR"
                    control={
                      <Radio
                        onChange={(e) => setCurrency("IDR")}
                      />
                    }
                    label="IDR"
                  />
                </>
              }              

            </RadioGroup>
          </div>          
          <div className='col-7 row'>  
            <div className='col-4 offset-4 pt-2'>
              <input type='checkbox'onChange={(e) => setIsCostTrucking(!IsCostTrucking)} /> Cost Trucking
            </div>     
            <div className='col-4 pt-2'>
              <input type='checkbox' onChange={(e) => setIsCostToCost(!IsCostToCost)} /> Cost To Cost
            </div>
          </div>
        </div>        
        
        <div className='row mt-3'>
          <div className='col-6 row'>
            <div className='col-4'>
              Quantity Unit
            </div>
            <div className='col-6 ms-1'>
              <input min={0} type="number" className='form-control ms-1'
                onChange={(e) => setQtyUnit(e.target.value)}
              />
            </div>
          </div>
          <div className='col-6 row'>
            <div className='col-6 text-end'>
              Original Rate
            </div>
            <div className='col-6'>
              <input min={0} type="number" className='form-control'
                onChange={(e) => setOriginalRate(e.target.value)}
              />
            </div>
          </div>
        </div>   
        
        <div className='row mt-3'>
          <div className='col-6 row'>
            <div className='col-4'>
              Per Unit Cost
            </div>
            <div className='col-6 ms-1'>
              <input min={0} type="number" className='form-control ms-1'
                onChange={(e) => setPerUnitCost(e.target.value)}
              />
            </div>
          </div>
          <div className='col-6 row'>
            <div className='col-6 text-end'>
              Original USD
            </div>
            <div className='col-6'>
              <input type="number" className='form-control'
                onChange={(e) => setOriginalUSD(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-6 row'>
            <div className='col-4'>
              Amount
            </div>
            <div className='col-6 ms-1'>
              <input min={0} type="number" className='form-control ms-1'                  
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className='col-6 row'>
            <div className='col-6 text-end'>
              Different Cost
            </div>
            <div className='col-6'>
              <input type="number" disabled className='form-control'
                onChange={(e) => setDifferentCost(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className='row mt-3' hidden={!IsCostTrucking}>
          <div className='col-6 row'>
            <div className='col-4'>
              NoPol Truck
            </div>
            <div className='col-6 ms-1'>
              <input min={0} type="text" className='form-control ms-1'                  
                onChange={(e) => setNoPolTruck(e.target.value)}
              />
            </div>
          </div>
          <div className='col-6 row'>
            <div className='col-6 text-end'>
              Driver
            </div>
            <div className='col-6'>
              <input type="text" className='form-control'
                onChange={(e) => setDriver(e.target.value)}
              />
            </div>
          </div>
        </div>

        <hr />
        <div className='row mt-3'>
          <div className='col-5 row'>
            <div className='col-7 ms-1'>
              <input type='checkbox' className='me-3' onChange={(e) => setSubjectVAT(!SubjectVAT)} />
              Subject VAT 10%
            </div>
          </div>
          <div className='col-7 row'>
            <div className='col-4 text-end'>
              Faktur No.
            </div>
            <div className='col-8'>
              <input type="number" disabled className='form-control'
                onChange={(e) => setFakturNo(e.target.value)}
              />
            </div>
          </div>
        </div>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-infoss" onClick={() => setShowMarginRateList(true)}>
          <SearchIcon /> Margin Rate
        </Button>
        <Button variant="outline-infoss" className='me-3' onClick={() => setShowSOCRateList(true)}>
          <SearchIcon /> SOC Rate
        </Button>
        <Button variant="outline-infoss" onClick={() => {props.onHide(); clearForm()}}>
          Close
        </Button>
        <Button variant="infoss" onClick={() => saveData()}>
          { props.IsAdd ? 'Save' : 'Update' }
        </Button>
      </Modal.Footer>
      
      <AddAccountList
          show={showAddAccountList}
          onHide={() => setShowAddAccountList(false)}
          setSelectedAccount={(e) => setSelectedAccount(e)}
      />
      
      <MarginRateList
          show={showMarginRateList}
          onHide={() => setShowMarginRateList(false)}
          setSelectedAccount={(e) => setSelectedAccount(e)}
      />
      
      <SOCRateList
          show={showSOCRateList}
          onHide={() => setShowSOCRateList(false)}
          setSelectedAccount={(e) => setSelectedAccount(e)}
      />

    </Modal>
  );
}