import {ListItem, ListItemAvatar, ListItemText, Typography, Avatar, Divider, Box} from '@mui/material'
import {Person} from '@mui/icons-material'

const drivers = [
  {
    name: "João",
    vehicle: "Golf GTI",
    description: "Aqui vai uma leve descrição para você",
    rating: 4,
    tripCost: 271.12,
  },
  {
    name: "Maria",
    vehicle: "Toyota Corolla",
    description: "Motorista cordial e atenciosa",
    rating: 4.5,
    tripCost: 253.45,
  },
  {
    name: "Carlos",
    vehicle: "Honda Civic",
    description: "Motorista experiente, sempre pontual",
    rating: 4.8,
    tripCost: 290.30,
  },
];

export const Driver = () => {
  return (
    <>
       {drivers.map((driver, index) => (
          <Box
            key={index}
            sx={{
              "&:hover": {
                backgroundColor: "#03AA77",
                cursor: "pointer",
                color: "#FFFFFF",
              },
              transition: "background-color 0.3s ease",
              borderRadius: "8px",
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#03AA77", color: "#FFFFFF" }}>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{fontSize: '1.6rem'}}
                primary={`${driver.name} - ${driver.vehicle}`}
                secondary={
                  <>
                    <Typography variant="body2" color="textSecondary" sx={{fontSize: '1rem'}}>
                      {driver.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >{`Avaliação: ${driver.rating} ⭐`}</Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >{`Valor: R$ ${driver.tripCost.toFixed(2)}`}</Typography>
                  </>
                }
              />
            </ListItem>
            {index < drivers.length - 1 && <Divider sx={{ bgcolor: "#03AA77" }} />}
          </Box>
        ))}
    </>
  )
}
