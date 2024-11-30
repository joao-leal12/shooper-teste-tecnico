
import { useNavigate } from 'react-router';
import { client } from '../../../infra/http/axios-client';

import { useMutation } from '@tanstack/react-query';
import { useDriverStore } from '../../../Services/store/drivers';


interface SendHistoryProps { 
  customer_id: string ;
  origin : string; 
  destination: string; 
  distance: number; 
  duration: string; 
  driver: { 
    id: number;
    name: string 
  }
  value: number 
}

export const useConfirmRide = () => {

    const { historyProps, drivers, addHistory} = useDriverStore();
    
    const navigate = useNavigate(); 

    const mutate = useMutation({
      mutationFn: (data: SendHistoryProps) => { 
        return client.patch('/ride/confirm', data)
      },
      onSuccess: () => { 
        navigate('/travel-history')
      }
    })
    const confirmRide =async  () => { 
      const sendHistoryDTO = { 
        customer_id:historyProps.customerId,
        origin: historyProps.originName, 
        destination: historyProps.destinationName,
        distance: historyProps.distance,
        duration: historyProps.duration, 
        driver: historyProps.driver,
        value: historyProps.value
      }
      
       await mutate.mutateAsync(sendHistoryDTO)
          console.log(mutate.isSuccess)
      


    }

  return { 
    addHistory,
    drivers,
    confirmRide, 
    navigate
  }
}
