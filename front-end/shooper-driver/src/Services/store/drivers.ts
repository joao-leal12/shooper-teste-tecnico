import {create} from 'zustand'
import {combine} from 'zustand/middleware'
interface GeoProps { 
    latitude: string;
    longitude:string 
}

interface ReviewProps { 
    rating: number; 
    comment: string; 
}

interface DriverProps { 
    id: number;
    name: string;
    description: string; 
    vehicle: string; 
    review: ReviewProps; 
    value: number;
}


export interface DriversProps { 
    originName: string; 
    destinationName: string ;
    origin: GeoProps;
    destination: GeoProps;
    distance: number;
    duration: string;
    options: DriverProps[]
}




 

export interface HistoryProps extends Omit<DriversProps, 'origin' | 'destination' |  'options'> { 
    customerId: string; 
    driver:{ 
        id: number
        name: string 
    }, 
    value: number 
}


export const useDriverStore = create(
    combine({ 
        drivers: {} as DriversProps,
        historyProps: {} as HistoryProps
    }, 
    (set ) => { 
        return { 
            addDriver: (nextProps: DriversProps) => set(() => 
                ({drivers: {...nextProps}})), 
            addHistory: (nextProps: HistoryProps) => set(() => ({historyProps: {...nextProps}}))
        }
    }
)
)
