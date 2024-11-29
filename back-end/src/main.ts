import express,{Request, Response} from 'express'; 
import { RouteService } from './application/RouteService';

import { GoogleMapsAdapter } from './infra/adapters/GoogleMapsAdapter';
import { DriveService } from './application/DriveService';

import { DriverRepositoryDatabase } from './Repository/driverRepositoryDatabase';
import { DistanceOriginDestination } from './domain/Route';
import { HistoryService } from './application/historyService';
import { HistoryRepositoryDatabase } from './Repository/historyRepositoryDatabase';

import { HttpError } from './infra/adapters/HttpError';
import cors from 'cors'
import connection from './infra/adapters/pgAdapter';

interface DriversProps{ 
    id: number; 
    name: string; 
    description: string; 
    vehicle:string ;
    review: { 
        rating: number; 
        comment: string ;
    }
    value: number; 
}
interface OutputDTOView { 
    origin : DistanceOriginDestination
    destination: DistanceOriginDestination
    distance: number 
    duration: string 
    options: DriversProps[]
}

const app = express(); 

app.use(express.json()); 
app.use(cors())

app.post('/ride/estimate',async  (req: Request, res: Response) => { 
  
    try{ 
        
        const apiKey = process.env.GOOGLE_API_KEY || ''
        const baseUrl = process.env.BASE_URL || ''


            const googleAdapter = new GoogleMapsAdapter(baseUrl, apiKey)
            
            const driverRepositoryAdapter = new DriverRepositoryDatabase();

            const routeService = new RouteService(googleAdapter);

            const driverService = new DriveService(driverRepositoryAdapter)

        const output = await routeService.getCalculatedRoute(req.body.customer_id, req.body.origin, req.body.destination) 

        console.log({output})
        const outputDriver= await driverService.getDrivers(output.route.distance)

            const optionsGenerated:DriversProps[] = []

            for(const driver of outputDriver) { 

                const currOption: DriversProps = { 
                    description: driver.description, 
                    id: driver.id, 
                    name: driver.name, 
                    review: driver.review, 
                    value: driver.value, 
                    vehicle: driver.vehicle
                }

            
                optionsGenerated.push(currOption); 

            }
            const outputViewDTO:OutputDTOView = { 
                origin: output.route.origin, 
                destination: output.route.destination,
                distance: output.route.distance, 
                duration: output.route.duration, 
                options: optionsGenerated
            }
            res.json({...outputViewDTO, routeResponse: output.routeResponse}); 
    }catch(e) { 

       if(e instanceof HttpError) { 
            console.log(e.message)
       }

       console.error(e)
        
        res.status(400).json({error_code: 'INVALID_DATA', error_description: 'Os dados Fornecidos no corpo da requisição são inválidos' })
    }
    

})  

app.patch('/ride/confirm', async (req: Request, res: Response) => { 

   

    const historyRepository = new HistoryRepositoryDatabase();

    const driverRepositoryDatabase = new DriverRepositoryDatabase(); 

    const driverService = new DriveService(driverRepositoryDatabase); 


    const historyService = new HistoryService(historyRepository, driverService)

    const inputDTOSaveHistory = { 

        customerId: req.body.customer_id, 
        origin: req.body.origin, 
        destination : req.body.destination, 
        distance: req.body.distance, 
        duration: req.body.duration, 
        driver: req.body.driver, 
        value: req.body.value

    }

    try { 

        await  historyService.saveHistory(inputDTOSaveHistory)

        res.status(200).json({success: true, description : 'Operação realizada com sucesso'})

    }catch(e) { 

        console.error({e})

        if(e instanceof HttpError) { 
            res.status(e.statusCode).json({error_code: e.errorCode, error_description: e.message})

            return 
        }
        
        res.status(400).json({error: true})
    }    
 

})


app.get('/ride/:customerId/', async (req: Request,  res: Response) => {

   try { 
        const driveRepositoryDatabase = new DriverRepositoryDatabase(); 

        const historyRepositoryDatabase = new HistoryRepositoryDatabase(); 

        const driverService = new DriveService(driveRepositoryDatabase); 


        const historyService = new HistoryService(historyRepositoryDatabase, driverService);

        const driverId = parseInt(req.query.driver_id as string) || undefined; 


        const output = await historyService.getHistoryOfCustomer(req.params.customerId, driverId);

        res.json(output);
   }catch(e) { 

        if(e instanceof HttpError) {
            res.status(404).json({error_code: 'NO_RIDES_FOUND', error_description: "Nenhum registro encontrado"})
        }

   }

})


process.on('SIGINT', async () => {
    await connection.$pool.end(); 
    process.exit(0)
})

app.listen(8080, '0.0.0.0',() => console.log('Server running in port' + 8080))