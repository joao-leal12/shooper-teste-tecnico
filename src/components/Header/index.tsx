import styles from './header.module.css'
import logo from '../../assets/logo-shopper.webp'
import { useNavigate } from 'react-router'


export const Header = () => {
  const navigate = useNavigate(); 

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>) => { 
    e.preventDefault();
    
    navigate('/')
  }

  return (
    <header className={styles.headerContainer}>
      <a href="#"onClick={goTo}>
         <img src={logo} alt="Logo" />
      </a>
    </header>
  )
}
