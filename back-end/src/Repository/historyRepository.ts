import { HistoryDriver } from "../domain/HistoryDriver";

export interface HistoryRepository { 
    save(input: inputDTO): Promise<void>
    getHistory(customerId: string, driverId?: number): Promise<HistoryDriver[]>
}


export interface inputDTO  { 
    
    customerId: string; 
    origin: string; 
    destination : string; 
    distance: number; 
    duration : string; 
    driver: {id: number ,name: string; }, 
    value: number; 
}

export interface ouptutHistoryDTO  {
    customerId: string; 
    rides: { 
        id: number; 
        date: Date; 
        origin :string; 
        destination: string; 
        distance: number; 
        duration: string; 
        driver: { 
            id: number; 
            name: string; 
        }
        value: number
    }
} 
