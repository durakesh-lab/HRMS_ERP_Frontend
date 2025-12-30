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
    Link,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { Add, MoreVert, Circle, Email, Phone, Description, Work, Event, Videocam, Close, WorkOutline, People } from '@mui/icons-material';

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
                                    validate: { required: true },
                                    customClass: 'form-field-modern'
                                },
                                {
                                    type: 'textfield',
                                    key: 'company',
                                    label: 'Company Name',
                                    placeholder: 'e.g. Tech Corp',
                                    input: true,
                                    validate: { required: true },
                                    customClass: 'form-field-modern'
                                },
                                {
                                    type: 'textfield',
                                    key: 'location',
                                    label: 'Location',
                                    placeholder: 'e.g. Remote, New York',
                                    input: true,
                                    validate: { required: true },
                                    customClass: 'form-field-modern'
                                },
                                {
                                    type: 'textfield',
                                    key: 'salary',
                                    label: 'Salary Range',
                                    placeholder: 'e.g. $80k - $120k',
                                    input: true,
                                    validate: { required: true },
                                    customClass: 'form-field-modern'
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
                                    validate: { required: true },
                                    customClass: 'form-field-modern'
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
                                    validate: { required: true },
                                    customClass: 'form-field-modern'
                                },
                                {
                                    type: 'textfield',
                                    key: 'skills',
                                    label: 'Required Skills',
                                    placeholder: 'e.g. React, Node.js, AWS (Comma separated)',
                                    input: true,
                                    customClass: 'form-field-modern'
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
                                    defaultValue: 'Active',
                                    customClass: 'form-field-modern'
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
                    validate: { required: true },
                    customClass: 'form-field-modern'
                },
                {
                    type: 'textarea',
                    key: 'requirements',
                    label: 'Requirements',
                    placeholder: 'Enter job requirements here...',
                    input: true,
                    rows: 3,
                    customClass: 'form-field-modern'
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
            validate: { required: true },
            customClass: 'form-field-modern'
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
            input: true,
            customClass: 'form-field-modern'
        },
        {
            type: 'textarea',
            key: 'notes',
            label: 'Notes for Candidate',
            placeholder: 'e.g. Please bring your portfolio...',
            input: true,
            customClass: 'form-field-modern'
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    // eslint-disable-next-line no-unused-vars
    const handlePopulateData = async () => {
        const demoJobs = [
            { title: 'Senior Frontend Engineer', company: 'Tech Corp', department: 'Engineering', location: 'Remote', type: 'Full Time', salary: '$120k - $150k', description: 'Lead our frontend team building modern React applications.', skills: 'React, Redux, TypeScript', requirements: 'Experience with React, Node.js, and cloud deployment', status: 'Active', applicants: 3 },
            { title: 'Product Manager', company: 'Tech Corp', department: 'Product', location: 'New York, NY', type: 'Full Time', salary: '$110k - $140k', description: 'Drive the product vision and strategy.', skills: 'Agile, Jira, Strategy', requirements: '5+ years of product management experience', status: 'Active', applicants: 4 },
            { title: 'DevOps Specialist', company: 'Cloud Systems', department: 'Engineering', location: 'London, UK', type: 'Contract', salary: '$90/hr', description: 'Manage our cloud infrastructure on AWS.', skills: 'AWS, Terraform, CI/CD', requirements: 'Strong Kubernetes and Docker knowledge', status: 'Active', applicants: 5 }
        ];

        try {
            let successCount = 0;
            for (const job of demoJobs) {
                try {
                    const response = await fetch('http://localhost:3001/jobs', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(job)
                    });
                    if (response.ok) {
                        successCount++;
                    }
                } catch (err) {
                    console.error('Error posting individual job:', err);
                }
            }
            
            if (successCount > 0) {
                toast.success(`${successCount} Demo Jobs Populated!`);
                await fetchJobs();
            } else {
                // Fallback: add to local state if API fails
                const newJobsWithIds = demoJobs.map((job, idx) => ({
                    ...job,
                    id: Date.now() + idx
                }));
                setJobs(prev => [...prev, ...newJobsWithIds]);
                toast.success('Demo jobs added locally (backend not available)');
            }
        } catch (error) {
            console.error('Error populating data:', error);
            toast.error('Failed to populate demo data');
        }
    };





    const handleSaveJob = async (data) => {
        if (data && data.title && data.department) {
            try {
                // Ensure all display fields are present
                const jobData = {
                    ...data,
                    applicants: data.applicants || 0,
                    status: data.status || 'Active'
                };

                if (isEditing) {
                    const response = await fetch(`http://localhost:3001/jobs/${editingId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(jobData)
                    });
                    if (response.ok) {
                        toast.success('Job updated successfully');
                        fetchJobs(); // Refresh list
                    } else {
                        throw new Error('Update failed');
                    }
                } else {
                    const response = await fetch('http://localhost:3001/jobs', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(jobData)
                    });
                    if (response.ok) {
                        toast.success('Job created successfully');
                        fetchJobs(); // Refresh list
                    } else {
                        throw new Error('Post failed');
                    }
                }
                handleCloseDialog();
            } catch (error) {
                console.error('Error saving job:', error);
                // Fallback: add to local state if API fails
                const newJobWithId = {
                    ...data,
                    id: Date.now(),
                    applicants: data.applicants || 0,
                    status: data.status || 'Active'
                };
                if (isEditing) {
                    setJobs(prev => prev.map(j => j.id === editingId ? newJobWithId : j));
                    toast.success('Job updated locally (backend not available)');
                } else {
                    setJobs(prev => [...prev, newJobWithId]);
                    toast.success('Job created locally (backend not available)');
                }
                handleCloseDialog();
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
        <Box sx={{ pt: { xs: 2, sm: 0 } }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, mb: { xs: 2, sm: 3 }, gap: { xs: 2, sm: 0 } }}>
                <Typography variant="h5" sx={{ fontWeight: 700, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>Job Postings</Typography>
                <Box>
                    {/* <Button variant="outlined" color="secondary" onClick={handlePopulateData} sx={{ mr: 2 }}>
                        Populate Demo Data
                    </Button> */}
                    <Button variant="contained" startIcon={<Add />} onClick={handleOpenDialog} fullWidth sx={{ fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}>
                        Create Job Posting
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={{ xs: 2, sm: 2, md: 2 }} sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                {jobs.map((job) => (
                    <Grid item xs={11} sm={6} md={6} key={job.id}>
                        <Card 
                            className="surface-card" 
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 3,
                                border: '1px solid rgba(15, 23, 42, 0.06)',
                                background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                overflow: 'hidden',
                                '&:hover': {
                                    boxShadow: '0 18px 40px rgba(15, 23, 42, 0.14)',
                                    transform: 'translateY(-4px)',
                                    borderColor: 'rgba(31, 122, 236, 0.18)'
                                }
                            }}
                        >
                            <Box sx={{ height: 4, background: 'linear-gradient(135deg, #1f7aec 0%, #64b5f6 100%)', opacity: 0.9 }} />
                            <CardContent sx={{ flexGrow: 1, pt: { xs: 2.5, sm: 2.75 }, px: { xs: 2.5, sm: 3 } }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography 
                                            variant="h6" 
                                            sx={{ 
                                                fontWeight: 700,
                                                color: '#0f172a',
                                                mb: 0.5,
                                                lineHeight: 1.3,
                                                fontSize: { xs: '1rem', sm: '1.25rem' }
                                            }}
                                        >
                                            {job.title}
                                        </Typography>
                                        <Typography 
                                            color="text.secondary" 
                                            gutterBottom
                                            sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, display: 'flex', alignItems: 'center', gap: 0.75 }}
                                        >
                                            <Circle sx={{ fontSize: 8 }} />
                                            {job.department} • {job.location}
                                        </Typography>
                                        {job.company && (
                                            <Typography 
                                                variant="caption" 
                                                className="muted-text"
                                                sx={{ display: 'block', mt: 0.25 }}
                                            >
                                                {job.company}
                                            </Typography>
                                        )}
                                    </Box>
                                    <IconButton 
                                        size="small" 
                                        onClick={(e) => handleMenuClick(e, job.id)}
                                        sx={{ ml: { xs: 0, sm: 1 }, bgcolor: 'rgba(15, 23, 42, 0.04)' }}
                                    >
                                        <MoreVert fontSize="small" />
                                    </IconButton>
                                </Box>

                                <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center" sx={{ mt: { xs: 1.5, sm: 2 }, gap: 0.75 }}>
                                    <Chip
                                        label={job.status}
                                        size="small"
                                        sx={{ 
                                            fontWeight: 700,
                                            borderRadius: 10,
                                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                            backgroundColor: job.status === 'Active'
                                                ? 'rgba(16, 185, 129, 0.16)'
                                                : job.status === 'Draft'
                                                    ? 'rgba(107, 114, 128, 0.16)'
                                                    : 'rgba(239, 68, 68, 0.16)',
                                            color: job.status === 'Active'
                                                ? '#0f9d58'
                                                : job.status === 'Draft'
                                                    ? '#374151'
                                                    : '#b91c1c'
                                        }}
                                    />
                                    <Chip
                                        label={`${job.applicants} Applicants`}
                                        size="small"
                                        sx={{ 
                                            fontWeight: 700,
                                            borderRadius: 10,
                                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                            backgroundColor: 'rgba(31, 122, 236, 0.12)',
                                            color: 'var(--primary, #1f7aec)',
                                            border: '1px solid rgba(31, 122, 236, 0.2)'
                                        }}
                                    />
                                    {job.type && (
                                        <Chip
                                            label={job.type}
                                            size="small"
                                            sx={{ 
                                                fontWeight: 700,
                                                borderRadius: 10,
                                                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                                backgroundColor: 'rgba(99, 102, 241, 0.12)',
                                                color: '#4f46e5'
                                            }}
                                        />
                                    )}
                                </Stack>

                                <Box sx={{ mt: { xs: 2, sm: 2.5 }, display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(3, minmax(0, 1fr))' }, gap: { xs: 1, sm: 1.25 } }}>
                                    <Box sx={{ p: { xs: 1.1, sm: 1.25 }, borderRadius: 2, border: '1px solid rgba(15, 23, 42, 0.06)', bgcolor: 'rgba(15, 23, 42, 0.02)' }}>
                                        <Typography variant="caption" className="muted-text" sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>Salary</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a', mt: 0.5, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                                            {job.salary || 'Not specified'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ p: { xs: 1.1, sm: 1.25 }, borderRadius: 2, border: '1px solid rgba(15, 23, 42, 0.06)', bgcolor: 'rgba(15, 23, 42, 0.02)' }}>
                                        <Typography variant="caption" className="muted-text" sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>Job Type</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a', mt: 0.5, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                                            {job.type || '—'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ p: { xs: 1.1, sm: 1.25 }, borderRadius: 2, border: '1px solid rgba(15, 23, 42, 0.06)', bgcolor: 'rgba(15, 23, 42, 0.02)' }}>
                                        <Typography variant="caption" className="muted-text" sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>Applicants</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'var(--primary, #1f7aec)', mt: 0.5, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                                            {job.applicants || 0}
                                        </Typography>
                                    </Box>
                                </Box>

                                {job.status === 'Draft' && (
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                                        *Visible only to HR team
                                    </Typography>
                                )}
                            </CardContent>
                            <Box sx={{ px: { xs: 2, sm: 2 }, pb: { xs: 2, sm: 2 }, pt: 0 }}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    fullWidth
                                    onClick={() => handleOpenCandidates(job)}
                                    sx={{ 
                                        fontWeight: 700,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        boxShadow: 'none',
                                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                        '&:hover': {
                                            boxShadow: 'none',
                                            transform: 'translateY(-1px)'
                                        }
                                    }}
                                >
                                    Manage Candidates
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: { xs: 4, sm: 5, md: 6 } }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: { xs: 2, sm: 3 }, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>Upcoming Interviews</Typography>
                <Grid container spacing={{ xs: 2, sm: 2, md: 2 }} sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                    {mockInterviews.map((interview) => (
                        <Grid item xs={11} sm={6} md={4} key={interview.id}>
                            <Card 
                                className="surface-card" 
                                sx={{ 
                                    borderRadius: 3,
                                    borderLeft: `4px solid var(--primary, #1f7aec)`,
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        boxShadow: '0 16px 36px rgba(15, 23, 42, 0.14)',
                                        transform: 'translateY(-4px)'
                                    }
                                }}
                            >
                                <CardContent sx={{ p: { xs: 2, sm: 2 } }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1, gap: 1 }}>
                                        <Typography 
                                            variant="h6"
                                            sx={{ 
                                                fontWeight: 700,
                                                color: '#0f172a',
                                                fontSize: { xs: '1rem', sm: '1.25rem' }
                                            }}
                                        >
                                            {interview.candidate}
                                        </Typography>
                                        <Chip 
                                            label={interview.status} 
                                            color="primary" 
                                            size="small" 
                                            variant={interview.status === 'Completed' ? 'outlined' : 'filled'}
                                            sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                                        />
                                    </Box>
                                    <Typography 
                                        color="text.secondary" 
                                        variant="body2" 
                                        gutterBottom
                                        sx={{ fontWeight: 500, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                                    >
                                        {interview.role}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: { xs: 2, sm: 2.5 }, color: 'var(--primary, #1f7aec)' }}>
                                        <Videocam fontSize="small" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                                        <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>{interview.type}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, color: 'var(--primary, #1f7aec)' }}>
                                        <Event fontSize="small" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>{interview.time}</Typography>
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
            <Dialog 
                open={openDialog} 
                onClose={handleCloseDialog} 
                maxWidth="sm" 
                fullWidth
                fullScreen={isMobile}
                PaperProps={{
                    sx: {
                        borderRadius: { xs: 0, sm: 3 },
                        background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)'
                    }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: { xs: 2, sm: 3 }, pb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
                        <Box 
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: { xs: 36, sm: 40 },
                                height: { xs: 36, sm: 40 },
                                borderRadius: 2,
                                background: 'rgba(31, 122, 236, 0.12)'
                            }}
                        >
                            <WorkOutline sx={{ color: 'var(--primary, #1f7aec)', fontSize: { xs: '1.1rem', sm: '1.25rem' } }} />
                        </Box>
                        <Box>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    fontWeight: 700,
                                    color: '#0f172a',
                                    lineHeight: 1.2,
                                    fontSize: { xs: '1rem', sm: '1.25rem' }
                                }}
                            >
                                {isEditing ? 'Edit Job Posting' : 'Create New Job'}
                            </Typography>
                            <Typography 
                                variant="caption" 
                                className="muted-text"
                                sx={{ display: 'block', mt: 0.25, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                            >
                                {isEditing ? 'Update job details' : 'Post a new opportunity'}
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
                <Divider sx={{ opacity: 0.3 }} />
                <DialogContent sx={{ pt: { xs: 2, sm: 3 }, px: { xs: 2, sm: 3 } }}>
                    <FormRender
                        schema={jobPostingSchema}
                        onSubmit={handleSaveJob}
                        initialData={isEditing ? newJob : {}}
                    />
                </DialogContent>
                <Divider sx={{ opacity: 0.3 }} />
                <DialogActions sx={{ p: { xs: 2, sm: 2.5 }, gap: 1 }}>
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
                    <Box sx={{ flex: 1 }} />
                </DialogActions>
            </Dialog>

            {/* Manage Candidates Dialog */}
            <Dialog 
                open={openCandidatesDialog} 
                onClose={handleCloseCandidates} 
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
                                Candidates
                            </Typography>
                            <Typography 
                                variant="caption" 
                                className="muted-text"
                                sx={{ display: 'block', mt: 0.25, maxWidth: 250 }}
                            >
                                {selectedJobForCandidates?.title}
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton 
                        onClick={handleCloseCandidates}
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
                <Divider sx={{ opacity: 0.3 }} />
                <DialogContent sx={{ pt: 2 }}>
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
                <Divider sx={{ opacity: 0.3 }} />
                <DialogActions sx={{ p: 2.5, gap: 1 }}>
                    <Button 
                        onClick={handleCloseCandidates}
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

            {/* Candidate Profile Dialog */}
            <Dialog 
                open={openProfileDialog} 
                onClose={handleCloseProfile} 
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
                            <Description sx={{ color: 'var(--primary, #1f7aec)', fontSize: '1.25rem' }} />
                        </Box>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 700,
                                color: '#0f172a'
                            }}
                        >
                            Profile
                        </Typography>
                    </Box>
                    <IconButton 
                        onClick={handleCloseProfile}
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
                <Divider sx={{ opacity: 0.3 }} />
                <DialogContent sx={{ pt: 3 }}>
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
                <Divider sx={{ opacity: 0.3 }} />
                <DialogActions sx={{ p: 2.5, gap: 1 }}>
                    <Button 
                        onClick={handleCloseProfile}
                        sx={{
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.05)'
                            }
                        }}
                    >
                        Close
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleOpenInterview}
                        sx={{
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: '0.95rem'
                        }}
                    >
                        Schedule Interview
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Schedule Interview Dialog */}
            <Dialog 
                open={openInterviewDialog} 
                onClose={handleCloseInterview} 
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
                            <Event sx={{ color: 'var(--primary, #1f7aec)', fontSize: '1.25rem' }} />
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
                                Schedule Interview
                            </Typography>
                            <Typography 
                                variant="caption" 
                                className="muted-text"
                                sx={{ display: 'block', mt: 0.25 }}
                            >
                                with {selectedCandidate?.name}
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton 
                        onClick={handleCloseInterview}
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
                <Divider sx={{ opacity: 0.3 }} />
                <DialogContent sx={{ pt: 3 }}>
                    <FormRender
                        schema={interviewSchema}
                        onSubmit={handleSaveInterview}
                    />
                </DialogContent>
                <Divider sx={{ opacity: 0.3 }} />
                <DialogActions sx={{ p: 2.5, gap: 1 }}>
                    <Button 
                        onClick={handleCloseInterview}
                        sx={{
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.05)'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Box sx={{ flex: 1 }} />
                </DialogActions>
            </Dialog>
        </Box>
    );
}
