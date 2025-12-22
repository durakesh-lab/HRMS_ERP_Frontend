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
    useTheme
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
    EventBusy
} from '@mui/icons-material';

const mockEmployees = [
    { id: 1, name: 'Tate McRae', role: 'UX Designer', department: 'Design', email: 'tate@example.com', phone: '+1 234 567 890', status: 'Active', avatar: 'T' },
    { id: 2, name: 'Olivia Rodrigo', role: 'Frontend Dev', department: 'Engineering', email: 'olivia@example.com', phone: '+1 987 654 321', status: 'Active', avatar: 'O' },
    { id: 3, name: 'Gracie Abrams', role: 'Product Manager', department: 'Product', email: 'gracie@example.com', phone: '+1 555 666 777', status: 'On Leave', avatar: 'G' },
    { id: 4, name: 'Sabrina Carpenter', role: 'Backend Dev', department: 'Engineering', email: 'sabrina@example.com', phone: '+1 111 222 333', status: 'Active', avatar: 'S' }
];

const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Avatar variant="rounded" sx={{ bgcolor: alpha(color, 0.1), color: color, width: 56, height: 56, mr: 2 }}>
                {icon}
            </Avatar>
            <Box>
                <Typography color="text.secondary" variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
                    {value}
                </Typography>
            </Box>
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
        <Box>
            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={4}>
                    <StatCard title="Total Employees" value={employees.length} icon={<People />} color={theme.palette.primary.main} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard title="New Hires (Month)" value="12" icon={<PersonAdd />} color={theme.palette.success.main} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard title="On Leave Today" value="3" icon={<EventBusy />} color={theme.palette.warning.main} />
                </Grid>
            </Grid>

            {/* Toolbar */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <TextField
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><Search color="action" /></InputAdornment>,
                    }}
                    sx={{ width: { xs: '100%', md: 300 }, bgcolor: 'background.paper', borderRadius: 1 }}
                    size="small"
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        startIcon={<FilterList />}
                        variant="outlined"
                        onClick={(e) => setFilterAnchor(e.currentTarget)}
                    >
                        Filter
                    </Button>
                    <Button startIcon={<Add />} variant="contained" onClick={handleOpenDialog}>Add Employee</Button>
                </Box>
            </Box>

            {/* Filter Menu Popover */}
            <Menu
                anchorEl={filterAnchor}
                open={Boolean(filterAnchor)}
                onClose={() => setFilterAnchor(null)}
                PaperProps={{ sx: { width: 250, p: 2 } }}
            >
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Filter by Department</Typography>
                {['All', 'Engineering', 'Design', 'Product', 'Human Resources'].map(dept => (
                    <MenuItem
                        key={dept}
                        onClick={() => {
                            setFilters({ ...filters, department: dept === 'All' ? '' : dept });
                            setFilterAnchor(null);
                        }}
                        selected={filters.department === dept || (dept === 'All' && !filters.department)}
                    >
                        {dept}
                    </MenuItem>
                ))}
                <Typography variant="subtitle2" sx={{ my: 1, fontWeight: 'bold', pt: 1, borderTop: '1px solid #eee' }}>Filter by Status</Typography>
                {['All', 'Active', 'On Leave', 'Inactive'].map(status => (
                    <MenuItem
                        key={status}
                        onClick={() => {
                            setFilters({ ...filters, status: status === 'All' ? '' : status });
                            setFilterAnchor(null);
                        }}
                        selected={filters.status === status || (status === 'All' && !filters.status)}
                    >
                        {status}
                    </MenuItem>
                ))}
            </Menu>

            {/* Employee Grid */}
            <Grid container spacing={3}>
                {filteredEmployees.map((employee) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={employee.id}>
                        <Card sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 2,
                            position: 'relative',
                            transition: 'transfrom 0.2s, box-shadow 0.2s',
                            '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }
                        }}>
                            <IconButton
                                size="small"
                                sx={{ position: 'absolute', top: 8, right: 8 }}
                                onClick={(e) => handleMenuClick(e, employee)}
                            >
                                <MoreVert />
                            </IconButton>

                            <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, fontSize: '2rem' }}>
                                {employee.avatar}
                            </Avatar>

                            <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center' }}>{employee.name}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{employee.role}</Typography>

                            <Chip
                                label={employee.status}
                                size="small"
                                color={employee.status === 'Active' ? 'success' : 'warning'}
                                sx={{ mb: 2, height: 24 }}
                            />

                            <Box sx={{ width: '100%', mt: 'auto', pt: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1, color: 'text.secondary' }}>
                                    <Business fontSize="small" />
                                    <Typography variant="caption">{employee.department}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1, color: 'text.secondary' }}>
                                    <Email fontSize="small" />
                                    <Typography variant="caption" noWrap>{employee.email}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'text.secondary' }}>
                                    <Phone fontSize="small" />
                                    <Typography variant="caption">{employee.phone}</Typography>
                                </Box>
                            </Box>

                            <Button
                                fullWidth
                                variant="outlined"
                                size="small"
                                sx={{ mt: 2 }}
                                onClick={() => handleViewProfile(employee)}
                            >
                                View Profile
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add Employee Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogContent>
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
                            label="Email Address"
                            name="email"
                            value={newEmployee.email}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            type="email"
                            error={!!errors.email}
                            helperText={errors.email}
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
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleAddEmployee} variant="contained">Add Employee</Button>
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
            <Dialog open={viewProfileOpen} onClose={() => setViewProfileOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Employee Profile</DialogTitle>
                <DialogContent>
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
                <DialogActions>
                    <Button onClick={() => setViewProfileOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Employee Dialog */}
            <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Employee Details</DialogTitle>
                <DialogContent>
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
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdateEmployee} variant="contained">Save Changes</Button>
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
