import { Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ApiService from '../../../services/ApiService';
import ButtonService from '../../../services/ButtonService';
import style from '../../Styles/style';

const CreateEditCountry = ({ isModal, handleClick, titleModal, title, param, id, masterCode, abbreviation, name, currency, regionId }) => {

    const [masterCode2, setMasterCode2] = useState('');
    const [abbreviation2, setAbbreviation2] = useState('');
    const [name2, setName2] = useState('');
    const [dataRegion, setDataRegion] = useState([]);
    const [regionId2, setRegionId2] = useState('');
    const [currency2, setCurrency2] = useState('');

    React.useEffect(() => {
        GetData();
        // eslint-disable-next-line 
    }, [regionId, currency, masterCode, abbreviation, name])

    async function GetData() {
        var result;
        if (titleModal !== 'Add') {
            setMasterCode2(masterCode);
            setAbbreviation2(abbreviation);
            setName2(name);
            setCurrency2(currency);
            await ApiService.getAllWithPaging('region/').then((res) => {
                result = res.data.filter(obj => {
                    return obj.rowStatus === 'ACT'
                })
                setDataRegion(result);
            })
            setRegionId2(regionId);
        } else {
            setRegionId2('');
            setName2('');
            setMasterCode2('');
            setAbbreviation2('');
            setCurrency2('');
            setDataRegion([]);
            ApiService.getAllWithPaging('region/').then((res) => {
                result = res.data.filter(obj => {
                    return obj.rowStatus === 'ACT'
                })
                setDataRegion(result);
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
            currency: currency2,
            regionId: regionId2,
            userBy: 'wahyu'
        };
        ButtonService.Simpan(titleModal, title, param, data).then(() => {
            handleClick();
        });
    }


    return (
        <Modal
        open={isModal}
        // onClose={handleClick}
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
                            label="Country"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={name2}
                            onChange={(e) => setName2(e.target.value)}
                        /><br></br><br></br>
                        <TextField
                            name="currency"
                            label="Currency"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={currency2}
                            onChange={(e) => setCurrency2(e.target.value)}
                        /><br></br><br></br>
                        <FormControl fullWidth variant="standard">
                            <InputLabel id="select-label">Region</InputLabel>
                            <Select
                                labelId="lblRegion"
                                id="region"
                                value={regionId2}
                                label="Region"
                                defaultValue=''
                                onChange={(e) => setRegionId2(e.target.value)}>
                                {dataRegion.map((data) => (
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

export default CreateEditCountry