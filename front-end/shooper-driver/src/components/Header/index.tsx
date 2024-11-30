import styles from './header.module.css'
import logo from '../../assets/logo-shopper.webp'
import { useNavigate } from 'react-router'
import {List, ListItem} from '@mui/material'


const listItemStyles = { 
  fontSize: '2rem',
  fontWeight: 'bold', 
  color: '#fff',
  cursor: 'pointer',
  ":hover": { 
    textDecoration: 'underline', 
    color: 'var(--green-btn-hover)'
  }
  
}

export const Header = () => {
  const navigate = useNavigate(); 

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => { 
    e.preventDefault();
    
    navigate(path)
  }

  return (
    <header className={styles.headerContainer}>
      <a href="#"onClick={(e) =>goTo(e,'/')}>
         <img src={logo} alt="Logo" />
      </a>

      <List sx={{
        display: 'flex',
        whiteSpace: 'nowrap'
      }}>
        <ListItem sx={listItemStyles}> 
            <a onClick={(e)=> goTo(e, '/travel-history')}>
               Histórico de Viagens 
            </a>
        </ListItem>

      </List>
    </header>
  )
}
