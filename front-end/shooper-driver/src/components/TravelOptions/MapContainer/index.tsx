
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export const MapContainer = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const [userLocation, setUserLocation] = useState<any>(null);
  useEffect(() => { 
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Erro ao obter localização: ", error);
            
            setUserLocation({ lat: -23.5505, lng: -46.6333 }); 
          }
        );
      } 
    };
    getUserLocation();
  }, [])

  
    if(!userLocation) return 
  
  return (
    <APIProvider apiKey={apiKey}>
        <Map
          style={{width: '100%', height: '100%'}}
          defaultZoom={15}
          defaultCenter={{lat: userLocation.lat, lng: userLocation.lng}}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        />
    </APIProvider>
  )
}
