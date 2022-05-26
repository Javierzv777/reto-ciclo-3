import {useHistory} from 'react-router-dom';
import navbarStyle from './navbar.module.css';
import SearchBar from './searchBar';
import { Link } from 'react-router-dom'
import { useDispatch} from 'react-redux';
import { getGames } from '../actions/actions';



function Navbar(props) {
    const dispatch=useDispatch()
    const history=useHistory();


    const handleSubmit=function(gameName){
         dispatch(getGames(gameName))
         history.push("/videogames")
     }
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
                < SearchBar 
                handleSubmit={handleSubmit}
                searchButton={'Buscar'} 
                placeHolder={'...Buscar Juegos'}/>
            </span>
            
        </div>
    )

}

export default Navbar