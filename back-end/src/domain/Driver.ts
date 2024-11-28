
interface ReviewOptions { 
    rating: number; 
    comment: string; 
}
export class Driver { 
   
    constructor (readonly id: number, readonly name: string, readonly description: string, readonly vehicle: string ,readonly value: number, readonly review: ReviewOptions, private minKm: number ) { 
        this.id = id, 
        this.name = name, 
        this.description = description, 
        this.vehicle = vehicle, 
        this.review = review,
        this.value = value
        this.minKm = minKm  
       
    }

    public static create( id: number,  name: string,  description: string,  car: string , avaliation: string, rating: number, rateValue: number, minKm: number): Driver{ 
 
        const review = { 
            rating, 
            comment: avaliation      
        }

        return new Driver(id, name, description, car, rateValue, review, minKm)
    }

   isValidDriver(distance: number ) { 
        
    return distance > this.minKm
   }
}