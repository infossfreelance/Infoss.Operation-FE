import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import Swal from 'sweetalert2';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AddIncShipperList from './AddIncShipperList';
import AddIncAccountList from './AddIncAccountList';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import {API_URL} from '../../helpers/constant';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { Alert, AlertTitle } from '@mui/material';

export default function AddIncShipper(props) {

  useEffect(() => {
    props.data && handleChecked(props.data.amountIDR, props.data.amountUSD)
  }, []);

  const [showAddIncShipperList, setShowAddIncShipperList] = useState(false)
  const [showAddIncAccountList, setShowAddIncAccountList] = useState(false)
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
  }

  const saveData = () => {
    // if (SelectedShipper.code === undefined) {
    //   NotifAlert("Please Select Shipper!", "warning")
    //   return false
    // }
    // if (SelectedAccount.id === undefined) {
    //   NotifAlert("Please Select Account!", "warning")
    //   return false
    // }
    // if (Desc.length < 1 && SelectedAccount.length < 1) {
    //   NotifAlert("Description Can't Be Empty!", "warning")
    //   return false
    // }
    // // if (QtyUnit === 0) {
    // //   NotifAlert("Quantity Unit Can't Be Empty!", "warning")
    // //   return false
    // // }
    // // if (PerUnitCost === 0) {
    // //   NotifAlert("Per Unit Cost Can't Be Empty!", "warning")
    // //   return false
    // // }
    // if (Currency === '') {
    //   NotifAlert("Please Select Currency!", "warning")
    //   return false
    // }
    // // if (OriginalRate === 0) {
    // //   NotifAlert("Original Rate Can't Be Empty!", "warning")
    // //   return false
    // // }
    // // if (OriginalUSD === 0) {
    // //   NotifAlert("Original USD Can't Be Empty!", "warning")
    // //   return false
    // // }

    // console.log("Currency", Currency)
    // console.log("amount", Amount)

    let amount_IDR = 0
    let amount_USD = 0
    
    if (Currency === 'IDR') {
      amount_IDR = Amount ? Amount : (props.data.amountIDR === 0 ? props.data.amountUSD : props.data.amountIDR)
      amount_USD = 0
      // console.log("IDR")
      // console.log("def USD", amount_USD)
      // console.log("def IDR", amount_IDR)
    }
    
    if (Currency === 'USD') {
      amount_USD = Amount ? Amount : (props.data.amountUSD === 0 ? props.data.amountIDR : props.data.amountUSD)  
      amount_IDR = 0    
      // console.log("USD")
      // console.log("def USD", amount_USD)
      // console.log("def IDR", amount_IDR)
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

  const renderForm = () => {
    if (props.TabType === 'Inc Agent' || props.TabType === 'Cost Agent') {
      return (
        <>
          <div className='row mt-3'>
            <div className='col-5 row'>
              <div className='col-5'>
                Per Unit Cost
              </div>
              <div className='col-7'>
                <input min={0} type="number" className='form-control ms-1'
                  defaultValue={ props.IsAdd ? 0 : props.data.perQty }
                  onChange={(e) => setPerUnitCost(e.target.value)}
                />
              </div>
            </div>
            <div className='col-3'></div>
            <div className='col-4 row'>
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
            <div className='col-5 row'>
              <div className='col-5'>
                Amount
              </div>
              <div className='col-7'>
                <input min={0} type="number" className='form-control ms-1'                  
                  defaultValue={ props.IsAdd ? 0 : (props.data.amountUSD == 0 ? props.data.amountIDR : props.data.amountUSD ) }
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className='col-3 d-flex justify-content-center'>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                className=''
              >
                <FormControlLabel value="+" control={<Radio onChange={(e) => setUpDown("+")} />} label="+" />
                <FormControlLabel value="-" control={<Radio onChange={(e) => setUpDown("-")} />} label="-" />
              </RadioGroup>
            </div>
            <div className='col-4 row'>
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
        </>
      )
    } else {
      return (
        <>
          <div className='row mt-3'>
            <div className='col-5 row'>
              <div className='col-5'>
                Per Unit Cost
              </div>
              <div className='col-7'>
                <input type="number" className='form-control ms-1'
                  defaultValue={ props.IsAdd ? 0 : props.data.perQty }
                  onChange={(e) => setPerUnitCost(e.target.value)}
                />
              </div>
            </div>
            <div className='col-5 row'>
              <div className='col-5 text-end'>
                Original Rate
              </div>
              <div className='col-7'>
                <input type="number" className='form-control'
                defaultValue={ props.IsAdd ? 0 : props.data.originalRate }
                onChange={(e) => setOriginalRate(e.target.value)} />
              </div>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-5 row'>
              <div className='col-5'>
                Amount
              </div>
              <div className='col-7'>
                <input type="number" className='form-control ms-1'
                  defaultValue={ props.IsAdd ? 0 : (props.data.amountUSD == 0 ? props.data.amountIDR : props.data.amountUSD ) }
                onChange={(e) => setAmount(e.target.value)} />
              </div>
            </div>
            <div className='col-5 row'>
              <div className='col-5 text-end'>
                Original USD
              </div>
              <div className='col-7'>
                <input type="number" className='form-control'
                defaultValue={ props.IsAdd ? 0 : props.data.originalUsd }
                onChange={(e) => setOriginalUSD(e.target.value)} />
              </div>
            </div>
          </div>
        </>
      )
    }
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
            Invoice To
          </div>
          <div className='col-10'>
            { props.TabType.toUpperCase() }
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Shipper
          </div>
          <div className='col-10 row'>
            <div className='col-3'>
              <input className='form-control' disabled
                value={ props.IsAdd ? SelectedShipper.code : SelectedShipper.code ? SelectedShipper.code : props.data.customerId }
              />
            </div>
            <div className='col-1'>
              <FindInPageIcon className='text-infoss' onClick={() => setShowAddIncShipperList(true)} />
            </div>
            <div className='col-7'>
              <input className='form-control block' disabled defaultValue={ SelectedShipper.contactName } />
            </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Account
          </div>
          <div className='col-10 row'>
            <div className='col-3'>
              <input className='form-control' disabled
                value={ props.IsAdd ? SelectedAccount.id : SelectedAccount.id ? SelectedAccount.id : props.data.accountId }
              />
            </div>
            <div className='col-1'>
              <FindInPageIcon className='text-infoss' onClick={() => setShowAddIncAccountList(true)} />
            </div>
            <div className='col-5'>
              <input type='checkbox' disabled /> 20
              <input type='checkbox' disabled className='ms-2' /> 40
              <input type='checkbox' disabled className='ms-2' /> 45
              <input type='checkbox' disabled className='ms-2' /> M3
              <input type='checkbox' disabled className='ms-2' /> All
            </div>
            <div className='col-3'>
              <input type='checkbox' onChange={() => setSplitAccount(!SplitAccount)} /> Split Account
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
                  {/* <FormControlLabel value="USD"
                    checked={checkUSD}
                    // checked={handleChecked(props.data.amountUSD)}
                    control={
                      <Radio
                        onClick={(e) => { setCurrency("USD") }}
                        // onChange={(e) => setCurrency("USD")}
                      />
                    }
                    label="USD"
                  />
                  <FormControlLabel value="IDR"
                    checked={checkIDR}
                    // checked={handleChecked(props.data.amountIDR)}
                    control={
                      <Radio
                        onChange={(e) => { setCurrency("IDR") }}
                      />
                    }
                    label="IDR"
                  /> */}
                </>
              }
              

            </RadioGroup>
          </div>          
          <div className='col-7 row'>
            <div className='col-4 pt-2'>
              <input type='checkbox' disabled /> Additional
            </div>     
            <div className='col-4 pt-2'>
              <input type='checkbox'onChange={(e) => setCostTrucking(!CostTrucking)} /> Cost Trucking
            </div>     
            <div className='col-4 pt-2'>
              <input type='checkbox' onChange={(e) => setCostToCost(!CostToCost)} /> Cost To Cost
            </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Quantity Unit
          </div>
          <div className='col-3'>
            <input min={0} type="number" className='form-control'
              defaultValue={ props.IsAdd ? 0 : props.data.quantity }
              onChange={(e) => setQtyUnit(e.target.value)}
            />
          </div>
        </div>

        { renderForm() }

      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-infoss" onClick={() => {props.onHide(); clearForm()}}>
          Close
        </Button>
        <Button variant="infoss" onClick={() => saveData()}>
          { props.IsAdd ? 'Save' : 'Update' }
        </Button>
      </Modal.Footer>

      
      <AddIncShipperList
          show={showAddIncShipperList}
          onHide={() => setShowAddIncShipperList(false)}
          setSelectedShipper={(e) => setSelectedShipper(e)}
      />
      
      <AddIncAccountList
          show={showAddIncAccountList}
          onHide={() => setShowAddIncAccountList(false)}
          setSelectedAccount={(e) => setSelectedAccount(e)}
      />

    </Modal>
  );
}