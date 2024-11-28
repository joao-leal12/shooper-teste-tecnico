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
        height: '100vh', // Tamanho da tela cheia
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fundo branco semitransparente
        zIndex: 9999, // Para garantir que fique acima de outros componentes
      }}
    >
      <CircularProgress
        size={60} // Tamanho do spinner
        sx={{
          color: '#1E2044', // Cor do spinner
        }}
      />
    </Box>
  );
};


