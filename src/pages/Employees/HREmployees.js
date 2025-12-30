import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    IconButton,
    Button,
    TextField,
    InputAdornment,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Menu,
    MenuItem,
    alpha,
    useTheme,
    Stack
} from '@mui/material';
import {
    Search,
    Add,
    MoreVert,
    Email,
    Phone,
    Business,
    FilterList,
    People,
    PersonAdd,
    EventBusy,
    Close
} from '@mui/icons-material';

const mockEmployees = [
    { id: 1, name: 'Tate McRae', role: 'UX Designer', department: 'Design', email: 'tate@example.com', phone: '+1 234 567 890', status: 'Active', avatar: 'T' },
    { id: 2, name: 'Olivia Rodrigo', role: 'Frontend Dev', department: 'Engineering', email: 'olivia@example.com', phone: '+1 987 654 321', status: 'Active', avatar: 'O' },
    { id: 3, name: 'Gracie Abrams', role: 'Product Manager', department: 'Product', email: 'gracie@example.com', phone: '+1 555 666 777', status: 'On Leave', avatar: 'G' },
    { id: 4, name: 'Sabrina Carpenter', role: 'Backend Dev', department: 'Engineering', email: 'sabrina@example.com', phone: '+1 111 222 333', status: 'Active', avatar: 'S' }
];

const StatCard = ({ title, value, icon, accent }) => (
    <Card
        className="surface-card"
        sx={{
            height: '100%',
            p: { xs: 0.5, sm: 1 },
            borderRadius: 3
        }}
    >
        <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                <Box
                    sx={{
                        p: { xs: 0.9, sm: 1.1 },
                        borderRadius: 2,
                        bgcolor: `${accent}14`,
                        color: accent,
                        display: 'inline-flex'
                    }}
                >
                    {icon}
                </Box>
            </Stack>
            <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', sm: '2rem' }, lineHeight: 1.2 }}
            >
                {value}
            </Typography>
            <Typography variant="body2" className="muted-text" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                {title}
            </Typography>
        </CardContent>
    </Card>
);

export default function HREmployees() {
    const theme = useTheme();
    const [employees, setEmployees] = useState(mockEmployees);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    // New Employee State
    const [newEmployee, setNewEmployee] = useState({
        name: '', role: '', department: '', email: '', phone: ''
    });
    const [errors, setErrors] = useState({});

    // Feature States
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [viewProfileOpen, setViewProfileOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [accessOpen, setAccessOpen] = useState(false);
    const [filterAnchor, setFilterAnchor] = useState(null);

    // Filter State
    const [filters, setFilters] = useState({ department: '', status: '' });



    const handleSearch = (e) => setSearchTerm(e.target.value);

    // Dialog Handlers
    const handleOpenDialog = () => {
        setOpenDialog(true);
        setErrors({}); // Reset errors on open
    };
    const handleCloseDialog = () => setOpenDialog(false);

    // Menu Handlers
    const handleMenuClick = (event, employee) => {
        setAnchorEl(event.currentTarget);
        setSelectedEmployee(employee);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        // Don't clear selectedEmployee here immediately if generic close, 
        // as subsequent dialogs need it. Clear it when dialogs close.
    };

    // Action Handlers
    const handleViewProfile = (employee) => {
        setSelectedEmployee(employee);
        setViewProfileOpen(true);
        handleMenuClose();
    };

    const handleEditOpen = () => {
        setNewEmployee({ ...selectedEmployee }); // Prefill
        setEditOpen(true);
        handleMenuClose();
    };

    const handleAccessOpen = () => {
        // Reset or fetch permissions for this user
        // For mock, just random or default
        setAccessOpen(true);
        handleMenuClose();
    };

    const handleDeactivate = () => {
        if (selectedEmployee) {
            setEmployees(employees.map(emp =>
                emp.id === selectedEmployee.id ? { ...emp, status: 'Inactive' } : emp
            ));
        }
        handleMenuClose();
    };

    const handleUpdateEmployee = () => {
        if (validate()) {
            setEmployees(employees.map(emp =>
                emp.id === selectedEmployee.id ? { ...newEmployee, id: selectedEmployee.id, avatar: emp.avatar } : emp
            ));
            setEditOpen(false);
            setNewEmployee({ name: '', role: '', department: '', email: '', phone: '' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!newEmployee.name) tempErrors.name = 'Full Name is required';
        if (!newEmployee.role) tempErrors.role = 'Job Role is required';
        if (!newEmployee.department) tempErrors.department = 'Department is required';
        if (!newEmployee.email) tempErrors.email = 'Email Address is required';
        if (!newEmployee.phone) tempErrors.phone = 'Phone Number is required';

        // Basic email format validation
        if (newEmployee.email && !/\S+@\S+\.\S+/.test(newEmployee.email)) {
            tempErrors.email = 'Email is invalid';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleAddEmployee = () => {
        if (validate()) {
            setEmployees([...employees, { ...newEmployee, id: employees.length + 1, status: 'Active', avatar: newEmployee.name[0] }]);
            handleCloseDialog();
            setNewEmployee({ name: '', role: '', department: '', email: '', phone: '' });
        }
    };

    const filteredEmployees = employees.filter(emp =>
        (emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filters.department ? emp.department === filters.department : true) &&
        (filters.status ? emp.status === filters.status : true)
    );

    return (
        <Box sx={{ pt: { xs: 2, sm: 0 } }}>
            {/* Stats Cards */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard title="Total Employees" value={employees.length} icon={<People />} accent={theme.palette.primary.main} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard title="New Hires (Month)" value="12" icon={<PersonAdd />} accent={theme.palette.success.main} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard title="On Leave Today" value="3" icon={<EventBusy />} accent={theme.palette.warning.main} />
                </Grid>
            </Grid>

            {/* Toolbar */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 3.5, 
                flexWrap: 'wrap', 
                gap: 2,
                p: { xs: 2, sm: 0 }
            }}>
                <TextField
                    placeholder="Search by name, role, or department..."
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><Search sx={{ color: 'var(--primary, #1f7aec)' }} /></InputAdornment>,
                    }}
                    sx={{ 
                        width: { xs: '100%', md: 400 },
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                            transition: 'all 0.2s ease',
                            '& fieldset': {
                                borderColor: '#e5e7eb'
                            },
                            '&:hover fieldset': {
                                borderColor: 'var(--primary, #1f7aec)'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'var(--primary, #1f7aec)',
                                borderWidth: '2px'
                            }
                        }
                    }}
                    size="small"
                />

                <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Button
                        startIcon={<FilterList />}
                        variant="outlined"
                        onClick={(e) => setFilterAnchor(e.currentTarget)}
                        sx={{
                            fontWeight: 600,
                            borderRadius: 2,
                            textTransform: 'none',
                            borderColor: '#e5e7eb',
                            color: '#6b7280',
                            '&:hover': {
                                borderColor: 'var(--primary, #1f7aec)',
                                bgcolor: 'rgba(31, 122, 236, 0.04)'
                            }
                        }}
                    >
                        Filter
                    </Button>
                    <Button 
                        startIcon={<Add />} 
                        variant="contained" 
                        onClick={handleOpenDialog}
                        sx={{
                            fontWeight: 600,
                            borderRadius: 2,
                            textTransform: 'none',
                            boxShadow: '0 4px 12px rgba(31, 122, 236, 0.3)',
                            '&:hover': {
                                boxShadow: '0 6px 16px rgba(31, 122, 236, 0.4)',
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        Add Employee
                    </Button>
                </Box>
            </Box>

            {/* Filter Menu Popover */}
            <Menu
                anchorEl={filterAnchor}
                open={Boolean(filterAnchor)}
                onClose={() => setFilterAnchor(null)}
                PaperProps={{ 
                    sx: { 
                        width: 280, 
                        p: 2,
                        borderRadius: 3,
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
                    } 
                }}
            >
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Filter by Department</Typography>
                {['All', 'Engineering', 'Design', 'Product', 'Human Resources'].map(dept => (
                    <MenuItem
                        key={dept}
                        onClick={() => {
                            setFilters({ ...filters, department: dept === 'All' ? '' : dept });
                            setFilterAnchor(null);
                        }}
                        selected={filters.department === dept || (dept === 'All' && !filters.department)}
                        sx={{
                            borderRadius: 1.5,
                            mb: 0.5,
                            fontWeight: (filters.department === dept || (dept === 'All' && !filters.department)) ? 600 : 400,
                            '&.Mui-selected': {
                                bgcolor: 'rgba(31, 122, 236, 0.12)',
                                color: 'var(--primary, #1f7aec)',
                                '&:hover': {
                                    bgcolor: 'rgba(31, 122, 236, 0.18)'
                                }
                            }
                        }}
                    >
                        {dept}
                    </MenuItem>
                ))}
                <Typography variant="subtitle2" sx={{ my: 1.5, fontWeight: 700, color: '#0f172a', pt: 1.5, borderTop: '1px solid #e5e7eb', fontSize: '0.95rem' }}>Filter by Status</Typography>
                {['All', 'Active', 'On Leave', 'Inactive'].map(status => (
                    <MenuItem
                        key={status}
                        onClick={() => {
                            setFilters({ ...filters, status: status === 'All' ? '' : status });
                            setFilterAnchor(null);
                        }}
                        selected={filters.status === status || (status === 'All' && !filters.status)}
                        sx={{
                            borderRadius: 1.5,
                            mb: 0.5,
                            fontWeight: (filters.status === status || (status === 'All' && !filters.status)) ? 600 : 400,
                            '&.Mui-selected': {
                                bgcolor: 'rgba(31, 122, 236, 0.12)',
                                color: 'var(--primary, #1f7aec)',
                                '&:hover': {
                                    bgcolor: 'rgba(31, 122, 236, 0.18)'
                                }
                            }
                        }}
                    >
                        {status}
                    </MenuItem>
                ))}
            </Menu>

            {/* Employee Grid */}
            <Grid container spacing={2} sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                {filteredEmployees.map((employee) => (
                    <Grid item xs={11} sm={6} md={4} lg={3} key={employee.id}>
                        <Card 
                            className="surface-card"
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
                                p: 0,
                                position: 'relative',
                                borderRadius: 3,
                                border: '1px solid rgba(15, 23, 42, 0.06)',
                                background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
                                boxShadow: 'none',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': { 
                                    transform: 'translateY(-4px)', 
                                    boxShadow: 'none',
                                    borderColor: 'rgba(31, 122, 236, 0.18)'
                                }
                            }}
                        >
                            <Box sx={{ height: 4, background: 'linear-gradient(135deg, #1f7aec 0%, #64b5f6 100%)', borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />

                            <IconButton
                                size="small"
                                sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'rgba(15, 23, 42, 0.04)' }}
                                onClick={(e) => handleMenuClick(e, employee)}
                            >
                                <MoreVert fontSize="small" />
                            </IconButton>

                            <Box sx={{ p: 3, pt: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                <Avatar 
                                    sx={{ 
                                        width: 80, 
                                        height: 80, 
                                        bgcolor: alpha(theme.palette.primary.main, 0.1), 
                                        color: theme.palette.primary.main, 
                                        fontSize: '2rem',
                                        boxShadow: 'none',
                                        border: '2px solid rgba(31, 122, 236, 0.2)'
                                    }}
                                >
                                    {employee.avatar}
                                </Avatar>

                                <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center', color: '#0f172a' }}>{employee.name}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{employee.role}</Typography>

                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                                    <Chip
                                        label={employee.status}
                                        size="small"
                                        sx={{ 
                                            fontWeight: 700,
                                            height: 24,
                                            borderRadius: 10,
                                            backgroundColor: employee.status === 'Active'
                                                ? 'rgba(16, 185, 129, 0.16)'
                                                : employee.status === 'On Leave'
                                                    ? 'rgba(251, 191, 36, 0.18)'
                                                    : 'rgba(107, 114, 128, 0.16)',
                                            color: employee.status === 'Active'
                                                ? '#0f9d58'
                                                : employee.status === 'On Leave'
                                                    ? '#b45309'
                                                    : '#374151'
                                        }}
                                    />
                                    <Chip
                                        label={employee.department}
                                        size="small"
                                        sx={{ 
                                            fontWeight: 700,
                                            height: 24,
                                            borderRadius: 10,
                                            backgroundColor: 'rgba(31, 122, 236, 0.12)',
                                            color: 'var(--primary, #1f7aec)',
                                            border: '1px solid rgba(31, 122, 236, 0.18)'
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ width: '100%', px: 3, pb: 2.5, display: 'grid', gap: 1.25, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                                <Box sx={{ p: 1.1, borderRadius: 2, border: '1px solid rgba(15, 23, 42, 0.06)', bgcolor: 'rgba(15, 23, 42, 0.02)' }}>
                                    <Typography variant="caption" className="muted-text" sx={{ fontWeight: 600 }}>Email</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.25 }} noWrap>{employee.email}</Typography>
                                </Box>
                                <Box sx={{ p: 1.1, borderRadius: 2, border: '1px solid rgba(15, 23, 42, 0.06)', bgcolor: 'rgba(15, 23, 42, 0.02)' }}>
                                    <Typography variant="caption" className="muted-text" sx={{ fontWeight: 600 }}>Phone</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.25 }}>{employee.phone}</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ px: 3, pb: 3, pt: 0 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="small"
                                    sx={{ 
                                        mt: 0.5,
                                        fontWeight: 700,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            boxShadow: 'none',
                                            transform: 'translateY(-1px)'
                                        }
                                    }}
                                    onClick={() => handleViewProfile(employee)}
                                >
                                    View Profile
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add Employee Dialog */}
            <Dialog 
                open={openDialog} 
                onClose={handleCloseDialog} 
                maxWidth="sm" 
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)'
                    }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3, pb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box 
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                background: 'rgba(31, 122, 236, 0.12)'
                            }}
                        >
                            <PersonAdd sx={{ color: 'var(--primary, #1f7aec)', fontSize: '1.25rem' }} />
                        </Box>
                        <Box>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    fontWeight: 700,
                                    color: '#0f172a',
                                    lineHeight: 1.2
                                }}
                            >
                                Add New Employee
                            </Typography>
                            <Typography 
                                variant="caption" 
                                className="muted-text"
                                sx={{ display: 'block', mt: 0.25 }}
                            >
                                Fill in employee details
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton 
                        onClick={handleCloseDialog}
                        size="small"
                        sx={{
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.05)'
                            }
                        }}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                </Box>
                <Box sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)' }} />
                <DialogContent sx={{ pt: 3 }}>
                    <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <TextField
                            label="Full Name"
                            name="name"
                            value={newEmployee.name}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            error={!!errors.name}
                            helperText={errors.name}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'var(--primary, #1f7aec)',
                                        borderWidth: '2px'
                                    }
                                }
                            }}
                        />
                        <TextField
                            label="Job Role"
                            name="role"
                            value={newEmployee.role}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            error={!!errors.role}
                            helperText={errors.role}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'var(--primary, #1f7aec)',
                                        borderWidth: '2px'
                                    }
                                }
                            }}
                        />
                        <TextField
                            label="Department"
                            name="department"
                            value={newEmployee.department}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            error={!!errors.department}
                            helperText={errors.department}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'var(--primary, #1f7aec)',
                                        borderWidth: '2px'
                                    }
                                }
                            }}
                        />
                        <TextField
                            label="Email Address"
                            name="email"
                            value={newEmployee.email}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            type="email"
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'var(--primary, #1f7aec)',
                                        borderWidth: '2px'
                                    }
                                }
                            }}
                        />
                        <TextField
                            label="Phone Number"
                            name="phone"
                            value={newEmployee.phone}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            error={!!errors.phone}
                            helperText={errors.phone}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'var(--primary, #1f7aec)',
                                        borderWidth: '2px'
                                    }
                                }
                            }}
                        />
                    </Box>
                </DialogContent>
                <Box sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)' }} />
                <DialogActions sx={{ p: 2.5, gap: 1 }}>
                    <Button 
                        onClick={handleCloseDialog}
                        sx={{
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.05)'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleAddEmployee} 
                        variant="contained"
                        sx={{
                            fontWeight: 600,
                            textTransform: 'none'
                        }}
                    >
                        Add Employee
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Actions Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >

                <MenuItem onClick={handleEditOpen}>Edit Details</MenuItem>
                <MenuItem onClick={handleAccessOpen}>Manage Access</MenuItem>
                <MenuItem onClick={handleDeactivate} sx={{ color: 'error.main' }}>Deactivate</MenuItem>
            </Menu>

            {/* View Profile Dialog */}
            <Dialog 
                open={viewProfileOpen} 
                onClose={() => setViewProfileOpen(false)} 
                maxWidth="xs" 
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)'
                    }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3, pb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box 
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                background: 'rgba(31, 122, 236, 0.12)'
                            }}
                        >
                            <People sx={{ color: 'var(--primary, #1f7aec)', fontSize: '1.25rem' }} />
                        </Box>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 700,
                                color: '#0f172a'
                            }}
                        >
                            Employee Profile
                        </Typography>
                    </Box>
                    <IconButton 
                        onClick={() => setViewProfileOpen(false)}
                        size="small"
                        sx={{
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.05)'
                            }
                        }}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                </Box>
                <Box sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)' }} />
                <DialogContent sx={{ pt: 3 }}>
                    {selectedEmployee && (
                        <Box sx={{ textAlign: 'center', py: 2 }}>
                            <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, fontSize: '2rem' }}>
                                {selectedEmployee.avatar}
                            </Avatar>
                            <Typography variant="h6">{selectedEmployee.name}</Typography>
                            <Typography color="text.secondary" gutterBottom>{selectedEmployee.role}</Typography>
                            <Chip label={selectedEmployee.status} size="small" color={selectedEmployee.status === 'Active' ? 'success' : 'default'} sx={{ mt: 1 }} />

                            <Box sx={{ mt: 3, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Email color="action" />
                                    <Typography variant="body2">{selectedEmployee.email}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Phone color="action" />
                                    <Typography variant="body2">{selectedEmployee.phone}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Business color="action" />
                                    <Typography variant="body2">{selectedEmployee.department}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <Box sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)' }} />
                <DialogActions sx={{ p: 2.5 }}>
                    <Button 
                        onClick={() => setViewProfileOpen(false)}
                        sx={{
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.05)'
                            }
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Employee Dialog */}
            <Dialog 
                open={editOpen} 
                onClose={() => setEditOpen(false)} 
                maxWidth="sm" 
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)'
                    }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3, pb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box 
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                background: 'rgba(31, 122, 236, 0.12)'
                            }}
                        >
                            <People sx={{ color: 'var(--primary, #1f7aec)', fontSize: '1.25rem' }} />
                        </Box>
                        <Box>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    fontWeight: 700,
                                    color: '#0f172a',
                                    lineHeight: 1.2
                                }}
                            >
                                Edit Employee
                            </Typography>
                            <Typography 
                                variant="caption" 
                                className="muted-text"
                                sx={{ display: 'block', mt: 0.25 }}
                            >
                                Update employee information
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton 
                        onClick={() => setEditOpen(false)}
                        size="small"
                        sx={{
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.05)'
                            }
                        }}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                </Box>
                <Box sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)' }} />
                <DialogContent sx={{ pt: 3 }}>
                    <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Full Name"
                            name="name"
                            value={newEmployee.name}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            label="Job Role"
                            name="role"
                            value={newEmployee.role}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            error={!!errors.role}
                            helperText={errors.role}
                        />
                        <TextField
                            label="Department"
                            name="department"
                            value={newEmployee.department}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            error={!!errors.department}
                            helperText={errors.department}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={newEmployee.email}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            value={newEmployee.phone}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />
                        <TextField
                            select
                            label="Status"
                            name="status"
                            value={newEmployee.status || 'Active'}
                            onChange={handleInputChange}
                            fullWidth
                            SelectProps={{ native: true }}
                        >
                            <option value="Active">Active</option>
                            <option value="On Leave">On Leave</option>
                            <option value="Inactive">Inactive</option>
                        </TextField>
                    </Box>
                </DialogContent>
                <Box sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)' }} />
                <DialogActions sx={{ p: 2.5, gap: 1 }}>
                    <Button 
                        onClick={() => setEditOpen(false)}
                        sx={{
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.05)'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleUpdateEmployee} 
                        variant="contained"
                        sx={{
                            fontWeight: 600,
                            textTransform: 'none'
                        }}
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Manage Access Dialog */}
            <Dialog open={accessOpen} onClose={() => setAccessOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Manage Access Permissions</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Select modules accessible to <b>{selectedEmployee?.name}</b>.
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {['Recruitment', 'Employees', 'Leave Management', 'Payroll', 'Training'].map((module) => (
                            <Box key={module} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, border: '1px solid #eee', borderRadius: 1 }}>
                                <Typography>{module}</Typography>
                                <input
                                    type="checkbox"
                                    // Mock logic: Check if permission exists in employee object or default to false
                                    defaultChecked={selectedEmployee?.permissions?.includes(module)}
                                    style={{ width: 16, height: 16 }}
                                    onChange={(e) => {
                                        // In a real app, update a permissions state object here
                                        // For now, we are just visually toggling
                                        console.log(`Toggled ${module} for ${selectedEmployee?.name}: ${e.target.checked}`);
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAccessOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => {
                        // Mock Save
                        // setEmployees(...) update logic would go here
                        setAccessOpen(false);
                    }}>Save Permissions</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
