import { useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { dateFormat } from '../../../helpers/constant';
import { Dropdown, Pagination } from 'react-bootstrap';
import Modal from '@mui/material/Modal'
import { TextField } from "@mui/material";

const style = {
    position: 'absolute',
    top: '20%',
    left: '5%',
    bgcolor: 'background.paper',
    p: 1,
    maxWidth: 1300,
    maxHeight: 600,
    boxShadow: 24,
    borderRadius: 1,
};

const selectedStyle = { bgcolor: (theme) => theme.palette.primary.main };
const handleTemplateCustomerByCostumerTypeId = [ 
    {
        column: 'code',
        text: 'Code',
        format: ''
    },
    { 
        column: 'name',
        text: 'Name',
        format: ''
    }
]


const ModalCustomer = (props) => {
    const [selectedData, setSelectedData] = useState({})
    const [rowsCount, setRowsCount] = useState(50)
    const [numPage, setNumPage] = useState(1)
    let identifier = 'customerId'
    const handleClose = () => {
        setSelectedData({})
        setRowsCount(50)
        setNumPage(1)
        props.onClose()
    }

    const renderTitle = () => {
        if (props.type === 'customer') {
            return (<h4>List Customer</h4>)
        }
    }

    const saveSelectedData = () => {
        if (selectedData.customerId) {
            props.setSelectedData(selectedData)
        }

        handleClose()
    }

    return (
        <Modal open={props.open} onClose={handleClose}>
            <Grid container spacing={1} flexDirection="column" sx={style}>
                <Grid
                    item
                    container
                    flex
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item >
                        {renderTitle()}
                    </Grid>
                    <Grid item >
                        <Button variant="outlined" onClick={() => handleClose()} sx={{ mr: 1 }}>Close</Button>
                        <Button variant="contained" onClick={() => saveSelectedData()}>
                            select data
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Box
                        sx={{
                            border: 1,
                            borderRadius: 1,
                            p: 1,
                            overflow: 'hidden',
                            maxHeight: 450,
                            maxWidth: 1270,
                        }}
                    >
                        <TableContainer component={Paper} sx={{ maxHeight: 390 }}>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="sticky table"
                                stickyHeader
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Code</TableCell>
                                        <TableCell>Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                {/* <TableBody>
                                    <TableRow>
                                        {props.headersData.map((el, index) => {
                                            return (
                                                <TableCell
                                                    key={index}
                                                    onChange={(e) =>
                                                        filterTable(el.column, e.target.value)
                                                    }
                                                >
                                                    <input className="form-control col-search-form border-infoss" />
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                    {
                                        props.bodyData.length > 0 ?
                                            props.bodyData?.map((el, index) => {
                                                return (
                                                    <TableRow key={el[identifier]}
                                                        onClick={() => setSelectedData(el)}
                                                        sx={
                                                            selectedData[identifier] === el[identifier]
                                                                ? selectedStyle
                                                                : {}
                                                        }
                                                    >
                                                        {
                                                            props.headersData.map((elHeaders, index) => {
                                                                return (
                                                                    <TableCell key={index}>
                                                                        {el[elHeaders.column]}
                                                                    </TableCell>
                                                                )
                                                            })
                                                        }

                                                    </TableRow>
                                                )
                                            }) :
                                            <TableRow>
                                                <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                                                    Data Empty
                                                </TableCell>
                                            </TableRow>
                                    }
                                </TableBody> */}
                                <TableBody>
                                    {
                                        handleTemplateCustomerByCostumerTypeId.map((el, index) => { 
                                            return (
                                                <TableCell
                                                    key={index}
                                                    onChange={(e) => { 
                                                        console.log(e)
                                                    }}
                                                    >
                                                    <input className="form-control col-search border-infoss" />
                                                </TableCell>
                                            )
                                        })
                                    }
                                    {
                                        props.bodyData.length > 0 ?
                                        props.bodyData?.map((el, index) => { 
                                            return (
                                                <TableRow key={el[identifier]}
                                                    onClick={() => setSelectedData(el)}
                                                    sx={
                                                       ( selectedData[identifier] === el[identifier] || selectedData[identifier] === props.customerId)
                                                        ?
                                                        selectedStyle: {}
                                                    }
                                                >
                                                    <TableCell>{el.customerId}</TableCell>
                                                    <TableCell>{el.customerName}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                        : 
                                        <TableRow>
                                        <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                                            Data Empty
                                        </TableCell>
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
export default ModalCustomer