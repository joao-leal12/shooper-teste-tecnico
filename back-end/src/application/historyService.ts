import { HttpError } from "../infra/adapters/HttpError";
import { HistoryRepository, inputDTO } from "../Repository/historyRepository";
import { DriveService } from "./DriveService";

export class HistoryService { 
    
    historyRepositoryDatabase: HistoryRepository
    driverService: DriveService
    constructor(historyRepositoryDatabasee: HistoryRepository, driverService: DriveService) { 
        this.historyRepositoryDatabase = historyRepositoryDatabasee,
        this.driverService = driverService
    }


    async saveHistory(input: inputDTO){ 

        
        if(!input.origin || !input.destination || !input.customerId) throw new HttpError('Os dados fornecidos na requisição são inválidos', 400, 'INVALID_DATA')

        if(!input.customerId) throw new HttpError('Motorista não encontrado', 404, 'DRIVER_NOT_FOUND')


        const outputDriver = await this.driverService.driverIsValid(input.driver.id, input.distance)

    
        if(!outputDriver.valid && outputDriver.status === 404) throw new HttpError('Motorista não encontrado', 404, 'DRIVER_NOT_FOUND') 

        if(!outputDriver.valid && outputDriver.status === 404) throw new HttpError('Quilometragem inválida para o motorista', 406, 'INVALID_DISTANCE') 
        

        await this.historyRepositoryDatabase.save(input); 
    }


    async getHistoryOfCustomer(customerId: string, driverId?: number) { 

        if(!customerId) throw new Error('O id do usuário não foi enviado')
        
        if(driverId) { 

            return await this.historyRepositoryDatabase.getHistory(customerId, driverId)
        }

        return await this.historyRepositoryDatabase.getHistory(customerId)
    }
}