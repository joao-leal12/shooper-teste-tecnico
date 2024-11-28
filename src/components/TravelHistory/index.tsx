import  { useState } from 'react';
import {
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useGetHistory } from './hooks/useGetHistory';
import { Loading } from '../Loading';
import { Error } from '../Error';

export interface Travel {
  date: string;
  driver: string;
  origin: string;
  destination: string;
  distance: string;
  time: string;
  value: string;
}


export const TravelHistory = () => {

  const customerId = window.sessionStorage.getItem('customerId') || ''; 


  const {historyData,isError,isLoading, error, setDriverId} = useGetHistory(customerId)

  const [selectedDriver, setSelectedDriver] = useState<string>('');
  
  // Lista de motoristas
  const drivers = [
    { name: 'Todos', id: '' },
    { name: 'Homer Simpson - Plymouth Valiant 1973 rosa e enferrujado', id: 1 },
    { name: 'Dominic Toretto - Dodge Charger R/T 1970 modificado', id: 2 },
    { name: 'James Bond - Aston Martin DB5 clássico', id: '3' },
    // Mais motoristas fictícios aqui...
  ];

  // Viagens fictícias
  

  // Simula a aplicação do filtro para buscar as viagens
  const handleFilter = async () => {
    
  };

  if(isLoading) return <Loading/>

  if(isError) return <Error message={error?.message || ''} key={error?.name}/>
  console.log(selectedDriver)
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Histórico de Viagens
      </Typography>

      {/* Filtro por Motorista */}
      <Box marginBottom={3}>
        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel>Selecione o Motorista</InputLabel>
            <Select
              value={selectedDriver}
              onChange={(e) => {
                const value = e.target.value
                setDriverId(+e.target.value)
                setSelectedDriver(value)
              }}
              label="Selecione o Motorista"
            >
              {drivers.map((driver) => (
                <MenuItem key={driver.id} value={driver.id}>
                  {driver.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Button
            variant="contained"
           sx={{background: 'var(--green-btn)'}}
            onClick={handleFilter}
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} sx={{background: 'var(--green-btn)'}} /> : 'Aplicar Filtro'}
          </Button>
        </Box>
      </Box>

      {/* Lista de Viagens */}
      {historyData && historyData?.length > 0 ? (
        <List>
          {historyData.map((travel, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText
                  primary={`Data/Hora: ${travel.date}`}
                  secondary={`Motorista: ${travel.driver}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Origem: ${travel.origin}`}
                  secondary={`Destino: ${travel.destination}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Distância: ${travel.distance}`}
                  secondary={`Tempo: ${travel.time}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Valor: ${travel.value}`}
                  secondary=""
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      ) : (
        <Typography variant="body1">Nenhuma viagem encontrada.</Typography>
      )}
    </Container>
  );
};


