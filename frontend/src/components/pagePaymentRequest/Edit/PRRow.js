import React, { useState } from 'react';
import {
    numFormat,
    dateFormat
} from '../../../helpers/constant';

export default function PRRow(props) {
    const number = (((props.rowsCount * props.NumPage) - props.rowsCount) + props.k)
    return (
        <tr
            onClick={(e) => props.setSelectedData(props.v)}
            className={props.SelectedId ? "bg-infoss text-white" : ( props.v.deleted === 1 && "text-danger")}
        >
            <td className='text-center'>{ number }</td>
            <td>{props.v.shipmentId}</td>
            <td>-</td>
            <td>-</td>
            <td className='text-right'>{numFormat(props.v.estUSDShipCons + props.v.estUSDAgent)}</td>
            <td className='text-right'>{numFormat(props.v.estIDRShipCons + props.v.estIDRAgent)}</td>
            <td className='text-right'>{numFormat(props.v.estUSDShipCons)}</td>
            <td className='text-right'>{numFormat(props.v.estIDRShipCons)}</td>
            <td className='text-right'>{numFormat(props.v.estUSDAgent)}</td>
            <td className='text-right'>{numFormat(props.v.estIDRAgent)}</td>
            <td>{props.v.closeEPL ? "ok" : "-"}</td>
            <td>{props.v.printing}</td>
            <td>{ dateFormat(props.v.printedOn)} </td>
            <td>{ dateFormat(props.v.createdOn) }</td>
            <td>{props.v.createdBy}</td>
            <td>{props.v.createdBy}</td>
            <td>{props.v.createdBy}</td>
            <td>{props.v.createdBy}</td>
            <td>{props.v.createdBy}</td>
            <td>{props.v.createdBy}</td>
            <td>{props.v.createdBy}</td>
            <td>{props.v.createdBy}</td>
            <td>{props.v.createdBy}</td>
            <td>{props.v.createdBy}</td>
            <td>{props.v.createdBy}</td>
            <td>{props.v.createdBy}</td>
        </tr>
    )
}