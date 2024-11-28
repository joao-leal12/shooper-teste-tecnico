import { Driver } from "../domain/Driver";
import { DriverRepository } from "./driverRepository";

interface DriversDatabaseProps { 
    id: number;
    name: string; 
    description: string;
    car: string; 
    avaliation: string; 
    rate: string;
    min_km: number; 
}


export class FakeDriverRepository implements DriverRepository {

    drivers
    constructor() {
        this.drivers = [{id: 1, name: 'Home Simpson', description: "Olá! Sou o Homer, seumotorista camarada! Relaxe e aproveite o passeio, com sdireito a rosquinhas e boas risadas (e talvez alguns desvios).", car: "PlymouthValiant 1973rosa e enferrujado", avaliation: "2/5 Motorista simpático,mas errou o caminho 3vezes. O carro cheira adonuts.", rating: 2, rate: "R$ 2,50/km", min_km: 1}, 
            {id: 2, name: 'Dominic Toretto', description: "Ei, aqui é o Dom.Pode entrar, voute levar comsegurança erapidez ao seudestino. Só nãomexa no rádio, aplaylist ésagrada.", car: "DodgeChargerR/T 1970 modificado", avaliation: "4/5 Que viagem incrível! Ocarro é um show à partee o motorista, apesar deter uma cara de poucosamigos, foi super genteboa. Recomendo!",rating: 4, rate: "R$ 5/km", min_km: 5},
            {id: 2, name: 'James Bond', description: "Ei, aqui é o Dom.Pode entrar, voute levar comsegurança erapidez ao seudestino. Só nãomexa no rádio, aplaylist ésagrada.", car: "Aston Martin DBS Classico", avaliation: "5/5 Que viagem incrível! Ocarro é um show à partee o motorista, apesar deter uma cara de poucosamigos, foi super genteboa. Recomendo!", rating: 5,  rate: "R$ 10/km", min_km: 10}]
     }


    async getDriver(driverId: number, distance: number): Promise<Driver | undefined> {

        

        const outputResponse: Driver | undefined =  await new Promise((resolve, reject) => { 

            const driverFiltered = this.drivers.find(driver => driver.id === driverId)
            if(!driverFiltered) { 
                resolve(undefined)
                return 
            }

            const rateValue = +driverFiltered.rate.split(' ')[1].split('/')[0].replace(',', '.') * distance
            
            resolve(Driver.create(driverFiltered.id, driverFiltered.name,driverFiltered.description, driverFiltered.car, driverFiltered.avaliation, driverFiltered.rating, rateValue, driverFiltered.min_km))

        })

       
        return outputResponse
    }
  
    async getDriversWithMinimumDistance(distance: number): Promise<Driver[]> {
        const driversArr = []; 



        const driverPromise = await new Promise(resolver => { 

        
            resolver(this.drivers.filter(driver => driver.min_km <= distance)); 
        })

        driversArr.push(...driverPromise as any[])
        
        return driversArr.map(driver => {
            
            const valueOfDriver = +driver.rate.split(' ')[1].split('/')[0].replace(',', '.') * distance
   
        
            return  Driver.create(driver.id, driver.name, driver.description, driver.car, driver.avaliation, driver.rating, valueOfDriver, driver.min_km)
        }).sort((a,b) => +a.value - +b.value)
    } 
    
}