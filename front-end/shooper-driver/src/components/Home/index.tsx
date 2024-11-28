import { useNavigate } from 'react-router'
import styles from './home.module.css'
export const Home = () => {
    
    const navigate = useNavigate();
    const goTo = (path: string) => { 
        navigate(path);
    }

  return (
    <main className={styles.homeContainer}>
        <h1>O Shopper Driver leva você a qualquer lugar, com motoristas disponiveis para todos os gostos</h1>

        <button onClick={() =>goTo('/request-trip')}>Solicitar Viagem</button>
    </main>
  )
}   
