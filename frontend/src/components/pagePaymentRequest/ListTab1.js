import React, { useState } from 'react';
import {
    numFormat,
    dateFormat
} from '../../helpers/constant';

export default function ListTab1(props) {
    return (
        <tr
            onClick={(e) => props.setSelectedShipperList(props.v)}
            className={props.SelectedShipperList ? "bg-infoss text-white" : ( props.v.rowStatus === "DEL" && "text-danger")}
        >            
            <td>-</td>
            <td>{ props.v.paid ? "Yes" : "No" }</td>
            <td>{ props.v.description }</td>
            <td className="text-right">{ numFormat(props.v.amount) }</td>
            <td className="text-right">{ numFormat(props.v.amount) }</td>
            <td>{ props.v.isCostToCost ? "Yes" : "No" }</td>
            <td>-</td>
            <td>-</td>
            <td>{ props.v.kendaraanNopol ? props.v.kendaraanNopol : "-" }</td>
            <td>{ props.v.employeeName ? props.v.employeeName : "-" }</td>
        </tr>
    )
}