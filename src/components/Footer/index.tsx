
import logo from '../../assets/logo-shopper.webp'
import styles from './footer.module.css'


export const Footer  = () => {
  return (
    <footer className={styles.footerContainer}>
        <a href="#">
         <img src={logo} alt="Logo" />
      </a>    
    </footer>
  )
}
