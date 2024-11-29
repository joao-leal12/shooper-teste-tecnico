
import { useDriverStore } from '../../../Services/store/drivers'

export const useConfirmRide = () => {

    const {drivers} = useDriverStore();


  return { 
    drivers 
  }
}
