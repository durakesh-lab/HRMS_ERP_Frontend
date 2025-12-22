import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Box,
    TextField,
    Card,
    CardContent,
    Button,
    Typography,
    Grid,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    Divider,
    Avatar
} from '@mui/material';
import { Search, Work, LocationOn, AttachMoney } from '@mui/icons-material';

// Fallback mock data if storage is empty


export default function CandidateRecruitment() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [appliedJobs, setAppliedJobs] = useState([]);

    // Initialize jobs from Backend
    const [allJobs, setAllJobs] = useState([]);

    const fetchJobs = async () => {
        try {
            const response = await fetch('http://localhost:3001/jobs');
            if (response.ok) {
                const data = await response.json();
                // Sanitize/Migrate data
                const sanitized = data.map(job => ({
                    ...job,
                    company: job.company || 'Tech Corp',
                    type: job.type || 'Full Time',
                    salary: job.salary || 'Competitive',
                    description: job.description || 'No description available.',
                    skills: job.skills || 'React, Node.js',
                    requirements: job.requirements || '',
                    status: job.status || 'Active'
                }));
                setAllJobs(sanitized);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    useEffect(() => {
        fetchJobs();
        // Optional: Poll for changes or use WebSockets for real-time
        // For now, refresh on mount is sufficient
    }, []);

    const searchInputRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.action === 'focus_search') {
            setTimeout(() => {
                searchInputRef.current?.focus();
                searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, [location]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredJobs = allJobs.filter(job =>
        job.status === 'Active' && // Only show Active jobs to candidates
        (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    const handleViewDetails = (job) => {
        setSelectedJob(job);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedJob(null);
    };

    const handleApply = () => {
        if (selectedJob) {
            setAppliedJobs([...appliedJobs, selectedJob.id]);
            handleCloseDialog();
            // In a real app, this would send an API request
            toast.success(`Application submitted for ${selectedJob.title}!`);
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    inputRef={searchInputRef}
                    placeholder="Search by title, company, or location..."
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ bgcolor: 'white' }}
                />
            </Box>


            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)'
                },
                gap: 3,
                width: '100%'
            }}>
                {filteredJobs.map((job) => (
                    <Card key={job.id} sx={{
                        width: '100%',
                        height: '450px',
                        maxHeight: '450px',
                        minHeight: '450px',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.3s ease',
                        overflow: 'hidden',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)',
                            borderColor: 'primary.main'
                        }
                    }}>
                        <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, minHeight: 64 }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            bgcolor: 'primary.50',
                                            color: 'primary.main',
                                            fontWeight: 'bold',
                                            fontSize: '1.5rem'
                                        }}
                                    >
                                        {job.company ? job.company[0] : 'C'}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6" sx={{
                                            fontWeight: 700,
                                            lineHeight: 1.2,
                                            mb: 0.5,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {job.title}
                                        </Typography>
                                        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                            {job.company}
                                        </Typography>
                                    </Box>
                                </Box>
                                {appliedJobs.includes(job.id) && (
                                    <Chip label="Applied" color="success" size="small" sx={{ fontWeight: 600 }} />
                                )}
                            </Box>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                                <Chip
                                    icon={<LocationOn sx={{ fontSize: 16 }} />}
                                    label={job.location}
                                    size="small"
                                    sx={{ bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}
                                />
                                <Chip
                                    icon={<Work sx={{ fontSize: 16 }} />}
                                    label={job.type}
                                    size="small"
                                    sx={{ bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}
                                />
                                <Chip
                                    icon={<AttachMoney sx={{ fontSize: 16 }} />}
                                    label={job.salary}
                                    size="small"
                                    sx={{ bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}
                                />
                            </Box>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mb: 3,
                                    minHeight: 42,
                                    lineHeight: 1.6,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}
                            >
                                {job.description}
                            </Typography>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, height: 40, overflow: 'hidden' }}>
                                {(Array.isArray(job.skills) ? job.skills : (job.skills || '').split(',')).slice(0, 3).map((skill) => (
                                    <Chip
                                        key={skill}
                                        label={skill.trim()}
                                        size="small"
                                        sx={{
                                            height: 24,
                                            fontSize: '0.75rem',
                                            bgcolor: 'primary.50',
                                            color: 'primary.dark'
                                        }}
                                    />
                                ))}
                                {(Array.isArray(job.skills) ? job.skills : (job.skills || '').split(',')).length > 3 && (
                                    <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center', ml: 1 }}>
                                        +{(Array.isArray(job.skills) ? job.skills : (job.skills || '').split(',')).length - 3} more
                                    </Typography>
                                )}
                            </Box>
                        </CardContent>

                        <Divider />

                        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'background.default' }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                {job.posted ? new Date(job.posted).toLocaleDateString() : 'Recently'}
                            </Typography>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleViewDetails(job)}
                                disableElevation
                                sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                            >
                                View Details
                            </Button>
                        </Box>
                    </Card>
                ))}
            </Box>

            {/* Job Details Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                {selectedJob && (
                    <>
                        <DialogTitle sx={{ pb: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{selectedJob.title}</Typography>
                            <Typography variant="subtitle1" color="primary">{selectedJob.company}</Typography>
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                                    <Typography variant="body1">{selectedJob.location}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="subtitle2" color="text.secondary">Job Type</Typography>
                                    <Typography variant="body1">{selectedJob.type}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="subtitle2" color="text.secondary">Salary</Typography>
                                    <Typography variant="body1">{selectedJob.salary}</Typography>
                                </Grid>
                            </Grid>

                            <Typography variant="h6" sx={{ mb: 1 }}>Description</Typography>
                            <Typography paragraph sx={{ whiteSpace: 'pre-wrap' }}>{selectedJob.description}</Typography>

                            <Typography variant="h6" sx={{ mb: 1 }}>Requirements</Typography>
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                {selectedJob.requirements || 'No specific requirements listed.'}
                            </Typography>
                        </DialogContent>
                        <DialogActions sx={{ p: 3 }}>
                            <Button onClick={handleCloseDialog}>Close</Button>
                            <Button
                                variant="contained"
                                onClick={handleApply}
                                disabled={appliedJobs.includes(selectedJob.id)}
                            >
                                {appliedJobs.includes(selectedJob.id) ? 'Applied' : 'Apply Now'}
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
}
