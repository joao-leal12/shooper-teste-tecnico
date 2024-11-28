import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface ErrorProps {
  message: string;
  onRetry?: () => void; // Função opcional para tentar novamente
}

export const Error: React.FC<ErrorProps> = ({ message, onRetry }) => {
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
        textAlign: 'center',
      }}
    >
      <Box sx={{ maxWidth: 400, padding: 3, borderRadius: 2, backgroundColor: '#FFEBEE', boxShadow: 3 }}>
        <Typography variant="h6" color="error" gutterBottom>
          Ocorreu um erro!
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 2 }}>
          {message}
        </Typography>
        {onRetry && (
          <Button variant="contained" color="primary" onClick={onRetry}>
            Tentar Novamente
          </Button>
        )}
      </Box>
    </Box>
  );
};


