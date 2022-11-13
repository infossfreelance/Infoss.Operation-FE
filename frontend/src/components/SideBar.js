import React from 'react';
import {alpha, styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Header from './Header';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Footer from '../components/Footer';
import {Route, Routes, useNavigate} from "react-router-dom";
import ListBooking from '../pages/Transaction/Booking/ListBooking';
import ListAirline from '../pages/Master/Airline/ListAirline';
import ListAirport from '../pages/Master/Airport/ListAirport';
import ListCity from '../pages/Master/City/ListCity';
import ListContinent from '../pages/Master/Continent/ListContinent';
import ListCountry from '../pages/Master/Country/ListCountry';
import ListExchangeRate from '../pages/Master/ExchangeRate/ListExchangeRate';
import ListJobtype from '../pages/Master/Jobtype/ListJobtype';
import ListRegion from '../pages/Master/Region/ListRegion';
import ListSeaport from '../pages/Master/Seaport/ListSeaport';
import ListVessel from '../pages/Master/Vessel/ListVessel';
import ListBank from '../pages/Master/Bank/ListBank';
import {TreeView} from '@mui/lab';
import TreeItem, {treeItemClasses} from '@mui/lab/TreeItem';
import Label from '@mui/icons-material/Label';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PropTypes from 'prop-types';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CreateEditBooking from '../pages/Transaction/Booking/CreateEditBooking';
import EstimateProfitLossPage from '../pages/Report/EstimateProfitLoss';
import EstimateProfitLossDetailPage from '../pages/Report/EstimateProfitLoss/detail';
import EstimateProfitLossEditPage from '../pages/Report/EstimateProfitLoss/edit';
import InvoicePage from '../pages/Transaction/Invoice';
import InvoiceDetailsPage from '../pages/Transaction/Invoice/details';
import ViewInvoicePage from '../pages/Transaction/Invoice/viewOnly';
import PaymentRequestPage from '../pages/Transaction/PaymentRequest';
import FormPaymentRequestPage from '../pages/Transaction/PaymentRequest/form';
import PaymentRequestAddPage from "../pages/Transaction/PaymentRequest/detail";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

function StyledTreeItem(props) {
    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        ...other
    } = props;

    return (
        <StyledTreeItemRoot
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </Box>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            {...other}
        />
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};

const drawerWidth = 200;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 0),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,//`calc(${theme.spacing(7)} + 5px)`,
    [theme.breakpoints.up('sm')]: {
        width: 0,//`calc(${theme.spacing(8)} + 5px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


export default function MiniDrawer() {
    const history = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    function klikBooking() {
        history('/booking')
    }
    function klikContinent() {
        history('/booking/continent')
    }
    function klikAirline() {
        history('/booking/airline')
    }
    function klikAirport() {
        history('/booking/airport')
    }
    function klikCity() {
        history('/booking/city')
    }
    function klikCountry() {
        history('/booking/country')
    }
    function klikExchangeRate() {
        history('/booking/exchangeRate')
    }
    function klikJobtype() {
        history('/booking/jobtype')
    }
    function klikRegion() {
        history('/booking/region')
    }
    function klikSeaport() {
        history('/booking/seaport')
    }
    function klikVessel() {
        history('/booking/vessel')
    }
    function klikBank() {
        history('/booking/bank')
    }

    function handleEstimateRoute() {
        history('/booking/epl')
    }

    function handlePaymentRequestRoute() {
        history('/booking/payment-request')
    }

    function handleInvoiceRoute() {
        history('/booking/invoice')
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap component="div" width='100%'>
                        <Header />
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>

                </DrawerHeader>
                <Divider />
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Divider />
                <TreeView
                    aria-label="gmail"
                    defaultExpanded={['1']}
                    defaultCollapseIcon={<ArrowDropDownIcon />}
                    defaultExpandIcon={<ArrowRightIcon />}
                    defaultEndIcon={<div style={{ width: 24 }} />}
                    sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                >
                    <StyledTreeItem nodeId="1" labelText="Booking Conf" labelIcon={Label}
                                                onClick={klikBooking}
                                                />
                    <StyledTreeItem nodeId="2" labelText="Master" labelIcon={Label}>
                        <StyledTreeItem
                            nodeId="5"
                            labelText="Continent"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#1a73e8"
                            bgColor="#e8f0fe"
                            onClick={klikContinent}
                        />
                        <StyledTreeItem
                            nodeId="6"
                            labelText="Region"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#e3742f"
                            bgColor="#fcefe3"
                            onClick={klikRegion}
                        />
                        <StyledTreeItem
                            nodeId="7"
                            labelText="Country"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#a250f5"
                            bgColor="#f3e8fd"
                            onClick={klikCountry}
                        />
                        <StyledTreeItem
                            nodeId="8"
                            labelText="ExchangeRate"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#a250f5"
                            bgColor="#f3e8fd"
                            onClick={klikExchangeRate}
                        />
                        <StyledTreeItem
                            nodeId="9"
                            labelText="City"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#3c8039"
                            bgColor="#e6f4ea"
                            onClick={klikCity}
                        />
                        <StyledTreeItem
                            nodeId="10"
                            labelText="Airport"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#1a73e8"
                            bgColor="#e8f0fe"
                            onClick={klikAirport}
                        />
                        <StyledTreeItem
                            nodeId="11"
                            labelText="Seaport"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#e3742f"
                            bgColor="#fcefe3"
                            onClick={klikSeaport}
                        />
                        <StyledTreeItem
                            nodeId="12"
                            labelText="Airline"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#a250f5"
                            bgColor="#f3e8fd"
                            onClick={klikAirline}
                        />
                        <StyledTreeItem
                            nodeId="13"
                            labelText="Vessel"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#3c8039"
                            bgColor="#e6f4ea"
                            onClick={klikVessel}
                        />
                        <StyledTreeItem
                            nodeId="14"
                            labelText="Job Type"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#1a73e8"
                            bgColor="#e8f0fe"
                            onClick={klikJobtype}
                        />
                        <StyledTreeItem
                            nodeId="15"
                            labelText="Bank"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#1a73e8"
                            bgColor="#e8f0fe"
                            onClick={klikBank}
                        />

                    </StyledTreeItem>
                    <StyledTreeItem nodeId="transaction" labelText='Transaction' labelIcon={Label}>
                        <StyledTreeItem
                            nodeId="invoice"
                            labelText="Invoice"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#1a73e8"
                            bgColor="#e8f0fe"
                            onClick={ handleInvoiceRoute }
                        />
                        <StyledTreeItem
                            nodeId="25"
                            labelText="Payment Request"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#3c8039"
                            bgColor="#e6f4ea"
                            onClick={ handlePaymentRequestRoute }
                        />
                    </StyledTreeItem>
                    <StyledTreeItem nodeId="3" labelText="Report" labelIcon={Label}>
                        <StyledTreeItem
                            nodeId="16"
                            labelText="Cargo Manifest"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#1a73e8"
                            bgColor="#e8f0fe"
                        />
                        <StyledTreeItem
                            nodeId="17"
                            labelText="Notice of Arrival"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#e3742f"
                            bgColor="#fcefe3"
                        />
                        <StyledTreeItem
                            nodeId="18"
                            labelText="Surat Pengantar"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#a250f5"
                            bgColor="#f3e8fd"
                        />
                        <StyledTreeItem
                            nodeId="19"
                            labelText="Performance"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#3c8039"
                            bgColor="#e6f4ea"
                        />
                        <StyledTreeItem
                            nodeId="20"
                            labelText="UnPrinted Invoice"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#3c8039"
                            bgColor="#e6f4ea"
                        />
                        <StyledTreeItem
                            nodeId="21"
                            labelText="Tanda Terima"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#3c8039"
                            bgColor="#e6f4ea"
                        />
                        <StyledTreeItem
                            nodeId="22"
                            labelText="Contribution of Sales Cost"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#3c8039"
                            bgColor="#e6f4ea"
                        />
                        <StyledTreeItem
                            nodeId="23"
                            labelText="Shipment Order List"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#3c8039"
                            bgColor="#e6f4ea"
                        />
                        <StyledTreeItem
                            nodeId="24"
                            labelText="Estimate Profit & Loss (EPL)"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#3c8039"
                            bgColor="#e6f4ea"
                            onClick={ handleEstimateRoute }
                        />
                    </StyledTreeItem>

                    <StyledTreeItem nodeId="4" labelText="Setting" labelIcon={Label}>
                        <StyledTreeItem
                            nodeId="24"
                            labelText="User Access Right"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#1a73e8"
                            bgColor="#e8f0fe"
                            onClick={klikContinent}
                        />
                        <StyledTreeItem
                            nodeId="25"
                            labelText="Change Password"
                            labelIcon={LocalOfferIcon}
                            labelInfo=""
                            color="#e3742f"
                            bgColor="#fcefe3"
                        />
                    </StyledTreeItem>
                </TreeView>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Routes>
                    <Route path="/" element={<><ListBooking /></>} />
                    <Route path="/_add" element={<><CreateEditBooking /></>} />
                    <Route path="/airline" element={<><ListAirline /></>} />
                    <Route path="/airport" element={<><ListAirport /></>} />
                    <Route path="/city" element={<><ListCity /></>} />
                    <Route path="/continent" element={<><ListContinent /></>} />
                    <Route path="/country" element={<><ListCountry /></>} />
                    <Route path="/exchangeRate" element={<><ListExchangeRate /></>} />
                    <Route path="/jobtype" element={<><ListJobtype /></>} />
                    <Route path="/region" element={<><ListRegion /></>} />
                    <Route path="/seaport" element={<><ListSeaport /></>} />
                    <Route path="/vessel" element={<><ListVessel /></>} />
                    <Route path="/bank" element={<><ListBank /></>} />
                    <Route path="/epl" element={<><EstimateProfitLossPage /></>} />
                    <Route path="/epl/detail" element={<><EstimateProfitLossDetailPage /></>} />
                    <Route path="/epl/edit/:SOId" element={<><EstimateProfitLossEditPage /></>} />
                    <Route path="/payment-request" element={<><PaymentRequestPage /></>} />
                    <Route path="/payment-request/createe" element={<><PaymentRequestAddPage /></>} />
                    <Route path="/payment-request/create" element={<><FormPaymentRequestPage /></>} />
                    <Route path="/payment-request/edit/:prId" element={<><FormPaymentRequestPage /></>} />
                    <Route path="/payment-request/view/:prId" element={<><FormPaymentRequestPage /></>} />
                    <Route path="/invoice" element={<><InvoicePage /></>} />
                    <Route path='/invoice/create' element={<><InvoiceDetailsPage /></>} />
                    <Route path='/invoice/edit/:invId' element={<><InvoiceDetailsPage /></>} />
                    <Route path='/invoice/view/:invId' element={<><ViewInvoicePage /></>} />
                </Routes>

                <Footer />
            </Box>
        </Box>
    );
}
