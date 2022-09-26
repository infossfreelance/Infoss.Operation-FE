import React, { useMemo, useState, useEffect } from 'react';
import Table1 from '../../../components/tables/Table1';
import "jspdf-autotable";
import Moment from 'moment';
import GeneralButton from '../../../components/GeneralButton';
import CreateEditExchangeRate from './CreateEditExchangeRate';
import ButtonService from '../../../services/ButtonService';
import { Box } from '@mui/system';
import {  Container } from '@mui/material';
import ApiService from '../../../services/ApiService';
// import boxStyles from '../../../Styles/boxStyles';
import boxStyles from '../../Styles/boxStyles';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ActionButton from '../../../components/ActionButton';
// import ApiServiceLocal from '../../../services/ApiServiceLocal';

const ListExchangeRate = () => {
    const [data, setData] = useState([]);
    const [titleModal, setTitleModal] = useState('');
    const title = 'ER exchange rate';
    const [isModal, setIsModal] = useState(false);
    const param = "exchangeRate/";
    const [id, setId] = useState(0);
    const[exRateDate,setExRateDate] =useState('');
    const[exRate1,setExRate1] =useState('');
    const[exRate2,setExRate2] =useState('');
    const[exRate3,setExRate3] =useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const toggleAdd = () => {
        setId(0);
        setExRateDate('');
        setExRate1('');
        setExRate2('');
        setExRate3('');
        handleClick();
        setTitleModal('Add');
    }

    const toggleEdit = (id) => {
        
        ApiService.getDataById(param, id).then((res) => {
            if (res !== null) {
                setExRateDate(res.data.exRateDate);
                setExRate1(res.data.exRate1);
                setExRate2(res.data.exRate2);
                setExRate3(res.data.exRate3);
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
        ApiService.getAllWithPaging(param).then((res) => {
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
                        Header: "exRateDate",
                        accessor: "exRateDate"
                    },
                    {
                        Header: "exRate1",
                        accessor: "exRate1"
                    },
                    {
                        Header: "exRate2",
                        accessor: "exRate2"
                    },
                    {
                        Header: "exRate3",
                        accessor: "exRate3"
                    },
                   
                    {
                        Header: "Action",
                        accessor: "id",
                        Cell: (props) => {
                            return <>
                            <ActionButton  props={props.value} toggleEdit={toggleEdit} DeleteData={DeleteData}/>
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
                <br></br><br></br>
                <Box component="div" sx={boxStyles} id='tabel' >
                    {isLoading ? <LoadingSpinner /> : mainContainer}
                    {errorMessage && <div className="error">{errorMessage}</div>}
                    <iframe id="ifmcontentstoprint" title='myFrame' style={{ height: '0px', width: '0px', position: 'absolute' }}></iframe>
                </Box>
            </Container>
            <CreateEditExchangeRate isModal={isModal} handleClick={handleClick} titleModal={titleModal} title={title} param={param} id={id}
                exRateDate={exRateDate} exRate1={exRate1} exRate2={exRate2} exRate3={exRate3}
            />
        </>
    )
}

export default ListExchangeRate