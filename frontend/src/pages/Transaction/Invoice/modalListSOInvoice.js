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

const dummy = [
    {
        id: 1,
        shipmentOrder: 'AMJKT.10.000302-00',
        principle: '1 - AR',
        etd: 'Apr 22, 2022',
        shipper: 'PT. SULFINDO ADIUSAHA',
        agent: 'PT. ARCHE MITRA GLOBAL'
    },
    {
        id:2,
        shipmentOrder: 'AMJKT.10.000303-00',
        principle: '1 - AR',
        etd: 'Apr 23, 2022',
        shipper: 'PT. SULFINDO ADIUSAHA',
        agent: 'PT. ARCHE MITRA GLOBAL'
    }
]

const style = {
    position: 'absolute',
    top: '30%',
    left: '10%',
    bgcolor: 'background.paper', 
    p: 1,
    width: 1300,
    boxShadow: 24,
    borderRadius: 1
}

const selectedStyle = { bgcolor: (theme) => theme.palette.primary.main }

const ModalListShipmentOrderInvoice = (props) => {
    const [dataList, setDataList] = useState(dummy)
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
                    <Box sx={{ border: 1, borderRadius: 1, p: 1 }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Shipment Order</TableCell>
                                        <TableCell>Principle</TableCell>
                                        <TableCell>ETD / ETA</TableCell>
                                        <TableCell>Shipper</TableCell>
                                        <TableCell>Agent</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        dataList.map((el, index) => {
                                            return (
                                                <TableRow key={el.id} onClick={() => handleSelect(el)} sx={selectedData.id === el.id ? selectedStyle : {} }>
                                                    <TableCell>{el.shipmentOrder}</TableCell>
                                                    <TableCell>{el.principle}</TableCell>
                                                    <TableCell>{el.etd}</TableCell>
                                                    <TableCell>{el.shipper}</TableCell>
                                                    <TableCell>{el.agent}</TableCell>
                                                </TableRow>
                                            )
                                        })
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
