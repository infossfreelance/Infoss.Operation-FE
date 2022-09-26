import React, { useState } from 'react';
import {
  dateFormat
} from '../../helpers/constant';

export default function LSORow(props) {
    return (
        <tr
            key={props.k}
            onClick={(e) => props.setSelectedData(props.v)}
            className={props.selectedId && "bg-infoss text-white"}
        >
            <td>{ props.v.shipmentNo }</td>
            <td>-</td>
            <td>
                { props.v.etd ? dateFormat(props.v.etd) : dateFormat(props.v.eta) ? props.v.eta : "-" }
            </td>
            <td>{ props.v.shipperId }</td>
            <td>{ props.v.agentId }</td>
            <td>-</td>
        </tr>
    )
}