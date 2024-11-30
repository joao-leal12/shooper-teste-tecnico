import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {Button} from '@mui/material'
import { boxStyles, boxTypographStyles, buttonStyles, buttonStylesContainer, travelSideDriverContainer, typographSyle } from '../styles-travel-options'
import { DriversContainer } from '../DriversContainer'
import { useConfirmRide } from '../hooks/useConfirmRide'

interface AsideDriverInforProps { 
    originName: string; 
    destinationName: string; 

}

export const AsideDriverInfos = (params: AsideDriverInforProps) => {

const {confirmRide} = useConfirmRide()


  return (
    <Box component="aside" sx={travelSideDriverContainer}>
        <Box sx={boxStyles}>

            <Box sx={boxTypographStyles} >
                <Typography  sx={typographSyle}>
                    {params.originName}
                </Typography>
            </Box>

            <Box sx={boxTypographStyles}>
                <Typography sx={typographSyle}>
                  {params.destinationName}
                </Typography>
            </Box>
        </Box>

        <DriversContainer/>

        <Box sx={buttonStylesContainer}>

            <Button variant='outlined' sx={buttonStyles} onClick={confirmRide}>
                Confirmar Viagem
            </Button>

        </Box>

      </Box>
  )
}   
