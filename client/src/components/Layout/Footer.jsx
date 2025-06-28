import React from 'react';

// MUI 
import { Box, Typography } from '@mui/material';

const Footer = () => {
  
  return (
    <Box sx={{ textAlign: 'center', mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Typography variant="caption" color="text.secondary" mt={0.3}  fontWeight="bold">
        Powered by  Dvora Rottman
      </Typography>
    </Box>
  );
};

export default Footer;
