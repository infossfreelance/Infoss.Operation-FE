import React, { useMemo, useState, useEffect } from 'react';
import Table1 from '../../../components/tables/Table1';
import "jspdf-autotable";
import Moment from 'moment';
import GeneralButton from '../../../components/GeneralButton';
import ButtonService from '../../../services/ButtonService';
import swal from 'sweetalert';
import { Box } from '@mui/system';
import { Container } from '@mui/material';
import ApiService from '../../../services/ApiService';
import CreateEditJobtype from './CreateEditJobtype';
import boxStyles from '../../Styles/boxStyles';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ActionButton from '../../../components/ActionButton';

const ListJobtype = () => {
  const [data, setData] = useState([]);
  const [titleModal, setTitleModal] = useState('');
  const title = 'MASTER JOB TYPE'
  const [isModal, setIsModal] = useState(false);
  const param = "jobtype/";
  const [id, setId] = useState(0);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleAdd = () => {
    setId(0);
    setCode('');
    setName('');
    handleClick();
    setTitleModal('Add');
  }

  const toggleEdit = (id) => {
    ApiService.getDataById(param, id).then((res) => {
      if (res !== null) {
        setCode(res.data.code);
        setName(res.data.name);
      }
    });
    setId(id);
    setIsModal(true);
    setTitleModal('Edit');
  }
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setIsLoading(true);
    ApiService.getAll(param).then((res) => {
      var result = res.data.filter(obj => {
        return obj.rowStatus === 'ACT'
      })
      setData(result);
      setIsLoading(false);
    }).catch(() => {
      setErrorMessage("Unable to fetch data list");
      setIsLoading(false);
    });
  }

  const ReloadData = () => {
    getData();
    swal({
      title: title,
      text: "Reload Data!",
      icon: "success",
      button: "Ok",
    });
  }

  const DeleteData = (id) => {
    ButtonService.DeleteData(param, id);
  }

  const PrintData = () => {
    var content = document.getElementById("tabel");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  }
  const ExportPDF = () => {
    ButtonService.ExportPDF(data, title);
  }

  const ExportExcel = () => {
    ButtonService.ExportExcel(data, title);
  }

  const handleClick = () => {
    if (isModal === false) {
      setIsModal(true);
    } else {
      setIsModal(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: title,
        Footer: "",
        columns: [
          {
            Header: "Code",
            accessor: "code"
          },
          {
            Header: "Job Type",
            accessor: "name"
          },
          {
            Header: "Entry Date",
            accessor: "createdOn",
            Cell: (props) => {
              const custom_date = Moment(props.value).format('DD MMM YYYY');
              return <span>{custom_date}</span>
            }

          },
          {
            Header: "Action",
            accessor: "id",
            Cell: (props) => {
              return <>
                <ActionButton props={props.value} toggleEdit={toggleEdit} DeleteData={DeleteData} />
              </>
            }
          },
        ]
      }
    ],
    []
  );

  const mainContainer = (
    <Table1 columns={columns} data={data} />
  );
  return (
    <>
      <Container maxWidth={false}>
        <GeneralButton ReloadData={ReloadData} toggleAdd={toggleAdd} toggleEdit={toggleEdit}
          DeleteData={DeleteData} PrintData={PrintData} ExportPDF={ExportPDF} ExportExcel={ExportExcel} />
        <br></br>
        <Box sx={boxStyles} id='tabel' >
          {isLoading ? <LoadingSpinner /> : mainContainer}
          {errorMessage && <div className="error">{errorMessage}</div>}
          <iframe id="ifmcontentstoprint" title='myFrame' style={{ height: '0px', width: '0px', position: 'absolute' }}></iframe>
        </Box>
      </Container>
      <CreateEditJobtype isModal={isModal} handleClick={handleClick} titleModal={titleModal} title={title} param={param} id={id}
        code={code} name={name}
      />
    </>

  )
}

export default ListJobtype