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
import { API_URL, API_URL_MASTER } from '../../../helpers/constant';
import { Dropdown, Pagination } from 'react-bootstrap'
import axios from 'axios'

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

const ModalTableInvoice = (props) => {
    const [selectedData, setSelectedData] = useState({})
    const [rowsCount, setRowsCount] = useState(50)
    const [numPage, setNumPage] = useState(1)
    let identifier = 'id'
    if(props.type === 'contact') identifier = 'contactId'
    
    const handleClose = () => {
        setSelectedData({})
        setRowsCount(50)
        setNumPage(1)
        props.fetchData(50, 1)
        props.onClose()
    }

    const saveSelectedData = () => {
      if(selectedData.id || selectedData.contactId) {
        props.setSelectedData(selectedData)

        if(props.contactType) {
          props.setSelectedData(selectedData, props.contactType)
        }

        if(props.type === 'shipment') {
          props.setInvoiceDetails([])
          props.setDetailMap([])
          props.setDetailSequence(0)
          props.setPaymentIDR(0)
          props.setPaymentUSD(0)
          props.setTotalVATIDR(0)
          props.setTotalVATUSD(0)
          props.setAllVat(0)

          let body = {
            "userCode": "luna",
            "countryId": 101,
            "companyId": 32,
            "branchId": 12
          }

          //FETCH CUSTOMER DATA
          axios.post(
            `${API_URL}shipmentorder/shipmentorder/PostById?id=${selectedData.id}`,
            body
          ).then(res => {
            if(res.data.code === 200) {
              props.setId(res.data.data.shipmentOrder.shipperId)
              props.setName(res.data.data.shipmentOrder.shipperName)
              props.setAddress(res.data.data.shipmentOrder.shipperAddress)
              props.setAgentId(res.data.data.shipmentOrder.agentId)
              props.setAgentName(res.data.data.shipmentOrder.agentName)
              props.setAgentAddress(res.data.data.shipmentOrder.agentAddress)
            }
          }).catch(error => console.error(error))

          let tempSelected = {...selectedData}
          //FETCH JOB OWNER ATAU INVHEADER
          axios.post(
            `${API_URL_MASTER}jobowner/jobowner/PostById?id=${tempSelected.jobOwnerId}`,
            body
          ).then(res => {
            if(res.data.code === 200) {
              tempSelected.invHeader = res.data.data.jobOwner.masterCode
              props.setSelectedData(tempSelected)
            }
          }).catch(error => console.error(error))

          //FETCH INVOICE DETAILS FROM EPL
          axios.post(
            `${API_URL}estimateProfitLoss/estimateProfitLoss/PostById?Id=${selectedData.id}`,
            body
          ).then(res => {
            if(res.data.code === 200) {
              let temp = res.data.data.estimateProfitLoss.estimateProfitLossDetails
              props.setDetailSequence(temp[temp.length - 1].sequence)

              let sumUsd = 0
              let sumIdr = 0
              const remapedDetails = temp.map(el => {
                sumUsd += el.amountUSD
                sumIdr += el.amountIDR

                let templateDetail = {
                  "rowStatus": "ACT",
                  "countryId": 101,
                  "companyId": 32,
                  "branchId": 12,
                  id: 0,
                  "invoiceId": 0,
                  "sequence": el.sequence,
                  "debetCredit": props.dcStatus,
                  "accountId": el.accountId,
                  "description": el.description,
                  "type": el.type,
                  "codingQuantity": el.codingQuantity,
                  "quantity": el.quantity,
                  "perQty": el.perQty,
                  "sign": el.sign,
                  "amountCrr": el.amountCrr,
                  "amount": el.amountCrr === 1 ? el.amountIDR : el.amountUSD,
                  "percentVat": 0,
                  "amountVat": 0,
                  "eplDetailId": el.id,
                  "vatId": 0,
                  "idLama": 0,
                  "isCostToCost": el.isCostToCost,
                  "originalUsd": el.originalUsd,
                  "originalRate": el.originalRate,
                  "user": "luna",
                }

                return templateDetail
              })

              props.setPaymentIDR(Number(sumIdr.toFixed(2)))
              props.setPaymentUSD(Number(sumUsd.toFixed(2)))
              
              props.setInvoiceDetails(remapedDetails)
              props.setDetailMap(remapedDetails)
            }
          }).catch(error => console.error(error))
        }

        handleClose()
      }
    }

    const filterTable = (key, val) => {
      console.log('key', key)
      console.log('value', val)
    }

    const renderPagination = () => {
        let MaxPage = 1
        if(props.bodyData.length > 0) {
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

    const renderTitle = () => {
      if(props.type === 'shipment') {
        return (
          <h4>List Shipment Order</h4>
        )
      } else if(props.type === 'contact') {
        return (
          <h4>List Customer</h4>
        )
      } else if(props.type === 'revised') {
        return (
          <h4>List Revised Tax Invoice</h4>
        )
      } else if(props.type === 'storage') {
        return (
          <h4>List Storage</h4>
        )
      } else if(props.type === 'hf') {
        return (
          <h4>List Handling Fee</h4>
        )
      } else {
        return (
          <h4>List Profit Share</h4>
        )
      }
    }

    return (
        <Modal open={props.open} onClose={handleClose}>
            <Grid container spacing={1} flexDirection='column' sx={ style }>
                <Grid item container flex flexDirection='row' justifyContent='space-between' alignItems='center'>
                    <Grid item>
                        {renderTitle()}
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
                    <Box sx={{ border: 1, borderRadius: 1, p: 1, overflow: 'hidden', maxHeight: 450, maxWidth: 1270 }}>
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
                                          <>
                                            <TableCell>Shipment Order</TableCell>
                                            <TableCell>Principle</TableCell>
                                            <TableCell>ETD</TableCell>
                                            <TableCell>ETA</TableCell>
                                            <TableCell>Shipper</TableCell>
                                            <TableCell>Agent</TableCell>
                                          </>
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                  <TableRow>
                                    {
                                      props.headersData.map((el, index) => {
                                        return (
                                          <TableCell key={index} onChange={(e) => filterTable(el.column, e.target.value)}>
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
                                                <TableRow key={el[identifier]} 
                                                onClick={() => setSelectedData(el)} 
                                                sx={selectedData[identifier] === el[identifier] ? selectedStyle : {} }
                                                >
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

export default ModalTableInvoice
