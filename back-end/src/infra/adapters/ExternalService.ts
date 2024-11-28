import { DistanceOriginDestination } from "../../domain/Route"

export interface ExternalServices { 
    fetchData(origin: string, destination: string): Promise<OriginDestinationDTO>
}

export interface OriginDestinationDTO { 
    routes: {
        legs: { 
            startLocation: { 
                latLng: DistanceOriginDestination
            },
            endLocation: { 
                latLng: DistanceOriginDestination
            }
        }[]
        distanceMeters:  number, 
        duration: string
    }[]
}