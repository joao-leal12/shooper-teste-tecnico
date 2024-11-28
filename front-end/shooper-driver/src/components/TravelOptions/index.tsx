
import styles from './travel.module.css' 
import { AsideDriverInfos } from './AsideDriverInfors'
import { MapContainer } from './MapContainer'


export const TravelOptions = () => {
  return (
    <section className={styles.travelOptionsContainer}>
      <AsideDriverInfos/>
      <section className={styles.mapContainer}>
        <MapContainer/>
      </section>
    </section>
  )
}
