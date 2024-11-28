
import { DriveService } from "../../application/DriveService";
import { HistoryService } from "../../application/historyService";
import { FakeDriverRepository } from "../../Repository/fakerDriveRepository";

import { FakerHistoryRepositoryDatabase } from "../../Repository/fakerHistoryRepositoryDatabase";
import { inputDTO } from "../../Repository/historyRepository";
import crypto from 'crypto'
describe('HistoryService', () => { 

    it('Should save history in database',async () => { 

        const fakerSaveHistoryRepositoryDatabase = new FakerHistoryRepositoryDatabase(); 

        const fakerDriverRepositoryDatabase = new FakeDriverRepository();
        
        const driverService = new DriveService(fakerDriverRepositoryDatabase);
        
        const historyService = new HistoryService(fakerSaveHistoryRepositoryDatabase, driverService)

        
        const customerId = crypto.randomUUID(); 

        const input: inputDTO = { 
            customerId, 
            origin: 'Rua Dom Avelar Brandão Vilela', 
            destination: '2 de Julho', 
            distance: 6,
            driver: { 
                name: 'Dominic Toretto', 
                id: 2
            },
            duration:'23', 
            value: 50, 
        }

    
        await historyService.saveHistory(input); 
        
        const output = await historyService.getHistoryOfCustomer(customerId)
    
     
        
        expect(output[0].rides.origin).toBe('Rua Dom Avelar Brandão Vilela')
        expect(output[0].rides.destination).toBe('2 de Julho')
        expect(output[0].rides.value).toBe(50)
        expect(output[0].rides.duration).toBe('23')
        
        expect(output[0].customerId).toBe(customerId)
        expect(output[0].rides.driver.name).toBe('Dominic Toretto')
        expect(output[0].rides.driver.id).toBe(2) 
      
    })



    it('Should save history in database',async () => { 

        const fakerSaveHistoryRepositoryDatabase = new FakerHistoryRepositoryDatabase(); 

        const fakerDriverRepositoryDatabase = new FakeDriverRepository();
        
        const driverService = new DriveService(fakerDriverRepositoryDatabase);
        
        const historyService = new HistoryService(fakerSaveHistoryRepositoryDatabase, driverService)

        
        const customerId = crypto.randomUUID(); 

        const input: inputDTO = { 
            customerId, 
            origin: 'Rua Dom Avelar Brandão Vilela', 
            destination: '2 de Julho', 
            distance: 6,
            driver: { 
                name: 'Dominic Toretto', 
                id: 2
            },
            duration:'23', 
            value: 50, 
        }

    
        await historyService.saveHistory(input);
        
        const input2 = { 
            customerId, 
            origin: 'Rua Procop 2', 
            destination: '4 de Julho', 
            distance: 10,
            driver: { 
                name: 'Home Simpson', 
                id: 1
            },
            duration:'300', 
            value: 25, 
        }
        
        await historyService.saveHistory(input2)
        const output = await historyService.getHistoryOfCustomer(customerId, 1)
    
     
        expect(output).toHaveLength(1); 
        expect(output[0].rides.origin).toBe('Rua Procop 2')
        expect(output[0].rides.destination).toBe('4 de Julho')
        expect(output[0].rides.value).toBe(25)
        expect(output[0].rides.duration).toBe('300')
       
        
        expect(output[0].customerId).toBe(customerId)
        expect(output[0].rides.driver.name).toBe('Home Simpson')
        expect(output[0].rides.driver.id).toBe(1) 
        
    })


    it('Should return error if the id are invalid',async () => { 

        const fakerSaveHistoryRepositoryDatabase = new FakerHistoryRepositoryDatabase(); 

        const fakerDriverRepositoryDatabase = new FakeDriverRepository();
        
        const driverService = new DriveService(fakerDriverRepositoryDatabase);
        
        const historyService = new HistoryService(fakerSaveHistoryRepositoryDatabase, driverService)

        
        const customerId = crypto.randomUUID(); 

        const input: inputDTO = { 
            customerId, 
            origin: 'Rua Dom Avelar Brandão Vilela', 
            destination: '2 de Julho', 
            distance: 4,
            driver: { 
                name: 'Dominic Toretto', 
                id: 10
            },
            duration:'23',
            value: 50
        }
       
      
        expect( () => historyService.saveHistory(input)).rejects.toThrow(new Error('Motorista invalido!'))
        
    })
})