import React, { useState } from 'react';
import {
    numFormat,
    dateFormat
} from '../../helpers/constant';

export default function PRRow(props) {
    const number = (((props.rowsCount * props.NumPage) - props.rowsCount) + props.k)
    return (
        <tr
            onClick={(e) => props.setSelectedData(props.v)}
            className={props.SelectedId ? "bg-infoss text-white" : ( props.v.rowStatus.toLowerCase() == 'del' && "text-danger")}
        >
            <td className='text-center'>{ number }</td>
            <td>{props.v.customerTypeId}</td>
            <td>{props.v.isCostToCost ? "Yes" : "No"}</td>
            <td>{props.v.prContraNo}</td>
            <td>{props.v.reference}</td>
            <td>{props.v.shipmentId}</td>
            <td>-</td>
            <td>{props.v.prStatus}</td>
            <td>{props.v.approveAcc ? "Yes" : "No"}</td>
            <td>-</td>
            <td>{props.v.personalId ? props.v.personalId : props.v.customerId}</td>
            <td className='text-right'>{numFormat(props.v.paymentUSD)}</td>
            <td className='text-right'>{numFormat(props.v.paymentIDR)}</td>
            <td>{ dateFormat(props.v.printedOn)}</td>
            <td>{ props.v.customerId }</td>
            <td>{ props.v.rate }</td>
            <td>{ dateFormat(props.v.exRateDate) }</td>
            <td>{ dateFormat(props.v.createdOn) }</td>
            <td>{ props.v.createdBy }</td>
            <td className='text-right'>{numFormat(props.v.printing)}</td>
            <td className='text-right'>{numFormat(props.v.totalPpnUSD)}</td>
            <td className='text-right'>{numFormat(props.v.totalPpnIDR)}</td>
            <td>{props.v.vendorDN}</td>
            <td>-</td>
            <td>{props.v.approvedMarketing ? "Yes" : "No"}</td>
            <td>-</td>
        </tr>
    )
}