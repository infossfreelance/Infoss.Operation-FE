import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Pagination, Table} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';
import CachedIcon from '@mui/icons-material/Cached';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {API_URL, dateFormat} from '../../../helpers/constant';
import LoadingSpinner from '../../../components/LoadingSpinner';

const EstimateProfitLossPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  const [EPLData, setEPLData] = useState([]);
  const [MaxPage, setMaxPage] = useState('');
  const [NumPage, setNumPage] = useState(1);
  const [totalRows, setTotalRows] = useState(5);
  const [rowsCount, setRowsCount] = useState(50);
  const [SelectedData, setSelectedData] = useState({});
  const [EPLDataMap, setEPLDataMap] = useState([]);
  const [noJob, setNoJob] = useState(true);
  const [columnData, setColumnData] = useState([]);
  const [headersData, setHeadersData] = useState([]);
  const [filterJson, setFilterJson] = useState({});
  const [filterArr, setFilterArr] = useState([]);
  const [openModalApproveMng, setOpenModalApproveMng] = useState(false);

  const ErrorAlert = (string, isError = false) => {
    let icon = 'warning';
    let title = 'Warning';
    if (isError === true) {
      icon = 'error';
      title = 'Something went wrong';
    }
    Swal.fire({
      icon,
      title,
      text: string,
      customClass: {
        confirmButton: 'btn btn-infoss px-4',
      },
    });
  };

  useEffect(() => {
    getData(NumPage, rowsCount);
  }, []);

  const getData = (pageNumber = 1, pageSize = 10, filter = []) => {
    setIsLoading(true);
    const payload = {
      userCode: 'luna',
      countryId: 101,
      companyId: 32,
      branchId: 12,
      filters: filter,
    };
    axios
      .post(
        API_URL +
          `PaymentRequest/PaymentRequest/PostByPage?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        payload
      )
      .then((response) => {
        // setIsLoading(false);
        // setMaxPage(response.data.totalPage);
        // response.data.data.paymentRequestHeader.length > 0 &&
        //   setEPLDataMap(response.data.data.paymentRequestHeader);
        // setEPLData(response.data.data.paymentRequestHeader);
        // setColumnData(response.data.data.columns.headerColumns);
        if (response.data.code === 200) {
          setSelectedData({});
          setEPLData(response.data.data.paymentRequest);
          setColumnData(response.data.data.paymentRequest);
          let temp = response.data.data.paymentRequest;
          let indexed = temp.map((el, index) => {
            let indexedTemp = {
              ...el,
              index,
            };
            return indexedTemp;
          });
          setEPLDataMap(indexed);
          setHeadersData(response.data.data.columns.headerColumns);
          setTotalRows(response.data.totalRowCount);
          setIsLoading(false);
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        ErrorAlert(error.toString(), true);
      });
  };

  //   const getDataFilter = (param, value) => {
  //     const payload = {
  //       userCode: 'string',
  //       countryId: 101,
  //       companyId: 32,
  //       branchId: 12,
  //       filter: [
  //         {
  //           field: param,
  //           data: value,
  //         },
  //       ],
  //     };
  //     axios
  //       .post(
  //         API_URL +
  //           `PaymentRequest/PostByPage?pageNumber=${NumPage}&pageSize=${rowsCount}`,
  //         payload
  //       )
  //       .then((response) => {
  //         setMaxPage(response.data.totalPage);
  //         response.data.data.length > 0 && setEPLDataMap(response.data.data);
  //         setEPLData(response.data.data);
  //       })
  //       .catch(function (error) {
  //         setIsLoading(false);
  //         NotifAlert('Something Went Wrong!', 'error');
  //       });
  //   };

  const filterTable = (key, val) => {
    let filter = filterJson;
    let temp = {
      field: key,
      data: val,
    };
    let arr = [];

    if (!filter[key]) {
      filter[key] = temp;
      setFilterJson(filter);
    } else {
      filter[key].data = val;
      setFilterJson(filter);
    }

    if (filter[key].data.length === 0) {
      delete filter[key];
      setFilterJson(filter);
    }

    for (const key in filter) {
      arr.push(filter[key]);
    }

    setFilterArr(arr);
  };

  const handleReload = () => {
    getData();
    NotifAlert('Reload Success!', 'success');
  };

  const handleAddPage = () => {
    if (noJob === false) {
      NotifAlert('Please Complete Other Payment First!', 'warning');
    } else {
      history('/booking/payment-request/create');
    }
  };

  const handleEdit = () => {
    if (SelectedData.id === undefined) {
      ErrorAlert('Please Select Data!', 'Warning');
    } else {
      if (SelectedData.rowStatus === 'DEL') {
        ErrorAlert('Record Has Been Deleted');
      }
      if (SelectedData.printing === 0) {
        history('/booking/payment-request/edit/' + SelectedData.id);
      } else {
        Swal.fire({
          icon: 'question',
          title: 'Payment Request has been printed!',
          text: 'Edit will make contra and new Payment Request automatically!',
          showCancelButton: true,
          showDenyButton: true,
          cancelButtonText: 'Cancel',
          confirmButtonText: 'Ok',
          denyButtonText: `View Only`,
          customClass: {
            confirmButton: 'btn btn-infoss px-4',
            cancelButton: 'btn btn-outline-infoss px-4',
            denyButton: 'btn btn-infoss px-4',
          },
        }).then((result) => {
          if (result.isConfirmed === true) {
            history('/booking/payment-request/edit/' + SelectedData.id);
          } else if (result.isDenied === true) {
            history('/booking/payment-request/view/' + SelectedData.id);
          }
        });
      }
    }
  };

  const handleDelete = () => {
    if (SelectedData.id === undefined) {
      NotifAlert('Please Select Data!', 'warning');
      return false;
    }

    if (SelectedData.deleted === 1) {
      NotifAlert('Data Already Deleted!', 'error');
      return false;
    }

    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to delete the selected data?',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-infoss px-4',
        cancelButton: 'btn btn-outline-infoss px-4',
      },
    }).then((result) => {
      if (result.value) {
        const payload = {
          userCode: 'string',
          countryId: 101,
          companyId: 32,
          branchId: 12,
        };
        axios
          .put(
            API_URL +
              `paymentRequest/paymentRequest/Delete?id=${SelectedData.id}`,
            payload
          )
          .then((response) => {
            setSelectedData({});
            NotifAlert('Data Deleted!', 'success');
            getData();
          })
          .catch(function (error) {
            setIsLoading(false);
            NotifAlert('Something Went Wrong!', 'error');
          });
      }
    });
  };

  const handleApprove = (appv_id) => {
    if (SelectedData.id === undefined) {
      NotifAlert('Please Select Data!', 'warning');
      return false;
    } else {
      setOpenModalApproveMng(true);
    }

    // if (SelectedData.deleted === 0) {
    //   NotifAlert('Data Already Approved!', 'error');
    //   return false;
    // }

    // Swal.fire({
    //   icon: 'question',
    //   title: 'Are you sure you want to Multi Approval - Payment Request?',
    //   showCancelButton: true,
    //   confirmButtonText: 'Ok',
    //   cancelButtonText: 'Cancel',
    //   customClass: {
    //     confirmButton: 'btn btn-infoss px-4',
    //     cancelButton: 'btn btn-outline-infoss px-4',
    //   },
    // }).then((result) => {
    //   if (result.value) {
    //     const payload = {
    //       id: SelectedData.id,
    //     };
    //     axios
    //       .put(
    //         API_URL +
    //           'estimateProfitLoss/Estimateprofitloss/ApiV1/Header/UnDelete',
    //         payload
    //       )
    //       .then((response) => {
    //         setSelectedData({});
    //         NotifAlert('Data Un-Deleted!', 'success');
    //         getData();
    //       })
    //       .catch(function (error) {
    //         setIsLoading(false);
    //         NotifAlert('Something Went Wrong!', 'error');
    //       });
    //   }
    // });
  };

  const renderPagination = () => {
    let MaxPage = 1;
    if (EPLData.length > 0) {
      MaxPage = Math.ceil(totalRows / rowsCount);
      if (NumPage === 1 && NumPage !== MaxPage) {
        return (
          <div style={{display: 'inline-block'}}>
            <Pagination>
              <Pagination.Item active>{NumPage}</Pagination.Item>
              <Pagination.Next
                onClick={() => {
                  getData(2, rowsCount);
                  setNumPage(NumPage + 1);
                }}
              />
            </Pagination>
          </div>
        );
      }
    } else if (NumPage === 1 && NumPage === MaxPage) {
      return (
        <div style={{display: 'inline-block'}}>
          <Pagination>
            <Pagination.Item active>{NumPage}</Pagination.Item>
          </Pagination>
        </div>
      );
    } else if (NumPage === MaxPage) {
      return (
        <div style={{display: 'inline-block'}}>
          <Pagination>
            <Pagination.Prev
              onClick={() => {
                getData(NumPage - 1, rowsCount);
                setNumPage(NumPage - 1);
              }}
            />
            <Pagination.Item active>{NumPage}</Pagination.Item>
          </Pagination>
        </div>
      );
    } else {
      return (
        <div style={{display: 'inline-block'}}>
          <Pagination>
            <Pagination.Prev
              onClick={() => {
                getData(NumPage - 1, rowsCount);
                setNumPage(NumPage - 1);
              }}
            />
            <Pagination.Item active>{NumPage}</Pagination.Item>
            <Pagination.Next
              onClick={() => {
                getData(NumPage + 1, rowsCount);
                setNumPage(NumPage + 1);
              }}
            />
          </Pagination>
        </div>
      );
    }
  };

  const NotifAlert = (text, color) => {
    setTextAlert(text);
    setColorAlert(color);
    setOpenAlert(true);
  };

  const PrintData = () => {
    var content = document.getElementById('tabel');
    var pri = document.getElementById('ifmcontentstoprint').contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const [OpenAlert, setOpenAlert] = useState(false);
  const [TextAlert, setTextAlert] = useState('');
  const [ColorAlert, setColorAlert] = useState('');
  const vertical = 'top';
  const horizontal = 'right';

  return (
    <section>
      <Snackbar
        open={OpenAlert}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{vertical, horizontal}}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity={ColorAlert}
          sx={{width: '100%'}}
          className="p-3"
        >
          {TextAlert}
        </Alert>
      </Snackbar>

      <div className="mt-2">
        <h3>Payment Request</h3>
      </div>

      <div className="row mt-3">
        <div className="col-9">
          <Button
            variant="outline-infoss"
            className="me-2 mb-2"
            onClick={() => handleReload()}
          >
            <CachedIcon /> Reload Data
          </Button>
          <Button
            variant="outline-infoss"
            className="me-2 mb-2"
            onClick={() => handleAddPage()}
          >
            <AddToPhotosIcon /> Add New
          </Button>
          <Button
            variant="outline-infoss"
            className="me-2 mb-2"
            onClick={() => handleEdit()}
          >
            <ModeEditOutlineIcon /> Edit Data
          </Button>
          <Button
            variant="outline-infoss"
            className="me-2 mb-2"
            onClick={() => handleDelete()}
          >
            <DeleteForeverIcon /> Delete
          </Button>
          <Button variant="outline-infoss" className="me-2 mb-2">
            <PrintIcon /> Print EPL
          </Button>
          <Button
            variant="outline-infoss"
            className="me-2 mb-2"
            onClick={() => handleApprove(1)}
          >
            <CheckCircleIcon /> Approve By Acc Mgr
          </Button>
          <Button
            variant="outline-infoss"
            className="me-2 mb-2"
            onClick={() => handleApprove(2)}
          >
            <CheckCircleIcon /> Open Approve By Acc Mgr
          </Button>
          <Button
            variant="outline-infoss"
            className="me-2 mb-2"
            onClick={() => handleApprove(3)}
          >
            <CheckCircleIcon /> Approve General PR
          </Button>
          <Button
            variant="outline-infoss"
            className="me-2 mb-2"
            onClick={() => handleApprove(4)}
          >
            <CheckCircleIcon /> Approve MKT
          </Button>
        </div>
        <div className="col-3 row">
          <div className="col-5 fw-bolder mt-1 text-right">
            <span>Job:</span>
          </div>
          <div className="col-7 text-right">
            <select className="form-control border-infoss">
              <option value="1">Sea Export</option>
              <option value="2">Sea Import</option>
              <option value="3">Air Export</option>
              <option value="4">Air Import</option>
              <option value="5">PPJK Sea Export</option>
              <option value="6">PPJK Sea Import</option>
              <option value="7">PPJK Air Export</option>
              <option value="8">PPJK Air Import</option>
              <option value="9">Domestic</option>
              <option value="10">Trucking</option>
            </select>
          </div>
        </div>
      </div>

      <Grid
        item
        xs={12}
        style={{
          maxWidth: '97vw',
          borderStyle: 'groove',
          borderRadius: '5px',
          marginTop: '10px',
        }}
      >
        <div
          className="mt-3 border rounded-10 p-2 table-responsive"
          style={{maxHeight: '500px'}}
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Table className="table-borderless">
                <thead
                  className="text-center text-infoss"
                  style={{
                    position: 'sticky',
                    top: '-8px',
                    backgroundColor: '#fff',
                    boxShadow: '0 1px #dee2e6, 0 -1px #dee2e6',
                  }}
                >
                  <tr>
                    {headersData.map((el, index) => {
                      return <td key={index}>{el.text}</td>;
                    })}
                  </tr>
                </thead>
                <tbody className="text-muted">
                  <tr>
                    {headersData.map((el, index) => {
                      if (el.text === 'RowStatus') {
                        return (
                          <td key={index}>
                            <select
                              className="form-control col-search-form border-infoss"
                              onChange={(e) =>
                                filterTable(el.column, e.target.value)
                              }
                            >
                              <option value="ALL">All</option>
                              <option value="DEL">Yes</option>
                              <option value="ACT">No</option>
                            </select>
                          </td>
                        );
                      } else {
                        if (el.dataType === 'boolean') {
                          return (
                            <td key={index}>
                              <select
                                className="form-control col-search-form border-infoss"
                                onChange={(e) =>
                                  filterTable(el.column, e.target.value)
                                }
                                style={{minWidth: '50px'}}
                              >
                                <option value="ALL">All</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            </td>
                          );
                        } else if (el.dataType === 'bit') {
                          return (
                            <td key={index}>
                              <select
                                className="form-control col-search-form border-infoss"
                                onChange={(e) =>
                                  filterTable(el.column, e.target.value)
                                }
                                style={{minWidth: '50px'}}
                              >
                                <option value="ALL">All</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            </td>
                          );
                        } else {
                          return (
                            <td key={index}>
                              <input
                                className="form-control col-search-form border-infoss"
                                onChange={(e) =>
                                  filterTable(el.column, e.target.value)
                                }
                                style={{minWidth: '100px'}}
                              />
                            </td>
                          );
                        }
                      }
                    })}
                  </tr>
                  {EPLDataMap.length > 0 ? (
                    EPLDataMap.map((el, index) => {
                      let tempStyle = 'text-dark';
                      if (SelectedData.id === el.id) {
                        tempStyle = 'bg-infoss text-white';
                      } else if (el.rowStatus === 'DEL') {
                        tempStyle = 'text-danger';
                      } else if (el.printing > 0) {
                        tempStyle = 'text-secondary';
                      }
                      return (
                        <tr
                          key={index}
                          onClick={() => setSelectedData(el)}
                          className={tempStyle}
                        >
                          {headersData.map((headersEl, indexHeaders) => {
                            let temp = el[headersEl.column];
                            if (headersEl.dataType === 'datetime') {
                              if (
                                el[headersEl.column] !==
                                  '0001-01-01T00:00:00' &&
                                temp !== undefined
                              ) {
                                temp = dateFormat(el[headersEl.column]);
                              } else {
                                temp = '';
                              }
                            }

                            if (el[headersEl.column] === true) {
                              temp = 'Yes';
                            } else if (el[headersEl.column] === false) {
                              temp = 'No';
                            }

                            if (headersEl.column === 'rowStatus') {
                              if (el.rowStatus === 'DEL') {
                                temp = 'Yes';
                              } else {
                                temp = 'No';
                              }
                            }
                            return <td key={indexHeaders}>{temp}</td>;
                          })}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={15} className="text-center py-3 text-muted">
                        Data Empty
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <div className="row mt-2">
                <div>
                  <div className="mx-4" style={{display: 'inline-block'}}>
                    {renderPagination()}
                  </div>

                  <Dropdown style={{display: 'inline-block'}} className="mx-2">
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
                          getData(1, 5);
                          setRowsCount(5);
                          setNumPage(1);
                        }}
                      >
                        5 Rows
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-list"
                        onClick={() => {
                          getData(1, 50);
                          setRowsCount(50);
                          setNumPage(1);
                        }}
                      >
                        50 Rows
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-list"
                        onClick={() => {
                          getData(1, 100);
                          setRowsCount(100);
                          setNumPage(1);
                        }}
                      >
                        100 Rows
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-list"
                        onClick={() => {
                          getData(1, 150);
                          setRowsCount(150);
                          setNumPage(1);
                        }}
                      >
                        150 Rows
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </>
          )}
        </div>
      </Grid>
      <Paper></Paper>
    </section>
  );
};

export default EstimateProfitLossPage;
