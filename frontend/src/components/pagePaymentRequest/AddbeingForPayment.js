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
    props.data && handleChecked(props.data.amountIDR, props.data.amountUSD)
  }, []);

  const [showAddAccountList, setShowAddAccountList] = useState(false)
  const [showMarginRateList, setShowMarginRateList] = useState(false)
  const [showSOCRateList, setShowSOCRateList] = useState(false)
  const [SelectedShipper, setSelectedShipper] = useState({})
  const [SelectedAccount, setSelectedAccount] = useState({})

  const [SplitAccount, setSplitAccount] = useState(false);
  const [Desc, setDesc] = useState('');
  const [Currency, setCurrency] = useState('');
  const [UpDown, setUpDown] = useState('');
  const [CostTrucking, setCostTrucking] = useState(false);
  const [CostToCost, setCostToCost] = useState(false);
  const [QtyUnit, setQtyUnit] = useState(0);
  const [PerUnitCost, setPerUnitCost] = useState(0);
  const [Amount, setAmount] = useState(0);
  const [OriginalRate, setOriginalRate] = useState(0);
  const [OriginalUSD, setOriginalUSD] = useState(0);
  const [DifferentCost, setDifferentCost] = useState(0);

  const [OpenAlert, setOpenAlert] = useState(false);
  const [TextAlert, setTextAlert] = useState("");
  const [ColorAlert, setColorAlert] = useState("");
  const vertical = 'top'
  const horizontal = 'right'

  const clearForm = () => {
    setSelectedAccount({})
    setSelectedShipper({})
    setSplitAccount(false);
    setDesc('');
    setCurrency('');
    setUpDown('');
    setCostTrucking(false);
    setCostToCost(false);
    setQtyUnit(0);
    setPerUnitCost(0);
    setAmount(0);
    setOriginalRate(0);
    setOriginalUSD(0);
    setDifferentCost(0);
  }

  const saveData = () => {

    let amount_IDR = 0
    let amount_USD = 0
    
    if (Currency === 'IDR') {
      amount_IDR = Amount ? Amount : (props.data.amountIDR === 0 ? props.data.amountUSD : props.data.amountIDR)
      amount_USD = 0
    }
    
    if (Currency === 'USD') {
      amount_USD = Amount ? Amount : (props.data.amountUSD === 0 ? props.data.amountIDR : props.data.amountUSD)  
      amount_IDR = 0    
    }

    let CTI = ''
    let II = ''
    if (props.TabType === 'Inc Shipper') {
      CTI = 2
      II = true
    } else if (props.TabType === 'Inc Agent') {
      CTI = 5
      II = true
    } else if (props.TabType === 'Cost SSLine') {
      CTI = 11
      II = false
    } else if (props.TabType === 'Cost EMKL') {
      CTI = 6
      II = false
    } else if (props.TabType === 'Cost Rebate') {
      CTI = 2
      II = false
    } else if (props.TabType === 'Cost Agent') {
      CTI = 5
      II = false
    } else {
      CTI = 7
      II = false
    }

    const payload = {
      EplId: props.staticId,
      Sequence: props.IsAdd ? ((localStorage.getItem("totalSquance") != "NaN") ? localStorage.getItem("totalSquance") : 1) : props.data.sequence,
      CustomerId: props.IsAdd ? SelectedShipper.contactId : SelectedShipper.contactId ? SelectedShipper.contactId : props.data.customerId,
      CountryId: 101,
      CompanyId: 32,
      BranchId: 12,
      CustomerTypeId: CTI,
      AccountId: props.IsAdd ? SelectedAccount.id : SelectedAccount.id ? SelectedAccount.id : props.data.accountId,
      Description: Desc !== '' ? Desc : props.IsAdd ? SelectedAccount.name : SelectedAccount.name ? SelectedAccount.name : props.data.description,
      Quantity: parseInt(props.IsAdd ? QtyUnit : QtyUnit ? QtyUnit : props.data.quantity),
      PerQty: parseFloat(props.IsAdd ? PerUnitCost : PerUnitCost ? PerUnitCost : props.data.perQty),
      AmountUSD: parseFloat(amount_USD),
      AmountIDR: parseFloat(amount_IDR),
      OriginalUsd: parseFloat(props.IsAdd ? OriginalUSD : OriginalUSD ? OriginalUSD : props.data.originalUsd),
      OriginalRate: parseFloat(props.IsAdd ? OriginalRate : OriginalRate ? OriginalRate : props.data.originalRate),
      IsSplitIncCost: SplitAccount,
      IsCostToCost: CostToCost,
      IsCostTrucking: CostTrucking,
      IsAdditional: false,
      IsIncome: II,
      User: "testing"
    }
    
    // console.log("payload", payload)
    // return false

    props.IsAdd ? (
      axios.post(API_URL + 'estimateprofitloss/Estimateprofitloss/ApiV1/Detail', payload)
      .then((response) => {
          props.NotifAlert('Data Saved!', 'success')
          clearForm()
          props.onHide()
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong!',
          text: error,
          customClass: {
              confirmButton: 'btn-infoss px-4'
          }
        });
      })
    ) : (
      axios.put(API_URL + 'estimateprofitloss/Estimateprofitloss/ApiV1/Detail', payload)
      .then((response) => {
          props.NotifAlert('Data Updated!', 'success')
          clearForm()
          props.onHide()
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong!',
          text: error,
          customClass: {
              confirmButton: 'btn-infoss px-4'
          }
        });
      })
    )
  }

  const [checkUSD, setCheckUSD] = useState(false)
  const [checkIDR, setCheckIDR] = useState(false)

  const handleChecked = (idr, usd) => {
    // console.log("idr", idr)
    // console.log("usd", usd)
    if (idr === 0) {
      setCheckIDR(false)
      setCheckUSD(true)
    } else {
      setCheckIDR(true)
      setCheckUSD(false)
    }
    // if (props.data.amountIDR === 0) {
    //   setCheckIDR(false)
    //   setCheckUSD(true)
    // } else {
    //   setCheckIDR(true)
    //   setCheckUSD(false)
    // }
    
  }

  // const handleChecked = (val) => {
  //   if (val === 0) {
  //     return false
  //   } else {
  //     // setCurrency('USD')
  //     return true
  //   }
  // }

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
                value={ props.IsAdd ? SelectedAccount.id : SelectedAccount.id ? SelectedAccount.id : props.data.accountId }
              />
            </div>
            <div className='col-1'>
              <FindInPageIcon className='text-infoss' onClick={() => setShowAddAccountList(true)} />
            </div>
            <div className='col-4'>
              <input type='radio' /> Paid
              <input type='radio' className='ms-2' /> Not Paid
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
              value={ props.IsAdd ? (SelectedAccount.name ? SelectedAccount.name : '' ) : SelectedAccount.name ? SelectedAccount.name : props.AccountName }
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
              defaultValue={ props.IsAdd ? (SelectedAccount.name ? SelectedAccount.name : '' ) : SelectedAccount.name ? SelectedAccount.name : props.data.description }
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
              }              

            </RadioGroup>
          </div>          
          <div className='col-7 row'>  
            <div className='col-4 offset-4 pt-2'>
              <input type='checkbox'onChange={(e) => setCostTrucking(!CostTrucking)} /> Cost Trucking
            </div>     
            <div className='col-4 pt-2'>
              <input type='checkbox' onChange={(e) => setCostToCost(!CostToCost)} /> Cost To Cost
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
                defaultValue={ props.IsAdd ? 0 : props.data.perQty }
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
                defaultValue={ props.IsAdd ? 0 : props.data.originalRate }
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
                defaultValue={ props.IsAdd ? 0 : props.data.perQty }
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
                defaultValue={ props.IsAdd ? 0 : props.data.originalUsd }
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
                defaultValue={ props.IsAdd ? 0 : (props.data.amountUSD == 0 ? props.data.amountIDR : props.data.amountUSD ) }
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
                defaultValue={ props.IsAdd ? 0 : props.data.originalUsd }
                onChange={(e) => setDifferentCost(e.target.value)}
              />
            </div>
          </div>
        </div>

        <hr />
        <div className='row mt-3'>
          <div className='col-5 row'>
            <div className='col-7 ms-1'>
              <input type='checkbox' className='me-3' />
              Subject VAT 10%
            </div>
          </div>
          <div className='col-7 row'>
            <div className='col-4 text-end'>
              Faktur No.
            </div>
            <div className='col-8'>
              <input type="number" disabled className='form-control'
                defaultValue={ props.IsAdd ? 0 : props.data.originalUsd }
                onChange={(e) => setDifferentCost(e.target.value)}
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