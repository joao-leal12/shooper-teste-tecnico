import { Driver } from "../domain/Driver";

export interface DriverRepository { 
    getDriversWithMinimumDistance(distance: number): Promise<Driver[]>
    getDriver(driverId: number, distance: number): Promise<Driver | undefined > 
}