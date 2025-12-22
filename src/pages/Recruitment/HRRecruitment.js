import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    MenuItem,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Menu,
    Divider,
    Stack,
    Link
} from '@mui/material';
import { Add, MoreVert, Circle, Email, Phone, Description, Work, Event, AccessTime, Videocam } from '@mui/icons-material';

import FormRender from '../../components/Forms/FormRender';



const jobPostingSchema = {
    components: [
        {
            type: 'panel',
            title: 'Job Details',
            collapsible: false,
            key: 'panel1',
            components: [
                {
                    type: 'columns',
                    input: false,
                    columns: [
                        {
                            components: [
                                {
                                    type: 'textfield',
                                    key: 'title',
                                    label: 'Job Title',
                                    placeholder: 'e.g. Senior React Developer',
                                    input: true,
                                    validate: { required: true }
                                },
                                {
                                    type: 'textfield',
                                    key: 'company',
                                    label: 'Company Name',
                                    placeholder: 'e.g. Tech Corp',
                                    input: true,
                                    validate: { required: true }
                                },
                                {
                                    type: 'textfield',
                                    key: 'location',
                                    label: 'Location',
                                    placeholder: 'e.g. Remote, New York',
                                    input: true,
                                    validate: { required: true }
                                },
                                {
                                    type: 'textfield',
                                    key: 'salary',
                                    label: 'Salary Range',
                                    placeholder: 'e.g. $80k - $120k',
                                    input: true,
                                    validate: { required: true }
                                }
                            ],
                            width: 6,
                            offset: 0,
                            push: 0,
                            pull: 0
                        },
                        {
                            components: [
                                {
                                    type: 'textfield',
                                    key: 'department',
                                    label: 'Department',
                                    placeholder: 'e.g. Engineering',
                                    input: true,
                                    validate: { required: true }
                                },
                                {
                                    type: 'select',
                                    key: 'type',
                                    label: 'Job Type',
                                    input: true,
                                    dataSrc: 'values',
                                    data: {
                                        values: [
                                            { label: 'Full Time', value: 'Full Time' },
                                            { label: 'Part Time', value: 'Part Time' },
                                            { label: 'Contract', value: 'Contract' },
                                            { label: 'Internship', value: 'Internship' }
                                        ]
                                    },
                                    validate: { required: true }
                                },
                                {
                                    type: 'textfield',
                                    key: 'skills',
                                    label: 'Required Skills',
                                    placeholder: 'e.g. React, Node.js, AWS (Comma separated)',
                                    input: true
                                },
                                {
                                    type: 'select',
                                    key: 'status',
                                    label: 'Status',
                                    input: true,
                                    dataSrc: 'values',
                                    data: {
                                        values: [
                                            { label: 'Active (Public)', value: 'Active' },
                                            { label: 'Closed', value: 'Closed' },
                                            { label: 'Draft (Internal Only)', value: 'Draft' }
                                        ]
                                    },
                                    defaultValue: 'Active'
                                }
                            ],
                            width: 6,
                            offset: 0,
                            push: 0,
                            pull: 0
                        }
                    ]
                },
                {
                    type: 'textarea',
                    key: 'description',
                    label: 'Job Description',
                    placeholder: 'Enter detailed job description here...',
                    input: true,
                    rows: 4,
                    validate: { required: true }
                },
                {
                    type: 'textarea',
                    key: 'requirements',
                    label: 'Requirements',
                    placeholder: 'Enter job requirements here...',
                    input: true,
                    rows: 3
                },
                {
                    type: 'button',
                    action: 'submit',
                    label: 'Save Job Posting',
                    theme: 'primary',
                    size: 'md',
                    block: false,
                    leftIcon: 'fa fa-save',
                    input: true,
                    key: 'submit',
                    customClass: 'mt-3'
                }
            ]
        }
    ]
};


const interviewSchema = {
    components: [
        {
            type: 'datetime',
            key: 'interviewDate',
            label: 'Interview Date & Time',
            input: true,
            enableTime: true,
            validate: { required: true }
        },
        {
            type: 'select',
            key: 'type',
            label: 'Interview Type',
            data: {
                values: [
                    { label: 'Video Call (Google Meet)', value: 'video' },
                    { label: 'Phone Screening', value: 'phone' },
                    { label: 'In-Person', value: 'in-person' }
                ]
            },
            validate: { required: true },
            input: true
        },
        {
            type: 'textarea',
            key: 'notes',
            label: 'Notes for Candidate',
            placeholder: 'e.g. Please bring your portfolio...',
            input: true
        },
        {
            type: 'button',
            action: 'submit',
            label: 'Confirm Schedule',
            theme: 'primary',
            block: true,
            key: 'submit'
        }
    ]
};

const mockCandidates = [
    { id: 1, name: 'John Doe', role: 'Frontend Dev', email: 'john@example.com', phone: '+1 234 567 890', experience: '5 Years', skills: 'React, Node.js' },
    { id: 2, name: 'Jane Smith', role: 'Product Manager', email: 'jane@example.com', phone: '+1 987 654 321', experience: '8 Years', skills: 'Agile, Jira' },
    { id: 3, name: 'Mike Johnson', role: 'Backend Dev', email: 'mike@example.com', phone: '+1 555 666 777', experience: '4 Years', skills: 'Java, Spring Boot' },
    { id: 4, name: 'Alice Williams', role: 'UI/UX Designer', email: 'alice@example.com', phone: '+1 111 222 333', experience: '3 Years', skills: 'Figma, Adobe XD' },
    { id: 5, name: 'Robert Brown', role: 'DevOps Engineer', email: 'robert@example.com', phone: '+1 444 555 666', experience: '6 Years', skills: 'AWS, Docker, K8s' }
];

const mockInterviews = [
    { id: 1, candidate: 'John Doe', role: 'Frontend Developer', type: 'Video Call (Google Meet)', time: 'Today, 2:00 PM', status: 'Scheduled' },
    { id: 2, candidate: 'Alice Williams', role: 'UI/UX Designer', type: 'In-Person', time: 'Tomorrow, 11:00 AM', status: 'Scheduled' },
    { id: 3, candidate: 'Mike Johnson', role: 'Backend Engineer', type: 'Phone Screening', time: 'Dec 22, 10:30 AM', status: 'Completed' }
];

export default function HRRecruitment() {
    const [jobs, setJobs] = useState([]);

    // Fetch jobs from Backend API
    const fetchJobs = async () => {
        try {
            const response = await fetch('http://localhost:3001/jobs');
            if (response.ok) {
                const data = await response.json();
                setJobs(data);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
            // toast.error('Failed to load jobs from server');
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const [openDialog, setOpenDialog] = useState(false);

    // Deep Link Handler
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.action === 'open_create_job') {
            handleOpenDialog();
            // Clear state gracefully
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    // Edit State
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Candidate & Profile State
    const [openCandidatesDialog, setOpenCandidatesDialog] = useState(false);
    const [openProfileDialog, setOpenProfileDialog] = useState(false);
    const [openInterviewDialog, setOpenInterviewDialog] = useState(false);

    const [selectedJobForCandidates, setSelectedJobForCandidates] = useState(null);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [newJob, setNewJob] = useState({
        title: '',
        department: '',
        location: '',
        status: 'Active'
    });

    // 3-Dot Menu Handlers
    const handleMenuClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedJobId(id);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedJobId(null);
    };

    // Dialog Handlers
    const handleOpenDialog = () => {
        setIsEditing(false);
        setNewJob({ title: '', department: '', location: '', status: 'Active' });
        setOpenDialog(true);
    };

    const handleOpenEditDialog = () => {
        const jobToEdit = jobs.find(j => j.id === selectedJobId);
        if (jobToEdit) {
            setNewJob({ ...jobToEdit });
            setIsEditing(true);
            setEditingId(selectedJobId);
            setOpenDialog(true);
        }
        handleMenuClose();
    };

    const handleCloseDialog = () => setOpenDialog(false);

    const handleOpenCandidates = (job) => {
        setSelectedJobForCandidates(job);
        setOpenCandidatesDialog(true);
    };
    const handleCloseCandidates = () => {
        setOpenCandidatesDialog(false);
        setSelectedJobForCandidates(null);
    };

    const handleViewProfile = (candidate) => {
        setSelectedCandidate(candidate);
        setOpenProfileDialog(true);
    };

    const handleCloseProfile = () => {
        setOpenProfileDialog(false);
        setSelectedCandidate(null);
    };

    const handleOpenInterview = () => {
        setOpenInterviewDialog(true);
        setOpenProfileDialog(false);
    };

    const handleCloseInterview = () => {
        setOpenInterviewDialog(false);
        setSelectedCandidate(null);
    };

    const handleSaveInterview = (data) => {
        console.log("Scheduling Interview for:", selectedCandidate?.name, data);
        toast.success(`Interview Scheduled with ${selectedCandidate?.name}!`);
        handleCloseInterview();
    };

    const handlePopulateData = async () => {
        const demoJobs = [
            { title: 'Senior Frontend Engineer', company: 'Tech Corp', department: 'Engineering', location: 'Remote', type: 'Full Time', salary: '$120k - $150k', description: 'Lead our frontend team building modern React applications.', skills: 'React, Redux, TypeScript', status: 'Active', applicants: 3 },
            { title: 'Product Manager', company: 'Tech Corp', department: 'Product', location: 'New York, NY', type: 'Full Time', salary: '$110k - $140k', description: 'Drive the product vision and strategy.', skills: 'Agile, Jira, Strategy', status: 'Active', applicants: 4 },
            { title: 'DevOps Specialist', company: 'Cloud Systems', department: 'Engineering', location: 'London, UK', type: 'Contract', salary: '$90/hr', description: 'Manage our cloud infrastructure on AWS.', skills: 'AWS, Terraform, CI/CD', status: 'Active', applicants: 5 }
        ];

        try {
            for (const job of demoJobs) {
                await fetch('http://localhost:3001/jobs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(job)
                });
            }
            toast.success('Demo Jobs Populated!');
            fetchJobs();
        } catch (error) {
            console.error('Error populating data:', error);
            toast.error('Failed to populate data');
        }
    };





    const handleSaveJob = async (data) => {
        if (data && data.title && data.department) {
            try {
                if (isEditing) {
                    const response = await fetch(`http://localhost:3001/jobs/${editingId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                    if (response.ok) {
                        toast.success('Job updated successfully');
                        fetchJobs(); // Refresh list
                    }
                } else {
                    const response = await fetch('http://localhost:3001/jobs', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                    if (response.ok) {
                        toast.success('Job created successfully');
                        fetchJobs(); // Refresh list
                    }
                }
                handleCloseDialog();
            } catch (error) {
                console.error('Error saving job:', error);
                toast.error('Failed to save job');
            }
        }
    };

    const handleDeleteJob = async () => {
        if (selectedJobId) {
            try {
                await fetch(`http://localhost:3001/jobs/${selectedJobId}`, { method: 'DELETE' });
                toast.success('Job deleted');
                fetchJobs();
            } catch (error) {
                console.error('Error deleting job:', error);
            }
            handleMenuClose();
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Job Postings</Typography>
                <Box>
                    <Button variant="outlined" color="secondary" onClick={handlePopulateData} sx={{ mr: 2 }}>
                        Populate Demo Data
                    </Button>
                    <Button variant="contained" startIcon={<Add />} onClick={handleOpenDialog}>
                        Create Job Posting
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {jobs.map((job) => (
                    <Grid item xs={12} md={6} key={job.id}>
                        <Card sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: '0.3s',
                            '&:hover': {
                                boxShadow: 6,
                                transform: 'translateY(-4px)'
                            }
                        }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{job.title}</Typography>
                                        <Typography color="text.secondary" gutterBottom>
                                            {job.department} • {job.location}
                                        </Typography>
                                    </Box>
                                    <IconButton size="small" onClick={(e) => handleMenuClick(e, job.id)}>
                                        <MoreVert />
                                    </IconButton>
                                </Box>
                                <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Chip
                                        // Draft: Use Visual cue for draft status
                                        icon={job.status === 'Draft' ? <Circle fontSize="small" /> : undefined}
                                        label={job.status}
                                        color={
                                            job.status === 'Active' ? 'success' :
                                                job.status === 'Draft' ? 'default' :
                                                    'error'
                                        }
                                        size="small"
                                        variant={job.status === 'Draft' ? 'outlined' : 'filled'}
                                    />
                                    <Chip
                                        label={`${job.applicants} Applicants`}
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>
                                {job.status === 'Draft' && (
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                                        *Visible only to HR team
                                    </Typography>
                                )}
                            </CardContent>
                            <Box sx={{ p: 2, pt: 0 }}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => handleOpenCandidates(job)}
                                >
                                    Manage Candidates
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 6 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Upcoming Interviews</Typography>
                <Grid container spacing={3}>
                    {mockInterviews.map((interview) => (
                        <Grid item xs={12} md={4} key={interview.id}>
                            <Card sx={{ borderLeft: '4px solid #1976d2' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                                        <Typography variant="h6">{interview.candidate}</Typography>
                                        <Chip label={interview.status} color="primary" size="small" variant={interview.status === 'Completed' ? 'outlined' : 'filled'} />
                                    </Box>
                                    <Typography color="text.secondary" variant="body2" gutterBottom>{interview.role}</Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, color: 'text.secondary' }}>
                                        <Videocam fontSize="small" />
                                        <Typography variant="body2">{interview.type}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, color: 'text.secondary' }}>
                                        <Event fontSize="small" />
                                        <Typography variant="body2">{interview.time}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Menu for Edit/Delete */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleOpenEditDialog}>Edit Job</MenuItem>
                <MenuItem onClick={handleDeleteJob} sx={{ color: 'error.main' }}>Delete Job</MenuItem>
            </Menu>

            {/* Create/Edit Job Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{isEditing ? 'Edit Job Posting' : 'Create New Job Posting'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 1 }}>
                        <FormRender
                            schema={jobPostingSchema}
                            onSubmit={handleSaveJob}
                            initialData={isEditing ? newJob : {}}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* Manage Candidates Dialog */}
            <Dialog open={openCandidatesDialog} onClose={handleCloseCandidates} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Candidates for {selectedJobForCandidates?.title}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    {selectedJobForCandidates?.applicants > 0 || selectedJobForCandidates?.id <= 3 ? (
                        <List>
                            {mockCandidates.slice(0, selectedJobForCandidates?.applicants || 5).map((candidate) => (
                                <ListItem key={candidate.id} secondaryAction={
                                    <Button size="small" variant="outlined" onClick={() => handleViewProfile(candidate)}>View Profile</Button>
                                }>
                                    <ListItemAvatar>
                                        <Avatar>{candidate.name[0]}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={candidate.name}
                                        secondary={candidate.role}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography sx={{ py: 3, textAlign: 'center', color: 'text.secondary' }}>
                            No applicants yet.
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCandidates}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Candidate Profile Dialog */}
            <Dialog open={openProfileDialog} onClose={handleCloseProfile} maxWidth="xs" fullWidth>
                <DialogTitle>Candidate Profile</DialogTitle>
                <DialogContent>
                    {selectedCandidate && (
                        <Box sx={{ textAlign: 'center', py: 2 }}>
                            <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: '2rem' }}>
                                {selectedCandidate.name[0]}
                            </Avatar>
                            <Typography variant="h6">{selectedCandidate.name}</Typography>
                            <Typography color="text.secondary" gutterBottom>{selectedCandidate.role}</Typography>

                            <Stack spacing={2} sx={{ mt: 3, textAlign: 'left' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Email color="action" />
                                    <Typography variant="body2">{selectedCandidate.email}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Phone color="action" />
                                    <Typography variant="body2">{selectedCandidate.phone}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Work color="action" />
                                    <Typography variant="body2">{selectedCandidate.experience} Experience</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                                    <Description color="action" />
                                    <Box>
                                        <Typography variant="body2" fontWeight="bold">Skills:</Typography>
                                        <Typography variant="body2">{selectedCandidate.skills}</Typography>
                                    </Box>
                                </Box>
                            </Stack>

                            <Box sx={{ mt: 3 }}>
                                <Link href="#" underline="hover" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                    View Resume (PDF)
                                </Link>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseProfile}>Close</Button>
                    <Button variant="contained" color="primary" onClick={handleOpenInterview}>Schedule Interview</Button>
                </DialogActions>
            </Dialog>

            {/* Schedule Interview Dialog */}
            <Dialog open={openInterviewDialog} onClose={handleCloseInterview} maxWidth="sm" fullWidth>
                <DialogTitle>Schedule Interview</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 1 }}>
                        <FormRender
                            schema={interviewSchema}
                            onSubmit={handleSaveInterview}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseInterview}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
