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
// import { dateFormat } from '../../../helpers/constant';
import { Dropdown, Pagination } from 'react-bootstrap';
import axios from 'axios';

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


const ModalTableShipmentNo = (props) => {
    const [selectedData, setSelectedData] = useState({})
    const [rowsCount, setRowsCount] = useState(50)
    const [numPage, setNumPage] = useState(1)
    let identifier = 'id'
    const handleClose = () => {
        setSelectedData({})
        setRowsCount(50)
        setNumPage(1)
        props.fetchData(50, 1, false)
        props.onClose()
    }

    const saveSelectedData = () => {
        if (selectedData.id) {
            props.setSelectedData(selectedData)
        }
        handleClose()
    }

    const renderTitle = () => {
        if (props.type === 'listShipmentOrder') {
            return (<h4>List Shipment Order</h4>)
        }
    }

    const renderPagination = () => {
        let MaxPage = 1;
        if (props.bodyData?.length > 0) {
            MaxPage = props.maxPage
        }
        if (numPage === 1 && numPage !== MaxPage) {
            return (
                <div style={{ display: 'inline-block' }}>
                    <Pagination>
                        <Pagination.Item active>
                            {numPage}
                        </Pagination.Item>
                        <Pagination.Next
                            onClick={() => {
                                props.fetchData(rowsCount, 2, false)
                                setNumPage(numPage + 1)
                            }}
                        />
                    </Pagination>
                </div>
            )
        } else if (numPage === 1 && numPage === MaxPage) {
            return (
                <div style={{ display: 'inline-block' }}>
                    <Pagination>
                        <Pagination.Item active>{numPage}</Pagination.Item>
                    </Pagination>
                </div>
            )
        } else if (numPage === MaxPage) {
            return (
                <div style={{ display: 'inline-block' }}>
                    <Pagination>
                        <Pagination.Prev
                            onClick={() => {
                                props.fetchData(rowsCount, numPage - 1, false);
                                setNumPage(numPage - 1);
                            }} />
                        <Pagination.Item active>{numPage}</Pagination.Item>
                    </Pagination>
                </div>
            )
        } else {
            return (
                <div style={{ display: 'inline-block' }}>
                    <Pagination>
                        <Pagination.Prev
                            onClick={() => {
                                props.fetchData(rowsCount, numPage - 1, false);
                                setNumPage(numPage - 1);
                            }}
                        >
                            <Pagination.Item active>{numPage}</Pagination.Item>
                            <Pagination.Next
                                onClick={() => {
                                    props.fetchData(rowsCount, numPage + 1, false);
                                    setNumPage(numPage + 1);
                                }}
                            />
                        </Pagination.Prev>
                    </Pagination>
                </div>
            )
        }
    }

    const filterTable = (key, val) => {
        // console.log('key', key);
        // console.log('value', val);
    };

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
                                        {props.headersData.length > 0 ? (
                                            props.headersData.map((el, index) => {
                                                return <TableCell key={index}>{el.text}</TableCell>;
                                            })
                                        ) : (
                                            <>
                                                <TableCell>Shipment Order</TableCell>
                                                <TableCell>Principle</TableCell>
                                                <TableCell>ETD</TableCell>
                                                <TableCell>ETA</TableCell>
                                                <TableCell>Shipper</TableCell>
                                                <TableCell>Agent</TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
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
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className="row mt-2">
                            <div>
                                <div>
                                    <div className="mx-4" style={{ display: 'inline-block' }}>
                                        {renderPagination()}
                                    </div>
                                    <Dropdown style={{ display: 'inline-block' }}>
                                        <Dropdown.Toggle
                                            variant="outline-infoss sm"
                                            id="dropdown-basic"
                                        >
                                            {rowsCount} Rows
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                className="dropdown-list"
                                                onClick={() => {
                                                    setRowsCount(50)
                                                    setNumPage(1)
                                                    props.fetchData(50, 1, false)
                                                }}
                                            >
                                                50 Rows
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                className="dropdown-list"
                                                onClick={() => {
                                                    setRowsCount(100);
                                                    setNumPage(1);
                                                    props.fetchData(100, 1, false);
                                                }}
                                            >
                                                100 Rows
                                            </Dropdown.Item>
                                            <Dropdown.Item className="dropdown-list" onClick={() => { 
                                                setRowsCount(150)
                                                setNumPage(1)
                                                props.fetchData(150, 1, false)
                                            }}>
                                                150 Rows
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </Modal>
    )

}
export default ModalTableShipmentNo