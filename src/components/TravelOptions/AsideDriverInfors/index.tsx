import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {Button} from '@mui/material'
import { boxStyles, boxTypographStyles, buttonStyles, buttonStylesContainer, travelSideDriverContainer, typographSyle } from '../styles-travel-options'
import { DriversContainer } from '../DriversContainer'

export const AsideDriverInfos = () => {
  return (
    <Box component="aside" sx={travelSideDriverContainer}>
        <Box sx={boxStyles}>

            <Box sx={boxTypographStyles} >
                <Typography  sx={typographSyle}>
                    De Rua Dom Avelar Brandão Vilela
                </Typography>
            </Box>

            <Box sx={boxTypographStyles}>
                <Typography sx={typographSyle}>
                  Para Rua 2 de Julho
                </Typography>
            </Box>
        </Box>

        <DriversContainer/>

        <Box sx={buttonStylesContainer}>

            <Button variant='outlined' sx={buttonStyles}>
                Confirmar Viagem
            </Button>

        </Box>

      </Box>
  )
}
