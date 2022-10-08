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
import { Dropdown, Pagination } from 'react-bootstrap'

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
    top: '20%',
    left: '5%',
    bgcolor: 'background.paper', 
    p: 1,
    maxWidth: 1300,
    maxHeight: 600,
    boxShadow: 24,
    borderRadius: 1,
}

const selectedStyle = { bgcolor: (theme) => theme.palette.primary.main }

const ModalListShipmentOrderInvoice = (props) => {
    // const [dataList, setDataList] = useState(dummy)
    const [selectedData, setSelectedData] = useState({})
    const [rowsCount, setRowsCount] = useState(50)
    const [numPage, setNumPage] = useState(1)
    let identifier = 'id'
    if(props.type === 'contact') identifier = 'contactId'

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

    const renderPagination = () => {
        let MaxPage = 1
        if(props.bodyData.length > 0) {
            // MaxPage = Math.ceil( props.bodyData.length / rowsCount )
            MaxPage = props.maxPage
        }
        if (numPage === 1 && numPage !== MaxPage) {
          return (
            <div style={{ display: 'inline-block' }}>
              <Pagination>
                <Pagination.Item active>
                  {numPage}
                </Pagination.Item>
                <Pagination.Next onClick={() => { props.fetchData(rowsCount, 2); setNumPage(numPage + 1) }} />
              </Pagination>
            </div>
          )
        } else if (numPage === 1 && numPage === MaxPage) {
          return (
            <div style={{ display: 'inline-block' }}>
              <Pagination>
                <Pagination.Item active>
                  {numPage}
                </Pagination.Item>
              </Pagination>
            </div>
          )
        } else if (numPage === MaxPage) {
          return (
            <div style={{ display: 'inline-block' }}>
              <Pagination>
                <Pagination.Prev onClick={() => { props.fetchData(rowsCount, numPage - 1); setNumPage(numPage - 1) }} />
                <Pagination.Item active>
                  {numPage}
                </Pagination.Item>
              </Pagination>
            </div>
          )
        } else {
          return (
            <div style={{ display: 'inline-block' }}>
              <Pagination>
                <Pagination.Prev onClick={() => { props.fetchData(rowsCount, numPage - 1); setNumPage(numPage - 1) }} />
                <Pagination.Item active>
                  {numPage}
                </Pagination.Item>
                <Pagination.Next onClick={() => { props.fetchData(rowsCount, numPage + 1); setNumPage(numPage + 1) }} />
              </Pagination>
            </div>
          )
        }
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
                    <Box sx={{ border: 1, borderRadius: 1, p: 1, overflow: 'hidden', maxHeight: 450 }}>
                        <TableContainer component={Paper} sx={{ maxHeight: 390 }}>
                            <Table sx={{ minWidth: 650 }} aria-label="sticky table" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {
                                          props.headersData.length > 0
                                          ?
                                            props.headersData.map((el, index) => {
                                              return (
                                                <TableCell key={index}>{el.text}</TableCell>
                                              )
                                            })
                                          :
                                          <div>
                                            <TableCell>Shipment Order</TableCell>
                                            <TableCell>Principle</TableCell>
                                            <TableCell>ETD</TableCell>
                                            <TableCell>ETA</TableCell>
                                            <TableCell>Shipper</TableCell>
                                            <TableCell>Agent</TableCell>
                                          </div>
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                  <TableRow>
                                    {
                                      props.headersData.map((el, index) => {
                                        return (
                                          <TableCell key={index}>
                                            <input  className="form-control col-search-form border-infoss" />
                                          </TableCell>
                                        )
                                      })
                                    }
                                  </TableRow>
                                    {   
                                        props.bodyData.length > 0
                                        ?
                                        props.bodyData.map(el => {
                                            return (
                                                <TableRow key={el[identifier]} onClick={() => handleSelect(el)} sx={selectedData[identifier] === el[identifier] ? selectedStyle : {} }>
                                                    {
                                                      props.headersData.map((elHeaders, index) => {
                                                        return (
                                                          <TableCell key={index}>{el[elHeaders.column]}</TableCell>
                                                        )
                                                      })
                                                    }
                                                </TableRow>
                                            )
                                        })
                                        :
                                        <TableRow>
                                            <TableCell colSpan={6} sx={{ textAlign: 'center' }}>Data Empty</TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className='row mt-2'>
                        <div>
                            <div>
                                <div className='mx-4' style={{ display: 'inline-block' }}>
                                    {renderPagination()}
                                </div>

                                <Dropdown style={{ display: 'inline-block' }} className='mx-2'>
                                    <Dropdown.Toggle variant="outline-infoss sm" id="dropdown-basic">
                                        {rowsCount} Rows
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className='dropdown-list' onClick={() => { setRowsCount(50); setNumPage(1); props.fetchData(50, 1) }}>50 Rows</Dropdown.Item>
                                        <Dropdown.Item className='dropdown-list' onClick={() => { setRowsCount(100); setNumPage(1); props.fetchData(100, 1) }}>100 Rows</Dropdown.Item>
                                        <Dropdown.Item className='dropdown-list' onClick={() => { setRowsCount(150); setNumPage(1); props.fetchData(150, 1) }}>150 Rows</Dropdown.Item>
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

export default ModalListShipmentOrderInvoice
