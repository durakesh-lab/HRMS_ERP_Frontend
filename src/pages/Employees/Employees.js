// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Box, Typography, Paper, Chip, Stack } from '@mui/material';
// import HREmployees from './HREmployees';
// import CandidateEmployees from './CandidateEmployees';

// export default function Employees() {
//     const { user } = useSelector((state) => state.auth);
//     const isHR = user?.role === 'HR';

//     return (
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: { xs: 2, sm: 0 } }}>
//             <Paper
//                 sx={{
//                     p: { xs: 3, md: 4 },
//                     borderRadius: 3,
//                     background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
//                     border: '1px solid rgba(0, 0, 0, 0.05)',
//                     boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)'
//                 }}
//             >
//                 <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
//                     <Box>
//                         <Typography variant="overline" className="muted-text" sx={{ letterSpacing: 1 }}>
//                             {isHR ? '👥 HR Management' : '👤 My Profile'}
//                         </Typography>
//                         <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
//                             {isHR ? 'Employee Management' : 'My Employee Profile'}
//                         </Typography>
//                         <Typography variant="body2" className="muted-text" sx={{ mt: 1, maxWidth: 720 }}>
//                             {isHR
//                                 ? 'Manage team members, track performance, and update employee records.'
//                                 : 'View your profile, update personal information, and manage preferences.'}
//                         </Typography>
//                     </Box>
//                     <Chip
//                         label={isHR ? 'HR Manager' : 'Employee'}
//                         size="small"
//                         sx={{
//                             height: 24,
//                             background: isHR ? 'rgba(79, 70, 229, 0.12)' : 'rgba(34, 197, 94, 0.12)',
//                             color: isHR ? '#4f46e5' : '#22c55e',
//                             fontWeight: 700
//                         }}
//                     />
//                 </Stack>
//             </Paper>

//             {isHR ? <HREmployees /> : <CandidateEmployees />}
//         </Box>
//     );
// }

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    Typography,
    Paper,
    Chip,
    Stack,
    Switch,
    FormControlLabel
} from '@mui/material';

import HREmployees from './HREmployees';
import HREmployeesAIMode from './HREmployeeAIMode';
import CandidateEmployees from './CandidateEmployees';

export default function Employees() {
    const { user } = useSelector((state) => state.auth);
    const isHR = user?.role === 'HR';

    const [isAIModeEnabled, setIsAIModeEnabled] = useState(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: { xs: 2, sm: 0 } }}>
            {/* ================= HEADER ================= */}
            <Paper
                sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)'
                }}
            >
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', md: 'center' }}
                    spacing={2}
                >
                    <Box>
                        <Typography variant="overline" className="muted-text" sx={{ letterSpacing: 1 }}>
                            {isHR ? '👥 HR Management' : '👤 My Profile'}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
                            {isHR ? 'Employee Management' : 'My Employee Profile'}
                        </Typography>
                        <Typography
                            variant="body2"
                            className="muted-text"
                            sx={{ mt: 1, maxWidth: 720 }}
                        >
                            {isHR
                                ? 'Manage employee data manually or use the AI assistant for smart actions and approvals.'
                                : 'View your profile, update personal information, and manage preferences.'}
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={2} alignItems="center">
                        {/* AI TOGGLE (HR ONLY) */}
                        {isHR && (
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isAIModeEnabled}
                                        onChange={(e) => setIsAIModeEnabled(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="AI Assistant"
                                sx={{
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: 14,
                                        fontWeight: 600
                                    }
                                }}
                            />
                        )}

                        <Chip
                            label={isHR ? 'HR Manager' : 'Employee'}
                            size="small"
                            sx={{
                                height: 24,
                                background: isHR
                                    ? 'rgba(79, 70, 229, 0.12)'
                                    : 'rgba(34, 197, 94, 0.12)',
                                color: isHR ? '#4f46e5' : '#22c55e',
                                fontWeight: 700
                            }}
                        />
                    </Stack>
                </Stack>
            </Paper>

            {/* ================= BODY ================= */}
            {!isHR && <CandidateEmployees />}

            {isHR && (
                <>
                    {isAIModeEnabled ? <HREmployeesAIMode /> : <HREmployees />}
                </>
            )}
        </Box>
    );
}

