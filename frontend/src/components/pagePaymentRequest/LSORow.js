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
            {/* <td>{ props.v.jobNumber }</td>
            <td>{ props.v.subJobNo }</td> */}
            <td>{ dateFormat(props.v.etd) }</td>
            <td>{ props.v.shipperId }</td>
            <td>{ props.v.agentId }</td>

            {/* {
                props.column.length > 0 &&
                props.column.map((v1, k1) => {
                    return (
                        <td>
                            { `${props.v}.${v1.column}` }
                        </td>
                    )
                })
            } */}
        </tr>
    )
}