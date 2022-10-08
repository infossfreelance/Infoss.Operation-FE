import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Table
} from 'react-bootstrap';
import Swal from 'sweetalert2';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { API_URL_MASTER } from '../../../helpers/constant'
import axios from 'axios';
import AddCustomerRow from './AddCustomerRow'

export default function AddCustomer(props) {

  const [selectedId, setSelectedId] = useState('');
  const [ShipperList, setShipperList] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  useEffect(() => {
    getShipperList()
  }, []);

const getShipperList = () => {
  const payload = {
    rowStatus: "ACT",
    countryId: 101,
    companyId: 32,
    branchId: 12,
    contactTypeId: 2
  }
  axios.post(API_URL_MASTER + 'regContact/regcontact/PostByPage?pageNo=1&pageSize=5', payload)
  .then((response) => {
    setShipperList(response.data)
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
    selectedData.contactId === undefined ?
    ErrorAlert('Please Select Data!')
    :
    props.setSelectedShipper(selectedData)
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
    <Modal show={props.show} className="show-modal" size="md">
      <Modal.Header>
        <h5>List Customer</h5>
        <Modal.Footer>
          <Button variant="outline-infoss" onClick={() => props.onHide()}>
            Close
          </Button>
          <Button variant="infoss" onClick={() => saveData()}>
            Select Data
          </Button>
        </Modal.Footer>
      </Modal.Header>

      <Modal.Body>
        
        <Table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {
              ShipperList.length > 0 ?
              ShipperList.map((v, k) => {
                return (
                  <AddCustomerRow
                    v={v}
                    k={k}
                    setSelectedData={(e) => setSelectedData(e)}
                    selectedId={selectedData.contactId === v.contactId ? true : false}
                  />
                )
              })
              :
              <tr>
                  <td colSpan={2} className="text-center py-3 text-muted">Data Empty</td>
              </tr>
            }
            
          </tbody>
        </Table>

      </Modal.Body>
    </Modal>
  );
}