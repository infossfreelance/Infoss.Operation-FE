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

  console.log("IncShipperList", props.IncShipperList)
  // console.log("setIncShipperList", props.setIncShipperList)

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

  const [Account, setAccountName] = useState('')
  const [Desc, setDesc] = useState('')
  const [Amount, setAmount] = useState('')
  const [CostToCost, setCostToCost] = useState('')
  const [CostTrucking, setCostTrucking] = useState('')
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

  const clearForm = () => {
    setSelectedAccount({})
  }

  const saveData = () => {
    // alert("SAVED!")

    const data = {
      Account: Account,
      Desc: Desc,
      Amount: Amount,
      CostToCost: CostToCost,
      CostTrucking: CostTrucking,
      CTCType: CTCType,
      Currency: Currency,
      DefShipNo: DefShipNo,
      QtyUnit: QtyUnit,
      DifferentCost: DifferentCost,
      OriginalRate: OriginalRate,
      PerUnitCost: PerUnitCost,
      OriginalUSD: OriginalUSD,
      SubjectVAT: SubjectVAT,
      FakturNo: FakturNo,
    }

    console.log("Data", data)
    let old = props.IncShipperList
    let temp = []
    
    temp = old.push(data)
    
    console.log("first", temp)
    props.setIncShipperList(temp)

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