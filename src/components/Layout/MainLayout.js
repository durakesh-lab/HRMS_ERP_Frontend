import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Added Redux hooks
import { logout } from '../../store/authSlice'; // Added logout action
import {
    Box,
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Menu,
    MenuItem
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Work as WorkIcon,
    EventNote as EventNoteIcon,
    School as SchoolIcon,
    AttachMoney as AttachMoneyIcon,
    Person as PersonIcon, // For Profile
    Search as SearchIcon // For Job Search
} from '@mui/icons-material';
import ChatWidget from '../AI/ChatWidget';

const drawerWidth = 240;

// Define menus outside component or inside with useMemo
const hrMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Recruitment', icon: <WorkIcon />, path: '/dashboard/recruitment' },
    { text: 'Employees', icon: <PeopleIcon />, path: '/dashboard/employees' },
    { text: 'Leave', icon: <EventNoteIcon />, path: '/dashboard/leave' },
    { text: 'Training', icon: <SchoolIcon />, path: '/dashboard/training' },
    { text: 'Payroll', icon: <AttachMoneyIcon />, path: '/dashboard/payroll' },
];

const candidateMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Jobs', icon: <SearchIcon />, path: '/dashboard/recruitment' }, // Reusing recruitment path but view will differ
    { text: 'My Applications', icon: <WorkIcon />, path: '/dashboard/applications' },
    { text: 'My Profile', icon: <PersonIcon />, path: '/dashboard/profile' },
    { text: 'My Training', icon: <SchoolIcon />, path: '/dashboard/training' },
];

export default function MainLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Get user from Redux store to determine role
    const { user } = useSelector((state) => state.auth);
    const isHR = user?.role === 'HR';

    const menuItems = isHR ? hrMenuItems : candidateMenuItems;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        dispatch(logout()); // Dispatch logout action to clear store/localstorage
        navigate('/signin');
    };

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    HRMS Assistant
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            selected={location.pathname === item.path}
                            onClick={() => navigate(item.path)}
                        >
                            <ListItemIcon sx={{ color: location.pathname === item.path ? '#1976d2' : 'inherit' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: 'white',
                    color: 'black',
                    boxShadow: 1
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
                    </Typography>
                    <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary' }}>
                        {user?.username} ({user?.role})
                    </Typography>
                    <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
                        <Avatar alt={user?.username} src="/static/images/avatar/1.jpg" />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => { handleMenuClose(); navigate('/dashboard/profile'); }}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet />
            </Box>
            <ChatWidget />
        </Box>
    );
}
