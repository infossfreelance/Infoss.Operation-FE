import { Box, Stack } from '@mui/material'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const GeneralButton = ({ ReloadData, toggleAdd, toggleEdit, DeleteData, PrintData, ExportPDF, ExportExcel }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickx = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box backgroundColor='black' sx={{ width: 650, height: 50, border: 3, p: 1, borderRadius: 20, borderColor: "black", position: 'fixed', bottom: 4 }} maxWidth='lg' >
      <Stack justifyContent="center" spacing={2} direction="row"  >
        <Button size="small" variant="outlined" style={{ backgroundcolor: "#12824C", color: "#ffffff" }} onClick={ReloadData}>
          Reload Data
        </Button>
        <Button size="small" variant="outlined" style={{ backgroundcolor: "#12824C", color: "#ffffff" }} onClick={toggleAdd}>
          Add New
        </Button>
        <Button size="small" variant="outlined" style={{ backgroundcolor: "#12824C", color: "#ffffff" }} onClick={toggleEdit}>
          Edit Data
        </Button>
        <Button size="small" variant="outlined" style={{ backgroundcolor: "#12824C", color: "#ffffff" }} onClick={DeleteData}>
          Delete
        </Button>
        <Button size="small" variant="outlined" style={{ backgroundcolor: "#12824C", color: "#ffffff" }} onClick={PrintData}>
          Print
        </Button>
        <Button
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="outlined"
          style={{ backgroundcolor: "#12824C", color: "#ffffff" }}
          disableElevation
          onClick={handleClickx}
          endIcon={<KeyboardArrowDownIcon />}
          size="small"
        >
          Export
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          size="small"

        >
          <MenuItem onClick={ExportPDF} disableRipple>
            <EditIcon />
            PDF
          </MenuItem>
          <MenuItem onClick={ExportExcel} disableRipple>
            <FileCopyIcon />
            Excel
          </MenuItem>
        </StyledMenu>
      </Stack>
    </Box>



  )
}

export default GeneralButton