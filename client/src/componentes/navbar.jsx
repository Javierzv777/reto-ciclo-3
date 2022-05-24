import navbarStyle from './navbar.module.css';
import SearchBar from './searchBar';
import { Link } from 'react-router-dom'

function Navbar(props) {
    return (
        <div className={navbarStyle.navbar}>
            <Link to='/Home' style={{ textDecoration: 'none', color:'black' }}>
                <span className={navbarStyle.home}>
                    Inicio
                </span>
            </Link>
            <Link to='/Videogame' style={{ textDecoration: 'none' , color:'black' }}>
                <span className={navbarStyle.juegos}>
                    Juegos
                </span>
            </Link>
            <Link to='/Genre' style={{ textDecoration: 'none' , color:'black'}}>
                <span className={navbarStyle.generos}>
                    Géneros
                </span>
            </Link>
            <span className={navbarStyle.searchBar}>
                < SearchBar />
            </span>
            
        </div>
    )

}

export default Navbar