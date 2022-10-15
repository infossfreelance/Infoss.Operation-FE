import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Table
} from 'react-bootstrap';
import Swal from 'sweetalert2';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { API_URL_MASTER } from '../../helpers/constant'
import axios from 'axios';
import MarginRateListRow from './MarginRateListRow';
import PortList from './PortList';

export default function MarginRateList(props) {

  const [selectedId, setSelectedId] = useState('');
  const [AccountList, setAccountList] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [selectedPort, setSelectedPort] = useState({});
  const [showPortList, setShowPortList] = useState(false)

  useEffect(() => {
    getAccountList()
}, []);

const getAccountList = () => {
  axios.get(API_URL_MASTER + 'CostSea/costsea/1/5')
  .then((response) => {
    setAccountList(response.data)
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
}


  const saveData = () => {
    selectedData.id === undefined ?
    ErrorAlert('Please Select Data!')
    :
    props.setSelectedAccount(selectedData)
    props.onHide()
  }

  const ErrorAlert = (string) => {
    Swal.fire({
        icon: 'warning',
        title: 'Oops',
        text: string,
        customClass: {
            confirmButton: 'btn btn-infoss px-4'
        }
    });
  };

  return (
    <Modal show={props.show} className="show-modal" size="xl">
      <Modal.Header>
        <h5>List Margin Rate</h5>
        <Modal.Footer>
          <Button variant="outline-infoss" onClick={() => props.onHide()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Header>

      <Modal.Body>

        <div className='row mt-3'>
          <div className='col-2'>
            Period
          </div>
          <div className='col-2'>
            <select className='form-control'>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
          </div>
          <div className='col-1'>
            <select className='form-control'>
              <option>2017</option>
              <option>2018</option>
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
            </select>
          </div>
        </div> 

        <div className='row mt-3'>
          <div className='col-2'>
            Destination Port
          </div>
          <div className='col-2'>
            <input className='form-control' disabled />
          </div>
          <div className='col-1'>
            <FindInPageIcon className='text-infoss' onClick={() => setShowPortList(true)} />
          </div>
          <div className='col-5'>
            <input className='form-control' disabled />
          </div>
        </div> 
        
        <Table className='mt-3'>
          <thead>
            <tr>
              <th>Margin No.</th>
              <th>Principle</th>
              <th>Valid From</th>
              <th>Valid To</th>
              <th>PortName</th>
              <th>Type</th>
              <th>Cont Size</th>
              <th>Rate</th>
              <th>Cost Name</th>
              <th>Description</th>
              <th>USD Rate</th>
            </tr>
          </thead>
          <tbody>
            {
              AccountList.length > 0 ?
              AccountList.map((v, k) => {
                return (
                  <MarginRateListRow
                    v={v}
                    k={k}
                    setSelectedData={(e) => setSelectedData(e)}
                    selectedId={selectedData.id === v.id ? true : false}
                  />
                )
              })
              :
              <tr>
                  <td colSpan={11} className="text-center py-3 text-muted">Data Empty</td>
              </tr>
            }
            
          </tbody>
        </Table>
      
      <PortList
          show={showPortList}
          onHide={() => setShowPortList(false)}
          setSelectedPort={(e) => setSelectedPort(e)}
      />

      </Modal.Body>
    </Modal>
  );
}