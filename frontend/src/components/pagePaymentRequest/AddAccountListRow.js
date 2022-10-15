import React, { useState } from 'react';

export default function AddAccountListRow(props) {
    return (
        <tr
            key={props.k}
            onClick={(e) => props.setSelectedData(props.v)}
            className={props.selectedId && "bg-infoss text-white"}
        >
            <td>{props.v.id}</td>
            <td>{props.v.name}</td>
        </tr>
    )
}