import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { People, Work, Assignment, TrendingUp, Search, Person, Schedule } from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: `${color}.light`,
                    color: `${color}.main`,
                    mr: 2
                }}>
                    {icon}
                </Box>
                <Typography variant="h6" color="text.secondary">
                    {title}
                </Typography>
            </Box>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {value}
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
                <StatCard title="Total Employees" value="1,234" icon={<People />} color="primary" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Open Jobs" value="12" icon={<Work />} color="secondary" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Leave Requests" value="5" icon={<Assignment />} color="warning" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Training Active" value="89%" icon={<TrendingUp />} color="success" />
            </Grid>
        </>
    );

    const HRActivity = () => (
        <>
            <Typography variant="body2" color="text.secondary">• John Doe requested sick leave (2 mins ago)</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>• Jane Smith applied for "Senior Developer" (1 hour ago)</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>• Payroll run completed for November (Yesterday)</Typography>
        </>
    );

    const HRActions = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
                variant="outlined"
                startIcon={<Work />}
                onClick={() => navigate('/dashboard/recruitment', { state: { action: 'open_create_job' } })}
            >
                Post New Job
            </Button>
            <Button
                variant="outlined"
                startIcon={<People />}
                onClick={() => navigate('/dashboard/employees')}
            >
                Add Employee
            </Button>
            <Button
                variant="outlined"
                startIcon={<Assignment />}
                onClick={() => navigate('/dashboard/leave')}
            >
                Approve Leaves
            </Button>
        </Box>
    );

    // ---------------- CANDIDATE / EMPLOYEE DASHBOARD COMPONENTS ----------------
    const CandidateStats = () => (
        <>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Applications" value="3" icon={<Work />} color="primary" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Interviews" value="1" icon={<Schedule />} color="secondary" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Saved Jobs" value="8" icon={<Search />} color="warning" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Profile View" value="95%" icon={<Person />} color="success" />
            </Grid>
        </>
    );

    const CandidateActivity = () => (
        <>
            <Typography variant="body2" color="text.secondary">• Your application for "Frontend Dev" was viewed (2 hours ago)</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>• Interview scheduled for "Backend Dev" (Tomorrow, 10 AM)</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>• New job "Full Stack Engineer" matches your profile</Typography>
        </>
    );

    const CandidateActions = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
                variant="outlined"
                startIcon={<Search />}
                onClick={() => navigate('/dashboard/recruitment', { state: { action: 'focus_search' } })}
            >
                Search Jobs
            </Button>
            <Button
                variant="outlined"
                startIcon={<Person />}
                onClick={() => navigate('/dashboard/profile')}
            >
                Update Profile
            </Button>
            <Button
                variant="outlined"
                startIcon={<Work />}
                onClick={() => navigate('/dashboard/applications')}
            >
                View Applications
            </Button>
        </Box>
    );

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Welcome back, {user?.username || 'User'}
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {isHR ? <HRStats /> : <CandidateStats />}
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Recent Activity</Typography>
                        {isHR ? <HRActivity /> : <CandidateActivity />}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Quick Actions</Typography>
                        {isHR ? <HRActions /> : <CandidateActions />}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
