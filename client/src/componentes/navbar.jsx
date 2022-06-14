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
                    Home
                </span>
            </NavLink>
            <NavLink to='/Videogame/myGames' 
             activeStyle={{
                fontWeight: "bold",
                color: "red"
              }}
            >
                <span className={navbarStyle.games}>
                    My Games
                </span>
            </NavLink>
            <NavLink onClick={()=> dispatch(getGenres())}
             activeStyle={{
                fontWeight: "bold",
                color: "red"
              }}
            to='/Genres' >
                <span className={navbarStyle.genres}>
                    Genres
                </span>
            </NavLink>
            <NavLink onClick={()=> dispatch(getPlatforms())}
             activeStyle={{
                fontWeight: "bold",
                color: "red"
              }}
             to='/Platforms'>
                <span className={navbarStyle.platforms}>
                    Platforms
                </span>
            </NavLink>
            <Route exact path='/videogames'>
                <span className={navbarStyle.searchBar}>
                    < SearchBar 
                        handleSubmit={handleSubmit}
                        searchButton={'Search'} 
                        placeHolder={'...Search Games '}
                    />
                </span>
            </Route>
            
            
        </div>
    )

}

export default Navbar