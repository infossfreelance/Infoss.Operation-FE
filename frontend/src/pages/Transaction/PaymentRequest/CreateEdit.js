import { Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ApiService from '../../../services/ApiService';
import ButtonService from '../../../services/ButtonService';
import style from '../../Styles/style';

const CreateEdit = ({ isModal, handleClick, titleModal, title, param, id, masterCode, abbreviation, name, currency, continentId }) => {

    const [masterCode2, setMasterCode2] = useState('');
    const [abbreviation2, setAbbreviation2] = useState('');
    const [name2, setName2] = useState('');
    const [datacontinent, setDatacontinent] = useState([]);
    const [continentId2, setcontinentId2] = useState('');

    React.useEffect(() => {
        GetData();
        // eslint-disable-next-line 
    }, [continentId, currency, masterCode, abbreviation, name])

    async function GetData() {
        var result;
        if (titleModal !== 'Add') {
            setMasterCode2(masterCode);
            setAbbreviation2(abbreviation);
            setName2(name);
            await ApiService.getAll('continent/').then((res) => {
                result = res.data;
                setDatacontinent(result);
            })
            setcontinentId2(continentId);
        } else {
            setcontinentId2('');
            setName2('');
            setMasterCode2('');
            setAbbreviation2('');
            setDatacontinent([]);
            ApiService.getAll('continent/').then((res) => {
                result = res.data;
                setDatacontinent(result);
            })
        }
    }

    const Simpan = () => {
        var data;
        data = {
            rowStatus: 'ACT',
            id: id,
            masterCode: masterCode2,
            abbreviation: abbreviation2,
            name: name2,
            continentId: continentId2,
            userBy: 'wahyu'
        };
        ButtonService.Simpan(titleModal, title, param, data).then(() => {
            handleClick();
        });
    }

    return (
        <Modal
        open={isModal}
        onClose={(_, reason) => {
            if (reason !== "backdropClick") {
              handleClick();
            }
          }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableBackdropClick="false"
    >
            <Box sx={style}>
                <Box display="flex" alignItems="center"
                    justifyContent="center">
                    <Typography id="modal-modal-title" variant="h6" component="h2" justifyContent='center'>
                        {titleModal} {title}
                    </Typography>
                </Box>
                <br></br>
                <form onSubmit={Simpan}>
                    <Box>
                        <TextField
                            name="masterCode"
                            label="Master Code"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={masterCode2}
                            onChange={(e) => setMasterCode2(e.target.value)}
                        /><br></br><br></br>
                        <TextField
                            name="abbreviation"
                            label="Abbreviation"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={abbreviation2}
                            onChange={(e) => setAbbreviation2(e.target.value)}
                        /><br></br><br></br>
                        <TextField
                            name="name"
                            label="Region"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={name2}
                            onChange={(e) => setName2(e.target.value)}
                        /><br></br><br></br>
                        <FormControl fullWidth variant="standard">
                            <InputLabel id="select-label">Continent</InputLabel>
                            <Select
                                labelId="lblcontinent"
                                id="continent"
                                value={continentId2}
                                label="continent"
                                defaultValue=''
                                onChange={(e) => setcontinentId2(e.target.value)}>
                                {datacontinent.map((data) => (
                                    <MenuItem id={data.id} key={data.id} value={data.id}>
                                        {data.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Box>
                    <br></br>
                    <Box display="flex" alignItems="center"
                        justifyContent="right">
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" type='submit'>Save</Button>
                            <Button variant="contained" onClick={handleClick} color='error'>Cancel</Button>
                        </Stack>

                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default CreateEdit