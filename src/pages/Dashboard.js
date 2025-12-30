import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, Box, Card, CardContent, Button, Chip, Stack, Divider } from '@mui/material';
import { People, Work, Assignment, TrendingUp, Search, Person, Schedule } from '@mui/icons-material';

const StatCard = ({ title, value, icon, accent, trend }) => (
    <Card
        className="surface-card"
        sx={{ height: '100%', p: { xs: 0.5, sm: 1 }, borderRadius: 3 }}
    >
        <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1, flexWrap: { xs: 'wrap', sm: 'nowrap' }, gap: 1 }}>
                <Box sx={{
                    p: { xs: 1, sm: 1.5 },
                    borderRadius: 2,
                    bgcolor: `${accent}14`,
                    color: accent,
                    display: 'inline-flex'
                }}>
                    {icon}
                </Box>
                {trend && (
                    <Chip size="small" label={trend} sx={{ bgcolor: `${accent}14`, color: accent, fontSize: { xs: '0.7rem', sm: '0.75rem' } }} />
                )}
            </Stack>
            <Typography variant="h4" component="div" sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}>
                {value}
            </Typography>
            <Typography variant="body2" className="muted-text" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                {title}
            </Typography>
        </CardContent>
    </Card>
);

export default function Dashboard() {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const isHR = user?.role === 'HR';

    // ---------------- HR DASHBOARD COMPONENTS ----------------
    const HRStats = () => (
        <>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Total Employees" value="1,234" icon={<People />} accent="#1f7aec" trend="+2.1%" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Open Jobs" value="12" icon={<Work />} accent="#10b981" trend="5 urgent" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Leave Requests" value="5" icon={<Assignment />} accent="#f59e0b" trend="3 pending" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Training Active" value="89%" icon={<TrendingUp />} accent="#6366f1" trend="On track" />
            </Grid>
        </>
    );

    const HRActivity = () => (
        <>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>• John Doe requested sick leave (2 mins ago)</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>• Jane Smith applied for "Senior Developer" (1 hour ago)</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>• Payroll run completed for November (Yesterday)</Typography>
        </>
    );

    const HRActions = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
            <Button
                variant="outlined"
                startIcon={<Work />}
                onClick={() => navigate('/dashboard/recruitment', { state: { action: 'open_create_job' } })}
                fullWidth
                sx={{ justifyContent: 'flex-start', textTransform: 'none', fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
            >
                Post New Job
            </Button>
            <Button
                variant="outlined"
                startIcon={<People />}
                onClick={() => navigate('/dashboard/employees')}
                fullWidth
                sx={{ justifyContent: 'flex-start', textTransform: 'none', fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
            >
                Add Employee
            </Button>
            <Button
                variant="outlined"
                startIcon={<Assignment />}
                onClick={() => navigate('/dashboard/leave')}
                fullWidth
                sx={{ justifyContent: 'flex-start', textTransform: 'none', fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
            >
                Approve Leaves
            </Button>
        </Box>
    );

    // ---------------- CANDIDATE / EMPLOYEE DASHBOARD COMPONENTS ----------------
    const CandidateStats = () => (
        <>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Applications" value="3" icon={<Work />} accent="#1f7aec" trend="1 active" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Interviews" value="1" icon={<Schedule />} accent="#6366f1" trend="Tomorrow" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Saved Jobs" value="8" icon={<Search />} accent="#f59e0b" trend="2 expiring" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Profile View" value="95%" icon={<Person />} accent="#10b981" trend="Great" />
            </Grid>
        </>
    );

    const CandidateActivity = () => (
        <>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>• Your application for "Frontend Dev" was viewed (2 hours ago)</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>• Interview scheduled for "Backend Dev" (Tomorrow, 10 AM)</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>• New job "Full Stack Engineer" matches your profile</Typography>
        </>
    );

    const CandidateActions = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
            <Button
                variant="outlined"
                startIcon={<Search />}
                onClick={() => navigate('/dashboard/recruitment', { state: { action: 'focus_search' } })}
                fullWidth
                sx={{ justifyContent: 'flex-start', textTransform: 'none', fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
            >
                Search Jobs
            </Button>
            <Button
                variant="outlined"
                startIcon={<Person />}
                onClick={() => navigate('/dashboard/profile')}
                fullWidth
                sx={{ justifyContent: 'flex-start', textTransform: 'none', fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
            >
                Update Profile
            </Button>
            <Button
                variant="outlined"
                startIcon={<Work />}
                onClick={() => navigate('/dashboard/applications')}
                fullWidth
                sx={{ justifyContent: 'flex-start', textTransform: 'none', fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
            >
                View Applications
            </Button>
        </Box>
    );

    // const actionChips = isHR
    //     ? [
    //         { label: 'Post a role', onClick: () => navigate('/dashboard/recruitment', { state: { action: 'open_create_job' } }) },
    //         { label: 'Approve leave', onClick: () => navigate('/dashboard/leave') },
    //         { label: 'Add employee', onClick: () => navigate('/dashboard/employees') },
    //     ]
    //     : [
    //         { label: 'Search roles', onClick: () => navigate('/dashboard/recruitment', { state: { action: 'focus_search' } }) },
    //         { label: 'View applications', onClick: () => navigate('/dashboard/applications') },
    //         { label: 'Update profile', onClick: () => navigate('/dashboard/profile') },
    //     ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: { xs: 2, sm: 0 } }}>
            <Paper
                sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Decorative background elements */}
                <Box sx={{
                    position: 'absolute',
                    top: -40,
                    right: -40,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'rgba(79, 70, 229, 0.05)',
                    zIndex: 0
                }} />
                
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={{ xs: 2, md: 3 }} sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ width: { xs: '100%', md: 'auto' } }}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
                            <Typography variant="overline" className="muted-text" sx={{ letterSpacing: 1, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                                {isHR ? '👨‍💼 HR Dashboard' : '👤 Candidate Hub'}
                            </Typography>
                            <Chip
                                label={isHR ? 'HR Lead' : 'Candidate'}
                                size="small"
                                sx={{
                                    height: { xs: 20, sm: 24 },
                                    background: isHR ? 'rgba(79, 70, 229, 0.12)' : 'rgba(34, 197, 94, 0.12)',
                                    color: isHR ? '#4f46e5' : '#22c55e',
                                    fontWeight: 700,
                                    fontSize: { xs: '0.65rem', sm: '0.75rem' }
                                }}
                            />
                        </Stack>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                mb: 1,
                                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                                // Use project primary with a safe fallback and ensure visibility across browsers
                                background: 'linear-gradient(135deg, #0f172a 0%, var(--primary, #1976D2) 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                color: 'transparent'
                            }}
                        >
                            Welcome back, {user?.username || 'User'}
                        </Typography>
                        <Typography variant="body1" className="muted-text" sx={{ maxWidth: 640, lineHeight: 1.6, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            {isHR
                                ? '🎯 Stay on top of hiring, approvals, and team updates. Your hub for strategic HR decisions.'
                                : '📈 Track your journey. Manage applications, interviews, and grow your professional profile.'}
                        </Typography>
                    </Box>
                    {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ minWidth: { md: 'fit-content' } }}>
                        {actionChips.map((chip) => (
                            <Button
                                key={chip.label}
                                onClick={chip.onClick}
                                endIcon={<ArrowRight sx={{ fontSize: 16 }} />}
                                sx={{
                                    px: 2.5,
                                    py: 1.2,
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    background: isHR ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                    color: '#ffffff',
                                    border: 'none',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                                    }
                                }}
                            >
                                {chip.label}
                            </Button>
                        ))}
                    </Stack> */}
                </Stack>
            </Paper>

            <Grid container spacing={2}>
                {isHR ? <HRStats /> : <CandidateStats />}
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Paper className="surface-card" sx={{ p: { xs: 2, sm: 3 }, height: '100%', borderRadius: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>Recent Activity</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {isHR ? <HRActivity /> : <CandidateActivity />}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper className="surface-card" sx={{ p: { xs: 2, sm: 3 }, height: '100%', borderRadius: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>Quick Actions</Typography>
                        <Divider sx={{ mb: 2 }} />
                        {isHR ? <HRActions /> : <CandidateActions />}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
