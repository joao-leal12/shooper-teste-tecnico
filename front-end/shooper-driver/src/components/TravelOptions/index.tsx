
import styles from './travel.module.css' 
import { AsideDriverInfos } from './AsideDriverInfors'
import { MapContainer } from './MapContainer'

import { useConfirmRide } from './hooks/useConfirmRide'
import { useEffect } from 'react'



export const TravelOptions = () => {

  const {drivers,navigate} = useConfirmRide(); 

  useEffect(() => { 
    if(!drivers.options || !drivers.options.length) navigate('/')
  }, [drivers.options, navigate])


  
  return (
    <section className={styles.travelOptionsContainer}>
      <AsideDriverInfos originName={drivers.originName} destinationName={drivers.destinationName}/>
      <section className={styles.mapContainer}>
        <MapContainer/>
      </section>
    </section>
  )
}
