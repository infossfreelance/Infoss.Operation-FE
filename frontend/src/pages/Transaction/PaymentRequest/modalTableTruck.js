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
// import { dateFormat } from '../../../helpers/constant';
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

const ModalTableTruck = (props) => {
  const [stateSelectedData, setStateSelectedData] = useState({});
  const {stateRowsCount, setStateRowsCount} = useState(50);
  const [stateNumPage, setStateNumPage] = useState(1);
  let identifier = 'id';

  const handleClose = () => {
    setStateSelectedData({});
    setStateNumPage(1);
    props.fetchData(50, 1);
    props.onClose();
  };

  // SaveSelectedData
  const saveSelectedData = () => {
    if (stateSelectedData.id || stateSelectedData.contactId) {
      props.setStateSelectedData(stateSelectedData);
      handleClose();
    }
  };

  // Render Title from props
  const renderTitle = () => {
    if (props.type === 'truck') {
      return <h4>{'List MRG'}</h4>;
    }
  };

  // FilterTable
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
          <Grid item>{renderTitle()}</Grid>
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
                    {props.headersData.payloadHeaderDummyTruck.length > 0
                      ? props.headersData.payloadHeaderDummyTruck.map(
                          (el, index) => {
                            console.log(el, '<<<element');
                            return <TableCell key={index}>{el.text}</TableCell>;
                          }
                        )
                      : null}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {props.headersData.payloadHeaderDummyTruck.map(
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
                  {props.bodyData.length > 0 ? (
                    props.bodyData.map((el) => {
                      return (
                        <TableRow
                          key={el[identifier]}
                          onClick={() => setStateSelectedData(el)}
                          sx={
                            stateSelectedData[identifier] === el[identifier]
                              ? selectedStyle
                              : {}
                          }
                        >
                          {props.headersData.map((elHeaders, index) => {
                            return (
                              <TableCell key={index}>
                                {`${el[elHeaders.column]}`}
                              </TableCell>
                            );
                          })}
                        </TableRow>
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

export default ModalTableTruck;
