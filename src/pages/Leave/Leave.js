import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

// Temporary Placeholders
const HRLeave = () => <Typography>HR Leave Approval Dashboard</Typography>;
const CandidateLeave = () => <Typography>Candidate Leave Request Form</Typography>;

export default function Leave() {
    const { user } = useSelector((state) => state.auth);
    const isHR = user?.role === 'HR';

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {isHR ? 'Leave Approvals' : 'Apply for Leave'}
            </Typography>
            {isHR ? <HRLeave /> : <CandidateLeave />}
        </Box>
    );
}
