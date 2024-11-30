import { Driver } from "../domain/Driver";

import { DriverRepository } from "./driverRepository";

import connection from "../infra/adapters/pgAdapter";
export class DriverRepositoryDatabase implements DriverRepository {

     
        constructor() { 
           

        }

    async getDriversWithMinimumDistance(distance: number): Promise<Driver[]> {
        
        const output = await connection.query('select * from drivers dr where dr.min_km <= $1', [distance]);
       
       

        const drivers = []; 
       

        for(const driver of output){
            
            const distanceKm =  Math.abs( +distance / 1000 )

            const rateValue = driver.rate * distanceKm

            const newDriver= Driver.create(driver?.id,driver.name,driver.descriptidrivern,driver.car,driver.feedback, driver.rating, +rateValue.toFixed(2),driver.min_km)

            drivers.push(newDriver); 
            
        }

        return drivers;
    }
    async getDriver(driverId: number, distance: number): Promise<Driver | undefined> {
        if(!driverId) return undefined        

    
        const distanceKm = Math.round(+distance / 1000);         

        if(!distanceKm) return undefined 
      
    
            const outputDriver = await connection.query('select * from drivers dr where dr.id = $1 and dr.min_km <= $2', [driverId, distanceKm])    
            
            
            if(!outputDriver.length) return undefined

            const rateValue = outputDriver[0].rate * distanceKm


            return Driver.create(outputDriver[0].id, outputDriver[0].name,outputDriver[0].description, outputDriver[0].car, outputDriver[0].feedback, outputDriver[0].rating, rateValue, outputDriver[0].min_km)
    
    }
    
}