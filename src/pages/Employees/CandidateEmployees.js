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
    IconButton,
    useTheme,
    useMediaQuery
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const avatarSize = isMobile ? 88 : 120;
    return (
        <Box sx={{ pt: { xs: 3, sm: 0 } }}>
            <Grid container spacing={3}>
                {/* Profile Section */}
                <Grid item xs={12}>
                    <Card 
                        className="surface-card"
                        sx={{ 
                            height: '100%', 
                            borderRadius: 4,
                            boxShadow: 'none',
                            border: '1px solid rgba(15, 23, 42, 0.06)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        <Box sx={{
                            height: 160,
                            background: 'linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)',
                            position: 'relative',
                            borderRadius: '16px 16px 0 0'
                        }}>
                            <Avatar
                                sx={{
                                    width: avatarSize,
                                    height: avatarSize,
                                    border: '5px solid white',
                                    position: 'absolute',
                                    bottom: -(avatarSize/2),
                                    left: isMobile ? 24 : 40,
                                    bgcolor: 'var(--primary, #1f7aec)',
                                    fontSize: '3rem',
                                    fontWeight: 700,
                                    boxShadow: '0 8px 24px rgba(2,6,23,0.12)'
                                }}
                            >
                                J
                            </Avatar>
                        </Box>

                        <CardContent sx={{ pt: isMobile ? (avatarSize/2 + 16)/8 : 9, px: { xs: 2, md: 4 }, pb: { xs: 3, md: 4 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: -0.2 }}>{myProfile.name}</Typography>
                                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>{myProfile.role}</Typography>
                                    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'var(--primary, #1f7aec)' }}>
                                            <Business fontSize="small" />
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{myProfile.department}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'var(--primary, #1f7aec)' }}>
                                            <LocationOn fontSize="small" />
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{myProfile.location}</Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                                <Button 
                                    variant="outlined" 
                                    startIcon={<Edit />}
                                    sx={{
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        borderColor: 'var(--primary, #1f7aec)',
                                        color: 'var(--primary, #1f7aec)',
                                        borderRadius: 2,
                                        px: 2,
                                        '&:hover': {
                                            backgroundColor: 'rgba(31, 122, 236, 0.08)',
                                            borderColor: 'var(--primary, #1f7aec)'
                                        }
                                    }}
                                >
                                    Edit Profile
                                </Button>
                            </Box>

                            <Divider sx={{ my: 3, borderColor: 'rgba(15,23,42,0.06)' }} />

                            <Grid container spacing={3} alignItems="stretch">
                                <Grid item xs={12} md={6}>
                                    <Card className="surface-card" sx={{ borderRadius: 3, height: '100%', boxShadow: 'none', border: '1px solid rgba(15,23,42,0.06)' }}>
                                        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#0f172a' }}>Contact Information</Typography>
                                            <Stack spacing={2}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar sx={{ bgcolor: 'rgba(31,122,236,0.08)', color: 'var(--primary, #1f7aec)', width: 40, height: 40 }}>
                                                        <Email fontSize="small" />
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="caption" color="text.secondary">Email Address</Typography>
                                                        <Typography variant="body2">{myProfile.email}</Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar sx={{ bgcolor: 'rgba(31,122,236,0.08)', color: 'var(--primary, #1f7aec)', width: 40, height: 40 }}>
                                                        <Phone fontSize="small" />
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="caption" color="text.secondary">Phone Number</Typography>
                                                        <Typography variant="body2">{myProfile.phone}</Typography>
                                                    </Box>
                                                </Box>
                                            </Stack>

                                            <Typography variant="h6" sx={{ mb: 2, mt: 3, fontWeight: 700, color: '#0f172a' }}>Social Profiles</Typography>
                                            <Stack direction="row" spacing={1}>
                                                <IconButton color="primary" aria-label="LinkedIn profile"><LinkedIn /></IconButton>
                                                <IconButton color="primary" aria-label="Twitter profile"><Twitter /></IconButton>
                                                <IconButton color="primary" aria-label="GitHub profile"><GitHub /></IconButton>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Card className="surface-card" sx={{ borderRadius: 3, height: '100%', boxShadow: 'none', border: '1px solid rgba(15,23,42,0.06)' }}>
                                        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#0f172a' }}>Professional Bio</Typography>
                                            <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                                                {myProfile.bio}
                                            </Typography>

                                            <Typography variant="h6" sx={{ mb: 2, mt: 2, fontWeight: 700, color: '#0f172a' }}>Skills</Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {myProfile.skills.map(skill => (
                                                    <Chip 
                                                        key={skill} 
                                                        label={skill}
                                                        sx={{
                                                            fontWeight: 700,
                                                            bgcolor: 'rgba(31, 122, 236, 0.10)',
                                                            color: 'var(--primary, #1f7aec)',
                                                            border: '1px solid rgba(31,122,236,0.25)',
                                                            borderRadius: 2
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </CardContent>
                                    </Card>
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
