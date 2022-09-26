import { Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ButtonService from '../../../services/ButtonService';
import style from '../../Styles/style';
import { ToastContainer, toast } from 'react-toastify';
//import { useToasts } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateEditExchangeRate = ({ isModal, handleClick, titleModal, title, param, id,
    exRateDate, exRate1, exRate2, exRate3 }) => {

    const [exRateDate2, setexRateDate2] = useState('');
    const [exRate12, setexRate12] = useState('');
    const [exRate22, setexRate22] = useState('');
    const [exRate32, setexRate32] = useState('');
    
    const showToast = () => {
        //toast(" Let's toast to this toast today! ")
        toast.success('Success Notification !', {
            position: toast.POSITION.TOP_RIGHT
        });
         };

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
        setexRateDate2(exRateDate);
        setexRate12(exRate1);
        setexRate22(exRate2);
        setexRate32(exRate3);
    }, [exRateDate, exRate1, exRate2, exRate3])

    const Simpan = () => {
        var data;
        data = {
            rowStatus: 'ACT',
            id: id,
            exRateDate: exRateDate2,
            exRate1: exRate12,
            exRate2: exRate22,
            exRate3: exRate32,
        };

        ButtonService.Simpan(titleModal, title, param, data);
         handleClick();
         window.location.reload();
        showToast('success', 'Product add to cart successfully !');

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
                            name="exRateDate"
                            label="exRateDate"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={exRateDate2}
                            onChange={(e) => setexRateDate2(e.target.value)}
                        /><br></br><br></br>
                        <TextField
                            name="exRate1"
                            label="exRate1"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={exRate12}
                            onChange={(e) => setexRate12(e.target.value)}
                        /><br></br><br></br>
                          <TextField
                            name="exRate2"
                            label="exRate2"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={exRate22}
                            onChange={(e) => setexRate22(e.target.value)}
                        /><br></br><br></br>
                          <TextField
                            name="exRate3"
                            label="exRate3"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={exRate32}
                            onChange={(e) => setexRate32(e.target.value)}
                        /><br></br><br></br>
                        

                    </Box>
                    <br></br>
                    <Box display="flex" alignItems="center"
                        justifyContent="right">
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" onClick={showToast} type='submit'>Save</Button>
                            <Button variant="contained" onClick={handleClick} color='error'>Cancel</Button>
                        </Stack>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default CreateEditExchangeRate