import { HistoryRepository, inputDTO, ouptutHistoryDTO } from "./historyRepository";

import { HistoryDriver } from "../domain/HistoryDriver";


interface FormatDatabaseProps { 
    customer_id: string 
    origin: string 
    destination: string; 
    distance: number;
    name_driver: string; 
    id_driver: number; 
    duration: string; 
    date: Date
    value: number;
    id: number; 
}


export class FakerHistoryRepositoryDatabase implements HistoryRepository {

    itemsHistory: FormatDatabaseProps[] = []
    constructor(){ 
        
        this.itemsHistory = []    
    }

    async getHistory(customerId: string, driverId?:number): Promise<HistoryDriver[]> {

        return await new Promise(resolve => { 

            resolve(

                this.itemsHistory.filter(item => item.customer_id === customerId).filter(item => !driverId ? true: item.id_driver === driverId)
                .map(item => { 

                    return new HistoryDriver(item.customer_id, {date: item.date, destination: item.destination, distance: item.distance, duration: item.duration, origin: item.origin, value: item.value, id: item.id, driver: {id: item.id_driver, name: item.name_driver}})

                })


            )
        })
    } 
    
    async save(input: inputDTO): Promise<void> {
        
        this.itemsHistory.push({customer_id: input.customerId, date: new Date(), destination: input.destination, distance: input.distance, duration: input.duration, id:1, id_driver: input.driver.id, name_driver: input.driver.name, origin: input.origin, value: input.value})
        
    }
}  