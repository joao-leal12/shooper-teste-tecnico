import  { useState } from 'react';
import moment from 'moment'
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



export interface TravelProps { 
  rides: Travel
}
export interface Travel {
  driver: {
    name: string; 
    id: number
  };
  origin: string;
  destination: string;
  duration: string ;
  distance: number;
  date: Date
  value: string;
}


export const TravelHistory = () => {

  const customerId = window.sessionStorage.getItem('customerId') || ''; 

  const {historyData,isError,isLoading, error, setDriverId} = useGetHistory(customerId)
  
  const [selectedDriver, setSelectedDriver] = useState<string>('');
  
  
  const drivers = [
    { name: 'Todos', id: '' },
    { name: 'Homer Simpson - Plymouth Valiant 1973 rosa e enferrujado', id: 1 },
    { name: 'Dominic Toretto - Dodge Charger R/T 1970 modificado', id: 2 },
    { name: 'James Bond - Aston Martin DB5 clássico', id: 3},
 
  ];


  const handleFilter = async () => {
    
  };

  if(isLoading) return <Loading/>

  if(isError) return <Error message={error?.message || ''} key={error?.name}/>


  const formatDistance = (distance: number) => { 

    if(distance > 1000) return distance / 1000 + ' Km'


    return distance + 'Metros'

  }

  const formatTime = (duration: string) => {
    
    const newDuration = +(duration.match(/\d+/g) || ''); 

    if(!newDuration) return ''

    if(Math.trunc(newDuration / 60) > 60) return Math.trunc(newDuration / 60 / 60) + ' horas'


    return Math.trunc(newDuration / 60) + ' minutos'
  }

  console.log(historyData); 

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
                  primary={`Data/Hora: ${moment(travel.rides.date).format('DD/MM/YYYY')}`}
                  secondary={`Motorista: ${travel.rides.driver.name}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Origem: ${travel.rides.origin}`}
                  secondary={`Destino: ${travel.rides.destination}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Distância: ${formatDistance(travel.rides.distance)}`}
                  secondary={`Tempo Estimado: ${formatTime(travel.rides.duration)}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Valor: R$ ${travel.rides.value}`}
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


