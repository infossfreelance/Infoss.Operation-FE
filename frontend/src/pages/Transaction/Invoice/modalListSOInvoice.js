import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { dateFormat } from '../../../helpers/constant';

// const dummy = [
//     {
//         id: 1,
//         shipmentOrder: 'AMJKT.10.000302-00',
//         principle: '1 - AR',
//         etd: 'Apr 22, 2022',
//         shipper: 'PT. SULFINDO ADIUSAHA',
//         agent: 'PT. ARCHE MITRA GLOBAL'
//     },
//     {
//         id:2,
//         shipmentOrder: 'AMJKT.10.000303-00',
//         principle: '1 - AR',
//         etd: 'Apr 23, 2022',
//         shipper: 'PT. SULFINDO ADIUSAHA',
//         agent: 'PT. ARCHE MITRA GLOBAL'
//     }
// ]

const style = {
    position: 'absolute',
    top: '30%',
    left: '5%',
    bgcolor: 'background.paper', 
    p: 1,
    maxWidth: 1300,
    maxHeight: 500,
    boxShadow: 24,
    borderRadius: 1,
}

const selectedStyle = { bgcolor: (theme) => theme.palette.primary.main }

const ModalListShipmentOrderInvoice = (props) => {
    // const [dataList, setDataList] = useState(dummy)
    const [selectedData, setSelectedData] = useState({})

    const handleSelect = (rowValue) => {
        console.log(rowValue)
        setSelectedData(rowValue)
    }
    
    const handleClose = () => {
        setSelectedData({})
        props.onClose()
    }

    const saveSelectedData = () => {
        props.setSelectedData(selectedData)
        handleClose()
    }

    return (
        <Modal open={props.open} onClose={handleClose}>
            <Grid container spacing={1} flexDirection='column' sx={ style }>
                <Grid item container flex flexDirection='row' justifyContent='space-between' alignItems='center'>
                    <Grid item>
                        <h4>List Shipment Order</h4>
                    </Grid>
                    <Grid item>
                        <Button variant='outlined' onClick={() => handleClose()} sx={{ mr: 1 }}>
                            close
                        </Button>
                        <Button variant='contained' onClick={() => saveSelectedData()}>
                            select data
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Box sx={{ border: 1, borderRadius: 1, p: 1, overflow: 'hidden', maxHeight: 400 }}>
                        <TableContainer component={Paper} sx={{ maxHeight: 390 }}>
                            <Table sx={{ minWidth: 650 }} aria-label="sticky table" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Shipment Order</TableCell>
                                        <TableCell>Principle</TableCell>
                                        <TableCell>ETD</TableCell>
                                        <TableCell>ETA</TableCell>
                                        <TableCell>Shipper</TableCell>
                                        <TableCell>Agent</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {   
                                        props.LSOData.length > 0
                                        ?
                                        props.LSOData.map(el => {
                                            return (
                                                <TableRow key={el.id} onClick={() => handleSelect(el)} sx={selectedData.id === el.id ? selectedStyle : {} }>
                                                    <TableCell>{el.shipmentNo}</TableCell>
                                                    <TableCell>{el.jobOwnerId}</TableCell>
                                                    <TableCell>{dateFormat(el.etd)}</TableCell>
                                                    <TableCell>{dateFormat(el.eta)}</TableCell>
                                                    <TableCell>{el.shipperId}</TableCell>
                                                    <TableCell>{el.agentId}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                        :
                                        <TableRow>
                                            <TableCell colSpan={5}>Data Empty</TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            </Grid>
        </Modal>
    )
}

export default ModalListShipmentOrderInvoice
