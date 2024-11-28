import { DriveService } from "../../application/DriveService"
import { FakeDriverRepository } from "../../Repository/fakerDriveRepository";

describe('DriveService',() => { 

    it('Should return informations of Drivers', async () => {

        const fakerDriverRepository= new FakeDriverRepository(); 

        const driveService = new DriveService(fakerDriverRepository); 

        const drivers = await driveService.getDrivers(6);
        
        expect(drivers).toHaveLength(2); 
        expect(drivers[0].review.rating).toBe(2)
        expect(drivers[0].value).toBe(15)
        expect(drivers[0].name).toBe('Home Simpson')
        expect(drivers[1].review.rating).toBe(4)
        expect(drivers[1].value).toBe(30)
        expect(drivers[1].name).toBe('Dominic Toretto')
    })

}) 