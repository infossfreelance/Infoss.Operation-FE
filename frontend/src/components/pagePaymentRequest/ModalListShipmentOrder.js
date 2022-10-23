import React, { useState } from 'react';
import {
  Button,
  Modal,
  Pagination,
  Table
} from 'react-bootstrap';
import Swal from 'sweetalert2';
import LSORow from './LSORow';

export default function ModalListShipmentOrder(props) {
  const column = props.LSOData.columns !== undefined ? props.LSOData.columns : '';
  const row = props.LSOData.shipmentOrderHeader !== undefined ? props.LSOData.shipmentOrderHeader : '';

  const [selectedId, setSelectedId] = useState('')
  const [selectedData, setSelectedData] = useState({})
    
  const renderPagination = () => {
    if (props.NumPage === 1 && props.NumPage !== props.MaxPage) {
      return (
        <div style={{ display: 'inline-block' }}>
          <Pagination>
            <Pagination.Item active>
              {props.NumPage}
            </Pagination.Item>
            <Pagination.Next onClick={() => { props.getShipmentOrder(props.rowsCount, 2); props.setNumPage(props.NumPage + 1) }} />
          </Pagination>
        </div>
      )
    } 
     if (props.NumPage === 1 && props.NumPage === props.MaxPage) {
      return (
        <div style={{ display: 'inline-block' }}>
          <Pagination>
            <Pagination.Item active>
              {props.NumPage}
            </Pagination.Item>
          </Pagination>
        </div>
      )
    } else if (props.NumPage === props.MaxPage) {
      return (
        <div style={{ display: 'inline-block' }}>
          <Pagination>
            <Pagination.Prev onClick={() => { props.getShipmentOrder(props.rowsCount, props.NumPage - 1); props.setNumPage(props.NumPage - 1) }} />
            <Pagination.Item active>
              {props.NumPage}
            </Pagination.Item>
          </Pagination>
        </div>
      )
    } else {
      return (
        <div style={{ display: 'inline-block' }}>
          <Pagination>
            <Pagination.Prev onClick={() => { props.getShipmentOrder(props.rowsCount, props.NumPage - 1); props.setNumPage(props.NumPage - 1) }} />
            <Pagination.Item active>
              {props.NumPage}
            </Pagination.Item>
            <Pagination.Next onClick={() => { props.getShipmentOrder(props.rowsCount, props.NumPage + 1); props.etNumPage(props.NumPage + 1) }} />
          </Pagination>
        </div>
      )
    }

  }

  const saveSelectedData = () => {
    selectedData === '' ?
    ErrorAlert('Please Select Data!')
    :
    props.setSelectedData(selectedData)
    props.setdefShipNo(selectedData.shipmentNo)
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
        <h5>List Shipment Order</h5>
        <Modal.Footer>
          <Button variant="outline-infoss" onClick={() => props.onHide()}>
            Close
          </Button>
          <Button variant="infoss" onClick={() => saveSelectedData() }>
            Select Data
          </Button>
        </Modal.Footer>
      </Modal.Header>

      <Modal.Body>

        <Table className='table-borderless text-muted table-responsive'>
          <thead>
            <tr>
              {/* {
                column.length > 0 &&
                column.map((v, k) => {
                  return (
                    <th key={k}>
                      {v.text}
                    </th>
                  )
                })
              } */}
              <th>Shipment Order</th>
              <th>Principle</th>
              <th>ETD / ETA</th>
              <th>Shipper</th>
              <th>Agent</th>
            </tr>
            <tr>
              <td><input className='form-control' /></td>
              <td><input className='form-control' /></td>
              <td><input className='form-control' /></td>
              <td><input className='form-control' /></td>
              <td><input className='form-control' /></td>
            </tr>
            {/* <tr>
              {
                column.length > 0 &&
                column.map((v, k) => {
                  return (
                    <td key={k}><input className='form-control' /></td>
                  )
                })
              }
            </tr> */}
          </thead>
          <tbody>
            
            {
              row.length > 0 ?
                row.map((v, k) => {
                  return (
                    <LSORow
                      key={k}
                      v={v}
                      k={k}
                      setSelectedData={(e) => setSelectedData(e)}
                      selectedId={selectedData.id === v.id ? true : false}
                      column={column}
                    />
                  )
                })
               : (
                  <tr>
                    <td colSpan={5} className="py-3 text-muted text-center">Data Empty</td>
                  </tr>
                )
              }
          </tbody>
        </Table>
        
        <div className='row mt-2'>
          <div className='col text-right'>
            <div className='mx-4' style={{ display: 'inline-block' }}>
              {renderPagination()}
            </div>
          </div>
        </div>

      </Modal.Body>
    </Modal>
  );
}