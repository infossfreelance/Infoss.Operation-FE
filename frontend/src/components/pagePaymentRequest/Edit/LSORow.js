import React, { useState } from 'react';
import {
  dateFormat
} from '../../../helpers/constant';

export default function LSORow(props) {
    console.log("props", props)
    return (
        <tr
            key={props.k}
            onClick={(e) => props.setSelectedData(props.v)}
            className={props.selectedId && "bg-infoss text-white"}
        >
            <td>{ props.v.shipmentNo }</td>
            <td>{ props.v.jobNumber }</td>
            <td>{ props.v.subJobNo }</td>
            <td>{ dateFormat(props.v.etd) }</td>
            <td>{ props.v.shipperId }</td>
            <td>{ props.v.agentId }</td>
        </tr>
    )
}