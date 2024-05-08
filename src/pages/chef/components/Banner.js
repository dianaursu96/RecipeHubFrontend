import React from 'react';
import { Alert } from '@mui/material';

const Banner = ({ label }) => {
    return (
        <Alert severity="warning" sx={{ marginBottom: '16px' }}>
            {label}
        </Alert>
    );
};

export default Banner;
