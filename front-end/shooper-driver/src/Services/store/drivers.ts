import {create} from 'zustand'

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




interface Drivers { 
    drivers: DriversProps
    addDriver: (props: DriversProps) => void }   


export const useDriverStore = create<Drivers>((set) => ({
   drivers: {} as DriversProps,
   addDriver: (props: DriversProps) => set(() => ({drivers:{...props}})) 
})); 