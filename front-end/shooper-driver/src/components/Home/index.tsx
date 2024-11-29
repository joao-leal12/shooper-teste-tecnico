import { useNavigate } from 'react-router'
import styles from './home.module.css'

import { Typography } from '@mui/material';


const typographStyles = { 
  fontSize: '2.3rem',
  textAlign: 'center',
  color: 'var(--text-color)'
}

export const Home = () => {

  
    
    const navigate = useNavigate();
    const goTo = (path: string) => { 
        navigate(path);
    }

  return (
    <main className={styles.homeContainer}>
        <Typography sx={typographStyles}>O Shopper Driver proporciona soluções de transporte personalizadas, com motoristas qualificados prontos para atender às suas necessidades e preferências, garantindo conforto e eficiência em todos os trajetos</Typography>

        <button onClick={() =>goTo('/request-trip')}>Solicitar Viagem</button>
    </main>
  )
}   
