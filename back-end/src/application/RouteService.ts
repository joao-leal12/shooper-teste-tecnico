import { DistanceOriginDestination, Route } from "../domain/Route";
import { ExternalServices, OriginDestinationDTO } from "../infra/adapters/ExternalService";
import { HttpError } from "../infra/adapters/HttpError";

interface RouteServiceProps { 
    getCalculatedRoute(customerId: string, origin: string , destination : string): Promise<{route: Route, routeResponse:any}>

    calculate(origin:string, destination: string): Promise<OriginDestinationDTO>
}

type OriginDestinationType = {
    origin: DistanceOriginDestination, 
    destination: DistanceOriginDestination
}


export class RouteService implements RouteServiceProps { 

    externalServiceOfRoutes: ExternalServices
    
    constructor(externalServiceOfRoutes: ExternalServices) {
        this.externalServiceOfRoutes = externalServiceOfRoutes
     }
    
    formatRoute(customerId: string, routeParams: OriginDestinationDTO): Route {
        const localizations: OriginDestinationType = { 
            origin: {
                latitude: 0, 
                longitude: 0
            }, 
            destination: {
                latitude: 0, 
                longitude: 0
            }
        }as OriginDestinationType

            if(!routeParams.routes) return {} as Route
        
        for(const route of routeParams.routes){ 
            for(const leg of route.legs){ 
               localizations.origin.latitude = leg.startLocation.latLng.latitude
               localizations.origin.longitude = leg.startLocation.latLng.longitude; 
               localizations.destination.latitude =leg.endLocation.latLng.latitude,
               localizations.destination.longitude = leg.endLocation.latLng.longitude
            }
        }
        return Route.create(customerId, localizations?.origin, localizations?.destination, routeParams.routes[0].distanceMeters, routeParams.routes[0].duration)
    }
    async calculate(origin: string, destination: string):Promise<OriginDestinationDTO>{
       
        return await this.externalServiceOfRoutes.fetchData(origin ,destination); 
    }
    
    async getCalculatedRoute(customerId: string, origin: string, destination : string): Promise<{route: Route, routeResponse: any}> { 

        

        if(!customerId) throw new Error()
       
        if(!origin || !destination) throw new HttpError('Os dados Fornecidos no corpo da requisição são inválidos', 400, 'INVALID_DATA')
       
        if(origin === destination ) throw new Error('Os valores de origem e destino não podem ser iguais')
        
        const output = await this.calculate(origin, destination); 
        
        return { 
            route: this.formatRoute(customerId, output), 
            routeResponse: output
        }
    }
}