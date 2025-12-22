import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Button,

    Divider,
    Chip,
    Stack,
    IconButton
} from '@mui/material';
import {
    Email,
    Phone,
    Business,
    LocationOn,
    Edit,
    LinkedIn,
    Twitter,
    GitHub
} from '@mui/icons-material';

const myProfile = {
    name: 'John Candidate',
    role: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'New York, USA',
    email: 'john.candidate@company.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'March 15, 2023',
    manager: 'Sarah Connor',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Design Systems'],
    bio: 'Passionate developer with 5+ years of experience in building scalable web applications. Love clean code and great UI/UX.'
};



export default function CandidateEmployees() {
    return (
        <Box>
            <Grid container spacing={3}>
                {/* Profile Section */}
                <Grid item xs={12}>
                    <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 2 }}>
                        <Box sx={{
                            h: 140,
                            bgcolor: 'primary.main',
                            height: 140,
                            background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)',
                            position: 'relative'
                        }}>
                            <Avatar
                                sx={{
                                    width: 120,
                                    height: 120,
                                    border: '4px solid white',
                                    position: 'absolute',
                                    bottom: -60,
                                    left: 40,
                                    bgcolor: 'secondary.main',
                                    fontSize: '3rem'
                                }}
                            >
                                J
                            </Avatar>
                        </Box>

                        <CardContent sx={{ pt: 9, px: 4, pb: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 700 }}>{myProfile.name}</Typography>
                                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>{myProfile.role}</Typography>
                                    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                            <Business fontSize="small" />
                                            <Typography variant="body2">{myProfile.department}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                            <LocationOn fontSize="small" />
                                            <Typography variant="body2">{myProfile.location}</Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                                <Button variant="outlined" startIcon={<Edit />}>Edit Profile</Button>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Contact Information</Typography>
                                    <Stack spacing={2}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: 'action.hover', color: 'primary.main', width: 40, height: 40 }}>
                                                <Email fontSize="small" />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Email Address</Typography>
                                                <Typography variant="body2">{myProfile.email}</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: 'action.hover', color: 'primary.main', width: 40, height: 40 }}>
                                                <Phone fontSize="small" />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Phone Number</Typography>
                                                <Typography variant="body2">{myProfile.phone}</Typography>
                                            </Box>
                                        </Box>
                                    </Stack>

                                    <Typography variant="h6" sx={{ mb: 2, mt: 4, fontWeight: 600 }}>Social Profiles</Typography>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton color="primary"><LinkedIn /></IconButton>
                                        <IconButton color="primary"><Twitter /></IconButton>
                                        <IconButton color="primary"><GitHub /></IconButton>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Professional Bio</Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {myProfile.bio}
                                    </Typography>

                                    <Typography variant="h6" sx={{ mb: 2, mt: 2, fontWeight: 600 }}>Skills</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {myProfile.skills.map(skill => (
                                            <Chip key={skill} label={skill} />
                                        ))}
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Sidebar Info */}

            </Grid>
        </Box>
    );
}
