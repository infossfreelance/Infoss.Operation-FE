import { Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ButtonService from '../../../services/ButtonService';
import style from '../../Styles/style';

const CreateEditJobtype = ({ isModal, handleClick, titleModal, title, param, id ,code,name }) => {

    const [code2, setCode2] = useState('');
    const [name2, setName2] = useState('');

    React.useEffect(() => {
        setCode2(code);
        setName2(name);
    }, [code,name])

    const Simpan = () => {
        var data;
            data = {
                rowStatus:'ACT',
                id:id,
                code: code2,
                name: name2,
                userBy: 'wahyu'
            };
        ButtonService.Simpan(titleModal, title, param, data);
        handleClick();
        window.location.reload();
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
                            label="Code"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={code2}
                            onChange={(e) => setCode2(e.target.value)}
                        /><br></br><br></br>
                        <TextField
                            name="name"
                            label="Job Type"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={name2}
                            onChange={(e) => setName2(e.target.value)}
                        />
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

export default CreateEditJobtype