import React, { useState } from 'react';
import {
    numFormat,
    dateFormat
} from '../../helpers/constant';

export default function ListTab2(props) {
    return (
        <tr
            onClick={(e) => props.setSelectedShipperList(props.v)}
            className={props.SelectedShipperList ? "bg-infoss text-white" : ( props.v.rowStatus === "DEL" && "text-danger")}
        >
            <td>{ props.v.customerId }</td>
            <td>{ props.v.description }</td>
            <td className="text-right">{ numFormat(props.v.amountUSD) }</td>
            <td className="text-right">{ numFormat(props.v.amountIDR) }</td>
            <td>{ props.v.isCostToCost ? "Yes" : "No" }</td>
            <td>{ props.v.isCostTrucking ? "Yes" : "No" }</td>
            <td>{ props.v.isAdditional ? "Yes" : "No" }</td>
            <td>{ props.v.isIgnoreItem ? "Yes" : "No" }</td>
        </tr>
    )
}