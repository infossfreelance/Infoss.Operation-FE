import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalListShipmentOrder(props) {

  return (
    <Modal show={props.show} className="show-modal" size="lg">
      <Modal.Header>
        <h5>List Shipment Order</h5>
      </Modal.Header>
      <Modal.Body>
        Woohoo, you're reading this text in a modal!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-infoss" onClick={() => props.onHide()}>
          Close
        </Button>
        <Button variant="infoss" onClick={() => props.onHide()}>
          Select Data
        </Button>
      </Modal.Footer>
    </Modal>
  );
}