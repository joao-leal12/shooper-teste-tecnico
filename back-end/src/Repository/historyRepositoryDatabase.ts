
import { HistoryDriver } from "../domain/HistoryDriver";
import { HistoryRepository, inputDTO } from "./historyRepository";

import connection from "../infra/adapters/pgAdapter";
export class HistoryRepositoryDatabase implements HistoryRepository { 
    
  
    constructor() { 
        
    }
    async save(input: inputDTO): Promise<void> {

      

      await connection.query(
        `insert into history (customer_id,origin,destination,distance,duration,driver_id,fare,created_at) 
        values ($1,$2,$3,$4,$5,$6,$7,$8)`, [input.customerId, input.origin, input.destination, input.distance, input.duration, input.driver.id,input.value, new Date()])

    
    }
    async getHistory(customerId: string, driverId?: number): Promise<HistoryDriver[]> {
      
      const historyDriversRecords = []; 
        if(driverId) { 
          const outputHistoryRecords = await connection.query('select * from history ht where ht.customer_id = $1 and ht.driver_id = $2', [customerId , driverId])
          
          
          for(const record of outputHistoryRecords){ 


            const rides = { 
              id: record.id, 
              origin: record.origin, 
              date: record.created_at, 
              destination: record.destination,
              distance: record.distance, 
              duration :record.duration, 
              driver: { 
                id: record.driver_id, 
                name: record.driver_name
              }, 
              value: record.fare
            }

           
            const newRecord = new HistoryDriver(record.customer_id, rides )


            historyDriversRecords.push(newRecord); 

          }
          
         
          return historyDriversRecords
        
        }


        const output = await connection.query(`
          select ht.id,origin, destination, distance, duration, driver_id, fare, created_at, name from history ht, 
          drivers d where d.id = ht.driver_id and  ht.customer_id = $1; 
          `, [customerId])
        
        for(const record of output){ 


          const rides = { 
            id: record.id, 
            origin: record.origin, 
            date: record.created_at,  
            destination: record.destination,
            distance: record.distance, 
            duration :record.duration, 
            driver: { 
              id: record.driver_id, 
              name: record.name
            }, 
            value: record.fare
          }

         
          const newRecord = new HistoryDriver(record.customer_id, rides )

          
          historyDriversRecords.push(newRecord); 

        }


        return historyDriversRecords
      }


}