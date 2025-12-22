import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import HRRecruitment from './HRRecruitment';
import CandidateRecruitment from './CandidateRecruitment';

export default function Recruitment() {
    const { user } = useSelector((state) => state.auth);
    const isHR = user?.role === 'HR';

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {isHR ? 'Recruitment & Job Postings' : 'Find Your Dream Job'}
            </Typography>
            {isHR ? <HRRecruitment /> : <CandidateRecruitment />}
        </Box>
    );
}
