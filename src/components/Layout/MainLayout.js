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
// import ChatWidget from '../AI/ChatWidget';

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
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#ffffff' }}>
            <Box sx={{ p: 3, pt: 3.5 }}>
                <Typography 
                    variant="h6" 
                    noWrap 
                    component="div" 
                    sx={{ 
                        background: 'linear-gradient(135deg, #1f7aec 0%, #64b5f6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontWeight: 800,
                        letterSpacing: '-0.5px'
                    }}
                >
                    HRMS Assistant
                </Typography>
            </Box>
            <Divider sx={{ opacity: 0.3 }} />
            <List sx={{ flexGrow: 1, px: 1.5, py: 2 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                            selected={location.pathname === item.path}
                            onClick={() => navigate(item.path)}
                            sx={{
                                borderRadius: 2,
                                py: 1.25,
                                transition: 'all 0.2s ease',
                                '&.Mui-selected': {
                                    bgcolor: 'rgba(31, 122, 236, 0.12)',
                                    color: 'var(--primary, #1f7aec)',
                                    '& .MuiListItemIcon-root': {
                                        color: 'var(--primary, #1f7aec)'
                                    },
                                    '& .MuiListItemText-primary': {
                                        fontWeight: 700
                                    },
                                    '&:hover': {
                                        bgcolor: 'rgba(31, 122, 236, 0.18)'
                                    }
                                },
                                '&:hover': {
                                    bgcolor: 'rgba(0, 0, 0, 0.04)'
                                }
                            }}
                        >
                            <ListItemIcon 
                                sx={{ 
                                    color: location.pathname === item.path ? 'var(--primary, #1f7aec)' : '#6b7280',
                                    minWidth: 40
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText 
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontSize: '0.95rem',
                                    fontWeight: location.pathname === item.path ? 700 : 500
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                    color: '#0f172a',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                }}
            >
                <Toolbar sx={{ py: 1.5, px: { xs: 1, sm: 2 } }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: { xs: 1, sm: 2 }, display: { sm: 'none' }, color: 'inherit' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography 
                        variant="h6" 
                        noWrap 
                        component="div" 
                        sx={{ 
                            flexGrow: 1,
                            fontWeight: 700,
                            fontSize: { xs: '0.95rem', sm: '1.15rem' },
                            color: '#0f172a',
                            letterSpacing: '-0.5px'
                        }}
                    >
                        {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.5, mr: 2 }}>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                fontWeight: 600,
                                color: '#0f172a'
                            }}
                        >
                            {user?.username}
                        </Typography>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                px: 1.25,
                                py: 0.5,
                                backgroundColor: 'rgba(31, 122, 236, 0.12)',
                                borderRadius: 2,
                                border: '1px solid rgba(31, 122, 236, 0.2)'
                            }}
                        >
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    fontWeight: 600,
                                    color: 'var(--primary, #1f7aec)',
                                    fontSize: '0.75rem',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {user?.role}
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton 
                        onClick={handleMenuClick} 
                        sx={{ 
                            p: { xs: 0.25, sm: 0.5 },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <Avatar 
                            alt={user?.username} 
                            src="/static/images/avatar/1.jpg"
                            sx={{
                                width: { xs: 32, sm: 40 },
                                height: { xs: 32, sm: 40 },
                                bgcolor: 'rgba(31, 122, 236, 0.12)',
                                color: 'var(--primary, #1f7aec)',
                                border: '2px solid var(--primary, #1f7aec)',
                                boxShadow: 'none',
                                cursor: 'pointer'
                            }}
                        />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                            sx: {
                                mt: 1.5,
                                borderRadius: 2,
                                border: '1px solid rgba(0, 0, 0, 0.05)',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
                                background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                                minWidth: 160
                            }
                        }}
                    >
                        <MenuItem 
                            onClick={() => { handleMenuClose(); navigate('/dashboard/profile'); }}
                            sx={{
                                color: '#0f172a',
                                fontWeight: 500,
                                '&:hover': {
                                    backgroundColor: 'rgba(31, 122, 236, 0.08)'
                                }
                            }}
                        >
                            Profile
                        </MenuItem>
                        <MenuItem 
                            onClick={handleLogout}
                            sx={{
                                color: '#0f172a',
                                fontWeight: 500,
                                '&:hover': {
                                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                                    color: '#dc2626'
                                }
                            }}
                        >
                            Logout
                        </MenuItem>
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
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { 
                            boxSizing: 'border-box', 
                            width: drawerWidth,
                            borderRight: '1px solid rgba(0, 0, 0, 0.08)'
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { 
                            boxSizing: 'border-box', 
                            width: drawerWidth,
                            borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                            boxShadow: 'none'
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, md: 4 },
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    background: 'var(--bg-page)',
                    minHeight: '100vh'
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
            {/* <ChatWidget /> */}
        </Box>
    );
}
