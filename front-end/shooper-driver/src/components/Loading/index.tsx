import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export const Loading: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh', 
        backgroundColor: 'rgba(255, 255, 255, 0.7)', 
        zIndex: 9999, 
      }}
    >
      <CircularProgress
        size={60} 
        sx={{
          color: '#1E2044', 
        }}
      />
    </Box>
  );
};


