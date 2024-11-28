export type DistanceOriginDestination = { 
    latitude: number; 
    longitude: number ;
}


export class Route {
    
    constructor(readonly customerId: string, readonly origin: DistanceOriginDestination, readonly destination: DistanceOriginDestination, readonly distance: number, readonly duration : string){}

    static create(customerId: string ,origin: DistanceOriginDestination, dest: DistanceOriginDestination, distance: number ,duration : string): Route | Route {
        
        return new Route(customerId, origin, dest, distance, duration)
    }
}