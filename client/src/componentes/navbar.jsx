import {useHistory} from 'react-router-dom';
import navbarStyle from './navbar.module.css';
import SearchBar from './searchBar';
import { Link } from 'react-router-dom'
import { useDispatch} from 'react-redux';
import { getGames,getGenres,getPlatforms } from '../actions/actions';

// ,getGenres

function Navbar(props) {
    const dispatch=useDispatch()
    let history=useHistory();


    const handleSubmit=function(gameName){
         dispatch(getGames(gameName))
         history.push("/videogames")
     }

    // const handlePlatforms=function (){
    //     dispatch(getPlatforms())
    // }
    // const handleGenres=function (){
    //     dispatch(getPlatforms())
    // }
    return (
        <div className={navbarStyle.navbar}>
            <Link to='/Home' style={{ textDecoration: 'none', color:'black' }}>
                <span className={navbarStyle.home}>
                    Inicio
                </span>
            </Link>
            <Link to='/Videogame' style={{ textDecoration: 'none' , color:'black' }}>
                <span className={navbarStyle.games}>
                    Juegos
                </span>
            </Link>
            <Link onClick={()=> dispatch(getGenres())}
            to='/Genres' style={{ textDecoration: 'none' , color:'black'}}>
                <span className={navbarStyle.genres}>
                    Géneros
                </span>
            </Link>
            <Link onClick={()=> dispatch(getPlatforms())}
             to='/Platforms' style={{ textDecoration: 'none' , color:'black'}}>
                <span className={navbarStyle.platforms}>
                    Plataformas
                </span>
            </Link>
            <span className={navbarStyle.searchBar}>
                < SearchBar 
                    handleSubmit={handleSubmit}
                    searchButton={'Buscar'} 
                    placeHolder={'...Buscar Juegos en la api'}
                />
            </span>
            
        </div>
    )

}

export default Navbar