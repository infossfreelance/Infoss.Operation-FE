import React, { useState } from 'react';
import {
  dateFormat
} from '../../helpers/constant';

export default function AddIncShipperListRow(props) {
    return (
        <tr
            key={props.k}
            onClick={(e) => props.setSelectedData(props.v)}
            className={props.selectedId && "bg-infoss text-white"}
        >
            <td>{props.v.code}</td>
            <td>{props.v.contactName}</td>
            <td>{props.v.contactAddress}</td>
        </tr>
    )
}