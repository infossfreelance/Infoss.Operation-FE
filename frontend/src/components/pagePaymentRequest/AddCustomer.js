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
import AddCustomerRow from './AddCustomerRow'

export default function AddCustomer(props) {

  const [selectedId, setSelectedId] = useState('');
  const [CustomerData, setCustomerData] = useState({});
  const [selectedData, setSelectedData] = useState({});

  useEffect(() => {
    getCustomer()
  }, []);

  const getCustomer = () => {
    const payload = {
        "userCode": "luna",
        "countryId": 101,
        "companyId": 32,
        "branchId": 12
    }
    axios.post(`http://stage-master.api.infoss.solusisentraldata.com/regContact/regcontact/PostById?id=3019`, payload)
    .then((response) => {
        console.log('CUSTOMER DATA ON MODAL', response)
    })
    .catch(function (error) {
      console.error(error)
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
              CustomerData.length > 0 ?
              CustomerData.map((v, k) => {
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