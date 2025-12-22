
import React from 'react';
import { Form } from '@formio/react';
import { Box, Paper } from '@mui/material';
import 'formiojs/dist/formio.full.min.css'; // Import Form.io default styles

/**
 * Official Form.io Renderer Wrapper
 * Uses @formio/react to render forms defined by JSON schema.
 * 
 * @param {Object} schema - The Form.io JSON schema.
 * @param {Function} onSubmit - Handler for form submission.
 */
export default function FormRender({ schema, onSubmit, initialData }) {

    // Handler for Form.io submission
    const handleFormSubmit = (submission) => {
        if (onSubmit) {
            onSubmit(submission.data);
        }
    };

    return (
        <Box sx={{
            '& .formio-component': { mb: 2 },
            '& .btn-primary': { bgcolor: '#1976d2', color: 'white', '&:hover': { bgcolor: '#115293' } } // Quick styling override to match MUI
        }}>
            <Paper elevation={0} sx={{ p: 1 }}>
                <Form
                    form={schema}
                    submission={{ data: initialData }}
                    onSubmit={handleFormSubmit}
                    options={{
                        noAlerts: true,
                        hide: { submit: false }
                    }}
                />
            </Paper>
        </Box>
    );
}

