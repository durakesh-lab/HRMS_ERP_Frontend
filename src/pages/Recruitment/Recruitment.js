// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Box, Typography, Paper, Chip, Stack } from '@mui/material';
// import HRRecruitment from './HRRecruitment';
// import CandidateRecruitment from './CandidateRecruitment';

// export default function Recruitment() {
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
//                             {isHR ? '👨‍💼 HR Recruitment' : '🔎 Job Discovery'}
//                         </Typography>
//                         <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
//                             {isHR ? 'Recruitment & Job Postings' : 'Find Your Dream Job'}
//                         </Typography>
//                         <Typography variant="body2" className="muted-text" sx={{ mt: 1, maxWidth: 720 }}>
//                             {isHR
//                                 ? 'Create roles, manage candidates, and schedule interviews — all in one place.'
//                                 : 'Search roles, view details, and apply seamlessly to opportunities that fit you.'}
//                         </Typography>
//                     </Box>
//                     <Chip
//                         label={isHR ? 'HR Lead' : 'Candidate'}
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

//             {isHR ? <HRRecruitment /> : <CandidateRecruitment />}
//         </Box>
//     );
// }


import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Paper, Chip, Stack,  Switch,
  FormControlLabel, } from "@mui/material";

import HRRecruitment from "./HRRecruitment";
import CandidateRecruitment from "./CandidateRecruitment";
import RecruitmentAIMode from "./RecruitmentAIMode";

export default function Recruitment() {
  const { user } = useSelector((state) => state.auth);
  const isHR = user?.role === "HR";
//   const [isAIModeEnabled] = useState(false);
const [isAIModeEnabled, setIsAIModeEnabled] = useState(false);


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        pt: { xs: 2, sm: 0 },
      }}
    >
      {/* ================= HEADER ================= */}
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
  {isHR && (
    <FormControlLabel
      control={
        <Switch
          checked={isAIModeEnabled}
          onChange={(e) => setIsAIModeEnabled(e.target.checked)}
          color="primary"
        />
      }
      label="AI Mode"
      sx={{
        "& .MuiFormControlLabel-label": {
          fontSize: 14,
          fontWeight: 500,
        },
      }}
    />
  )}

  <Chip
    label={isHR ? "HR Lead" : "Candidate"}
    size="small"
    sx={{
      height: 24,
      background: isHR
        ? "rgba(79, 70, 229, 0.12)"
        : "rgba(34, 197, 94, 0.12)",
      color: isHR ? "#4f46e5" : "#22c55e",
      fontWeight: 700,
    }}
  />
</Stack>

      </Paper>

      {/* ================= BODY ================= */}
      {!isHR && <CandidateRecruitment />}

      {isHR && (
        <>
          {isAIModeEnabled ? (
            <RecruitmentAIMode />
          ) : (
            <HRRecruitment />
          )}
        </>
      )}
    </Box>
  );
}
