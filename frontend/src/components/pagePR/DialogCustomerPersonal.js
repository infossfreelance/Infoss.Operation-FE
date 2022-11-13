import React, {useEffect, useState, Dispatch} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Button as RButton, Modal, Table} from 'react-bootstrap';
import axios from "axios";
import Swal from "sweetalert2";
import AddCustomerRow from "../pagePaymentRequest/AddCustomerRow";

export function DialogCustomerPersonal(props) {
  const [contactList, setContactList] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  useEffect(() => {
    getContactList()
  }, []);

  const getContactList = () => {
    const payload = {
      "userCode": "luna",
      "countryId": 101,
      "companyId": 32,
      "branchId": 12
    }
    axios.post(`http://stage-master.api.infoss.solusisentraldata.com/regContact/regcontact/PostById?id=3019`, payload)
        .then((response) => {
          // console.log('CUSTOMER DATA ON MODAL', response)
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
              contactList.length > 0 ?
                  contactList.map((v, k) => {
                    return (
                        <AddCustomerRow
                            v={v}
                            k={k}
                            setSelectedData={(e) => setSelectedData(e)}
                            selectedId={selectedData.contactId === v.contactId}
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
