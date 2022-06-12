import {useHistory} from 'react-router-dom';
import navbarStyle from './navbar.module.css';
import SearchBar from './searchBar';
import { NavLink,Route } from 'react-router-dom'
import { useDispatch} from 'react-redux';
import { getGames,getGenres,getPlatforms, startLoading, setShowGames } from '../actions/actions';

// ,getGenres

function Navbar(props) {
    const dispatch=useDispatch()
    let history=useHistory();


    const handleSubmit=function(gameName,e    ){
        e.preventDefault()
         dispatch(getGames(gameName))
         dispatch(startLoading())
         dispatch(setShowGames([]))
         history.push("/videogames")
         
     }


    return (
        <div className={navbarStyle.navbar}>
            <NavLink to='/videogames' 
             activeStyle={{
                fontWeight: "bold",
                color: "red"
              }}>
                <span className={navbarStyle.home}>
                    Inicio
                </span>
            </NavLink>
            <NavLink to='/Videogame/myGames' 
             activeStyle={{
                fontWeight: "bold",
                color: "red"
              }}
            >
                <span className={navbarStyle.games}>
                    Mis Juegos
                </span>
            </NavLink>
            <NavLink onClick={()=> dispatch(getGenres())}
             activeStyle={{
                fontWeight: "bold",
                color: "red"
              }}
            to='/Genres' >
                <span className={navbarStyle.genres}>
                    Géneros
                </span>
            </NavLink>
            <NavLink onClick={()=> dispatch(getPlatforms())}
             activeStyle={{
                fontWeight: "bold",
                color: "red"
              }}
             to='/Platforms'>
                <span className={navbarStyle.platforms}>
                    Plataformas
                </span>
            </NavLink>
            <Route exact path='/videogames'>
                <span className={navbarStyle.searchBar}>
                    < SearchBar 
                        handleSubmit={handleSubmit}
                        searchButton={'Buscar'} 
                        placeHolder={'...Buscar Juegos '}
                    />
                </span>
            </Route>
            
            
        </div>
    )

}

export default Navbar