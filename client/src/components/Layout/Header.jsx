import React from 'react';

// MUI
import { Box } from '@mui/material';

// Logo image
import logo from '../../assets/logo.svg';

const Header = () => {

  return (
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      <img src={logo} alt="Company Logo"
        style={{
          width: '120px',
          height: '50px',
          objectFit: 'contain'
        }}
      />
    </Box>
  );
};

export default Header;
