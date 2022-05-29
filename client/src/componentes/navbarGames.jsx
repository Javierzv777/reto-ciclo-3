
import navGamesStyle from './navbarGames.module.css';
import { NavLink,Route } from 'react-router-dom'
import MyGames from './myGames';
import ShowGame from './showGame';
import Update from './update';
import CreateGame from './createGame';


function NavbarGames(props){
    return (
            <div className={navGamesStyle.container}>
                <NavLink to='/videogame/myGames' >
                    <span className={navGamesStyle.link}>
                        Mis juegos
                    </span>
                </NavLink>
                <NavLink to='/videogame/create' >
                    <span className={navGamesStyle.link}>
                        Crear Juego
                    </span>
                </NavLink>
                <NavLink
                    to="/videogame/myGames"
                    className={isActive =>
                        "nav-link" + (!isActive ? " unselected" : "")
                    }
                    >
                    
                </NavLink>
                <Route exact path='/videogame/myGames'>
                    <MyGames/>
                </Route>
                <Route exact path='/videogame/detail'>
                    <ShowGame/>
                </Route>
                <Route exact path='/videogame/create'>
                    <CreateGame/>
                </Route>
                <Route exact path='/videogame/update'>
                    <Update/>
                </Route>


            </div>
            )
    
}

export default NavbarGames