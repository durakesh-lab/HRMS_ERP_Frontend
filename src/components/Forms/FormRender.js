
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
            '& .formio-component': { 
                mb: 2.75,
                '& label': {
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: '#0f172a',
                    mb: 0.85,
                    display: 'inline-block'
                }
            },
            '& .form-group': {
                mb: 2.5
            },
            '& .form-control': {
                borderRadius: '8px !important',
                border: '1px solid #e5e7eb !important',
                padding: '10px 12px !important',
                fontSize: '0.95rem !important',
                fontFamily: 'Manrope, sans-serif !important',
                transition: 'all 0.2s ease !important',
                backgroundColor: '#ffffff !important',
                '&:focus': {
                    borderColor: '#1f7aec !important',
                    boxShadow: '0 0 0 3px rgba(31, 122, 236, 0.1) !important',
                    outline: 'none !important'
                },
                '&::placeholder': {
                    color: '#9ca3af !important',
                    opacity: 1
                }
            },
            '& select.form-control': {
                appearance: 'none !important',
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231f7aec' d='M6 9L1 4h10z'/%3E%3C/svg%3E\") !important",
                backgroundRepeat: 'no-repeat !important',
                backgroundPosition: 'right 10px center !important',
                paddingRight: '32px !important'
            },
            '& textarea.form-control': {
                minHeight: '140px !important',
                lineHeight: '1.5 !important',
                resize: 'vertical !important'
            },
            '& .btn': {
                borderRadius: '8px !important',
                fontWeight: 600,
                fontSize: '0.95rem !important',
                padding: '10px 24px !important',
                transition: 'all 0.2s ease !important',
                textTransform: 'none !important',
                border: 'none !important'
            },
            '& .btn-primary': { 
                backgroundColor: '#1f7aec !important',
                color: 'white !important',
                '&:hover': { 
                    backgroundColor: '#1a66cc !important',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 8px 16px rgba(31, 122, 236, 0.3) !important'
                }
            },
            '& .btn-secondary': {
                backgroundColor: '#f3f4f6 !important',
                color: '#6b7280 !important',
                '&:hover': {
                    backgroundColor: '#e5e7eb !important'
                }
            },
            '& .text-danger': {
                color: '#ef4444 !important',
                fontSize: '0.85rem !important',
                mt: 0.5,
                display: 'block'
            },
            '& .has-error .form-control': {
                borderColor: '#ef4444 !important'
            },
            '& .panel': {
                border: 'none !important',
                borderRadius: '12px !important',
                backgroundColor: 'transparent !important',
                boxShadow: 'none !important',
                '& .panel-heading': {
                    backgroundColor: 'transparent !important',
                    border: 'none !important',
                    padding: '0 !important',
                    mb: 2,
                    '& h3': {
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#0f172a !important',
                        mb: 0
                    }
                }
            },
            '& .row': {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                mx: 0,
                '& .col': {
                    width: '100% !important',
                    padding: '0 !important'
                }
            }
        }}>
            <Paper elevation={0} sx={{ p: { xs: 0, sm: 1 } }}>
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

