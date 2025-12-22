import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

export default function Payroll() {
    const { user } = useSelector((state) => state.auth);
    const isHR = user?.role === 'HR';

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {isHR ? 'Payroll Processing' : 'My Payslips'}
            </Typography>
            <Typography>Payroll Module Content Coming Soon...</Typography>
        </Box>
    );
}
