import { Driver } from "../domain/Driver";
import { DriverRepository } from "../Repository/driverRepository";

interface DriveServicesRoutes { 
    getDrivers(distance: number): Promise<Driver[]>
    getDriver(driverId: number, distance: number): Promise<Driver | undefined>
    driverIsValid(driverId: number, distance: number): Promise<{valid: boolean, status: number}>
}


export class DriveService implements DriveServicesRoutes {

    driverDataBaseRepository: DriverRepository
    constructor(driverDataBaseRepository: DriverRepository ) {
        this.driverDataBaseRepository= driverDataBaseRepository 
    }

    async getDrivers(distance: number ): Promise<Driver[]> {

        return await this.driverDataBaseRepository.getDriversWithMinimumDistance(distance)
        
    } 


    async getDriver(driverId: number, distance: number ) {
        return await this.driverDataBaseRepository.getDriver(driverId, distance)
    }

    async driverIsValid(driverId:number , distance: number ) { 

        const currDriver = await this.getDriver(driverId, distance)
     
        if(!currDriver) return {valid: false, status: 404} 

        if(!currDriver.isValidDriver(distance)) return {valid: false, status: 406}
        

        return {valid: true, status :200}
    }
    
}
