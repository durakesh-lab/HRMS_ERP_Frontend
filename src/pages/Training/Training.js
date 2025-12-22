import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

export default function Training() {
    const { user } = useSelector((state) => state.auth);
    const isHR = user?.role === 'HR';

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {isHR ? 'Training Management' : 'My Training Courses'}
            </Typography>
            <Typography>Training Module Content Coming Soon...</Typography>
        </Box>
    );
}
