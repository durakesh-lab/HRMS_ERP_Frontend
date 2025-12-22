import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import HREmployees from './HREmployees';
import CandidateEmployees from './CandidateEmployees';

export default function Employees() {
    const { user } = useSelector((state) => state.auth);
    const isHR = user?.role === 'HR';

    return (
        <Box>
            {isHR ? <HREmployees /> : <CandidateEmployees />}
        </Box>
    );
}
