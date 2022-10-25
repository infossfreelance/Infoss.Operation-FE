import React, { useState } from 'react';
import {
    numFormat,
    dateFormat
} from '../../../helpers/constant';

export default function ListTab1(props) {
    return (
        <tr>
            <td>-</td>
            <td>-</td>
            <td>{ props.v.description }</td>
            <td className="text-right">{ numFormat(props.v.amount) }</td>
            <td className="text-right">{ numFormat(props.v.amount) }</td>
            <td>{ props.v.isCostToCost ? "Yes" : "No" }</td>
            <td className="text-right">{ numFormat(props.v.persenPpn) }</td>
            <td>{ props.v.fakturNo ? props.v.fakturNo : "-" }</td>
            <td>{ props.v.kendaraanNopol ? props.v.kendaraanNopol : "-" }</td>
            <td>{ props.v.fakturNo ? props.v.fakturNo : "-" }</td>
        </tr>
    )
}