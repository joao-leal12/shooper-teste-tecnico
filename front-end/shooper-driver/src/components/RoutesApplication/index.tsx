
import { Route, Routes } from 'react-router'
import { Home } from '../Home'
import { RequestTrip } from '../RequestTrip'
import { TravelOptions } from '../TravelOptions'
import { TravelHistory } from '../TravelHistory'

export const RoutesApplication = () => {
  return (
    <Routes>
        <Route index element={<Home/>}/>
        <Route path="/request-trip" element={<RequestTrip/>}/>
        <Route path="/travel-options" element={<TravelOptions/>}/> 
        <Route path='/travel-history' element={<TravelHistory/>}/>
    </Routes>
  )
}
