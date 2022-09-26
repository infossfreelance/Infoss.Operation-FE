import { Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
// import ApiServiceLocal from '../../../services/ApiServiceLocal';
import ButtonService from '../../../services/ButtonService';
// import ButtonServiceLocal from '../../../services/ButtonServiceLocal';
import style from '../../Styles/style';
// import { ToastContainer, toast } from 'react-toastify';
import { useToasts } from 'react-toastify';

const CreateEditBank = ({ isModal, handleClick, titleModal, title, param, id,
    intName, masterCode, name, address }) => {

    const [intName2, setintName2] = useState('');
    const [masterCode2, setmasterCode2] = useState('');
    const [name2, setname2] = useState('');
    const [address2, setaddress2] = useState('');
    
    // const { addToast } = useToasts()
    // toast("Wow so easy!");
   /*  const notify = () => 
    toast('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }); */

    React.useEffect(() => {
        setintName2(intName);
        setmasterCode2(masterCode);
        setname2(name);
        setaddress2(address);
    }, [intName, masterCode, name, address])

    const Simpan = () => {
        var data;
        data = {
            rowStatus: 'ACT',
            id: id,
            intName: intName2,
            masterCode: masterCode2,
            name: name2,
            address: address2,
        };

        ButtonService.Simpan(titleModal, title, param, data);
        handleClick();
        window.location.reload();
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
                            name="intName"
                            label="intName"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={intName2}
                            onChange={(e) => setintName2(e.target.value)}
                        /><br></br><br></br>
                        <TextField
                            name="masterCode"
                            label="master Code"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={masterCode2}
                            onChange={(e) => setmasterCode2(e.target.value)}
                        /><br></br><br></br>
                          <TextField
                            name="name"
                            label="name"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={name2}
                            onChange={(e) => setname2(e.target.value)}
                        /><br></br><br></br>
                          <TextField
                            name="address"
                            label="address"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={address2}
                            onChange={(e) => setaddress2(e.target.value)}
                        /><br></br><br></br>
                        

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

export default CreateEditBank