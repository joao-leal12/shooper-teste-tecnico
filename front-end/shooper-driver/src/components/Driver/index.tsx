import {ListItem, ListItemAvatar, ListItemText, Typography, Avatar, Divider, Box} from '@mui/material'
import {Person} from '@mui/icons-material'
import { useDriverStore } from '../../Services/store/drivers';


export const Driver = () => {

  const {drivers} = useDriverStore();

  
  return (
    <>
       {drivers.options?.map((driver, index) => (
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
