import {ListItem, ListItemAvatar, ListItemText, Typography, Avatar, Divider, Box} from '@mui/material'
import {Person} from '@mui/icons-material'
import { useDriverStore } from '../../Services/store/drivers';
import { useState } from 'react';


const boxContainerStyle = { 
  "&:hover": {
    backgroundColor: "#03AA77",
    cursor: "pointer",
    color: "#FFFFFF",
  },
  "&:active": {
    backgroundColor: "#03AA77",
    color: "#fff"
  },
  transition: "background-color 0.4s ease",
  borderRadius: "8px"
}

const boxContainerStyleActive = { 
  backgroundColor: '#03AA77', 
  color: '#fff'
}


export const Driver = () => {

  const {drivers, addHistory} = useDriverStore();

  const [isActive, setIsActive] = useState<number | null>(null)
  const setHistory = (driverId: number, driverName: string, value: number, idx: number) => { 

    const customerId=  JSON.parse(sessionStorage.getItem('customerId') as string)
    
      setIsActive(idx)

      addHistory({
         customerId, 
         destinationName: drivers.destinationName, 
         originName: drivers.originName, 
         distance: drivers.distance, 
        driver: {
          id: driverId,
          name: driverName
        },
        duration: drivers.duration, 
        value
      })
  }
  
  return (
    <>
       {drivers.options?.map((driver, index) => (
          <Box
            key={driver.id}
            onClick={() => setHistory(driver.id,driver.name,driver.value, index)}
            sx={isActive === index ?  boxContainerStyleActive : boxContainerStyle}
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
                    >{`Avaliação: ${driver.review.rating} ⭐`}</Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >{`Valor: R$ ${driver.value.toFixed(2)}`}</Typography>
                  </>
                }
              />
            </ListItem>
            {index < drivers.options.length - 1 && <Divider sx={{ bgcolor: "#03AA77" }} />}
          </Box>
        ))}
    </>
  )
}
