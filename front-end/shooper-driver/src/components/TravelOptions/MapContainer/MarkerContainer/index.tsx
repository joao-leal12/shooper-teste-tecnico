import {AdvancedMarker, Pin} from "@vis.gl/react-google-maps"
import { useDriverStore } from "../../../../Services/store/drivers"

export const MarkerContainer = () => {
    const {drivers} = useDriverStore(); 

    const geoLocationMap = [ 
        {key: drivers.originName, location: {lat: +drivers.origin.latitude, lng: +drivers.origin.longitude}}, 

        {key: drivers.destinationName, location: {lat: +drivers.destination.latitude, lng: +drivers.destination.longitude}}
    ]


  return (

    <>
    {geoLocationMap.map(geo => (

        <AdvancedMarker
            key={geo.key}
            position={geo.location}
            
        >
        <Pin background={'#07A776'} glyphColor={'#000'} borderColor={'#000'}/>

        </AdvancedMarker>

    ))}
    </>
  )
}
