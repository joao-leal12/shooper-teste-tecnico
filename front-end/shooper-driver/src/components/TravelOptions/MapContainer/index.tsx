
import {APIProvider, Map} from '@vis.gl/react-google-maps';

import { MarkerContainer } from './MarkerContainer';
import { useDriverStore } from '../../../Services/store/drivers';


export const MapContainer = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const { drivers } = useDriverStore()

  if(!drivers) return 
  
  return (
    <APIProvider apiKey={apiKey}>
        <Map
          style={{width: '100%', height: '100%'}}
          defaultZoom={15}
          defaultCenter={{lat: +drivers.origin.latitude,lng: +drivers.destination.longitude }}
          mapId="438a01acf45eb9dd"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          
        >
          <MarkerContainer/>

        </Map>
    </APIProvider>
  )
}
