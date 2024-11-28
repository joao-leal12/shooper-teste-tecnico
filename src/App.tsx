
import { Header } from './components/Header'
import { RoutesApplication } from './components/RoutesApplication'
import { Footer } from './components/Footer'

import './App.css'

export const App = () => {
  return (  
    <section className='container'>
        <Header/>
        <RoutesApplication/>
        <Footer/>
    </section>
  )
}
