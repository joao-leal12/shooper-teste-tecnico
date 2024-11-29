
import styles from './travel.module.css' 
import { AsideDriverInfos } from './AsideDriverInfors'
import { MapContainer } from './MapContainer'

import { useConfirmRide } from './hooks/useConfirmRide'
import { Loading } from '../Loading'


export const TravelOptions = () => {

  const {drivers} = useConfirmRide(); 

  if(!drivers.options || !drivers.options.length) return <Loading/>
  return (
    <section className={styles.travelOptionsContainer}>
      <AsideDriverInfos originName={drivers.originName} destinationName={drivers.destinationName}/>
      <section className={styles.mapContainer}>
        <MapContainer/>
      </section>
    </section>
  )
}
