import { RouteService } from "../../application/RouteService"
import { FakeGoogleMapsAdapter } from "../../infra/adapters/FakerGoogleMapsAdapter";
import crypto from 'crypto'
describe("RouteService", () => { 

    it('Should calculate distance correctly', async () => { 
        const fakerGoogleMapsAdapter = new FakeGoogleMapsAdapter();

        const routeService = new RouteService(fakerGoogleMapsAdapter);

        const places = { 
            customerId: crypto.randomUUID(), 
            origin: "Rua Dom Avelar Brandão Vilela", 
            destination : "Rua 2 de julho"
        }

        const output = await routeService.getCalculatedRoute(places.customerId, places.origin, places.destination); 

    
   
        expect(output.origin).toBeDefined(); 
        expect(output.origin.latitude).toBe(34.323);
        expect(output.origin.longitude).toBe(122.04);
        expect(output.destination).toBeDefined(); 
        expect(output.destination.latitude).toBe(34.323);
        expect(output.destination.longitude).toBe(122.04);
        expect(output.distance).toBeDefined(); 
        expect(output.distance).toBe(57498);
        expect(output.duration).toBeDefined();
        expect(output.duration).toBe('24035'); 
    })


    it('Should throw error if source or destination are without value', async() => { 
        const fakerGoogleMapsAdapter = new FakeGoogleMapsAdapter();

        const routeService = new RouteService(fakerGoogleMapsAdapter);
        
        const inputCustomerId = crypto.randomUUID();
    
        expect(async () =>await routeService.getCalculatedRoute(inputCustomerId, '', '') ).rejects.toThrow(new Error('Valores de origem e destinos não podem ser em branco'))
    })

    it('Should throw error if customerId are without value', async() => { 
        const fakerGoogleMapsAdapter = new FakeGoogleMapsAdapter();

        const routeService = new RouteService(fakerGoogleMapsAdapter);

        expect(async () =>await routeService.getCalculatedRoute('', '', '') ).rejects.toThrow(new Error('Id do cliente precisa ser especificado'))
    })

    it('Should throw error if source are equals destination', async() => { 
        const fakerGoogleMapsAdapter = new FakeGoogleMapsAdapter();

        const routeService = new RouteService(fakerGoogleMapsAdapter);
            
        const inputCustomerId = crypto.randomUUID();
    
        expect(async () =>await routeService.getCalculatedRoute(inputCustomerId, 'Rua Dom Avelar Brandão Vilela', 'Rua Dom Avelar Brandão Vilela') ).rejects.toThrow(new Error('Os valores de origem e destino não podem ser iguais'))
    })
})