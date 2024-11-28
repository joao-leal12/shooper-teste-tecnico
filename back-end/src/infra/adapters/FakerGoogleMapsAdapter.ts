import { ExternalServices, OriginDestinationDTO } from "./ExternalService";

export class FakeGoogleMapsAdapter implements ExternalServices{
    async fetchData(origin: string, destination: string): Promise<OriginDestinationDTO> {

        const outputRoutes: OriginDestinationDTO = { 
            routes: [
                {   
                    legs: [
                        {
                            startLocation: { 
                                latLng: { 
                                    latitude: 34.323, 
                                    longitude: 122.04
                                }
                            },
                            endLocation: { 
                                latLng: { 
                                    latitude: 34.323, 
                                    longitude: 122.04
                                }
                            }
                        }
                    ],                   
                    distanceMeters: 57498,
                    duration: '24035'
                }
            ]
        }


        return outputRoutes


    } 

}