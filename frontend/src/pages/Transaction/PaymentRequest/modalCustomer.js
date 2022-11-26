import React, {useState} from 'react';
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
import {Dropdown, Pagination} from 'react-bootstrap';
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

const selectedStyle = {bgcolor: (theme) => theme.palette.primary.main};
const headersTemplateCustomerByCustomerTypeId = [
  {
    column: 'code',
    text: 'Code',
    format: '',
  },
  {
    column: 'name',
    text: 'Name',
    format: '',
  },
];

const DataDummyCustomer = [
  {
    customerId: 6852,
    customerName: null,
    customerTypeId: 4,
  },
  {
    customerId: 7328,
    customerName: 'TES',
    customerTypeId: 6,
  },
  {
    customerId: 6852,
    customerName: 'TES2',
    customerTypeId: 4,
  },
  {
    customerId: 6852,
    customerName: 'TES3',
    customerTypeId: 4,
  },
  {
    customerId: 6852,
    customerName: 'TES4',
    customerTypeId: 4,
  },
  {
    customerId: 6852,
    customerName: null,
    customerTypeId: 4,
  },
];

const ModalCustomer = (props) => {
  console.log(props, '<<<propsData');
  const [selectedData, setSelectedData] = useState({});
  const [stateSelectedData, setStateSelectedData] = useState({});
  const [rowsCount, setRowsCount] = useState(50);
  const [numPage, setNumPage] = useState(1);

  const handleClose = () => {
    setStateSelectedData({});
    // setNumPage(1);
    // props.fetchData(50, 1);
    props.onClose();
  };

  const filterTable = (key, val) => {
    // console.log('key', key);
    // console.log('value', val);
  };

  const saveSelectedData = () => {
    if (selectedData.id) {
      props.setSelectedData(selectedData);
    }
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
          <Grid item>{'List Customer'}</Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => handleClose()}
              sx={{mr: 1}}
            >
              close
            </Button>
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
            <TableContainer component={Paper} sx={{maxHeight: 390}}>
              <Table
                sx={{minWidth: 650}}
                aria-label="sticky table"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Kode</TableCell>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {headersTemplateCustomerByCustomerTypeId.map(
                      (el, index) => {
                        return (
                          <TableCell
                            key={index}
                            onChange={(e) => {
                              filterTable(el.column, el.target.value);
                            }}
                          >
                            <input className="form-control col-search-form border-infoss" />
                          </TableCell>
                        );
                      }
                    )}
                  </TableRow>
                  {/* {props.state === 'AMJKT.10.000365-00' ? (
                    DataDummyCustomer.length > 0 ? (
                      DataDummyCustomer.map((el) => {
                        return (
                          <TableRow key={el.customerId}>
                            <TableCell>{el.customerId}</TableCell>
                            <TableCell>{el.customerName}</TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} sx={{textAlign: 'center'}}>
                          Data Empty
                        </TableCell>
                      </TableRow>
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} sx={{textAlign: 'center'}}>
                        Data Empty
                      </TableCell>
                    </TableRow>
                  )} */}
                  {props.bodyData?.length > 0 ? (
                    props.bodyData?.map((el, index) => {
                      return (
                        <TableRow
                          // eslint-disable-next-line no-undef
                          key={el[customerId]}
                          onClick={() => setSelectedData(el)}
                        ></TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} sx={{textAlign: 'center'}}>
                        Data Empty
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalCustomer;
