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
import AddAccountListRow from './AddAccountListRow'

export default function AddAccountList(props) {

  const [selectedId, setSelectedId] = useState('');
  const [AccountList, setAccountList] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  useEffect(() => {
    getAccountList()
}, []);

const getAccountList = () => {
  const payload = {
    userCode: "luna",
    countryId: 101,
    companyId: 32,
    branchId: 12
  }
  axios.post('http://stage-master.api.infoss.solusisentraldata.com/account/account/PostById?id=1', payload)
  .then((response) => {
    console.log("ACCOUNT", response)
    // setAccountList(response.data)
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
    <Modal show={props.show} className="show-modal" size="md">
      <Modal.Header>
        <h5>List Account</h5>
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
              AccountList.length > 0 ?
              AccountList.map((v, k) => {
                return (
                  <AddAccountListRow
                    key={k}
                    v={v}
                    k={k}
                    setSelectedData={(e) => setSelectedData(e)}
                    selectedId={selectedData.id === v.id ? true : false}
                  />
                )
              })
              :
              <tr>
                  <td colSpan={3} className="text-center py-3 text-muted">Data Empty</td>
              </tr>
            }
            
          </tbody>
        </Table>

      </Modal.Body>
    </Modal>
  );
}