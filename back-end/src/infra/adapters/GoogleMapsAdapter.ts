import { ExternalServices, OriginDestinationDTO } from "./ExternalService";
import axios from 'axios'


export class GoogleMapsAdapter implements ExternalServices { 
    apiKey: string ;
    baseUrl: string; 
    
    constructor(  baseUrl: string, apiKey: string,){ 
        
        this.apiKey = apiKey
        this.baseUrl = baseUrl
    }
    async fetchData(originValue: string, destinationValue: string): Promise<any> {
        
        const output = await axios.post(this.baseUrl, 
            {origin: {
                address: originValue
            }, destination: { 
                address: destinationValue
            }}, 
            {params: {key: this.apiKey} ,headers: {'X-Goog-FieldMask': 'routes.legs.startLocation,routes.legs.endLocation,routes.duration,routes.distanceMeters'}})

            
        return output.data
    }



}