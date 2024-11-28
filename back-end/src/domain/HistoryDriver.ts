interface RidesProps { 
    id: number; 
    date: Date; 
    origin: string; 
    destination: string ;
    distance: number; 
    duration: string; 
    driver: { id: number; name: string;}
    value: number; 
}



export class HistoryDriver { 
    
     constructor(readonly customerId: string, readonly rides: RidesProps ) { 

        this.customerId = customerId, 
        this.rides = rides
       
    }


    
   
}