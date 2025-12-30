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
    Avatar,
    Stack,
    useMediaQuery,
    useTheme,
    IconButton
} from '@mui/material';
import { Search, Work, LocationOn, AttachMoney, Close } from '@mui/icons-material';

// Fallback mock data if storage is empty


export default function CandidateRecruitment() {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [selectedJob, setSelectedJob] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [appliedJobs, setAppliedJobs] = useState([]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    const filteredJobs = allJobs.filter(job => {
        const matchesStatus = job.status === 'Active';
        const matchesText =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = typeFilter === 'all' || job.type === typeFilter;
        return matchesStatus && matchesText && matchesType;
    });

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
            <Box
                sx={{
                    mb: 3,
                    p: { xs: 2.25, sm: 3 },
                    borderRadius: 3,
                    border: '1px solid rgba(0,0,0,0.04)',
                    background: 'linear-gradient(140deg, #ffffff 0%, #f8fbff 100%)',
                    boxShadow: '0 12px 40px rgba(15, 23, 42, 0.08)'
                }}
            >
                <Stack spacing={2.5}>
                    <Stack spacing={1}>
                        <Typography variant="overline" sx={{ letterSpacing: 1, color: '#64748b' }}>
                            Discover roles tailored for you
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                            Browse openings, filter quickly, and view details without losing context.
                        </Typography>
                    </Stack>

                    <Stack spacing={1.5}>
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
                            sx={{
                                bgcolor: 'white',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                        />

                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {[
                                { label: 'All', value: 'all' },
                                { label: 'Full Time', value: 'Full Time' },
                                { label: 'Part Time', value: 'Part Time' },
                                { label: 'Contract', value: 'Contract' },
                                { label: 'Internship', value: 'Internship' }
                            ].map((filter) => (
                                <Chip
                                    key={filter.value}
                                    label={filter.label}
                                    onClick={() => setTypeFilter(filter.value)}
                                    color={typeFilter === filter.value ? 'primary' : 'default'}
                                    variant={typeFilter === filter.value ? 'filled' : 'outlined'}
                                    size="small"
                                    sx={{ borderRadius: 2, fontWeight: 600 }}
                                />
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)'
                    },
                    gap: { xs: 2, sm: 3 },
                    width: '100%'
                }}
            >
                {filteredJobs.map((job) => {
                    const skillsArray = Array.isArray(job.skills) ? job.skills : (job.skills || '').split(',');
                    return (
                        <Card
                            key={job.id}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 3,
                                border: '1px solid',
                                borderColor: 'divider',
                                transition: 'all 0.25s ease',
                                overflow: 'hidden',
                                bgcolor: '#ffffff',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 18px 32px -14px rgba(15,23,42,0.35)',
                                    borderColor: 'primary.main'
                                }
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1, p: { xs: 2.25, sm: 3 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Stack direction="row" spacing={2} alignItems="flex-start">
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            width: { xs: 48, sm: 56 },
                                            height: { xs: 48, sm: 56 },
                                            bgcolor: 'primary.50',
                                            color: 'primary.main',
                                            fontWeight: 'bold',
                                            fontSize: { xs: '1.25rem', sm: '1.5rem' }
                                        }}
                                    >
                                        {job.company ? job.company[0] : 'C'}
                                    </Avatar>
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                lineHeight: 1.2,
                                                mb: 0.25,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {job.title}
                                        </Typography>
                                        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                            {job.company}
                                        </Typography>
                                    </Box>
                                    {appliedJobs.includes(job.id) && (
                                        <Chip label="Applied" color="success" size="small" sx={{ fontWeight: 700 }} />
                                    )}
                                </Stack>

                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} flexWrap="wrap" useFlexGap>
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
                                </Stack>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        lineHeight: 1.6,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {job.description}
                                </Typography>

                                <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                                    {skillsArray.slice(0, 3).map((skill) => (
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
                                    {skillsArray.length > 3 && (
                                        <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center', ml: 0.5 }}>
                                            +{skillsArray.length - 3} more
                                        </Typography>
                                    )}
                                </Stack>
                            </CardContent>

                            <Divider />

                            <Box
                                sx={{
                                    p: { xs: 2, sm: 2.5 },
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    gap: 1,
                                    justifyContent: 'space-between',
                                    alignItems: { sm: 'center' },
                                    bgcolor: 'background.default'
                                }}
                            >
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                    {job.posted ? new Date(job.posted).toLocaleDateString() : 'Recently posted'}
                                </Typography>
                                <Button
                                    fullWidth={isMobile}
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
                    );
                })}
            </Box>

            {!filteredJobs.length && (
                <Box
                    sx={{
                        mt: 3,
                        p: 3,
                        border: '1px dashed rgba(0,0,0,0.12)',
                        borderRadius: 3,
                        textAlign: 'center',
                        bgcolor: '#ffffff'
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                        No roles match your filters yet.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Try clearing filters or searching a different title or location.
                    </Typography>
                </Box>
            )}

            {/* Job Details Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
                fullScreen={isMobile}
                PaperProps={{
                    sx: {
                        borderRadius: isMobile ? 0 : 3,
                        background: 'linear-gradient(135deg, #f9fbff 0%, #ffffff 40%, #f8fafc 100%)',
                        backdropFilter: 'blur(14px)',
                        border: '1px solid rgba(255,255,255,0.6)',
                        boxShadow: '0 20px 60px rgba(15, 23, 42, 0.12)',
                    },
                }}
            >
                {selectedJob && (
                    <>
                        <DialogTitle sx={{ pb: 1.5, pr: 6 }}>
                            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                                {selectedJob.title}
                            </Typography>
                            <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600 }}>
                                {selectedJob.company}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                <Chip label={selectedJob.type} size="small" color="primary" variant="outlined" />
                                <Chip label={selectedJob.location} size="small" variant="outlined" />
                                {selectedJob.salary && (
                                    <Chip label={selectedJob.salary} size="small" variant="outlined" />
                                )}
                            </Stack>
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseDialog}
                                sx={{ position: 'absolute', right: 16, top: 16 }}
                            >
                                <Close />
                            </IconButton>
                        </DialogTitle>
                        <Divider />
                        <DialogContent sx={{ pt: 3, pb: 0 }}>
                            <Grid container spacing={2.5} sx={{ mb: 3 }}>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedJob.location}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="subtitle2" color="text.secondary">Job Type</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedJob.type}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="subtitle2" color="text.secondary">Salary</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedJob.salary}</Typography>
                                </Grid>
                            </Grid>

                            <Box sx={{ mb: 3, p: 2.5, borderRadius: 2, bgcolor: 'rgba(15,23,42,0.02)', border: '1px solid rgba(15,23,42,0.05)' }}>
                                <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>Description</Typography>
                                <Typography paragraph sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                                    {selectedJob.description}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 3, p: 2.5, borderRadius: 2, bgcolor: 'rgba(31,122,236,0.03)', border: '1px solid rgba(31,122,236,0.08)' }}>
                                <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>Requirements</Typography>
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                                    {selectedJob.requirements || 'No specific requirements listed.'}
                                </Typography>
                            </Box>
                        </DialogContent>
                        <DialogActions sx={{ p: 3, gap: 1.2, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                            <Button onClick={handleCloseDialog} fullWidth={isMobile} sx={{ textTransform: 'none' }}>
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleApply}
                                disabled={appliedJobs.includes(selectedJob.id)}
                                fullWidth={isMobile}
                                sx={{ textTransform: 'none', px: 3, height: 46 }}
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
