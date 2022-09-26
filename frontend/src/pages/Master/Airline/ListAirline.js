import React, { useMemo, useState, useEffect } from 'react';
import Table1 from '../../../components/tables/Table1';
import "jspdf-autotable";
import Moment from 'moment';
import GeneralButton from '../../../components/GeneralButton';
import CreateEditAirline from './CreateEditAirline';
import ButtonService from '../../../services/ButtonService';
import { Box } from '@mui/system';
import {  Container } from '@mui/material';
import ApiService from '../../../services/ApiService';
import boxStyles from '../../Styles/boxStyles';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ActionButton from '../../../components/ActionButton';

const ListAirline = () => {
    const [data, setData] = useState([]);
    const [titleModal, setTitleModal] = useState('');
    const title = 'Master Airline'
    const [isModal, setIsModal] = useState(false);
    const param = "airline/";
    const [id, setId] = useState(0);
    const [masterCode, setMasterCode] = useState('');
    const [abbreviation, setAbbreviation] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const toggleAdd = () => {
        setId(0);
        setMasterCode('');
        setAbbreviation('');
        setName('');
        handleClick();
        setTitleModal('Add');
    }

    const toggleEdit = (id) => {
        ApiService.getDataById(param, id).then((res) => {
            if (res !== null) {
                setMasterCode(res.data.masterCode);
                setAbbreviation(res.data.abbreviation);
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
                        Header: "Master Code",
                        accessor: "masterCode"
                    },
                    {
                        Header: "Abbreviation",
                        accessor: "abbreviation"
                    },
                    {
                        Header: "Airline",
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
                <br></br>
                <Box component="div" sx={boxStyles} id='tabel' >
                    {isLoading ? <LoadingSpinner /> : mainContainer}
                    {errorMessage && <div className="error">{errorMessage}</div>}
                    <iframe id="ifmcontentstoprint" title='myFrame' style={{ height: '0px', width: '0px', position: 'absolute' }}></iframe>
                </Box>
            </Container>
            <CreateEditAirline isModal={isModal} handleClick={handleClick} titleModal={titleModal} title={title} param={param} id={id}
                masterCode={masterCode} abbreviation={abbreviation} name={name}
            />
        </>
    )
}

export default ListAirline